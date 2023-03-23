import { AggregateArrayParamType, AggregateCommand, AggregateCommandLike, AggregateCommandMode, AggregateCommandType, AggregateMixParamType, AggregateNumberParamType, AggregateObjectParamType, AggregateSeachOptions, AggregateStringParamType } from './interface';
/**
 * @description MySQl 聚合命令
 */
declare class MySQLAggregateCommand<T extends object = object> implements AggregateCommand<T> {
    $mode: AggregateCommandMode;
    $type: AggregateCommandType | undefined;
    $value: (AggregateMixParamType<T> | AggregateMixParamType<T>[] | AggregateSeachOptions)[] | undefined;
    constructor(value?: (AggregateMixParamType<T> | AggregateMixParamType<T>[] | AggregateSeachOptions)[], type?: AggregateCommandType);
    and<P extends [
        AggregateMixParamType<T>,
        AggregateMixParamType<T>,
        ...AggregateMixParamType<T>[]
    ]>(...values: P): AggregateCommand<T>;
    or<P extends [
        AggregateMixParamType<T>,
        AggregateMixParamType<T>,
        ...AggregateMixParamType<T>[]
    ]>(...values: P): AggregateCommand<T>;
    not<P extends [AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    nor<P extends [
        AggregateMixParamType<T>,
        AggregateMixParamType<T>,
        ...AggregateMixParamType<T>[]
    ]>(...values: P): AggregateCommand<T>;
    nand<P extends [
        AggregateMixParamType<T>,
        AggregateMixParamType<T>,
        ...AggregateMixParamType<T>[]
    ]>(...values: P): AggregateCommand<T>;
    cmp<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    eq<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    neq<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    lt<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    lte<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    gt<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    gte<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    in<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>[]]>(...values: P): AggregateCommand<T>;
    nin<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>[]]>(...values: P): AggregateCommand<T>;
    abs<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    sqrt<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    ln<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    log10<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    sin<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    asin<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    cos<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    acos<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    tan<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    atan<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    cot<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    floor<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    round<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    ceil<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    exp<P extends [] | [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    sign<P extends [] | [AggregateNumberParamType<T>]>(this: ThisType<AggregateCommandLike>, ...values: P): AggregateCommand<T>;
    mod<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    log<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    pow<P extends [AggregateNumberParamType<T>, AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    greatest<P extends [
        AggregateNumberParamType<T>,
        AggregateNumberParamType<T>,
        ...AggregateNumberParamType<T>[]
    ]>(...values: P): AggregateCommand<T>;
    least<P extends [
        AggregateNumberParamType<T>,
        AggregateNumberParamType<T>,
        ...AggregateNumberParamType<T>[]
    ]>(...values: P): AggregateCommand<T>;
    add<P extends [
        AggregateNumberParamType<T>,
        AggregateNumberParamType<T>,
        ...AggregateNumberParamType<T>[]
    ]>(...values: P): AggregateCommand<T>;
    subtract<P extends [
        AggregateNumberParamType<T>,
        AggregateNumberParamType<T>,
        ...AggregateNumberParamType<T>[]
    ]>(...values: P): AggregateCommand<T>;
    multiply<P extends [
        AggregateNumberParamType<T>,
        AggregateNumberParamType<T>,
        ...AggregateNumberParamType<T>[]
    ]>(...values: P): AggregateCommand<T>;
    divide<P extends [
        AggregateNumberParamType<T>,
        AggregateNumberParamType<T>,
        ...AggregateNumberParamType<T>[]
    ]>(...values: P): AggregateCommand<T>;
    trim<P extends [AggregateStringParamType<T>]>(...values: P): AggregateCommand<T>;
    reverse<P extends [AggregateStringParamType<T>]>(...values: P): AggregateCommand<T>;
    length<P extends [AggregateStringParamType<T>]>(...values: P): AggregateCommand<T>;
    upper<P extends [AggregateStringParamType<T>]>(...values: P): AggregateCommand<T>;
    lower<P extends [AggregateStringParamType<T>]>(...values: P): AggregateCommand<T>;
    left<P extends [AggregateStringParamType<T>, AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    right<P extends [AggregateStringParamType<T>, AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    replace<P extends [
        AggregateStringParamType<T>,
        AggregateStringParamType<T>,
        AggregateStringParamType<T>
    ]>(...values: P): AggregateCommand<T>;
    insert<P extends [
        AggregateStringParamType<T>,
        AggregateNumberParamType<T>,
        AggregateNumberParamType<T>,
        AggregateStringParamType<T>
    ]>(...values: P): AggregateCommand<T>;
    substring<P extends [
        AggregateStringParamType<T>,
        AggregateNumberParamType<T>,
        AggregateNumberParamType<T>
    ]>(...values: P): AggregateCommand<T>;
    concat<P extends [
        AggregateStringParamType<T>,
        AggregateStringParamType<T>,
        ...AggregateStringParamType<T>[]
    ]>(...values: P): AggregateCommand<T>;
    avg<P extends [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    max<P extends [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    min<P extends [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    sum<P extends [AggregateNumberParamType<T>]>(...values: P): AggregateCommand<T>;
    count<P extends [AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    cond<P extends [
        AggregateMixParamType<T>,
        AggregateMixParamType<T>,
        AggregateMixParamType<T>
    ]>(...values: P): AggregateCommand<T>;
    ifnull<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    json_contains<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    json_contains_path<P extends [
        AggregateMixParamType<T>,
        AggregateSeachOptions,
        AggregateStringParamType<T>,
        AggregateStringParamType<T>
    ]>(...values: P): AggregateCommand<T>;
    json_search<P extends [
        AggregateMixParamType<T>,
        AggregateSeachOptions,
        AggregateMixParamType<T>
    ]>(...values: P): AggregateCommand<T>;
    json_extract<P extends [AggregateMixParamType<T>, AggregateStringParamType<T>[]]>(...values: P): AggregateCommand<T>;
    json_merge_preserve<P extends AggregateMixParamType<T>[]>(...values: P): AggregateCommand<T>;
    json_merge_patch<P extends AggregateMixParamType<T>[]>(...values: P): AggregateCommand<T>;
    json_set<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    json_insert<P extends [AggregateMixParamType<T>, AggregateObjectParamType<T>]>(...values: P): AggregateCommand<T>;
    json_replace<P extends [AggregateMixParamType<T>, AggregateObjectParamType<T>]>(...values: P): AggregateCommand<T>;
    json_remove<P extends [AggregateMixParamType<T>, AggregateStringParamType<T>]>(...values: P): AggregateCommand<T>;
    json_array_append<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    json_array_insert<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    json_object<P extends [AggregateObjectParamType<T>]>(...values: P): AggregateCommand<T>;
    json_array<P extends [AggregateArrayParamType<T>]>(...values: P): AggregateCommand<T>;
    json_type<P extends [AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    json_keys<P extends [AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    json_depth<P extends [AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    json_length<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    json_valid<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    json_pretty<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    json_quote<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
    json_unquote<P extends [AggregateMixParamType<T>, AggregateMixParamType<T>]>(...values: P): AggregateCommand<T>;
}
declare const $: MySQLAggregateCommand<object>;
export { $, MySQLAggregateCommand };
