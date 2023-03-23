import { Connection, escape, FieldInfo, OkPacket, PoolConnection } from 'mysql';
import { errHandler, MySQLErrorType } from '../../model/errorHandler';
import {
  objectMerge,
  parseJson,
  stringfyJson,
  tinyToBoolean,
} from '../../utils/handler';
import typeOf from '../../utils/typeOf';
import { MySQLAggregate } from '../aggregate';
import { Aggregate } from '../aggregate/interface';
import { Database, DatabaseType } from '../database/interface';
import { sqlClip } from '../sql/sqlClip';
import {
  MySQLDeleteGenerator,
  MySQLInsertGenerator,
  MySQLSelectGenerator,
  MySQLUpdateGenerator,
} from '../sql/sqlGenerator';
import {
  SQLFields,
  SQLOrderBy,
  SQLRecord,
  SQLWhere,
} from '../sql/sqlGenerator/interface';
import {
  Collection,
  CollectionConfig,
  CollectionProps,
  Filter,
  InsertData,
  OrderBy,
  QueryResult,
  RowData,
  RowDataPacket,
  Where,
} from './interface';

/**
 * @description MySQL 集合
 * @example // 获取数据
 * new MySQLCollection<T>(name)
 * .where(where)
 * .get()
 * @example // 添加数据
 * new MySQLCollection<T>(name)
 * .where(where)
 * .add(data)
 * @example // 删除数据
 * new MySQLCollection<T>(name)
 * .where(where)
 * .remove()
 * @example // 修改数据数据
 * new MySQLCollection<T>(name)
 * .where(where)
 * .update(data)
 */
class MySQLCollection<T extends object> implements Collection<T> {
  $name: string;
  $filter?: Filter<T>;
  $where?: Where<T>;
  $orderby?: OrderBy<T>;
  $skip?: number;
  $limit?: number;
  $config: CollectionConfig;
  $conn?: Connection;
  $database: Database<DatabaseType>;
  constructor(
    database: Database<DatabaseType>,
    props: CollectionProps<T>,
    config: CollectionConfig,
    conn?: Connection | PoolConnection
  ) {
    // 绑定数据库
    this.$database = database;
    // 属性
    const { $filter, $where, $limit, $skip, $orderby, $name } = props;
    this.$name = $name;
    this.$filter = $filter;
    this.$where = $where;
    this.$limit = $limit;
    this.$skip = $skip;
    this.$orderby = $orderby;
    // 配置
    this.$config = config;
    // 连接
    this.$conn = conn;
  }
  create(props: Omit<CollectionProps<T>, '$name'>): Collection<T> {
    const { $database, $config, $conn, $name } = this;

    const { $limit, $skip, $filter, $where, $orderby } = props;
    // 属性
    const $props: CollectionProps<T> = { $name };

    $props.$filter = typeOf.isObject(this.$filter)
      ? objectMerge({}, this.$filter, $filter)
      : objectMerge({}, $filter);

    $props.$where = typeOf.isObject(this.$where)
      ? objectMerge({}, this.$where, $where)
      : objectMerge({}, $where);

    $props.$orderby = typeOf.isObject(this.$orderby)
      ? objectMerge({}, this.$orderby, $orderby)
      : objectMerge({}, $orderby);

    $props.$skip = typeOf.isNumber($skip) ? $skip : this.$skip;
    $props.$limit = typeOf.isNumber($limit) ? $limit : this.$limit;

    // 新集合
    const newCollection = new MySQLCollection<T>(
      $database,
      $props,
      $config,
      $conn
    );
    return newCollection;
  }
  aggregate(): Aggregate<T> {
    return new MySQLAggregate<T>(this);
  }
  field(filter: Filter<T>): Collection<T> {
    // 存在字段
    if (typeOf.isNotEmptyObj(filter)) {
      const newFields: Filter<T> = {};
      for (const key in filter) {
        if (typeOf.isBooloon(filter[<keyof Filter<T>>key])) {
          newFields[<keyof Filter<T>>key] = filter[<keyof Filter<T>>key];
        }
      }
      return this.create({ $filter: newFields });
    }
    throw errHandler.createError(
      MySQLErrorType.COLLECTION_PROPERTY_ERROR,
      `In MySQLCollection, property 'field' type must be Filter`
    );
  }
  where(where: Where<T>): Collection<T> {
    // 存在字段
    if (typeOf.isNotEmptyObj(where)) {
      const newWhere: Where<T> = {};
      for (const key in where) {
        if (typeOf.isNotUndefined(where[<keyof Where<T>>key])) {
          // 普通类型处理
          newWhere[<keyof Where<T>>key] = where[<keyof Where<T>>key];
        }
      }
      return this.create({ $where: newWhere });
    }
    throw errHandler.createError(
      MySQLErrorType.COLLECTION_PROPERTY_ERROR,
      `In MySQLCollection, property 'where' type must be Where`
    );
  }
  orderBy(orderBy: OrderBy<T>): Collection<T> {
    if (typeOf.isNotEmptyObj(orderBy)) {
      const newOrderBy: OrderBy<T> = {};
      for (const key in orderBy) {
        // 排序方法
        const orders = ['asc', 'desc', ''];
        if (
          typeOf.isString(orderBy[<keyof OrderBy<T>>key]) &&
          orders.includes(<string>orderBy[<keyof OrderBy<T>>key])
        ) {
          newOrderBy[<keyof OrderBy<T>>key] = orderBy[<keyof OrderBy<T>>key];
        }
      }
      return this.create({ $orderby: newOrderBy });
    }
    throw errHandler.createError(
      MySQLErrorType.COLLECTION_PROPERTY_ERROR,
      `In MySQLCollection, property 'orderBy' type must be OrderBy`
    );
  }
  random(): Collection<T> {
    const orderby: OrderBy<T> = {
      'rand()': '',
    };
    return this.create({ $orderby: orderby });
  }

  limit(limit: number): Collection<T> {
    if (typeOf.isNumber(limit)) {
      return this.create({ $limit: limit });
    }
    throw errHandler.createError(
      MySQLErrorType.COLLECTION_PROPERTY_ERROR,
      `In MySQLCollection, property 'limit' must be a number`
    );
  }

  skip(skip: number): Collection<T> {
    if (typeOf.isNumber(skip)) {
      return this.create({ $skip: skip });
    }
    throw errHandler.createError(
      MySQLErrorType.COLLECTION_PROPERTY_ERROR,
      `In MySQLCollection, property 'skip' must be a number`
    );
  }
  async execSQL(sql: string): Promise<{
    results: any;
    fields: FieldInfo[] | undefined;
  }> {
    // 连接不存在
    if (!this.$conn) {
      this.$conn = await this.$database.connController.getConn();
    }
    const res = await this.$database.connController.execSQL(this.$conn, sql);
    // 非事务 释放连接
    if ((this.$config.mode = 'common')) {
      this.$database.connController.release(this.$conn);
      this.$conn = undefined;
    }
    return res;
  }
  async count(): Promise<QueryResult<number>> {
    const { $name, $where, $skip, $orderby, $limit } = this;

    if (typeOf.isNotBlankStr($name)) {
      try {
        // 筛选片段
        const whereClip = sqlClip.whereClip(<SQLWhere>$where);
        // 排序片段
        const orderByClip = sqlClip.orderByClip(<SQLOrderBy>$orderby);
        // 限制条数片段
        const limitClip = sqlClip.limitClip($limit, $skip);
        // 集合名
        const nameClip = sqlClip.nameClip($name);
        // sql
        const sql = `select count(*) as total from ${nameClip}${whereClip}${orderByClip}${limitClip}`;
        // 处理sql结果
        const { results } = await this.execSQL(sql);

        if (typeOf.isNotEmptyArr(results)) {
          return {
            result: results[0],
            status: true,
          };
        }
        return {
          result: 0,
          status: false,
        };
      } catch (error) {
        return {
          result: 0,
          status: false,
        };
      }
    }
    return {
      result: 0,
      status: false,
    };
  }
  async get(): Promise<QueryResult<RowData<T[]>>> {
    const { $name, $filter, $where, $skip, $orderby, $limit } = this;
    // name
    if (!typeOf.isNotBlankStr($name)) {
      throw errHandler.createError(
        MySQLErrorType.COLLECTION_GET_ERROR,
        'collection.name is an invalid value'
      );
    }
    try {
      let $fields: string[] = [];
      if (typeOf.isNotEmptyObj($filter)) {
        // 字段值
        const fields = await this.getFields($filter);
        $fields = fields.map((field) => field.COLUMN_NAME);
      }
      // 字段筛选
      const selectGen = new MySQLSelectGenerator({
        $name,
        $where: <SQLWhere>$where,
        $skip,
        $orderby: <SQLOrderBy>$orderby,
        $limit,
        $fields: <SQLFields>$fields,
      });
      // sql
      const sql = selectGen.generate();
      // 处理sql结果
      const { results, fields } = await this.execSQL(sql);
      // fields
      if (!fields) {
        throw errHandler.createError(
          MySQLErrorType.AGGREGATE_END_ERROR,
          "collection.fields don't exist"
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
      const { jsonParse, tinyIntToBool } = this.$config;
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
      throw errHandler.createError(MySQLErrorType.COLLECTION_GET_ERROR, err);
    }
  }
  async add(data: RowData<T>): Promise<QueryResult<OkPacket>> {
    const { $name } = this;
    // name
    if (!typeOf.isNotBlankStr($name)) {
      throw errHandler.createError(
        MySQLErrorType.COLLECTION_ADD_ERROR,
        'collection.name is an invalid value'
      );
    }
    // data
    if (!typeOf.isNotEmptyObj(data)) {
      throw errHandler.createError(
        MySQLErrorType.COLLECTION_ADD_ERROR,
        'data is an invalid value'
      );
    }
    try {
      // json处理
      const newData = <SQLRecord>stringfyJson(data);
      const insertGen = new MySQLInsertGenerator({
        $name,
        $record: newData,
      });

      // sql
      const sql = insertGen.generate();
      // 处理sql结果
      const { results } = await this.execSQL(sql);

      return {
        result: results,
        status: Boolean(results.affectedRows),
      };
    } catch (err: any) {
      throw errHandler.createError(MySQLErrorType.COLLECTION_ADD_ERROR, err);
    }
  }
  async remove(): Promise<QueryResult<OkPacket>> {
    const { $name, $where, $orderby, $limit } = this;
    // name
    if (!typeOf.isNotBlankStr($name)) {
      throw errHandler.createError(
        MySQLErrorType.COLLECTION_REMOVE_ERROR,
        'collection.name is an invalid value'
      );
    }
    try {
      const deleteGen = new MySQLDeleteGenerator({
        $name,
        $where,
        $orderby,
        $limit,
      });

      // sql
      const sql = deleteGen.generate();
      // 处理sql结果
      const { results } = await this.execSQL(sql);

      return {
        result: results,
        status: Boolean(results.affectedRows),
      };
    } catch (err: any) {
      throw errHandler.createError(MySQLErrorType.COLLECTION_REMOVE_ERROR, err);
    }
  }
  async update(data: InsertData<T>): Promise<QueryResult<OkPacket>> {
    const { $name, $where, $orderby, $limit } = this;
    // name
    if (!typeOf.isNotBlankStr($name)) {
      throw errHandler.createError(
        MySQLErrorType.COLLECTION_UPDATE_ERROR,
        'collection.name is an invalid value'
      );
    }
    // data
    if (!typeOf.isNotEmptyObj(data)) {
      throw errHandler.createError(
        MySQLErrorType.COLLECTION_UPDATE_ERROR,
        'data is an invalid value'
      );
    }
    try {
      // json处理
      const newData = <SQLRecord>stringfyJson(data);
      const updateGen = new MySQLUpdateGenerator({
        $name,
        $where,
        $limit,
        $orderby,
        $record: newData,
      });

      // sql
      const sql = updateGen.generate();
      // 处理sql结果
      const { results } = await this.execSQL(sql);

      return {
        result: results,
        status: Boolean(results.affectedRows),
      };
    } catch (err: any) {
      throw errHandler.createError(MySQLErrorType.COLLECTION_UPDATE_ERROR, err);
    }
  }
  async set(data: InsertData<T>): Promise<QueryResult<OkPacket>> {
    const { $name } = this;
    // name
    if (!typeOf.isNotBlankStr($name)) {
      throw errHandler.createError(
        MySQLErrorType.COLLECTION_SET_ERROR,
        'collection.name is an invalid value'
      );
    }
    // data
    if (!typeOf.isNotEmptyObj(data)) {
      throw errHandler.createError(
        MySQLErrorType.COLLECTION_SET_ERROR,
        'data is an invalid value'
      );
    }
    try {
      // 获取字段
      const fields = await this.getFields();
      // 处理过的数据
      const newData: InsertData<T> = {};
      fields.forEach((field) => {
        // 字段名
        const {
          COLUMN_NAME: fieldName,
          COLUMN_DEFAULT: defaultValue,
          COLUMN_TYPE: fieldType,
        } = field;
        newData[<keyof InsertData<T>>fieldName] = typeOf.isUndefined(
          data[<keyof InsertData<T>>fieldName]
        )
          ? <any>defaultValue
          : data[<keyof InsertData<T>>fieldName];
      });

      // 执行更新
      const res = await this.update(newData);

      return res;
    } catch (err: any) {
      throw errHandler.createError(MySQLErrorType.COLLECTION_SET_ERROR, err);
    }
  }
  async getFields(filter?: Filter<T>): Promise<RowDataPacket[]> {
    const { $name } = this;
    // name
    if (!typeOf.isNotBlankStr($name)) {
      throw errHandler.createError(
        MySQLErrorType.COLLECTION_GETFIELDS_ERROR,
        'collection.name is an invalid value'
      );
    }
    try {
      // 数据库名
      const { database } = this.$database.$config.connConfig;
      const filterColumnClip = sqlClip.fieldFilterClip(filter);
      // sql
      const sql = `select * from information_schema.columns where table_name = ${escape(
        $name
      )} and table_schema = ${escape(database)}${filterColumnClip}`;

      // 查询字段
      const { results } = await this.execSQL(sql);

      // 字段
      return results;
    } catch (err: any) {
      throw errHandler.createError(
        MySQLErrorType.COLLECTION_GETFIELDS_ERROR,
        err
      );
    }
  }
}

export { MySQLCollection };
