import { escape, escapeId } from 'mysql';
import { errHandler, MySQLErrorType } from '../../../model/errorHandler';
import { getAllKey, isKey } from '../../../utils/handler';
import typeOf from '../../../utils/typeOf';
import {
  AggregateAccumulationType,
  AggregateBooleanNegativeType,
  AggregateBooleanSimpleType,
  AggregateCalculationFunctionType,
  AggregateCalculationSimpleType,
  AggregateCommand,
  AggregateCommandLike,
  AggregateCompareFilterType,
  AggregateCompareSimpleType,
  AggregateConditionType,
  AggregateJsonType,
  AggregateMixParamType,
  AggregateStringType,
} from '../../aggregateCommand/interface';
import {
  Command,
  CommandCompareFilterType,
  CommandCompareSimpleType,
  CommandCompareType,
  CommandLike,
  CommandLogicNegativeType,
  CommandLogicSimpleType,
  CommandLogicType,
  CommandMixParamType,
} from '../../command/interface';
import {
  SQLAlias,
  SQLFields,
  SQLFilter,
  SQLGroupBy,
  SQLHaving,
  SQLJsonObject,
  SQLLike,
  SQLName,
  SQLNewFields,
  SQLOrderBy,
  SQLRecord,
  SQLRegex,
  SQLWhere,
} from '../sqlGenerator/interface';
import { SqlClip } from './interface';
import { sqlAggregateCommandClip } from './sqlAggregateCommandClip';
/**
 * @description sql片段
 */
class MySQLClip implements SqlClip {
  aggrValueClip(value: AggregateMixParamType<object>): string {
    // AggregateCommand 类型
    if (typeOf.objStructMatch<AggregateCommand>(value, ['$value', '$type'])) {
      return this.aggrControllerClip(value);
    }
    // 字符键表达式
    if (isKey(value)) {
      const key = this.keyClip(value);
      return key;
    }
    // number、string、boolean 类型
    if (
      typeOf.isNumber(value) ||
      typeOf.isString(value) ||
      typeOf.isBooloon(value)
    ) {
      return escape(value);
    }
    // null 类型
    if (typeOf.isNull(value)) {
      return 'null';
    }
    // object、 array 类型
    if (typeOf.isArray(value) || typeOf.isObject(value)) {
      return `cast(${escape(JSON.stringify(value))} as json)`;
    }
    return '';
  }
  aggrJsonValueClip(value: AggregateMixParamType<object>): string {
    // AggregateCommand 类型
    if (
      typeOf.objStructMatch<AggregateCommandLike>(value, ['$value', '$type'])
    ) {
      return this.aggrControllerClip(value);
    }
    // 字符键表达式
    if (isKey(value)) {
      const key = this.keyClip(value);
      return key;
    }
    // number、string、boolean 类型
    if (
      typeOf.isNumber(value) ||
      typeOf.isString(value) ||
      typeOf.isBooloon(value)
    ) {
      return escape(value);
    }
    // null 类型
    if (typeOf.isNull(value)) {
      return 'null';
    }
    //  array 类型
    if (typeOf.isArray(value)) {
      return `${AggregateJsonType.ARRAY}(${value
        .map((item) => {
          return this.aggrValueClip(item);
        })
        .join(', ')})`;
    }
    // object 类型
    if (typeOf.isObject(value)) {
      const obj = <SQLJsonObject>value;
      const keys = <(keyof SQLJsonObject)[]>Object.keys(<SQLJsonObject>obj);
      return `${AggregateJsonType.OBJECT}(${keys
        .map((key) => {
          const value = obj[key];
          return `${escape(key)}, ${this.aggrValueClip(value)}`;
        })
        .join(',')})`;
    }
    return '';
  }
  aggrJsonClip(aggregate: AggregateCommandLike): string {
    // 类型 值
    const { $type, $value } = aggregate;
    if (!$type) {
      // 报错：ARGUMENTS_TYPE_ERROR
      throw errHandler.createError(
        MySQLErrorType.ARGUMENTS_TYPE_ERROR,
        `aggregateCommand.type don't exist`
      );
    }
    // 原始参数
    const rawArgs = $value;
    // 参数过少
    if (!typeOf.isNotEmptyArr(rawArgs)) {
      // 报错：ARGUMENTS_LENGTH_ERROR
      throw errHandler.createError(
        MySQLErrorType.ARGUMENTS_LENGTH_ERROR,
        `Expected 1 arguments, but got 0`
      );
    }
    // 对象
    if ($type === AggregateJsonType.OBJECT) {
      return sqlAggregateCommandClip.json_object(aggregate);
    }
    // 数组
    if ($type === AggregateJsonType.ARRAY) {
      return sqlAggregateCommandClip.json_array(aggregate);
    }
    // 数组追加
    if ($type === AggregateJsonType.ARRAY_APPEND) {
      return sqlAggregateCommandClip.json_array_append(aggregate);
    }
    if (
      $type === AggregateJsonType.CONTAINS ||
      $type === AggregateJsonType.CONTAINS_PATH
    ) {
      // 参数过少
      if (rawArgs.length < 1) {
        // 报错：ARGUMENTS_LENGTH_ERROR
        throw errHandler.createError(
          MySQLErrorType.ARGUMENTS_LENGTH_ERROR,
          `Expected 1 arguments, but got ${rawArgs.length}`
        );
      }
      return `${rawArgs[0]}`;
    }

    return '';
  }
  aggrControllerClip(aggregate: AggregateCommandLike): string {
    // 类型 模式
    const { $type, $mode } = aggregate;
    if (
      typeOf.objStructMatch(aggregate, ['$value', '$type']) &&
      $mode === 'aggregate'
    ) {
      // 布尔操作符
      if ($type === AggregateBooleanSimpleType.AND) {
        return sqlAggregateCommandClip.and(aggregate);
      }
      if ($type === AggregateBooleanSimpleType.OR) {
        return sqlAggregateCommandClip.or(aggregate);
      }
      if ($type === AggregateBooleanNegativeType.NOT) {
        return sqlAggregateCommandClip.not(aggregate);
      }
      if ($type === AggregateBooleanNegativeType.NAND) {
        return sqlAggregateCommandClip.nand(aggregate);
      }
      if ($type === AggregateBooleanNegativeType.NOR) {
        return sqlAggregateCommandClip.nor(aggregate);
      }
      // 比较操作符
      if ($type === AggregateCompareSimpleType.CMP) {
        return sqlAggregateCommandClip.cmp(aggregate);
      }
      if ($type === AggregateCompareSimpleType.EQ) {
        return sqlAggregateCommandClip.eq(aggregate);
      }
      if ($type === AggregateCompareSimpleType.NEQ) {
        return sqlAggregateCommandClip.neq(aggregate);
      }
      if ($type === AggregateCompareSimpleType.LT) {
        return sqlAggregateCommandClip.lt(aggregate);
      }
      if ($type === AggregateCompareSimpleType.LTE) {
        return sqlAggregateCommandClip.lte(aggregate);
      }
      if ($type === AggregateCompareSimpleType.GT) {
        return sqlAggregateCommandClip.gt(aggregate);
      }
      if ($type === AggregateCompareSimpleType.GTE) {
        return sqlAggregateCommandClip.gte(aggregate);
      }
      if ($type === AggregateCompareFilterType.IN) {
        return sqlAggregateCommandClip.in(aggregate);
      }
      if ($type === AggregateCompareFilterType.NIN) {
        return sqlAggregateCommandClip.nin(aggregate);
      }
      // 计算操作符
      if ($type === AggregateCalculationFunctionType.ABS) {
        return sqlAggregateCommandClip.abs(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.CEIL) {
        return sqlAggregateCommandClip.ceil(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.FLOOR) {
        return sqlAggregateCommandClip.floor(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.ROUND) {
        return sqlAggregateCommandClip.round(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.LN) {
        return sqlAggregateCommandClip.ln(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.LOG10) {
        return sqlAggregateCommandClip.log10(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.SIN) {
        return sqlAggregateCommandClip.sin(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.ASIN) {
        return sqlAggregateCommandClip.asin(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.COS) {
        return sqlAggregateCommandClip.cos(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.ACOS) {
        return sqlAggregateCommandClip.acos(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.TAN) {
        return sqlAggregateCommandClip.tan(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.ATAN) {
        return sqlAggregateCommandClip.atan(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.COT) {
        return sqlAggregateCommandClip.cot(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.SQRT) {
        return sqlAggregateCommandClip.sqrt(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.EXP) {
        return sqlAggregateCommandClip.exp(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.SIGN) {
        return sqlAggregateCommandClip.sign(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.LOG) {
        return sqlAggregateCommandClip.log(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.MOD) {
        return sqlAggregateCommandClip.mod(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.POW) {
        return sqlAggregateCommandClip.pow(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.GREATEST) {
        return sqlAggregateCommandClip.greatest(aggregate);
      }
      if ($type === AggregateCalculationFunctionType.LEAST) {
        return sqlAggregateCommandClip.least(aggregate);
      }
      if ($type === AggregateCalculationSimpleType.ADD) {
        return sqlAggregateCommandClip.add(aggregate);
      }
      if ($type === AggregateCalculationSimpleType.SUBTRACT) {
        return sqlAggregateCommandClip.subtract(aggregate);
      }
      if ($type === AggregateCalculationSimpleType.MULTIPLY) {
        return sqlAggregateCommandClip.multiply(aggregate);
      }
      if ($type === AggregateCalculationSimpleType.DIVIDE) {
        return sqlAggregateCommandClip.divide(aggregate);
      }
      // 字符串操作
      if ($type === AggregateStringType.LENGTH) {
        return sqlAggregateCommandClip.length(aggregate);
      }
      if ($type === AggregateStringType.REVERSE) {
        return sqlAggregateCommandClip.reverse(aggregate);
      }
      if ($type === AggregateStringType.TRIM) {
        return sqlAggregateCommandClip.trim(aggregate);
      }
      if ($type === AggregateStringType.LOWER) {
        return sqlAggregateCommandClip.lower(aggregate);
      }
      if ($type === AggregateStringType.UPPER) {
        return sqlAggregateCommandClip.upper(aggregate);
      }
      if ($type === AggregateStringType.LEFT) {
        return sqlAggregateCommandClip.left(aggregate);
      }
      if ($type === AggregateStringType.RIGHT) {
        return sqlAggregateCommandClip.right(aggregate);
      }
      if ($type === AggregateStringType.REPLACE) {
        return sqlAggregateCommandClip.replace(aggregate);
      }
      if ($type === AggregateStringType.SUBSTRING) {
        return sqlAggregateCommandClip.substring(aggregate);
      }
      if ($type === AggregateStringType.INSERT) {
        return sqlAggregateCommandClip.insert(aggregate);
      }
      if ($type === AggregateStringType.CONCAT) {
        return sqlAggregateCommandClip.concat(aggregate);
      }
      // 累加操作符
      if ($type === AggregateAccumulationType.AVG) {
        return sqlAggregateCommandClip.avg(aggregate);
      }
      if ($type === AggregateAccumulationType.MAX) {
        return sqlAggregateCommandClip.max(aggregate);
      }
      if ($type === AggregateAccumulationType.MIN) {
        return sqlAggregateCommandClip.min(aggregate);
      }
      if ($type === AggregateAccumulationType.SUM) {
        return sqlAggregateCommandClip.sum(aggregate);
      }
      if ($type === AggregateAccumulationType.COUNT) {
        return sqlAggregateCommandClip.count(aggregate);
      }
      // 条件操作符
      if ($type === AggregateConditionType.COND) {
        return sqlAggregateCommandClip.cond(aggregate);
      }
      if ($type === AggregateConditionType.IFNULL) {
        return sqlAggregateCommandClip.ifnull(aggregate);
      }
      // json 操作
      if ($type === AggregateJsonType.OBJECT) {
        return sqlAggregateCommandClip.json_object(aggregate);
      }
      if ($type === AggregateJsonType.ARRAY) {
        return sqlAggregateCommandClip.json_array(aggregate);
      }
      if ($type === AggregateJsonType.ARRAY_APPEND) {
        return sqlAggregateCommandClip.json_array_append(aggregate);
      }
    }
    return '';
  }
  cmdValueClip(key: string, value: CommandMixParamType): string | null {
    // Command 类型
    if (typeOf.objStructMatch(value, ['$value', '$type'])) {
      return this.cmdControllerClip(key, <Command>value);
    }
    // 字符键表达式
    if (isKey(value)) {
      const key = this.keyClip(value);
      return key;
    }
    // number、string、boolean 类型
    if (
      typeOf.isNumber(value) ||
      typeOf.isString(value) ||
      typeOf.isBooloon(value)
    ) {
      return `${escape(value)}`;
    }
    // null 类型
    if (typeOf.isNull(value)) {
      return 'null';
    }
    // object、array 类型
    if (typeOf.isObject(value) || typeOf.isArray(value)) {
      return `cast(${escape(JSON.stringify(value))} as json)`;
    }
    return '';
  }
  cmdCompareClip(key: string, command: CommandLike): string {
    // 类型 值
    const { $type, $value } = command;
    // 数组
    if (typeOf.isNotEmptyArr($value)) {
      // 片段
      const clip: (string | null)[] = [];
      // 原始参数
      const rawArgs = <any[]>$value;
      // 预处理参数
      rawArgs.forEach((rawArg) => {
        const arg = this.cmdValueClip(key, rawArg);
        clip.push(arg);
      });
      // 字段
      const fieldKey = this.keyClip(key);
      // 简单比较操作符
      if (clip[0] === 'null' && $type === CommandCompareSimpleType.EQ) {
        return `${fieldKey} is ${clip[0]}`;
      }
      if (clip[0] === 'null' && $type === CommandCompareSimpleType.NEQ) {
        return `${fieldKey} is not ${clip[0]}`;
      }
      if (
        $type === CommandCompareSimpleType.EQ ||
        $type === CommandCompareSimpleType.NEQ ||
        $type === CommandCompareSimpleType.LT ||
        $type === CommandCompareSimpleType.LTE ||
        $type === CommandCompareSimpleType.GT ||
        $type === CommandCompareSimpleType.GTE
      ) {
        return `${fieldKey} ${$type} ${clip[0]}`;
      }
      // 筛选比较操作符
      if (AggregateCompareFilterType.IN || AggregateCompareFilterType.NIN) {
        return `${fieldKey} ${$type} (${clip.join(', ')})`;
      }
    }
    return '';
  }
  cmdLogicClip(key: string, command: CommandLike): string {
    // 类型 值 模式
    const { $type, $value } = command;
    // 片段
    const clip: (string | null)[] = [];
    // 非空数组
    if (typeOf.isNotEmptyArr($value)) {
      // 原始参数
      const rawArgs = $value;
      // 预处理参数
      rawArgs.forEach((rawArg) => {
        const arg = this.cmdValueClip(key, rawArg);
        clip.push(arg);
      });
      // 简单逻辑操作符
      if (
        $type === CommandLogicSimpleType.AND ||
        $type === CommandLogicSimpleType.OR
      ) {
        return clip.join(` ${$type} `);
      }
      // 否定逻辑操作
      if ($type === CommandLogicNegativeType.NOT) {
        return `not (${clip[0]})`;
      }
      if ($type === CommandLogicNegativeType.NOR) {
        return `not (${clip.join(` or `)})`;
      }
      if ($type === CommandLogicNegativeType.NAND) {
        return `not (${clip.join(` and `)})`;
      }
    }
    return '';
  }
  cmdControllerClip(
    key: string,
    command: CommandLike | AggregateCommandLike
  ): string {
    // 类型 值 模式
    const { $type } = command;
    if (typeOf.objStructMatch(command, ['$value', '$type'])) {
      // 逻辑操作符
      const logic = [
        ...Object.values(CommandLogicSimpleType),
        ...Object.values(CommandLogicNegativeType),
      ];
      if (logic.includes(<CommandLogicType>$type)) {
        return `${this.cmdLogicClip(key, <CommandLike>command)}`;
      }
      // 比较操作符
      const compare = [
        ...Object.values(CommandCompareSimpleType),
        ...Object.values(CommandCompareFilterType),
      ];
      if (compare.includes(<CommandCompareType>$type)) {
        return `${this.cmdCompareClip(key, <CommandLike>command)}`;
      }
    }
    return '';
  }
  nameClip(name?: SQLName | SQLAlias): string {
    if (typeOf.isNotBlankStr(name)) {
      // string
      return ` ${escapeId(<string>name)} `;
    }
    if (typeOf.isNotEmptyObj(name)) {
      // keys
      const nameKeys = Object.keys(name);
      return nameKeys
        .map((key) => ` ${escapeId(key)} as ${escapeId(name[key])} `)
        .join(', ');
    }
    return '';
  }
  fieldsClip(
    fields?: SQLFields,
    newfields?: SQLNewFields,
    group?: SQLGroupBy
  ): string {
    // 字段片段
    const fieldsClip: string[] = [];
    if (group) {
      // 分组键
      const groupKeys = group.map((field) => this.keyClip(field));
      // 旧字段
      if (typeOf.isNotEmptyArr(fields)) {
        // 新字段
        if (typeOf.isNotEmptyObj(newfields)) {
          // 去除重复
          fields
            .filter(
              (field) =>
                !typeOf.isNotUndefined(newfields[field]) &&
                typeOf.isNotUndefined(field)
            )
            .forEach((field) => {
              const fieldKey = this.keyClip(field);
              if (groupKeys.includes(fieldKey)) {
                fieldsClip.push(fieldKey);
              }
            });
        } else {
          fields
            .filter(
              (field) =>
                typeOf.isNotUndefined(field) && groupKeys.includes(field)
            )
            .forEach((field) => {
              const fieldKey = this.keyClip(field);
              if (groupKeys.includes(fieldKey)) {
                fieldsClip.push(fieldKey);
              }
            });
        }
      }
      // 新字段
      if (typeOf.isNotEmptyObj(newfields)) {
        // 新字段片段
        const newfieldsClip = this.newfieldsClip(newfields);
        fieldsClip.push(newfieldsClip);
      }
    } else {
      // 旧字段
      if (typeOf.isNotEmptyArr(fields)) {
        if (typeOf.isNotEmptyObj(newfields)) {
          // 去除重复
          fields
            .filter(
              (field) =>
                !typeOf.isNotUndefined(newfields[field]) &&
                typeOf.isNotUndefined(field)
            )
            .forEach((field) => fieldsClip.push(this.keyClip(field)));
        } else {
          fields
            .filter((field) => typeOf.isNotUndefined(field))
            .forEach((field) => fieldsClip.push(this.keyClip(field)));
        }
      }
      // 新字段
      if (typeOf.isNotEmptyObj(newfields)) {
        const newfieldsClip = this.newfieldsClip(newfields);
        fieldsClip.push(newfieldsClip);
      }
    }

    return typeOf.isNotEmptyArr(fieldsClip)
      ? ` ${fieldsClip.join(', ')} `
      : ' * ';
  }
  newfieldsClip(newfields?: SQLNewFields): string {
    // 字段片段
    let newfieldsClip: string[] = [];
    if (typeOf.isNotEmptyObj(newfields)) {
      // 字段数组
      const fieldKeys = Object.keys(newfields);

      fieldKeys.forEach((fieldKey) => {
        const { $mode } = <AggregateCommandLike>newfields[fieldKey];
        // 聚合命令操作
        if (
          typeOf.objStructMatch(newfields[fieldKey], ['$value', '$type']) &&
          $mode === 'aggregate'
        ) {
          const aggregate = <AggregateCommandLike>newfields[fieldKey];
          const asKey = this.keyClip(fieldKey);
          newfieldsClip.push(
            `${this.aggrControllerClip(aggregate)} as ${asKey}`
          );
          return;
        }
        // 聚合键
        if (
          typeOf.isNotBlankStr(newfields[fieldKey]) &&
          isKey(newfields[fieldKey])
        ) {
          const oldAsKey = this.keyClip(<string>newfields[fieldKey]);
          const asKey = this.keyClip(fieldKey);
          if (asKey !== oldAsKey) {
            newfieldsClip.push(`${oldAsKey} as ${asKey}`);
            return;
          }
          newfieldsClip.push(`${oldAsKey}`);
          return;
        }
        // number, string, boolean, null
        if (
          typeOf.isNumber(newfields[fieldKey]) ||
          typeOf.isString(newfields[fieldKey]) ||
          typeOf.isBooloon(newfields[fieldKey]) ||
          typeOf.isNull(newfields[fieldKey])
        ) {
          const asKey = this.keyClip(fieldKey);
          const oldAsKey = escape(newfields[fieldKey]);
          if (asKey !== oldAsKey) {
            newfieldsClip.push(`${oldAsKey} as ${asKey}`);
            return;
          }
          newfieldsClip.push(`${oldAsKey}`);
          return;
        }
        // 报错：ARGUMENTS_TYPE_ERROR
        throw errHandler.createError(
          MySQLErrorType.ARGUMENTS_TYPE_ERROR,
          'In newfieldsClip, a argument type must be number, string, boolean, null, AggregateCommand, or AggregateKey'
        );
      });
    }
    return newfieldsClip.join(', ');
  }
  fieldFilterClip(filter?: SQLFilter): string {
    // 过滤行
    const filterColumnClip: string[] = [];

    if (typeOf.isNotEmptyObj(filter)) {
      // 前缀
      filterColumnClip.push(' and ');
      // 字段数组
      const filterKeys = Object.keys(filter);
      filterColumnClip.push(
        filterKeys
          .map((key) =>
            filter[key]
              ? `column_name = ${escape(key)}`
              : `column_name != ${escape(key)}`
          )
          .join(' and ')
      );
    }
    return filterColumnClip.join('');
  }
  likeClip(key: string, value: SQLLike): string {
    // 字段
    const fieldKey = this.keyClip(key);
    // flags
    const options = value.$options.split('');
    if (options.includes('i')) {
      return `${fieldKey} like ${escape(value.$like)}`;
    }
    return `binary ${fieldKey} like ${escape(value.$like)}`;
  }
  regexClip(key: string, value: SQLRegex | RegExp): string {
    // 正则
    let regex: Partial<SQLRegex | null> = null;
    // 正则表达式
    if (typeOf.isRegx(value)) {
      const { flags, source } = <RegExp>value;
      regex = { $regex: source, $options: flags };
    }
    // SQLRegex 正则表达式
    if (typeOf.objStructMatch(value, ['$regex', '$options'])) {
      regex = <SQLRegex>value;
    }
    if (regex) {
      // 字段
      const fieldKey = this.keyClip(key);
      if (typeOf.objStructMatch(<SQLRegex>regex, ['$regex', '$options'])) {
        // SQLRegex
        const { $options, $regex } = <SQLRegex>regex;
        // 大小写
        if ($options.includes('i')) {
          // 单行
          if (!$options.includes('m')) {
            return `${fieldKey} regexp "^${escape($regex).replace(
              /^'(.*)'$/,
              '$1'
            )}[^(\\n)]*$"`;
          }
          return `${fieldKey} regexp ${escape($regex)}`;
        }
        // 多行
        if ($options.includes('m')) {
          return `binary ${fieldKey} regexp ${escape($regex)}`;
        }
        return `binary ${fieldKey} regexp "^${escape($regex).replace(
          /^'(.*)'$/,
          '$1'
        )}[^(\n)]*$"`;
      }
    }
    return '';
  }
  keyClip(key: string): string {
    // 是否是键
    if (isKey(key)) {
      // 获取子键
      const keys = getAllKey(key);
      if (keys.length !== 1 || typeOf.isNotEmptyArr(keys[0])) {
        // 获取字段
        const [field, ...subFields] = keys;
        const subKeys = subFields.map((subField) => {
          if (typeOf.isNotEmptyArr(subField)) {
            const [arrayField, ...indexs] = subField;
            const indexField = indexs.map((index) => `[${index}]`).join('');
            return `${arrayField}${indexField}`;
          }
          return subField;
        });
        if (typeOf.isNotEmptyArr(field)) {
          const [arrayField, ...indexs] = field;
          const indexField = indexs.map((index) => `[${index}]`).join('');
          return `${escapeId(arrayField)}->${escape(
            `$${[indexField, ...subKeys].join('.')}`
          )}`;
        }
        return `${escapeId(field)}->${escape(`$.${subKeys.join('.')}`)}`;
      }
      return escapeId(keys[0]);
    }
    return escapeId(key);
  }
  whereClip(where?: SQLWhere): string {
    // where
    const whereClip: string[] = [];
    if (typeOf.isNotEmptyObj(where)) {
      // 前缀
      whereClip.push(' where ');
      // 字段数组
      const fieldKeys = Object.keys(where);
      whereClip.push(
        fieldKeys
          .map((key) => {
            // SQLLike 模糊查询
            if (typeOf.objStructMatch(where[key], ['$like', '$options'])) {
              return this.likeClip(key, <SQLLike>where[key]);
            }
            // 标准正则、SQLRegex 正则表达式
            if (
              typeOf.objStructMatch(where[key], ['$regex', '$options']) ||
              typeOf.isRegx(where[key])
            ) {
              return this.regexClip(key, <SQLRegex>where[key]);
            }
            // Command 命令
            if (typeOf.objStructMatch(where[key], ['$value', '$type'])) {
              // 命令操作
              const newWhere = <CommandLike>where[key];
              const { $mode } = newWhere;
              if ($mode === 'command') {
                return this.cmdControllerClip(key, newWhere);
              }
            }
            // 字段
            const fieldKey = this.keyClip(key);
            // 对象、数组
            if (typeOf.isObject(where[key]) || typeOf.isArray(where[key])) {
              return `${fieldKey} = cast(${escape(
                JSON.stringify(where[key])
              )} as json)`;
            }
            // null
            if (typeOf.isNull(where[key])) {
              return `binary ${fieldKey} is null`;
            }
            // number, string, boolean
            if (
              typeOf.isNumber(where[key]) ||
              typeOf.isString(where[key]) ||
              typeOf.isBooloon(where[key])
            ) {
              return `binary ${fieldKey} = ${escape(where[key])}`;
            }

            // 报错：ARGUMENTS_TYPE_ERROR
            throw errHandler.createError(
              MySQLErrorType.ARGUMENTS_TYPE_ERROR,
              'In whereClip, a argument type must be number, string, boolean, null, RegExp, Command, SQLLike or SQLRegex'
            );
          })
          .join(' and ')
      );
    }
    return whereClip.join('');
  }
  groupByClip(groupBy?: SQLGroupBy): string {
    // 分组
    const groupByClip: string[] = [];
    if (typeOf.isNotEmptyArr(groupBy)) {
      // 前缀
      groupByClip.push(' group by ');
      // 排序数组
      groupByClip.push(
        groupBy.map((groupByKey) => this.keyClip(groupByKey)).join(', ')
      );
    }
    return groupByClip.join('');
  }
  havingClip(where?: SQLHaving): string {
    // having
    const havingClip: string[] = [];
    if (typeOf.isNotEmptyObj(where)) {
      // 前缀
      havingClip.push(' having ');
      // 字段数组
      const fieldKeys = Object.keys(where);
      havingClip.push(
        fieldKeys
          .map((key) => {
            // 字段
            const fieldKey = this.keyClip(key);
            // SQLLike 模糊查询
            if (typeOf.objStructMatch(where[key], ['$like', '$options'])) {
              const newWhere = <SQLLike>where[key];
              const options = newWhere.$options.split('');
              if (options.includes('i')) {
                return `${fieldKey} like ${escape(newWhere.$like)}`;
              }
              return `binary ${fieldKey} like ${escape(newWhere.$like)}`;
            }
            // SQLRegex 正则表达式
            if (typeOf.objStructMatch(where[key], ['$regex', '$options'])) {
              const newWhere = <SQLRegex>where[key];
              const options = newWhere.$options.split('');
              if (options.includes('i')) {
                return `${fieldKey} regexp ${escape(newWhere.$regex)}`;
              }
              return `binary ${fieldKey} regexp ${escape(newWhere.$regex)}`;
            }
            // Command 命令
            if (typeOf.objStructMatch(where[key], ['$value', '$type'])) {
              // 命令操作
              const newWhere = <CommandLike>where[key];
              const { $mode } = newWhere;
              if ($mode === 'command') {
                return this.cmdControllerClip(key, newWhere);
              }
            }
            // null
            if (typeOf.isNull(where[key])) {
              return `binary ${fieldKey} is null`;
            }
            // number, string, boolean
            if (
              typeOf.isNumber(where[key]) ||
              typeOf.isString(where[key]) ||
              typeOf.isBooloon(where[key])
            ) {
              return `binary ${fieldKey} = ${escape(where[key])}`;
            }
            // 报错：ARGUMENTS_TYPE_ERROR
            throw errHandler.createError(
              MySQLErrorType.ARGUMENTS_TYPE_ERROR,
              'In havingClip, a argument type must be number, string, boolean, null, RegExp, Command, SQLLike or SQLRegex'
            );
          })
          .join(' and ')
      );
    }
    return havingClip.join('');
  }
  orderByClip(orderBy?: SQLOrderBy): string {
    // 排序
    const orderByClip: string[] = [];
    if (typeOf.isNotEmptyObj(orderBy)) {
      // 前缀
      orderByClip.push(' order by ');
      // 排序数组
      const orderByKeys = Object.keys(orderBy);
      orderByClip.push(
        orderByKeys
          .map((key) => {
            // 随机排序
            if (key.toLowerCase() === 'rand()') {
              return `rand()`;
            }
            // 字段
            const fieldKey = this.keyClip(key);
            const orders = ['asc', 'desc', ''];
            if (
              typeOf.isString(orderBy[key]) &&
              orders.includes(<string>orderBy[key])
            ) {
              return `${fieldKey} ${orderBy[key]}`;
            }

            // 报错：ARGUMENTS_TYPE_ERROR
            throw errHandler.createError(
              MySQLErrorType.ARGUMENTS_TYPE_ERROR,
              `In OrderBy, 'order' value type must be 'asc', 'desc' or ''`
            );
          })
          .join(', ')
      );
    }
    return orderByClip.join('');
  }
  limitClip(limit?: number, skip?: number): string {
    // 限制记录条数
    const limitClip: string[] = [];
    if (typeOf.isNumber(limit)) {
      // 前缀
      limitClip.push(' limit ');
      if (typeOf.isNumber(skip)) {
        limitClip.push(`${skip}, ${limit}`);
      } else {
        limitClip.push(`${limit}`);
      }
    }
    if (typeOf.isNumber(skip) && !typeOf.isNumber(limit)) {
      // 报错：UNEXPECTED_TOKEN
      throw errHandler.createError(
        MySQLErrorType.UNEXPECTED_TOKEN,
        `'skip' must be used with 'limit'`
      );
    }
    return limitClip.join('');
  }
  recordClip(record?: SQLRecord) {
    // 限制记录条数
    const recordClip: string[] = [];
    if (typeOf.isNotEmptyObj(record)) {
      // 前缀
      recordClip.push(' set ');
      const recordKeys = Object.keys(record);
      recordClip.push(
        recordKeys
          .map((key) => {
            // 字段
            const fieldKey = this.keyClip(key);
            if (typeOf.isNotUndefined(record[key])) {
              if (typeOf.isObject(record[key]) || typeOf.isArray(record[key])) {
                return `${fieldKey} = ${escape(
                  JSON.stringify((<SQLRecord>record)[key])
                )}`;
              }
              return `${fieldKey} = ${escape(record[key])}`;
            }
          })
          .join(', ')
      );
    }
    return recordClip.join('');
  }
}

const sqlClip = new MySQLClip();

export { MySQLClip, sqlClip };
