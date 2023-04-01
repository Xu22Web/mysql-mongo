import { escape, escapeId } from 'mysql';
import { sqlClip } from '../';
import { errHandler, MySQLErrorType } from '../../../../model/errorHandler';
import typeOf from '../../../../utils/typeOf';
import {
  getJsonKeyPath,
  isAggregateCommand,
  isKey,
} from '../../../../utils/utils';
import {
  AggregateAccumulationType,
  AggregateBooleanNegativeType,
  AggregateBooleanSimpleType,
  AggregateCalculationFunctionType,
  AggregateCalculationSimpleType,
  AggregateCommandLike,
  AggregateCompareFilterType,
  AggregateCompareSimpleType,
  AggregateConditionType,
  AggregateJsonType,
  AggregateKey,
  AggregateMatchType,
  AggregateMixParamType,
  AggregateProps,
  AggregateStringType,
} from '../../../aggregateCommand/interface';
import { SQLJsonObject, SQLLike, SQLRegex } from '../../sqlGenerator/interface';
import { SQLAggregateCommandClip } from './interface';

/**
 * @description aggregate clip 片段
 */
class MySQLAggregateCommandClip implements SQLAggregateCommandClip {
  aggrControllerClip(aggregate: AggregateCommandLike): string {
    // 类型
    const { $type } = aggregate;

    // 非AggregateCommand 类型
    if (!isAggregateCommand(aggregate)) {
      throw errHandler.createError(
        MySQLErrorType.ARGUMENTS_TYPE_ERROR,
        `aggregate must be a 'AggregateCommandLike'`
      );
    }

    // 布尔操作符
    if ($type === AggregateBooleanSimpleType.AND) {
      return this.and(aggregate);
    }
    if ($type === AggregateBooleanSimpleType.OR) {
      return this.or(aggregate);
    }
    if ($type === AggregateBooleanNegativeType.NOT) {
      return this.not(aggregate);
    }
    if ($type === AggregateBooleanNegativeType.NAND) {
      return this.nand(aggregate);
    }
    if ($type === AggregateBooleanNegativeType.NOR) {
      return this.nor(aggregate);
    }
    // 比较操作符
    if ($type === AggregateCompareSimpleType.CMP) {
      return this.cmp(aggregate);
    }
    if ($type === AggregateCompareSimpleType.EQ) {
      return this.eq(aggregate);
    }
    if ($type === AggregateCompareSimpleType.NEQ) {
      return this.neq(aggregate);
    }
    if ($type === AggregateCompareSimpleType.LT) {
      return this.lt(aggregate);
    }
    if ($type === AggregateCompareSimpleType.LTE) {
      return this.lte(aggregate);
    }
    if ($type === AggregateCompareSimpleType.GT) {
      return this.gt(aggregate);
    }
    if ($type === AggregateCompareSimpleType.GTE) {
      return this.gte(aggregate);
    }
    if ($type === AggregateCompareFilterType.IN) {
      return this.in(aggregate);
    }
    if ($type === AggregateCompareFilterType.NIN) {
      return this.nin(aggregate);
    }
    // 计算操作符
    if ($type === AggregateCalculationFunctionType.ABS) {
      return this.abs(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.CEIL) {
      return this.ceil(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.FLOOR) {
      return this.floor(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.ROUND) {
      return this.round(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.LN) {
      return this.ln(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.LOG10) {
      return this.log10(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.SIN) {
      return this.sin(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.ASIN) {
      return this.asin(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.COS) {
      return this.cos(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.ACOS) {
      return this.acos(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.TAN) {
      return this.tan(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.ATAN) {
      return this.atan(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.COT) {
      return this.cot(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.SQRT) {
      return this.sqrt(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.EXP) {
      return this.exp(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.SIGN) {
      return this.sign(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.LOG) {
      return this.log(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.MOD) {
      return this.mod(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.POW) {
      return this.pow(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.GREATEST) {
      return this.greatest(aggregate);
    }
    if ($type === AggregateCalculationFunctionType.LEAST) {
      return this.least(aggregate);
    }
    if ($type === AggregateCalculationSimpleType.ADD) {
      return this.add(aggregate);
    }
    if ($type === AggregateCalculationSimpleType.SUBTRACT) {
      return this.subtract(aggregate);
    }
    if ($type === AggregateCalculationSimpleType.MULTIPLY) {
      return this.multiply(aggregate);
    }
    if ($type === AggregateCalculationSimpleType.DIVIDE) {
      return this.divide(aggregate);
    }
    // 字符串操作
    if ($type === AggregateStringType.LENGTH) {
      return this.length(aggregate);
    }
    if ($type === AggregateStringType.REVERSE) {
      return this.reverse(aggregate);
    }
    if ($type === AggregateStringType.TRIM) {
      return this.trim(aggregate);
    }
    if ($type === AggregateStringType.LOWER) {
      return this.lower(aggregate);
    }
    if ($type === AggregateStringType.UPPER) {
      return this.upper(aggregate);
    }
    if ($type === AggregateStringType.LEFT) {
      return this.left(aggregate);
    }
    if ($type === AggregateStringType.RIGHT) {
      return this.right(aggregate);
    }
    if ($type === AggregateStringType.REPLACE) {
      return this.replace(aggregate);
    }
    if ($type === AggregateStringType.SUBSTRING) {
      return this.substring(aggregate);
    }
    if ($type === AggregateStringType.INSERT) {
      return this.insert(aggregate);
    }
    if ($type === AggregateStringType.CONCAT) {
      return this.concat(aggregate);
    }
    // 累加操作符
    if ($type === AggregateAccumulationType.AVG) {
      return this.avg(aggregate);
    }
    if ($type === AggregateAccumulationType.MAX) {
      return this.max(aggregate);
    }
    if ($type === AggregateAccumulationType.MIN) {
      return this.min(aggregate);
    }
    if ($type === AggregateAccumulationType.SUM) {
      return this.sum(aggregate);
    }
    if ($type === AggregateAccumulationType.COUNT) {
      return this.count(aggregate);
    }
    // 条件操作符
    if ($type === AggregateConditionType.COND) {
      return this.cond(aggregate);
    }
    if ($type === AggregateConditionType.IFNULL) {
      return this.ifnull(aggregate);
    }
    // json 操作
    if ($type === AggregateJsonType.OBJECT) {
      return this.json_object(aggregate);
    }
    if ($type === AggregateJsonType.ARRAY) {
      return this.json_array(aggregate);
    }
    if ($type === AggregateJsonType.ARRAY_APPEND) {
      return this.json_array_append(aggregate);
    }
    if ($type === AggregateJsonType.ARRAY_INSERT) {
      return this.json_array_insert(aggregate);
    }
    if ($type === AggregateMatchType.REGEXP) {
      return this.regexp(aggregate);
    }
    if ($type === AggregateMatchType.LIKE) {
      return this.like(aggregate);
    }
    throw errHandler.createError(
      MySQLErrorType.ARGUMENTS_TYPE_ERROR,
      `aggragte.type don't exist`
    );
  }
  aggrValueClip(value: AggregateMixParamType): string {
    // AggregateCommand 类型
    if (isAggregateCommand(value)) {
      return this.aggrControllerClip(value);
    }
    // 字符键表达式
    if (isKey(value)) {
      const key = sqlClip.keyClip(value);
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
        .join(', ')})`;
    }
    return '';
  }
  and(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return args.join(` ${symbol} `);
  }
  or(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return args.join(` ${symbol} `);
  }
  not(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `not(${args[0]})`;
  }
  nor(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `not(${args.join(` or `)})`;
  }
  nand(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `not(${args.join(` and `)})`;
  }
  cmp(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `if(${args[0]} > ${args[1]}, 1, if(${args[0]} = ${args[1]}, 0, -1))`;
  }
  eq(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    // null
    if (args[1] === 'null') {
      return `(${args[0]} is ${args[1]})`;
    }
    return `(${args[0]} ${symbol} ${args[1]})`;
  }
  neq(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    // null
    if (args[1] === 'null') {
      return `${args[0]} is not ${args[1]}`;
    }
    return `(${args[0]} ${symbol} ${args[1]})`;
  }
  lt(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `(${args[0]} ${symbol} ${args[1]})`;
  }
  lte(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `(${args[0]} ${symbol} ${args[1]})`;
  }
  gt(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `(${args[0]} ${symbol} ${args[1]})`;
  }
  gte(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `(${args[0]} ${symbol} ${args[1]})`;
  }
  in(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    const field = this.aggrValueClip(rawArgs[0]);
    // 参数
    const args = (<any[]>rawArgs[1])!.map((rawArg) =>
      this.aggrValueClip(rawArg)
    );
    return `${field} ${symbol} (${args.join(', ')})`;
  }
  nin(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    const field = this.aggrValueClip(rawArgs[0]);
    // 参数
    const args = (<any[]>rawArgs[1]).map((rawArg) =>
      this.aggrValueClip(rawArg)
    );
    return `${field} ${symbol} (${args.join(', ')})`;
  }
  abs(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  sqrt(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  ln(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  log10(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  sin(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  asin(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  cos(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  acos(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  tan(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  atan(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  cot(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  floor(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  round(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  ceil(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  exp(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  sign(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  mod(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]})`;
  }
  log(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]})`;
  }
  pow(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]})`;
  }
  greatest(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args.join(', ')})`;
  }
  least(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args.join(', ')})`;
  }
  add(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `(${args.join(symbol)})`;
  }
  subtract(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `(${args.join(symbol)})`;
  }
  multiply(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `(${args.join(symbol)})`;
  }
  divide(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `(${args.join(symbol)})`;
  }
  length(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  reverse(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  trim(aggregate: AggregateProps) {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  upper(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  lower(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  left(aggregate: AggregateProps) {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]})`;
  }
  right(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]})`;
  }
  replace(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]}, ${args[2]})`;
  }
  substring(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]}, ${args[2]})`;
  }
  insert(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`;
  }
  concat(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args.join(', ')})`;
  }
  avg(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  max(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  min(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  sum(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  count(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  cond(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `if(${args[0]}, ${args[1]}, ${args[2]})`;
  }
  ifnull(aggregate: AggregateProps): string {
    // 值
    const { $value: rawArgs } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => this.aggrValueClip(rawArg));
    return `ifnull(${args[0]}, ${args[1]})`;
  }
  json_contains(aggregate: AggregateProps): string {
    return '';
  }
  json_contains_path(aggregate: AggregateProps): string {
    return '';
  }
  json_search(aggregate: AggregateProps): string {
    return '';
  }
  json_extract(aggregate: AggregateProps): string {
    return '';
  }
  json_merge_preserve(aggregate: AggregateProps): string {
    return '';
  }
  json_merge_patch(aggregate: AggregateProps): string {
    return '';
  }
  json_set(aggregate: AggregateProps): string {
    return '';
  }
  json_insert(aggregate: AggregateProps): string {
    return '';
  }
  json_replace(aggregate: AggregateProps): string {
    return '';
  }
  json_remove(aggregate: AggregateProps): string {
    return '';
  }
  json_array_append(aggregate: AggregateProps): string {
    const { $value: rawArgs } = aggregate;
    const [key, path] = getJsonKeyPath(<AggregateKey>rawArgs[0]);
    const appendVal = this.aggrValueClip(rawArgs[1]);
    return `${AggregateJsonType.ARRAY_APPEND}(${escapeId(key)}, ${escape(
      path
    )}, ${appendVal})`;
  }
  json_array_insert(aggregate: AggregateProps): string {
    const { $value: rawArgs } = aggregate;
    const [key, path] = getJsonKeyPath(<AggregateKey>rawArgs[0]);
    const insertVal = this.aggrValueClip(rawArgs[1]);
    return `${AggregateJsonType.ARRAY_INSERT}(${escapeId(key)}, ${escape(
      path
    )}, ${insertVal})`;
  }
  json_object(aggregate: AggregateProps): string {
    const { $value: rawArgs } = aggregate;
    return this.aggrValueClip(rawArgs[0]);
  }
  json_array(aggregate: AggregateProps): string {
    const { $value: rawArgs } = aggregate;
    return this.aggrValueClip(rawArgs[0]);
  }
  json_type(aggregate: AggregateProps): string {
    const { $value: rawArgs } = aggregate;
    return this.aggrValueClip(rawArgs[0]);
  }
  json_keys(aggregate: AggregateProps): string {
    return '';
  }
  json_depth(aggregate: AggregateProps): string {
    return '';
  }
  json_length(aggregate: AggregateProps): string {
    return '';
  }
  json_valid(aggregate: AggregateProps): string {
    return '';
  }
  json_pretty(aggregate: AggregateProps): string {
    return '';
  }
  json_quote(aggregate: AggregateProps): string {
    return '';
  }
  json_unquote(aggregate: AggregateProps): string {
    return '';
  }
  regexp(aggregate: AggregateProps): string {
    const { $value: rawArgs } = aggregate;
    const key = rawArgs[0];
    const regexp = rawArgs[1];
    const options = rawArgs[2];
    return sqlClip.regexClip(
      <string>key,
      <SQLRegex>{
        $regex: regexp,
        $options: options,
      }
    );
  }
  like(aggregate: AggregateProps): string {
    const { $value: rawArgs } = aggregate;
    const key = rawArgs[0];
    const like = rawArgs[1];
    const options = rawArgs[2];
    return sqlClip.likeClip(
      <string>key,
      <SQLLike>{
        $like: like,
        $options: options,
      }
    );
  }
}

const sqlAggregateCommandClip = new MySQLAggregateCommandClip();

export { sqlAggregateCommandClip, MySQLAggregateCommandClip };
