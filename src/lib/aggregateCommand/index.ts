import {
  AggregateAccumulationType,
  AggregateArrayParamType,
  AggregateBooleanNegativeType,
  AggregateBooleanSimpleType,
  AggregateCalculationFunctionType,
  AggregateCalculationSimpleType,
  AggregateCommand,
  AggregateCommandLike,
  AggregateCommandMode,
  AggregateCommandType,
  AggregateCompareFilterType,
  AggregateCompareSimpleType,
  AggregateConditionType,
  AggregateJsonType,
  AggregateMixParamType,
  AggregateNumberParamType,
  AggregateObjectParamType,
  AggregateSeachOptions,
  AggregateStringParamType,
  AggregateStringType,
} from './interface';

class MySQLAggregateCommand<
  K extends object = object,
  T extends AggregateCommandType = any,
  V extends (
    | AggregateMixParamType<K>
    | AggregateMixParamType<K>[]
    | AggregateSeachOptions
  )[] = any
> implements AggregateCommand<K, T, V>
{
  $mode: AggregateCommandMode = 'aggregate';
  $type: T | undefined = undefined;
  $value: V | undefined = undefined;
  constructor(value?: V, type?: T) {
    this.$value = value;
    this.$type = type;
  }
  and<
    P extends [
      AggregateMixParamType<K>,
      AggregateMixParamType<K>,
      ...AggregateMixParamType<K>[]
    ]
  >(...values: P): AggregateCommand<K, AggregateBooleanSimpleType.AND, P> {
    return new MySQLAggregateCommand(values, AggregateBooleanSimpleType.AND);
  }
  or<
    P extends [
      AggregateMixParamType<K>,
      AggregateMixParamType<K>,
      ...AggregateMixParamType<K>[]
    ]
  >(...values: P): AggregateCommand<K, AggregateBooleanSimpleType.OR, P> {
    return new MySQLAggregateCommand(values, AggregateBooleanSimpleType.OR);
  }
  not<P extends [AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateBooleanNegativeType.NOT, P> {
    return new MySQLAggregateCommand(values, AggregateBooleanNegativeType.NOT);
  }
  nor<
    P extends [
      AggregateMixParamType<K>,
      AggregateMixParamType<K>,
      ...AggregateMixParamType<K>[]
    ]
  >(...values: P): AggregateCommand<K, AggregateBooleanNegativeType.NOR, P> {
    return new MySQLAggregateCommand(values, AggregateBooleanNegativeType.NOR);
  }
  nand<
    P extends [
      AggregateMixParamType<K>,
      AggregateMixParamType<K>,
      ...AggregateMixParamType<K>[]
    ]
  >(...values: P): AggregateCommand<K, AggregateBooleanNegativeType.NAND, P> {
    return new MySQLAggregateCommand(values, AggregateBooleanNegativeType.NAND);
  }
  cmp<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.CMP, P> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.CMP);
  }
  eq<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.EQ, P> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.EQ);
  }
  neq<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.NEQ, P> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.NEQ);
  }
  lt<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.LT, P> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.LT);
  }
  lte<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.LTE, P> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.LTE);
  }
  gt<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.GT, P> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.GT);
  }
  gte<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.GTE, P> {
    return new MySQLAggregateCommand(values, AggregateCompareSimpleType.GTE);
  }
  in<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>[]]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareFilterType.IN, P> {
    return new MySQLAggregateCommand(values, AggregateCompareFilterType.IN);
  }
  nin<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>[]]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareFilterType.NIN, P> {
    return new MySQLAggregateCommand(values, AggregateCompareFilterType.NIN);
  }
  abs<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.ABS, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.ABS
    );
  }
  sqrt<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.SQRT, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.SQRT
    );
  }
  ln<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.LN, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.LN
    );
  }
  log10<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.LOG10, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.LOG10
    );
  }
  sin<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.SIN, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.SIN
    );
  }
  asin<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.ASIN, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.ASIN
    );
  }
  cos<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.COS, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.COS
    );
  }
  acos<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.ACOS, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.ACOS
    );
  }
  tan<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.TAN, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.TAN
    );
  }
  atan<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.ATAN, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.ATAN
    );
  }
  cot<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.COT, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.COT
    );
  }
  floor<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.FLOOR, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.FLOOR
    );
  }
  round<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.ROUND, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.ROUND
    );
  }
  ceil<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.CEIL, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.CEIL
    );
  }
  exp<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.EXP, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.EXP
    );
  }
  sign<P extends [] | [AggregateNumberParamType<K>]>(
    this: ThisType<AggregateCommandLike>,
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.SIGN, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.SIGN
    );
  }
  mod<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.MOD, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.MOD
    );
  }
  log<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.LOG, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.LOG
    );
  }
  pow<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.POW, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.POW
    );
  }
  greatest<
    P extends [
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      ...AggregateNumberParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.GREATEST, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.GREATEST
    );
  }
  least<
    P extends [
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      ...AggregateNumberParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.LEAST, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationFunctionType.LEAST
    );
  }
  add<
    P extends [
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      ...AggregateNumberParamType<K>[]
    ]
  >(...values: P): AggregateCommand<K, AggregateCalculationSimpleType.ADD, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationSimpleType.ADD
    );
  }
  subtract<
    P extends [
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      ...AggregateNumberParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationSimpleType.SUBTRACT, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationSimpleType.SUBTRACT
    );
  }
  multiply<
    P extends [
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      ...AggregateNumberParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationSimpleType.MULTIPLY, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationSimpleType.MULTIPLY
    );
  }
  divide<
    P extends [
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      ...AggregateNumberParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationSimpleType.DIVIDE, P> {
    return new MySQLAggregateCommand(
      values,
      AggregateCalculationSimpleType.DIVIDE
    );
  }
  trim<P extends [AggregateStringParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.TRIM, P> {
    return new MySQLAggregateCommand(values, AggregateStringType.TRIM);
  }
  reverse<P extends [AggregateStringParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.REVERSE, P> {
    return new MySQLAggregateCommand(values, AggregateStringType.REVERSE);
  }
  length<P extends [AggregateStringParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.LENGTH, P> {
    return new MySQLAggregateCommand(values, AggregateStringType.LENGTH);
  }
  upper<P extends [AggregateStringParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.UPPER, P> {
    return new MySQLAggregateCommand(values, AggregateStringType.UPPER);
  }
  lower<P extends [AggregateStringParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.LOWER, P> {
    return new MySQLAggregateCommand(values, AggregateStringType.LOWER);
  }
  left<P extends [AggregateStringParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.LEFT, P> {
    return new MySQLAggregateCommand(values, AggregateStringType.LEFT);
  }
  right<P extends [AggregateStringParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.RIGHT, P> {
    return new MySQLAggregateCommand(values, AggregateStringType.RIGHT);
  }
  replace<
    P extends [
      AggregateStringParamType<K>,
      AggregateStringParamType<K>,
      AggregateStringParamType<K>
    ]
  >(...values: P): AggregateCommand<K, AggregateStringType.REPLACE, P> {
    return new MySQLAggregateCommand(values, AggregateStringType.REPLACE);
  }
  insert<
    P extends [
      AggregateStringParamType<K>,
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      AggregateStringParamType<K>
    ]
  >(...values: P): AggregateCommand<K, AggregateStringType.INSERT, P> {
    return new MySQLAggregateCommand(values, AggregateStringType.INSERT);
  }
  substring<
    P extends [
      AggregateStringParamType<K>,
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>
    ]
  >(...values: P): AggregateCommand<K, AggregateStringType.SUBSTRING, P> {
    return new MySQLAggregateCommand(values, AggregateStringType.SUBSTRING);
  }
  concat<
    P extends [
      AggregateStringParamType<K>,
      AggregateStringParamType<K>,
      ...AggregateStringParamType<K>[]
    ]
  >(...values: P): AggregateCommand<K, AggregateStringType.CONCAT, P> {
    return new MySQLAggregateCommand(values, AggregateStringType.CONCAT);
  }
  avg<P extends [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateAccumulationType.AVG, P> {
    return new MySQLAggregateCommand(values, AggregateAccumulationType.AVG);
  }
  max<P extends [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateAccumulationType.MAX, P> {
    return new MySQLAggregateCommand(values, AggregateAccumulationType.MAX);
  }
  min<P extends [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateAccumulationType.MIN, P> {
    return new MySQLAggregateCommand(values, AggregateAccumulationType.MIN);
  }
  sum<P extends [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateAccumulationType.SUM, P> {
    return new MySQLAggregateCommand(values, AggregateAccumulationType.SUM);
  }
  count<P extends [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateAccumulationType.COUNT, P> {
    return new MySQLAggregateCommand(values, AggregateAccumulationType.COUNT);
  }
  cond<
    P extends [
      AggregateMixParamType<K>,
      AggregateMixParamType<K>,
      AggregateMixParamType<K>
    ]
  >(...values: P): AggregateCommand<K, AggregateConditionType.COND, P> {
    return new MySQLAggregateCommand(values, AggregateConditionType.COND);
  }
  ifnull<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateConditionType.IFNULL, P> {
    return new MySQLAggregateCommand(values, AggregateConditionType.IFNULL);
  }
  json_contains<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.CONTAINS, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.CONTAINS);
  }
  json_contains_path<
    P extends [
      AggregateMixParamType<K>,
      AggregateSeachOptions,
      AggregateStringParamType<K>,
      AggregateStringParamType<K>
    ]
  >(...values: P): AggregateCommand<K, AggregateJsonType.CONTAINS_PATH, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.CONTAINS_PATH);
  }
  json_search<
    P extends [
      AggregateMixParamType<K>,
      AggregateSeachOptions,
      AggregateMixParamType<K>
    ]
  >(...values: P): AggregateCommand<K, AggregateJsonType.SEARCH, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.SEARCH);
  }
  json_extract<
    P extends [AggregateMixParamType<K>, AggregateStringParamType<K>[]]
  >(...values: P): AggregateCommand<K, AggregateJsonType.EXTRACT, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.EXTRACT);
  }
  json_merge_preserve<P extends AggregateMixParamType<K>[]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.MERGE_PRESERVE, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.MERGE_PRESERVE);
  }
  json_merge_patch<P extends AggregateMixParamType<K>[]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.MERGE_PATCH, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.MERGE_PATCH);
  }
  json_set<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.SET, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.SET);
  }
  json_insert<
    P extends [AggregateMixParamType<K>, AggregateObjectParamType<K>]
  >(...values: P): AggregateCommand<K, AggregateJsonType.INSERT, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.INSERT);
  }
  json_replace<
    P extends [AggregateMixParamType<K>, AggregateObjectParamType<K>]
  >(...values: P): AggregateCommand<K, AggregateJsonType.REPLACE, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.REPLACE);
  }
  json_remove<
    P extends [AggregateMixParamType<K>, AggregateStringParamType<K>]
  >(...values: P): AggregateCommand<K, AggregateJsonType.REMOVE, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.REMOVE);
  }
  json_array_append<
    P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]
  >(...values: P): AggregateCommand<K, AggregateJsonType.ARRAY_APPEND, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.ARRAY_APPEND);
  }
  json_array_insert<
    P extends [
      AggregateMixParamType<K>,
      AggregateMixParamType<K>,
      AggregateStringParamType<K>
    ]
  >(...values: P): AggregateCommand<K, AggregateJsonType.ARRAY_INSERT, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.ARRAY_INSERT);
  }
  json_object<P extends [AggregateObjectParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.OBJECT, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.OBJECT);
  }

  json_array<P extends [AggregateArrayParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.ARRAY, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.ARRAY);
  }
  json_type<P extends [AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.TYPE, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.TYPE);
  }
  json_keys<P extends [AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.KEYS, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.KEYS);
  }
  json_depth<P extends [AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.DEPTH, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.DEPTH);
  }
  json_length<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.LENGTH, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.LENGTH);
  }
  json_valid<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.VALID, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.VALID);
  }
  json_pretty<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.PRETTY, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.PRETTY);
  }
  json_quote<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.QUOTE, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.QUOTE);
  }
  json_unquote<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.UNQUOTE, P> {
    return new MySQLAggregateCommand(values, AggregateJsonType.UNQUOTE);
  }
}

const $ = new MySQLAggregateCommand();

export { $, MySQLAggregateCommand };
