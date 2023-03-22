import { errHandler, MySQLErrorType } from '../../model/errorHandler';
import { isKey, parseJson, tinyToBoolean } from '../../utils/handler';
import typeOf from '../../utils/typeOf';
import { $ } from '../aggregateCommand';
import {
  AggregateCommandLike,
  AggregateKey,
} from '../aggregateCommand/interface';
import { Collection, QueryResult, RowData } from '../collection/interface';
import { MySQLSelectGenerator } from '../sql/sqlGenerator';
import { SQLLimit, SQLSkip } from '../sql/sqlGenerator/interface';
import { SelectGenerator } from '../sql/sqlGenerator/select/interface';
import {
  Aggregate,
  AggregateFields,
  AggregateFilter,
  AggregateGroup,
  AggregateMatch,
  AggregateProject,
  AggregateSort,
  AggregateTask,
  AggregateTaskType,
} from './interface';

class MySQLAggregate<T> implements Aggregate<T> {
  $collection: Collection<T>;
  $taskList: AggregateTask[];
  constructor(collection: Collection<T>) {
    this.$collection = collection;
    this.$taskList = [];
  }
  async handleTask(selectGen: SelectGenerator, task: AggregateTask) {
    const { $type, $value } = task;
    // 新增字段
    if (
      $type === AggregateTaskType.NEWFIELDS &&
      !selectGen.exists('newfields')
    ) {
      // 字段值
      selectGen.set('newfields', <AggregateFields>$value);
      return selectGen;
    }

    // 排序
    if ($type === AggregateTaskType.ORDERBY && !selectGen.exists('orderby')) {
      selectGen.set('orderby', <AggregateSort>$value);
      return selectGen;
    }
    // 分页
    if ($type === AggregateTaskType.LIMIT && !selectGen.exists('limit')) {
      selectGen.set('limit', <SQLLimit>$value);
      return selectGen;
    }
    // 跳过分页
    if ($type === AggregateTaskType.SKIP && !selectGen.exists('skip')) {
      selectGen.set('skip', <SQLSkip>$value);
      return selectGen;
    }
    // 分组
    if ($type === AggregateTaskType.GROUPBY && !selectGen.exists('groupby')) {
      selectGen.set('groupby', <AggregateKey[]>$value);
      return selectGen;
    }
    // 筛选
    if ($type === AggregateTaskType.MATCH && !selectGen.exists('where')) {
      selectGen.set('where', <AggregateMatch>$value);
      return selectGen;
    }
    // 字段
    if ($type === AggregateTaskType.FILTER && !selectGen.exists('fields')) {
      // 字段值
      const fields = await this.$collection.getFields(<AggregateFilter>$value);
      const $fields = fields.map((field) => field.COLUMN_NAME);
      selectGen.set('fields', $fields);
      return selectGen;
    }
    // 重复属性
    const newSelectGen = new MySQLSelectGenerator();
    // 子句
    newSelectGen.set('child', selectGen);
    // 当前字段
    const { $fields = [], $newfields = {} } = selectGen;
    const newfields = Object.keys($newfields);
    const currentFields = [...$fields, ...newfields];
    // 新字段
    if ($type === AggregateTaskType.NEWFIELDS) {
      newSelectGen.set('newfields', <AggregateFields>$value);
    }
    // 排序
    if ($type === AggregateTaskType.ORDERBY) {
      newSelectGen.set('orderby', <AggregateSort>$value);
    }
    // 分页
    if ($type === AggregateTaskType.LIMIT) {
      newSelectGen.set('limit', <SQLLimit>$value);
    }
    // 跳过分页
    if ($type === AggregateTaskType.SKIP) {
      newSelectGen.set('skip', <SQLSkip>$value);
    }
    // 分组
    if ($type === AggregateTaskType.GROUPBY) {
      newSelectGen.set('groupby', <string[]>$value);
    }
    // 筛选
    if ($type === AggregateTaskType.MATCH) {
      newSelectGen.set('where', <AggregateMatch>$value);
    }
    // 过滤
    if ($type === AggregateTaskType.FILTER) {
      const filters: string[] = (<(keyof typeof $value)[]>(
        Object.keys(<AggregateFilter>$value)
      )).filter((field) => $value && !$value[field]);
      const fields = currentFields.filter((field) => !filters.includes(field));
      newSelectGen.set('fields', fields);
    }
    return newSelectGen;
  }
  async preTaskList(): Promise<string> {
    const { $name } = this.$collection;
    let selectGen = new MySQLSelectGenerator({ $name });
    // 遍历任务列表
    for (const i in this.$taskList) {
      selectGen = await this.handleTask(selectGen, this.$taskList[i]);
    }
    return selectGen.subGenerate('tb');
  }
  addFields(fields: AggregateFields): Aggregate<T> {
    this.$taskList.push({
      $type: AggregateTaskType.NEWFIELDS,
      $value: fields,
    });
    return this;
  }
  count(fieldName: AggregateKey): Aggregate<T> {
    this.addFields({
      [fieldName]: $.count(1),
    });
    return this;
  }
  async end(): Promise<QueryResult<RowData<T[] | []>>> {
    // 集合名
    const { $name } = this.$collection;
    // name
    if (!typeOf.isNotBlankStr($name)) {
      throw errHandler.createError(
        MySQLErrorType.AGGREGATE_END_ERROR,
        'aggregate.name is an invalid value'
      );
    }
    try {
      const sql = await this.preTaskList();
      // 处理sql结果
      const { results, fields } = await this.$collection.execSQL(sql);
      // fields
      if (!fields) {
        throw errHandler.createError(
          MySQLErrorType.AGGREGATE_END_ERROR,
          "aggregate.fields don't exist"
        );
      }
      // 不存在结果
      if (!typeOf.isNotEmptyArr(results)) {
        return {
          result: results,
          status: false,
        };
      }
      // 配置
      const { jsonParse, tinyIntToBool } = this.$collection.$config;
      // json 转换为 object 或 array
      if (jsonParse) {
        parseJson(fields, results);
      }
      // tinyint 转换为 boolean
      if (tinyIntToBool) {
        tinyToBoolean(fields, results);
      }
      return {
        result: results,
        status: true,
      };
    } catch (err: any) {
      throw errHandler.createError(
        MySQLErrorType.AGGREGATE_END_ERROR,
        String(new Error(err).stack) || ''
      );
    }
  }
  group(group: AggregateGroup): Aggregate<T> {
    // 字段名
    const fieldNames = [];
    const fields: AggregateFields = {};
    for (const key in group) {
      if (typeOf.objStructMatch(group[key], ['$value', '$type'])) {
        fields[key] = group[key];
      }
      if (isKey(group[key])) {
        fieldNames.push(group[key]);
      }
    }
    // 新增字段
    this.addFields(group);
    // 分组
    this.$taskList.push({
      $type: AggregateTaskType.GROUPBY,
      $value: fieldNames,
    });
    return this;
  }
  skip(skip: number): Aggregate<T> {
    this.$taskList.push({
      $type: AggregateTaskType.SKIP,
      $value: skip,
    });
    return this;
  }
  limit(limit: number): Aggregate<T> {
    this.$taskList.push({
      $type: AggregateTaskType.LIMIT,
      $value: limit,
    });
    return this;
  }
  match(fields: AggregateMatch): Aggregate<T> {
    this.$taskList.push({
      $type: AggregateTaskType.MATCH,
      $value: fields,
    });
    return this;
  }
  project(project: AggregateProject): Aggregate<T> {
    // 过滤
    const filter: AggregateFilter = {};
    // 新字段
    const newfields: AggregateFields = {};
    for (const key in project) {
      if (typeOf.isBooloon(project[key])) {
        filter[key] = <boolean>project[key];
        continue;
      }
      newfields[key] = <AggregateCommandLike>project[key];
    }
    // 新增字段非空
    if (typeOf.isNotEmptyObj(newfields)) {
      this.addFields(newfields);
    }
    // 过滤字段非空
    if (typeOf.isNotEmptyObj(filter)) {
      this.filter(filter);
    }
    return this;
  }
  filter(filter: AggregateFilter): Aggregate<T> {
    this.$taskList.push({
      $type: AggregateTaskType.FILTER,
      $value: filter,
    });
    return this;
  }
  sample(size: number): Aggregate<T> {
    this.sort({
      'rand()': '',
    });
    this.limit(size);
    return this;
  }
  sort(orderby: AggregateSort): Aggregate<T> {
    this.$taskList.push({
      $type: AggregateTaskType.ORDERBY,
      $value: orderby,
    });
    return this;
  }
  sortByCount(fieldName: AggregateKey): Aggregate<T> {
    this.group({
      count: $.count(1),
      _id: fieldName,
    });

    return this;
  }
}

export { MySQLAggregate };
