import { valueToArr } from '../../utils/utils';
import { CommandMode } from '../command/interface';
import {
  AggregateAccumulationType,
  AggregateArrayParamType,
  AggregateBooleanNegativeType,
  AggregateBooleanSimpleType,
  AggregateCalculationFunctionType,
  AggregateCalculationSimpleType,
  AggregateCommand,
  AggregateCommandLike,
  AggregateCommandType,
  AggregateCompareFilterType,
  AggregateCompareSimpleType,
  AggregateConditionType,
  AggregateJsonType,
  AggregateMatchType,
  AggregateMixParamType,
  AggregateNumberParamType,
  AggregateObjectParamType,
  AggregateSeachOptions,
  AggregateStringParamType,
  AggregateStringType,
} from './interface';

/**
 * @description MySQl 聚合命令
 */

class MySQLAggregateCommand<T extends object = object>
  implements AggregateCommand<T>
{
  $mode: CommandMode = 'aggregate';
  $type: AggregateCommandType | undefined;
  $value:
    | (
        | AggregateMixParamType<T>
        | AggregateMixParamType<T>[]
        | AggregateSeachOptions
      )[]
    | undefined;
  constructor(
    value?: (
      | AggregateMixParamType<T>
      | AggregateMixParamType<T>[]
      | AggregateSeachOptions
    )[],
    type?: AggregateCommandType
  ) {
    this.$value = value;
    this.$type = type;
  }
  and<
    P extends [
      AggregateMixParamType<T>,
      AggregateMixParamType<T>,
      ...AggregateMixParamType<T>[]
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateBooleanSimpleType.AND);
  }
  or<
    P extends [
      AggregateMixParamType<T>,
      AggregateMixParamType<T>,
      ...AggregateMixParamType<T>[]
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateBooleanSimpleType.OR);
  }
  not<P extends [AggregateMixParamType<T>]>(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateBooleanNegativeType.NOT);
  }
  nor<
    P extends [
      AggregateMixParamType<T>,
      AggregateMixParamType<T>,
      ...AggregateMixParamType<T>[]
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateBooleanNegativeType.NOR);
  }
  nand<
    P extends [
      AggregateMixParamType<T>,
      AggregateMixParamType<T>,
      ...AggregateMixParamType<T>[]
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateBooleanNegativeType.NAND);
  }
  cmp<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.CMP);
  }
  eq<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.EQ);
  }
  neq<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.NEQ);
  }
  lt<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.LT);
  }
  lte<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.LTE);
  }
  gt<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.GT);
  }
  gte<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.GTE);
  }
  in<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>[]]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateCompareFilterType.IN);
  }
  nin<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>[]]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateCompareFilterType.NIN);
  }
  abs<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.ABS
    );
  }
  sqrt<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.SQRT
    );
  }
  ln<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.LN
    );
  }
  log10<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.LOG10
    );
  }
  sin<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.SIN
    );
  }
  asin<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.ASIN
    );
  }
  cos<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.COS
    );
  }
  acos<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.ACOS
    );
  }
  tan<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.TAN
    );
  }
  atan<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.ATAN
    );
  }
  cot<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.COT
    );
  }
  floor<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.FLOOR
    );
  }
  round<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.ROUND
    );
  }
  ceil<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.CEIL
    );
  }
  exp<P extends [] | [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    const results = valueToArr<AggregateNumberParamType<T>>(values[0], this);
    return new MySQLAggregateCommand(
      results,
      AggregateCalculationFunctionType.EXP
    );
  }
  sign<P extends [] | [AggregateNumberParamType<T>]>(
    this: ThisType<AggregateCommandLike>,
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.SIGN
    );
  }
  mod<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.MOD
    );
  }
  log<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.LOG
    );
  }
  pow<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.POW
    );
  }
  greatest<
    P extends [
      AggregateNumberParamType<T>,
      AggregateNumberParamType<T>,
      ...AggregateNumberParamType<T>[]
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.GREATEST
    );
  }
  least<
    P extends [
      AggregateNumberParamType<T>,
      AggregateNumberParamType<T>,
      ...AggregateNumberParamType<T>[]
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.LEAST
    );
  }
  add<
    P extends [
      AggregateNumberParamType<T>,
      AggregateNumberParamType<T>,
      ...AggregateNumberParamType<T>[]
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationSimpleType.ADD
    );
  }
  subtract<
    P extends [
      AggregateNumberParamType<T>,
      AggregateNumberParamType<T>,
      ...AggregateNumberParamType<T>[]
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationSimpleType.SUBTRACT
    );
  }
  multiply<
    P extends [
      AggregateNumberParamType<T>,
      AggregateNumberParamType<T>,
      ...AggregateNumberParamType<T>[]
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationSimpleType.MULTIPLY
    );
  }
  divide<
    P extends [
      AggregateNumberParamType<T>,
      AggregateNumberParamType<T>,
      ...AggregateNumberParamType<T>[]
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationSimpleType.DIVIDE
    );
  }
  trim<P extends [AggregateStringParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateStringType.TRIM);
  }
  reverse<P extends [AggregateStringParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateStringType.REVERSE);
  }
  length<P extends [AggregateStringParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateStringType.LENGTH);
  }
  upper<P extends [AggregateStringParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateStringType.UPPER);
  }
  lower<P extends [AggregateStringParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateStringType.LOWER);
  }
  left<P extends [AggregateStringParamType<T>, AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateStringType.LEFT);
  }
  right<P extends [AggregateStringParamType<T>, AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateStringType.RIGHT);
  }
  replace<
    P extends [
      AggregateStringParamType<T>,
      AggregateStringParamType<T>,
      AggregateStringParamType<T>
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateStringType.REPLACE);
  }
  insert<
    P extends [
      AggregateStringParamType<T>,
      AggregateNumberParamType<T>,
      AggregateNumberParamType<T>,
      AggregateStringParamType<T>
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateStringType.INSERT);
  }
  substring<
    P extends [
      AggregateStringParamType<T>,
      AggregateNumberParamType<T>,
      AggregateNumberParamType<T>
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateStringType.SUBSTRING);
  }
  concat<
    P extends [
      AggregateStringParamType<T>,
      AggregateStringParamType<T>,
      ...AggregateStringParamType<T>[]
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateStringType.CONCAT);
  }
  avg<P extends [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateAccumulationType.AVG);
  }
  max<P extends [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateAccumulationType.MAX);
  }
  min<P extends [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateAccumulationType.MIN);
  }
  sum<P extends [AggregateNumberParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateAccumulationType.SUM);
  }
  count<P extends [AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateAccumulationType.COUNT);
  }
  cond<
    P extends [
      AggregateMixParamType<T>,
      AggregateMixParamType<T>,
      AggregateMixParamType<T>
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateConditionType.COND);
  }
  ifnull<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateConditionType.IFNULL);
  }
  json_contains<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.CONTAINS);
  }
  json_contains_path<
    P extends [
      AggregateMixParamType<T>,
      AggregateSeachOptions,
      AggregateStringParamType<T>,
      AggregateStringParamType<T>
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.CONTAINS_PATH);
  }
  json_search<
    P extends [
      AggregateMixParamType<T>,
      AggregateSeachOptions,
      AggregateMixParamType<T>
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.SEARCH);
  }
  json_extract<
    P extends [AggregateMixParamType<T>, AggregateStringParamType<T>[]]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.EXTRACT);
  }
  json_merge_preserve<P extends AggregateMixParamType<T>[]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.MERGE_PRESERVE);
  }
  json_merge_patch<P extends AggregateMixParamType<T>[]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.MERGE_PATCH);
  }
  json_set<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.SET);
  }
  json_insert<
    P extends [AggregateMixParamType<T>, AggregateObjectParamType<T>]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.INSERT);
  }
  json_replace<
    P extends [AggregateMixParamType<T>, AggregateObjectParamType<T>]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.REPLACE);
  }
  json_remove<
    P extends [AggregateMixParamType<T>, AggregateStringParamType<T>]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.REMOVE);
  }
  json_array_append<
    P extends [AggregateArrayParamType<T>, AggregateMixParamType<T>]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.ARRAY_APPEND);
  }
  json_array_insert<
    P extends [AggregateArrayParamType<T>, AggregateMixParamType<T>]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.ARRAY_INSERT);
  }
  json_object<P extends [AggregateObjectParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.OBJECT);
  }

  json_array<P extends [AggregateArrayParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.ARRAY);
  }
  json_type<P extends [AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.TYPE);
  }
  json_keys<P extends [AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.KEYS);
  }
  json_depth<P extends [AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.DEPTH);
  }
  json_length<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.LENGTH);
  }
  json_valid<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.VALID);
  }
  json_pretty<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.PRETTY);
  }
  json_quote<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.QUOTE);
  }
  json_unquote<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(
    ...values: P
  ): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateJsonType.UNQUOTE);
  }
  regexp<
    P extends [
      AggregateStringParamType<T>,
      AggregateStringParamType<T>,
      AggregateStringParamType<T>
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateMatchType.REGEXP);
  }
  like<
    P extends [
      AggregateStringParamType<T>,
      AggregateStringParamType<T>,
      AggregateStringParamType<T>
    ]
  >(...values: P): AggregateCommand<T> {
    return new MySQLAggregateCommand(values, AggregateMatchType.LIKE);
  }
}

const $ = new MySQLAggregateCommand();

export { $, MySQLAggregateCommand };
