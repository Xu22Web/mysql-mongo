import { AggregateAccumulationType, AggregateArrayParamType, AggregateBooleanNegativeType, AggregateBooleanSimpleType, AggregateCalculationFunctionType, AggregateCalculationSimpleType, AggregateCommand, AggregateCommandLike, AggregateCommandMode, AggregateCommandType, AggregateCompareFilterType, AggregateCompareSimpleType, AggregateConditionType, AggregateJsonType, AggregateMixParamType, AggregateNumberParamType, AggregateObjectParamType, AggregateSeachOptions, AggregateStringParamType, AggregateStringType } from './interface';
declare class MySQLAggregateCommand<K extends object = object, T extends AggregateCommandType = any, V extends (AggregateMixParamType<K> | AggregateMixParamType<K>[] | AggregateSeachOptions)[] = any> implements AggregateCommand<K, T, V> {
    $mode: AggregateCommandMode;
    $type: T | undefined;
    $value: V | undefined;
    constructor(value?: V, type?: T);
    and<P extends [
        AggregateMixParamType<K>,
        AggregateMixParamType<K>,
        ...AggregateMixParamType<K>[]
    ]>(...values: P): AggregateCommand<K, AggregateBooleanSimpleType.AND, P>;
    or<P extends [
        AggregateMixParamType<K>,
        AggregateMixParamType<K>,
        ...AggregateMixParamType<K>[]
    ]>(...values: P): AggregateCommand<K, AggregateBooleanSimpleType.OR, P>;
    not<P extends [AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateBooleanNegativeType.NOT, P>;
    nor<P extends [
        AggregateMixParamType<K>,
        AggregateMixParamType<K>,
        ...AggregateMixParamType<K>[]
    ]>(...values: P): AggregateCommand<K, AggregateBooleanNegativeType.NOR, P>;
    nand<P extends [
        AggregateMixParamType<K>,
        AggregateMixParamType<K>,
        ...AggregateMixParamType<K>[]
    ]>(...values: P): AggregateCommand<K, AggregateBooleanNegativeType.NAND, P>;
    cmp<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateCompareSimpleType.CMP, P>;
    eq<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCompareSimpleType.EQ, P>;
    neq<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCompareSimpleType.NEQ, P>;
    lt<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCompareSimpleType.LT, P>;
    lte<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCompareSimpleType.LTE, P>;
    gt<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCompareSimpleType.GT, P>;
    gte<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCompareSimpleType.GTE, P>;
    in<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>[]]>(...values: P): AggregateCommand<K, AggregateCompareFilterType.IN, P>;
    nin<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>[]]>(...values: P): AggregateCommand<K, AggregateCompareFilterType.NIN, P>;
    abs<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.ABS, P>;
    sqrt<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.SQRT, P>;
    ln<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.LN, P>;
    log10<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.LOG10, P>;
    sin<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.SIN, P>;
    asin<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.ASIN, P>;
    cos<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.COS, P>;
    acos<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.ACOS, P>;
    tan<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.TAN, P>;
    atan<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.ATAN, P>;
    cot<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.COT, P>;
    floor<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.FLOOR, P>;
    round<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.ROUND, P>;
    ceil<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.CEIL, P>;
    exp<P extends [] | [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.EXP, P>;
    sign<P extends [] | [AggregateNumberParamType<K>]>(this: ThisType<AggregateCommandLike>, ...values: P): AggregateCommand<K, AggregateCalculationFunctionType.SIGN, P>;
    mod<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.MOD, P>;
    log<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.LOG, P>;
    pow<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.POW, P>;
    greatest<P extends [
        AggregateNumberParamType<K>,
        AggregateNumberParamType<K>,
        ...AggregateNumberParamType<K>[]
    ]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.GREATEST, P>;
    least<P extends [
        AggregateNumberParamType<K>,
        AggregateNumberParamType<K>,
        ...AggregateNumberParamType<K>[]
    ]>(...values: P): AggregateCommand<K, AggregateCalculationFunctionType.LEAST, P>;
    add<P extends [
        AggregateNumberParamType<K>,
        AggregateNumberParamType<K>,
        ...AggregateNumberParamType<K>[]
    ]>(...values: P): AggregateCommand<K, AggregateCalculationSimpleType.ADD, P>;
    subtract<P extends [
        AggregateNumberParamType<K>,
        AggregateNumberParamType<K>,
        ...AggregateNumberParamType<K>[]
    ]>(...values: P): AggregateCommand<K, AggregateCalculationSimpleType.SUBTRACT, P>;
    multiply<P extends [
        AggregateNumberParamType<K>,
        AggregateNumberParamType<K>,
        ...AggregateNumberParamType<K>[]
    ]>(...values: P): AggregateCommand<K, AggregateCalculationSimpleType.MULTIPLY, P>;
    divide<P extends [
        AggregateNumberParamType<K>,
        AggregateNumberParamType<K>,
        ...AggregateNumberParamType<K>[]
    ]>(...values: P): AggregateCommand<K, AggregateCalculationSimpleType.DIVIDE, P>;
    trim<P extends [AggregateStringParamType<K>]>(...values: P): AggregateCommand<K, AggregateStringType.TRIM, P>;
    reverse<P extends [AggregateStringParamType<K>]>(...values: P): AggregateCommand<K, AggregateStringType.REVERSE, P>;
    length<P extends [AggregateStringParamType<K>]>(...values: P): AggregateCommand<K, AggregateStringType.LENGTH, P>;
    upper<P extends [AggregateStringParamType<K>]>(...values: P): AggregateCommand<K, AggregateStringType.UPPER, P>;
    lower<P extends [AggregateStringParamType<K>]>(...values: P): AggregateCommand<K, AggregateStringType.LOWER, P>;
    left<P extends [AggregateStringParamType<K>, AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateStringType.LEFT, P>;
    right<P extends [AggregateStringParamType<K>, AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateStringType.RIGHT, P>;
    replace<P extends [
        AggregateStringParamType<K>,
        AggregateStringParamType<K>,
        AggregateStringParamType<K>
    ]>(...values: P): AggregateCommand<K, AggregateStringType.REPLACE, P>;
    insert<P extends [
        AggregateStringParamType<K>,
        AggregateNumberParamType<K>,
        AggregateNumberParamType<K>,
        AggregateStringParamType<K>
    ]>(...values: P): AggregateCommand<K, AggregateStringType.INSERT, P>;
    substring<P extends [
        AggregateStringParamType<K>,
        AggregateNumberParamType<K>,
        AggregateNumberParamType<K>
    ]>(...values: P): AggregateCommand<K, AggregateStringType.SUBSTRING, P>;
    concat<P extends [
        AggregateStringParamType<K>,
        AggregateStringParamType<K>,
        ...AggregateStringParamType<K>[]
    ]>(...values: P): AggregateCommand<K, AggregateStringType.CONCAT, P>;
    avg<P extends [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateAccumulationType.AVG, P>;
    max<P extends [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateAccumulationType.MAX, P>;
    min<P extends [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateAccumulationType.MIN, P>;
    sum<P extends [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateAccumulationType.SUM, P>;
    count<P extends [AggregateNumberParamType<K>]>(...values: P): AggregateCommand<K, AggregateAccumulationType.COUNT, P>;
    cond<P extends [
        AggregateMixParamType<K>,
        AggregateMixParamType<K>,
        AggregateMixParamType<K>
    ]>(...values: P): AggregateCommand<K, AggregateConditionType.COND, P>;
    ifnull<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateConditionType.IFNULL, P>;
    json_contains<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.CONTAINS, P>;
    json_contains_path<P extends [
        AggregateMixParamType<K>,
        AggregateSeachOptions,
        AggregateStringParamType<K>,
        AggregateStringParamType<K>
    ]>(...values: P): AggregateCommand<K, AggregateJsonType.CONTAINS_PATH, P>;
    json_search<P extends [
        AggregateMixParamType<K>,
        AggregateSeachOptions,
        AggregateMixParamType<K>
    ]>(...values: P): AggregateCommand<K, AggregateJsonType.SEARCH, P>;
    json_extract<P extends [AggregateMixParamType<K>, AggregateStringParamType<K>[]]>(...values: P): AggregateCommand<K, AggregateJsonType.EXTRACT, P>;
    json_merge_preserve<P extends AggregateMixParamType<K>[]>(...values: P): AggregateCommand<K, AggregateJsonType.MERGE_PRESERVE, P>;
    json_merge_patch<P extends AggregateMixParamType<K>[]>(...values: P): AggregateCommand<K, AggregateJsonType.MERGE_PATCH, P>;
    json_set<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.SET, P>;
    json_insert<P extends [AggregateMixParamType<K>, AggregateObjectParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.INSERT, P>;
    json_replace<P extends [AggregateMixParamType<K>, AggregateObjectParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.REPLACE, P>;
    json_remove<P extends [AggregateMixParamType<K>, AggregateStringParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.REMOVE, P>;
    json_array_append<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.ARRAY_APPEND, P>;
    json_array_insert<P extends [
        AggregateMixParamType<K>,
        AggregateMixParamType<K>,
        AggregateStringParamType<K>
    ]>(...values: P): AggregateCommand<K, AggregateJsonType.ARRAY_INSERT, P>;
    json_object<P extends [AggregateObjectParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.OBJECT, P>;
    json_array<P extends [AggregateArrayParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.ARRAY, P>;
    json_type<P extends [AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.TYPE, P>;
    json_keys<P extends [AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.KEYS, P>;
    json_depth<P extends [AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.DEPTH, P>;
    json_length<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.LENGTH, P>;
    json_valid<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.VALID, P>;
    json_pretty<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.PRETTY, P>;
    json_quote<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.QUOTE, P>;
    json_unquote<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(...values: P): AggregateCommand<K, AggregateJsonType.UNQUOTE, P>;
}
declare const $: MySQLAggregateCommand<object, any, any>;
export { $, MySQLAggregateCommand };
