import { sqlClip } from '..';
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
  AggregateMixParamType,
  AggregateStringType,
} from '../../../aggregateCommand/interface';
import { SQLAggregateCommandClip } from './interface';

/**
 * @description aggregate clip 片段
 */
class MySQLAggregateCommandClip implements SQLAggregateCommandClip {
  and(
    aggregate: AggregateCommandLike<
      any,
      AggregateBooleanSimpleType.AND,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return args.join(` ${symbol} `);
  }
  or(
    aggregate: AggregateCommandLike<
      any,
      AggregateBooleanSimpleType.OR,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return args.join(` ${symbol} `);
  }
  not(
    aggregate: AggregateCommandLike<
      any,
      AggregateBooleanNegativeType.NOT,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `not(${args[0]})`;
  }
  nor(
    aggregate: AggregateCommandLike<
      any,
      AggregateBooleanNegativeType.NOR,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `not(${args.join(` or `)})`;
  }
  nand(
    aggregate: AggregateCommandLike<
      any,
      AggregateBooleanNegativeType.NAND,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `not(${args.join(` and `)})`;
  }
  cmp(
    aggregate: AggregateCommandLike<
      any,
      AggregateCompareSimpleType.CMP,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `if(${args[0]} > ${args[1]}, 1, if(${args[0]} = ${args[1]}, 0, -1))`;
  }
  eq(
    aggregate: AggregateCommandLike<
      any,
      AggregateCompareSimpleType.EQ,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    // null
    if (args[0] === 'null') {
      return `${args[0]} is ${args[1]}`;
    }
    return `(${args[0]} ${symbol} ${args[1]})`;
  }
  neq(
    aggregate: AggregateCommandLike<
      any,
      AggregateCompareSimpleType.NEQ,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    // null
    if (args[0] === 'null') {
      return `${args[0]} is not ${args[1]}`;
    }
    return `(${args[0]} ${symbol} ${args[1]})`;
  }
  lt(
    aggregate: AggregateCommandLike<
      any,
      AggregateCompareSimpleType.LT,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `(${args[0]} ${symbol} ${args[1]})`;
  }
  lte(
    aggregate: AggregateCommandLike<
      any,
      AggregateCompareSimpleType.LTE,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `(${args[0]} ${symbol} ${args[1]})`;
  }
  gt(
    aggregate: AggregateCommandLike<
      any,
      AggregateCompareSimpleType.GT,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `(${args[0]} ${symbol} ${args[1]})`;
  }
  gte(
    aggregate: AggregateCommandLike<
      any,
      AggregateCompareSimpleType.GTE,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `(${args[0]} ${symbol} ${args[1]})`;
  }
  in(
    aggregate: AggregateCommandLike<
      any,
      AggregateCompareFilterType.IN,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    const field = sqlClip.aggrValueClip(rawArgs[0]);
    // 参数
    const args = (<any[]>rawArgs[1])!.map((rawArg) =>
      sqlClip.aggrValueClip(rawArg)
    );
    return `${field} ${symbol} (${args.join(', ')})`;
  }
  nin(
    aggregate: AggregateCommandLike<
      any,
      AggregateCompareFilterType.NIN,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    const field = sqlClip.aggrValueClip(rawArgs[0]);
    // 参数
    const args = (<any[]>rawArgs[1]).map((rawArg) =>
      sqlClip.aggrValueClip(rawArg)
    );
    return `${field} ${symbol} (${args.join(', ')})`;
  }
  abs(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.ABS,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  sqrt(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.SQRT,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  ln(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.LN,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  log10(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.LOG10,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  sin(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.SIN,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  asin(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.ASIN,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  cos(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.COS,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  acos(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.ACOS,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  tan(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.TAN,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  atan(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.ATAN,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  cot(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.COT,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  floor(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.FLOOR,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  round(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.ROUND,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  ceil(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.CEIL,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  exp(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.EXP,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  sign(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.SIGN,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  mod(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.MOD,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]})`;
  }
  log(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.LOG,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]})`;
  }
  pow(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.POW,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]})`;
  }
  greatest(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.GREATEST,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args.join(', ')})`;
  }
  least(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationFunctionType.LEAST,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args.join(', ')})`;
  }
  add(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationSimpleType.ADD,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `(${args.join(symbol)})`;
  }
  subtract(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationSimpleType.SUBTRACT,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `(${args.join(symbol)})`;
  }
  multiply(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationSimpleType.MULTIPLY,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `(${args.join(symbol)})`;
  }
  divide(
    aggregate: AggregateCommandLike<
      any,
      AggregateCalculationSimpleType.DIVIDE,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `(${args.join(symbol)})`;
  }
  length(
    aggregate: AggregateCommandLike<
      any,
      AggregateStringType.LENGTH,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  reverse(
    aggregate: AggregateCommandLike<
      any,
      AggregateStringType.REVERSE,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  trim(
    aggregate: AggregateCommandLike<
      any,
      AggregateStringType.TRIM,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  upper(
    aggregate: AggregateCommandLike<
      any,
      AggregateStringType.UPPER,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  lower(
    aggregate: AggregateCommandLike<
      any,
      AggregateStringType.LOWER,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  left(
    aggregate: AggregateCommandLike<
      any,
      AggregateStringType.LEFT,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]})`;
  }
  right(
    aggregate: AggregateCommandLike<
      any,
      AggregateStringType.RIGHT,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]})`;
  }
  replace(
    aggregate: AggregateCommandLike<
      any,
      AggregateStringType.REPLACE,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]}, ${args[2]})`;
  }
  substring(
    aggregate: AggregateCommandLike<
      any,
      AggregateStringType.SUBSTRING,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]}, ${args[2]})`;
  }
  insert(
    aggregate: AggregateCommandLike<
      any,
      AggregateStringType.INSERT,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`;
  }
  concat(
    aggregate: AggregateCommandLike<
      any,
      AggregateStringType.CONCAT,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args.join(', ')})`;
  }
  avg(
    aggregate: AggregateCommandLike<
      any,
      AggregateAccumulationType.AVG,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  max(
    aggregate: AggregateCommandLike<
      any,
      AggregateAccumulationType.MAX,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  min(
    aggregate: AggregateCommandLike<
      any,
      AggregateAccumulationType.MIN,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  sum(
    aggregate: AggregateCommandLike<
      any,
      AggregateAccumulationType.SUM,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  count(
    aggregate: AggregateCommandLike<
      any,
      AggregateAccumulationType.COUNT,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs, $type: symbol } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `${symbol}(${args[0]})`;
  }
  cond(
    aggregate: AggregateCommandLike<
      any,
      AggregateConditionType.COND,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `if(${args[0]}, ${args[1]}, ${args[2]})`;
  }
  ifnull(
    aggregate: AggregateCommandLike<
      any,
      AggregateConditionType.IFNULL,
      AggregateMixParamType<object>[]
    >
  ): string {
    // 值
    const { $value: rawArgs } = aggregate;
    // 参数
    const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
    return `ifnull(${args[0]}, ${args[1]})`;
  }
  json_contains(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.CONTAINS,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_contains_path(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.CONTAINS_PATH,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_search(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.SEARCH,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_extract(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.EXTRACT,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_merge_preserve(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.MERGE_PRESERVE,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_merge_patch(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.MERGE_PATCH,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_set(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.SET,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_insert(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.INSERT,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_replace(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.REPLACE,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_remove(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.REMOVE,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_array_append(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.ARRAY_APPEND,
      AggregateMixParamType<object>[]
    >
  ): string {
    const { $value: rawArgs } = aggregate;
    const jsonArr = sqlClip.aggrJsonValueClip(rawArgs[0]);
    const appendVal = sqlClip.aggrJsonValueClip(rawArgs[1]);
    return `${AggregateJsonType.ARRAY_APPEND}(${jsonArr}, '$', ${appendVal})`;
  }
  json_array_insert(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.ARRAY_INSERT,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_object(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.OBJECT,
      AggregateMixParamType<object>[]
    >
  ): string {
    const { $value: rawArgs } = aggregate;
    return sqlClip.aggrJsonValueClip(rawArgs[0]);
  }
  json_array(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.ARRAY,
      AggregateMixParamType<object>[]
    >
  ): string {
    const { $value: rawArgs } = aggregate;
    return sqlClip.aggrJsonValueClip(rawArgs[0]);
  }
  json_type(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.TYPE,
      AggregateMixParamType<object>[]
    >
  ): string {
    const { $value: rawArgs } = aggregate;
    return sqlClip.aggrJsonValueClip(rawArgs[0]);
  }
  json_keys(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.KEYS,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_depth(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.DEPTH,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_length(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.LENGTH,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_valid(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.VALID,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_pretty(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.PRETTY,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_quote(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.QUOTE,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
  json_unquote(
    aggregate: AggregateCommandLike<
      any,
      AggregateJsonType.UNQUOTE,
      AggregateMixParamType<object>[]
    >
  ): string {
    return '';
  }
}

const sqlAggregateCommandClip = new MySQLAggregateCommandClip();

export { sqlAggregateCommandClip, MySQLAggregateCommandClip };
