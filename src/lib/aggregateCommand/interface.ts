import { SQLJsonArray, SQLJsonObject } from '../sql/sqlGenerator/interface';

/**
 * @description 简单布尔操作符
 */
export enum AggregateBooleanSimpleType {
  /**
   * @description 逻辑操作符 且
   * @param values
   */
  AND = 'and',
  /**
   * @description 逻辑操作符 或
   * @param values
   */
  OR = 'or',
}
/**
 * @description 否定布尔操作符
 */
export enum AggregateBooleanNegativeType {
  /**
   * @description 逻辑操作符 非
   * @param values
   */
  NOT = '!',
  /**
   * @description 逻辑操作符 都不
   * @param values
   */
  NOR = '!or',
  /**
   * @description 逻辑操作符 都不
   * @param values
   */
  NAND = '!and',
}
/**
 * @description 简单比较操作
 */
export enum AggregateCompareSimpleType {
  CMP = 'cmp',
  /**
   * @description 比较操作符 等于
   * @param values
   */
  EQ = '=',
  /**
   * @description 比较操作符 不等于
   * @param values
   */
  NEQ = '!=',
  /**
   * @description 比较操作符 小于
   * @param values
   */
  LT = '<',
  /**
   * @description 比较操作符 小于等于
   * @param values
   */
  LTE = '<=',
  /**
   * @description 比较操作符 大于
   * @param values
   */
  GT = '>',
  /**
   * @description 比较操作符 大于等于
   * @param values
   */
  GTE = '>=',
}
/**
 * @description 筛选比较操作
 */
export enum AggregateCompareFilterType {
  /**
   * @description 比较操作符 在给定的数组内
   * @param values
   */
  IN = 'in',
  /**
   * @description 比较操作符 不在给定的数组内
   * @param values
   */
  NIN = 'not in',
}
/**
 * @description 简单算数类型
 */
export enum AggregateCalculationSimpleType {
  /**
   * @description  加法
   * @param values
   */
  ADD = '+',
  /**
   * @description 减法
   * @param values
   */
  SUBTRACT = '-',
  /**
   * @description 乘法
   * @param values
   */
  MULTIPLY = '*',
  /**
   * @description 除法
   * @param values
   */
  DIVIDE = '/',
}
/**
 * @description 算数函数类型
 */
export enum AggregateCalculationFunctionType {
  /**
   * @description 绝对值
   * @param values
   */
  ABS = 'abs',
  /**
   * @description 向上取整
   * @param values
   */
  CEIL = 'ceil',
  /**
   * @description 取 e（自然对数的底数，欧拉数） 的 n 次方
   * @param values
   */
  EXP = 'exp',
  /**
   * @description 向下取整
   * @param values
   */
  FLOOR = 'floor',
  /**\
   * @description 自然对数值
   */
  LN = 'ln',
  /**
   * @description 对数底为 10 下的 log 值
   * @param values
   */
  LOG10 = 'log10',
  /**
   * @description 四舍五入
   * @param values
   */
  ROUND = 'round',
  /**
   * @description 返回参数的符号
   * @param values
   */
  SIGN = 'sign',
  /**
   * @description 正弦值
   * @param values
   */
  SIN = 'sin',
  /**
   * @description 反正弦值
   * @param values
   */
  ASIN = 'asin',
  /**
   * @description 余弦值
   * @param values
   */
  COS = 'cos',
  /**
   * @description 反余弦值
   * @param values
   */
  ACOS = 'acos',
  /**
   * @description 正切值
   * @param values
   */
  TAN = 'tan',
  /**
   * @description 反正切值
   * @param values
   */
  ATAN = 'atan',
  /**
   * @description 余切值
   * @param values
   */
  COT = 'cot',
  /**
   * @description 平方根
   * @param values
   */
  SQRT = 'sqrt',

  /**
   * @description 取模
   * @param values
   */
  MOD = 'mod',
  /**
   * @description 在给定对数底下的 log 值
   * @param values
   */
  LOG = 'log',
  /**
   * @description 指数次幂
   * @param values
   */
  POW = 'pow',
  /**
   * @description  数组中最大值
   * @param values
   */
  GREATEST = 'greatest',
  /**
   * @description 数组中最小值
   * @param values
   */
  LEAST = 'least',
}
/**
 * @description 字符串函数类型
 */
export enum AggregateStringType {
  /**
   * @description 去除收尾空格
   * @param values
   */
  TRIM = 'trim',
  /**
   * @description 反转字符串
   * @param values
   */
  REVERSE = 'reverse',
  /**
   * @description 字符串长度
   * @param values
   */
  LENGTH = 'length',
  /**
   * @description 大写字符串
   * @param values
   */
  UPPER = 'upper',
  /**
   * @description 小写字符串
   * @param values
   */
  LOWER = 'lower',
  /**
   * @description 从左侧字截取符串
   * @param values
   */
  LEFT = 'left',
  /**
   * @description 从右侧字截取符串，
   * @param values
   */
  RIGHT = 'right',
  /**
   * @description 从右侧字截取符串
   * @param values
   */
  REPLACE = 'replace',
  /**
   * @description 截取字符串
   * @param values
   */
  SUBSTRING = 'substring',
  /**
   * @description 截取字符串
   * @param values
   */
  INSERT = 'insert',
  /**
   * @description 合并字符串
   * @param values
   */
  CONCAT = 'concat',
}
/**
 * @description 累计器操作符
 */
export enum AggregateAccumulationType {
  /**
   * @description 平均数
   * @param values
   */
  AVG = 'avg',
  /**
   * @description
   */
  FIRST = 'first',
  /**
   * @description
   */
  LAST = 'last',
  /**
   * @description 最大值
   * @param values
   */
  MAX = 'max',
  /**
   * @description 最小值
   * @param values
   */
  MIN = 'min',
  /**
   * @description 求和
   * @param values
   */
  SUM = 'sum',
  /**
   * @description 累加
   * @param values
   */
  COUNT = 'count',
}
/**
 * @description 条件操作符
 */
export enum AggregateConditionType {
  /**
   * @description 布尔表达式
   * @param values
   */
  COND = 'cond',
  /**
   * @description null 替代值
   * @param values
   */
  IFNULL = 'ifNull',
}
/**
 * @description 条件操作符
 */
export enum AggregateJsonType {
  /**
   * @description json 包含
   * @param values
   */
  CONTAINS = 'json_contains',
  /**
   * @description json 路径包含
   * @param values
   */
  CONTAINS_PATH = 'json_contains_path',
  /**
   * @description json 查找
   * @param values
   */
  SEARCH = 'json_search',
  /**
   * @description json 提取路径
   * @param values
   */
  EXTRACT = 'json_extract',
  /**
   * @description json 合并，保留重复的键
   * @param values
   */
  MERGE_PRESERVE = 'json_merge_preserve',
  /**
   * @description json 合并，替换重复键的值
   * @param values
   */
  MERGE_PATCH = 'json_merge_patch',
  /**
   * @description json 设置
   * @param values
   */
  SET = 'json_set',
  /**
   * @description json 插入
   * @param values
   */
  INSERT = 'json_insert',
  /**
   * @description json 替换
   * @param values
   */
  REPLACE = 'json_replace',
  /**
   * @description json 移除
   * @param values
   */
  REMOVE = 'json_remove',
  /**
   * @description json 向数组尾部追加数据
   * @param values
   */
  ARRAY_APPEND = 'json_array_append',
  /**
   * @description json 向数组插入数据
   * @param values
   */
  ARRAY_INSERT = 'json_array_insert',
  /**
   * @description json 对象
   * @param values
   */
  OBJECT = 'json_object',
  /**
   * @description json 数组
   * @param values
   */
  ARRAY = 'json_array',
  /**
   * @description json 字段类型
   * @param values
   */
  TYPE = 'json_type',
  /**
   * @description json 键
   * @param values
   */
  KEYS = 'json_keys',
  /**
   * @description json 深度
   * @param values
   */
  DEPTH = 'json_depth',
  /**
   * @description json 长度
   * @param values
   */
  LENGTH = 'json_length',
  /**
   * @description json 验证
   * @param values
   */
  VALID = 'json_valid',
  /**
   * @description json 美化
   * @param values
   */
  PRETTY = 'json_pretty',
  /**
   * @description json 键
   * @param values
   */
  QUOTE = 'json_quote',
  /**
   * @description json 取消引用
   * @param values
   */
  UNQUOTE = 'json_unquote',
}
/**
 * @description 搜索配置
 */
export type AggregateSeachOptions = 'one' | 'all';

/**
 * @description 键
 */
export type AggregateKey<T extends string = string> = `$${T}`;
/**
 * @description 数组键
 */
export type AggregateArrayKey<T extends string = string> =
  | `${T}[${number}]`
  | `${T}[${number}][${number}]`
  | `${T}[${number}][${number}][${number}]`;
/**
 * @description 聚合操作模式
 */
export type AggregateCommandMode = 'aggregate';
/**
 * @description 算术操作符
 */
export type AggregateCalculationType =
  | AggregateCalculationFunctionType
  | AggregateCalculationSimpleType;
/**
 * @description 布尔操作符
 */
export type AggregateBooleanType =
  | AggregateBooleanSimpleType
  | AggregateBooleanNegativeType;
/**
 * @description 比较操作符
 */
export type AggregateCompareType =
  | AggregateCompareSimpleType
  | AggregateCompareFilterType;
/**
 * @description 聚合操作类型
 */
export type AggregateCommandType =
  | AggregateCalculationType
  | AggregateBooleanType
  | AggregateCompareType
  | AggregateStringType
  | AggregateAccumulationType
  | AggregateConditionType
  | AggregateJsonType;
/**
 * @description 特殊类型属性
 */
export type SpecificTypeProps<T extends object, K> = {
  [U in keyof T]: U extends string
    ? T[U] extends K
      ? U
      : T[U] extends unknown[]
      ? SpecificTypePropsArrayValue<U, T[U], K>
      : T[U] extends object
      ? SpecificTypePropsValue<U, T[U], K>
      : never
    : never;
}[keyof T];
/**
 * @description 特殊类型属性值
 */
export type SpecificTypePropsArrayValue<
  T extends string,
  K extends unknown[],
  U
> = K extends U
  ? `${T}`
  : '0' extends keyof K
  ? SpecificTypePropsValue<T, K, U>
  : K extends (infer M)[]
  ? M extends U
    ? `${T}[${number}]`
    : M extends unknown[]
    ? SpecificTypePropsArrayValue<`${T}[${number}]`, M, U>
    : M extends object
    ? SpecificTypePropsValue<`${T}[${number}]`, M, U>
    : never
  : never;
/**
 * @description
 */
export type SpecificTypePropsValue<T extends string, K extends object, U> = {
  [M in keyof K]: M extends `${number}`
    ? K[M] extends U
      ? `${T}[${M}]`
      : K[M] extends unknown[]
      ? SpecificTypePropsArrayValue<`${T}[${M}]`, K[M], U>
      : K[M] extends object
      ? SpecificTypePropsValue<`${T}[${M}]`, K[M], U>
      : never
    : M extends string
    ? K[M] extends U
      ? `${T}.${M}`
      : K[M] extends unknown[]
      ? SpecificTypePropsArrayValue<`${T}.${M}`, K[M], U>
      : K[M] extends object
      ? SpecificTypePropsValue<`${T}.${M}`, K[M], U>
      : never
    : never;
}[keyof K];

/**
 * @description 聚合操作参数条件
 */
export type AggregateParamType<T extends object, K> =
  | AggregateCommandLike
  | AggregateKey<SpecificTypeProps<T, K>>
  | K
  | null;

/**
 * @description 聚合操作参数类型（混合型）
 */
export type AggregateMixParamType<T extends object = object> =
  AggregateParamType<
    T,
    string | number | boolean | SQLJsonObject | SQLJsonArray
  >;
/**
 * @description 聚合操作参数类型（简单型）
 */
export type AggregateSimpleParamType<T extends object = object> =
  AggregateParamType<T, string | number | boolean>;
/**
 * @description 聚合操作参数类型（对象型）
 */
export type AggregateJsonParamType<T extends object = object> =
  AggregateParamType<T, SQLJsonObject | SQLJsonArray>;
/**
 * @description 聚合操作参数类型（对象型）
 */
export type AggregateObjectParamType<T extends object = object> =
  AggregateParamType<T, SQLJsonObject>;
/**
 * @description 聚合操作参数类型（对数组型）
 */
export type AggregateArrayParamType<T extends object = object> =
  AggregateParamType<T, SQLJsonArray>;
/**
 * @description 聚合操作参数类型（对象型）
 */
export type AggregateKeyParamType<T extends object = object> =
  AggregateParamType<T, never>;

/**
 * @description 聚合操作参数类型（数字型）
 */
export type AggregateNumberParamType<T extends object = any> =
  AggregateParamType<T, number>;
/**
 * @description 聚合操作参数类型（字符串型）
 */
export type AggregateStringParamType<T extends object> = AggregateParamType<
  T,
  string
>;
/**
 * @description 类聚合操作类型
 */
export type AggregateCommandLike<
  K extends object = any,
  T extends AggregateCommandType = any,
  V extends (
    | AggregateMixParamType<K>
    | AggregateMixParamType<K>[]
    | AggregateSeachOptions
  )[] = any
> = {
  $mode: AggregateCommandMode;
  $type: T;
  $value: V;
};

/**
 * @description 聚合操作
 */
export interface AggregateCommand<
  K extends object = any,
  T extends AggregateCommandType = any,
  V extends (
    | AggregateMixParamType<K>
    | AggregateMixParamType<K>[]
    | AggregateSeachOptions
  )[] = any
> {
  /**
   * @description 聚合模式
   * @param values
   */
  $mode: AggregateCommandMode;
  /**
   * @description 聚合值
   * @param values
   */
  $value: V | undefined;
  /**
   * @description 聚合类型
   * @param values
   */
  $type: T | undefined;
  /**
   * @description 逻辑操作符 且
   * @param values
   */
  and<
    P extends [
      AggregateMixParamType<K>,
      AggregateMixParamType<K>,
      ...AggregateMixParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateBooleanSimpleType.AND, P>;
  /**
   * @description 逻辑操作符 或
   * @param values
   */
  or<
    P extends [
      AggregateMixParamType<K>,
      AggregateMixParamType<K>,
      ...AggregateMixParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateBooleanSimpleType.OR, P>;
  /**
   * @description 逻辑操作符 非
   * @param values
   */
  not<P extends [AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateBooleanNegativeType.NOT, P>;
  /**
   * @description 逻辑操作符 都不
   * @param values
   */
  nor<
    P extends [
      AggregateMixParamType<K>,
      AggregateMixParamType<K>,
      ...AggregateMixParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateBooleanNegativeType.NOR, P>;
  /**
   * @description 逻辑操作符 不都
   * @param values
   */
  nand<
    P extends [
      AggregateMixParamType<K>,
      AggregateMixParamType<K>,
      ...AggregateMixParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateBooleanNegativeType.NAND, P>;
  /**
   * @description 比较操作符 比较
   * @param values
   */
  cmp<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.CMP, P>;
  /**
   * @description 比较操作符 等于
   * @param values
   */
  eq<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.EQ, P>;
  /**
   * @description 比较操作符 不等于
   * @param values
   */
  neq<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.NEQ, P>;
  /**
   * @description 比较操作符 小于
   * @param values
   */
  lt<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.LT, P>;
  /**
   * @description 比较操作符 小于等于
   * @param values
   */
  lte<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.LTE, P>;
  /**
   * @description 比较操作符 大于
   * @param values
   */
  gt<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.GT, P>;
  /**
   * @description 比较操作符 大于等于
   * @param values
   */
  gte<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareSimpleType.GTE, P>;
  /**
   * @description 比较作符  包含在给定的数据内
   * @param values
   */
  in<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>[]]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareFilterType.IN, P>;
  /**
   * @description 比较操作符 不包含在给定的数据内
   * @param values
   */
  nin<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>[]]>(
    ...values: P
  ): AggregateCommand<K, AggregateCompareFilterType.NIN, P>;
  /**
   * @description 绝对值
   * @param values
   */
  abs<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.ABS, P>;
  /**
   * @description 向上取整
   * @param values
   */
  ceil<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.CEIL, P>;
  /**
   * @description 向下取整
   * @param values
   */
  floor<P extends [] | [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.FLOOR, P>;
  /**
   * @description 四舍五入
   * @param values
   */
  round<P extends [] | [AggregateNumberParamType<K>] | []>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.ROUND, P>;
  /**
   * @description 底数e对数
   * @param values
   */
  ln<P extends [] | [AggregateNumberParamType<K>] | []>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.LN, P>;
  /**
   * @description 底数10对数
   * @param values
   */
  log10<P extends [] | [AggregateNumberParamType<K>] | []>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.LOG10, P>;
  /**
   * @description 正弦
   * @param values
   */
  sin<P extends [] | [AggregateNumberParamType<K>] | []>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.SIN, P>;
  /**
   * @description 反正弦
   * @param values
   */
  asin<P extends [] | [AggregateNumberParamType<K>] | []>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.ASIN, P>;
  /**
   * @description 余弦
   * @param values
   */
  cos<P extends [] | [AggregateNumberParamType<K>] | []>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.COS, P>;
  /**
   * @description 反余弦
   * @param values
   */
  acos<P extends [] | [AggregateNumberParamType<K>] | []>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.ACOS, P>;
  /**
   * @description 正切
   * @param values
   */
  tan<P extends [] | [AggregateNumberParamType<K>] | []>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.TAN, P>;
  /**
   * @description 反正切
   * @param values
   */
  atan<P extends [] | [AggregateNumberParamType<K>] | []>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.ATAN, P>;
  /**
   * @description 余切
   * @param values
   */
  cot<P extends [] | [AggregateNumberParamType<K>] | []>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.COT, P>;
  /**
   * @description 平方根
   * @param values
   */
  sqrt<P extends [] | [AggregateNumberParamType<K>] | []>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.SQRT, P>;
  /**
   * @description e的n次方
   * @param values
   */
  exp<P extends [] | [AggregateNumberParamType<K>] | []>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.EXP, P>;
  /**
   * @description 取符号
   * @param values
   */
  sign<P extends [] | [AggregateNumberParamType<K>] | []>(
    this: ThisType<AggregateCommandLike>,
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.SIGN, P>;
  /**
   * @description 对数
   * @param values
   */
  log<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.LOG, P>;
  /**
   * @description 取模
   * @param values
   */
  mod<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.MOD, P>;
  /**
   * @description 指数次幂
   * @param values
   */
  pow<P extends [AggregateNumberParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.POW, P>;
  /**
   * @description 数组最大值
   * @param values
   */
  greatest<
    P extends [
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      ...AggregateNumberParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.GREATEST, P>;
  /**
   * @description 数组最小值
   * @param values
   */
  least<
    P extends [
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      ...AggregateNumberParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationFunctionType.LEAST, P>;
  /**
   * @description 加法
   * @param values
   */
  add<
    P extends [
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      ...AggregateNumberParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationSimpleType.ADD, P>;
  /**
   * @description 减法
   * @param values
   */
  subtract<
    P extends [
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      ...AggregateNumberParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationSimpleType.SUBTRACT, P>;
  /**
   * @description  乘法
   * @param values
   */
  multiply<
    P extends [
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      ...AggregateNumberParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationSimpleType.MULTIPLY, P>;
  /**
   * @description 除法
   * @param values
   */
  divide<
    P extends [
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      ...AggregateNumberParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateCalculationSimpleType.DIVIDE, P>;
  /**
   * @description 字符串长度
   * @param values
   */
  length<P extends [AggregateStringParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.LENGTH, P>;
  /**
   * @description 字符串反转（逆序)
   * @param values
   */
  reverse<P extends [AggregateStringParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.REVERSE, P>;
  /**
   * @description 删除字符串左右两侧的空格
   * @param values
   */
  trim<P extends [AggregateStringParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.TRIM, P>;
  /**
   * @description 将字符串中的字母转换为小写
   * @param values
   */
  lower<P extends [AggregateStringParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.LOWER, P>;
  /**
   * @description 将字符串中的字母转换为大写
   * @param values
   */
  upper<P extends [AggregateStringParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.UPPER, P>;
  /**
   * @description  从左侧字截取符串
   * @param values 字符串 长度
   */
  left<P extends [AggregateStringParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.LEFT, P>;
  /**
   * @description 从右侧字截取符串
   * @param values 字符串 长度
   */
  right<P extends [AggregateStringParamType<K>, AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.RIGHT, P>;
  /**
   * @description 插入字符串
   * @param values 字符 开始位置 长度 插入字符
   */
  insert<
    P extends [
      AggregateStringParamType<K>,
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>,
      AggregateStringParamType<K>
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.INSERT, P>;
  /**
   * @description 替换字符串
   * @param values 字符 搜索字符 替换字符
   */
  replace<
    P extends [
      AggregateStringParamType<K>,
      AggregateStringParamType<K>,
      AggregateStringParamType<K>
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.REPLACE, P>;
  /**
   * @description  截取字符串
   * @param values 字符 开始位置 长度
   */
  substring<
    P extends [
      AggregateStringParamType<K>,
      AggregateNumberParamType<K>,
      AggregateNumberParamType<K>
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.SUBSTRING, P>;
  /**
   * @description 合并字符串
   * @param values
   */
  concat<
    P extends [
      AggregateStringParamType<K>,
      AggregateStringParamType<K>,
      ...AggregateStringParamType<K>[]
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateStringType.CONCAT, P>;
  /**
   * @description 平均值
   * @param values
   */
  avg<P extends [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateAccumulationType.AVG, P>;
  /**
   * @description 最大值
   * @param values
   */
  max<P extends [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateAccumulationType.MAX, P>;
  /**
   * @description 最小值
   * @param values
   */
  min<P extends [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateAccumulationType.MIN, P>;
  /**
   * @description 求和
   * @param values
   */
  sum<P extends [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateAccumulationType.SUM, P>;
  /**
   * @description 累加
   * @param values
   */
  count<P extends [AggregateNumberParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateAccumulationType.COUNT, P>;
  /**
   * @description 布尔表达式
   * @param values 判断条件 真值返回值 假值返回值
   * @param trueValue
   * @param falseVlue
   */
  cond<
    P extends [
      AggregateMixParamType<K>,
      AggregateMixParamType<K>,
      AggregateMixParamType<K>
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateConditionType.COND, P>;
  /**
   * @description 替换null表达式
   * @param values
   * @param replaceValue
   */
  ifnull<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateConditionType.IFNULL, P>;
  /**
   * @description json 包含
   * @param values json 匹配值
   */
  json_contains<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.CONTAINS, P>;
  /**
   * @description json 路径包含
   * @param values json option path destpath
   */
  json_contains_path<
    P extends [
      AggregateMixParamType<K>,
      AggregateSeachOptions,
      AggregateStringParamType<K>,
      AggregateStringParamType<K>
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.CONTAINS_PATH, P>;
  /**
   * @description json 查找
   * @param values json option searchValue
   */
  json_search<
    P extends [
      AggregateMixParamType<K>,
      AggregateSeachOptions,
      AggregateMixParamType<K>
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.SEARCH, P>;
  /**
   * @description json 提取路径
   * @param values json paths
   */
  json_extract<
    P extends [AggregateMixParamType<K>, AggregateStringParamType<K>[]]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.EXTRACT, P>;
  /**
   * @description json 合并，保留重复的键
   * @param values
   */
  json_merge_preserve<P extends AggregateMixParamType<K>[]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.MERGE_PRESERVE, P>;
  /**
   * @description json 合并，替换重复键的值
   * @param values
   */
  json_merge_patch<P extends AggregateMixParamType<K>[]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.MERGE_PATCH, P>;
  /**
   * @description json 设置
   * @param values json setValue
   */
  json_set<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.SET, P>;
  /**
   * @description json 插入
   * @param values json insertValue
   */
  json_insert<
    P extends [AggregateMixParamType<K>, AggregateObjectParamType<K>]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.INSERT, P>;
  /**
   * @description json 替换
   * @param values json replaceValue
   */
  json_replace<
    P extends [AggregateMixParamType<K>, AggregateObjectParamType<K>]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.REPLACE, P>;
  /**
   * @description json 移除
   * @param values json path
   */
  json_remove<
    P extends [AggregateMixParamType<K>, AggregateStringParamType<K>]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.REMOVE, P>;
  /**
   * @description json 向数组尾部追加数据
   * @param values json value path
   */
  json_array_append<
    P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.ARRAY_APPEND, P>;
  /**
   * @description json 向数组插入数据
   * @param values json value path
   */
  json_array_insert<
    P extends [
      AggregateMixParamType<K>,
      AggregateMixParamType<K>,
      AggregateStringParamType<K>
    ]
  >(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.ARRAY_INSERT, P>;
  /**
   * @description json 对象
   * @param values
   */
  json_object<P extends [AggregateObjectParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.OBJECT, P>;
  /**
   * @description json 数组
   * @param values
   */
  json_array<P extends [AggregateArrayParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.ARRAY, P>;
  /**
   * @description json 字段类型
   * @param values
   */
  json_type<P extends [AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.TYPE, P>;
  /**
   * @description json 键
   * @param values
   */
  json_keys<P extends [AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.KEYS, P>;
  /**
   * @description json 深度
   * @param values
   */
  json_depth<P extends [AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.DEPTH, P>;
  /**
   * @description json 长度
   * @param values json path
   */
  json_length<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.LENGTH, P>;
  /**
   * @description json 验证
   * @param values
   */
  json_valid<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.VALID, P>;
  /**
   * @description json 美化
   * @param values
   */
  json_pretty<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.PRETTY, P>;
  /**
   * @description json 键
   * @param values
   */
  json_quote<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.QUOTE, P>;
  /**
   * @description json 取消引用
   * @param values
   */
  json_unquote<P extends [AggregateMixParamType<K>, AggregateMixParamType<K>]>(
    ...values: P
  ): AggregateCommand<K, AggregateJsonType.UNQUOTE, P>;
}
