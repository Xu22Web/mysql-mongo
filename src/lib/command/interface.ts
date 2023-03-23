import { AggregateCommand } from '../aggregateCommand/interface';
import { SQLJson } from '../sql/sqlGenerator/interface';
/**
 * @description 无类型
 */
export enum CommandNoneType {
  /**
   * @description
   */
  NONE = 'none',
}
/**
/**
 * @description 逻辑操作符
 */
export enum CommandLogicSimpleType {
  /**
   * @description 逻辑操作符 且
   */
  AND = 'and',
  /**
   * @description 逻辑操作符 或
   */
  OR = 'or',
  /**
   * @description 逻辑操作符 非
   */
}
/**
 * @description 否定逻辑操作符
 */
export enum CommandLogicNegativeType {
  /**
   * @description 逻辑操作符 非
   */
  NOT = '!',
  /**
   * @description 逻辑操作符 都不
   */
  NOR = '!or',
  /**
   * @description 逻辑操作符 都不
   */
  NAND = '!and',
}
/**
 * @description 简单比较操作
 */
export enum CommandCompareSimpleType {
  /**
   * @description 比较操作符 等于
   */
  EQ = '=',
  /**
   * @description 比较操作符 不等于
   */
  NEQ = '!=',
  /**
   * @description 比较操作符 小于
   */
  LT = '<',
  /**
   * @description 比较操作符 小于等于
   */
  LTE = '<=',
  /**
   * @description 比较操作符 大于
   */
  GT = '>',
  /**
   * @description 比较操作符 大于等于
   */
  GTE = '>=',
}
/**
 * @description 筛选比较操作
 */
export enum CommandCompareFilterType {
  /**
   * @description 比较操作符 在给定的数组内
   */
  IN = 'in',
  /**
   * @description 比较操作符 不在给定的数组内
   */
  NIN = 'not in',
}
/**
 * @description 逻辑操作符
 */
export type CommandLogicType =
  | CommandLogicSimpleType
  | CommandLogicNegativeType;
/**
 * @description 比较操作符
 */
export type CommandCompareType =
  | CommandCompareSimpleType
  | CommandCompareFilterType;
/**
 * @description 命令操作符
 */
export type CommandType =
  | CommandNoneType
  | CommandLogicType
  | CommandCompareType;
/**
 * @description 命令模式
 */
export type CommandMode = 'command';
/**
 * @description 命令类型
 */
export type CommandParamsType<T> = Command | AggregateCommand | T;

/**
 * @description 命令操作参数类型（混合型）
 */
export type CommandMixParamType = CommandParamsType<
  string | number | boolean | SQLJson | null
>;
/**
 * @description 命令操作参数类型（数字型）
 */
export type CommandNumberParamType = CommandParamsType<number>;
/**
 * @description 命令操作参数类型（字符串型）
 */
export type CommandStringParamType = CommandParamsType<string>;
/**
 * @description 类命令操作类型
 */
export type CommandLike = Partial<CommandProps>;
/**
 * @description 命令操作属性
 */
export interface CommandProps {
  /**
   * @description 命令模式
   */
  $mode: CommandMode;
  /**
   * @description 命令类型
   */
  $type: CommandType;
  /**
   * @description 命令值
   */
  $value: CommandMixParamType[];
}
/**
 * @description 命令操作符
 */
export interface Command extends CommandLike {
  /**
   * @description 命令模式
   */
  $mode: CommandMode;
  /**
   * @description 命令类型
   */
  $type: CommandType | undefined;
  /**
   * @description 命令值
   */
  $value: CommandMixParamType[] | undefined;
  /**
   * @description 聚合操作
   */
  aggregate<T extends object = any>(): AggregateCommand<T>;
  /**
   * @description 逻辑操作符 且
   * @param value
   * @param rest
   */
  and(value: CommandMixParamType[]): Command;
  and(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
  /**
   * @description 逻辑操作符 或
   * @param value
   * @param rest
   */
  or(value: CommandMixParamType[]): Command;
  or(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
  /**
   * @description 逻辑操作符 非
   * @param value
   */
  not(value: Command): Command;
  /**
   * @description 逻辑操作符 都不
   * @param value
   * @param rest
   */
  nor(value: CommandMixParamType[]): Command;
  nor(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
  /**
   * @description 逻辑操作符 不都
   * @param value
   * @param rest
   */
  nand(value: CommandMixParamType[]): Command;
  nand(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
  /**
   * @description 逻辑操作符 等于
   * @param value
   */
  eq(value: CommandMixParamType): Command;
  /**
   * @description 逻辑操作符 不等于
   * @param value
   */
  neq(value: CommandMixParamType): Command;
  /**
   * @description 逻辑操作符 小于
   * @param value
   */
  lt(value: CommandNumberParamType): Command;
  /**
   * @description 逻辑操作符 小于等于
   * @param value
   */
  lte(value: CommandNumberParamType): Command;
  /**
   * @description 逻辑操作符 大于
   * @param value
   */
  gt(value: CommandNumberParamType): Command;
  /**
   * @description 逻辑操作符 大于等于
   * @param value
   */
  gte(value: CommandNumberParamType): Command;
  /**
   * @description 筛选操作符  筛选 在给定的数组内
   * @param value
   */
  in(value: CommandMixParamType[]): Command;
  in(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
  /**
   * @description 筛选操作符 筛选 不在给定的数组内
   * @param value
   */
  nin(value: CommandMixParamType[]): Command;
  nin(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
}
