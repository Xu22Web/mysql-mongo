import { Connection, ConnectionConfig, Pool, PoolConfig } from 'mysql';
import { Collection } from '../collection/interface';
import { Command } from '../command/interface';
import { ConnectionController } from '../connectionController/interface';
import {
  DatabaseRegExp,
  DatabaseRegExpLike,
} from '../sql/sqlCondition/regExp/interface';
import { Transaction } from '../transaction/interface';
/**
 * @description 数据库配置
 */
export type DatabaseConfig<T extends DatabaseType> = {
  /**
   * @description 连接配置
   */
  connConfig: T extends 'single'
    ? ConnectionConfig
    : T extends 'pool'
    ? PoolConfig
    : never;
  /**
   * @description 连接类型
   */
  type: T;
  /**
   * @description 是否启用字符串json化
   */
  jsonParse?: boolean;
  /**
   * @description tinyint(1) 转换为 boolean
   */
  tinyIntToBool?: boolean;
  /**
   * @description 调试模式
   */
  debug?: boolean;
};
/**
 * @description 数据库类型
 */
export type DatabaseType = 'single' | 'pool';
/**
 * @description 数据库
 */
export interface Database<T extends DatabaseType> {
  $config: DatabaseConfig<T>;
  $conn?: Connection | Pool;
  $pool?: Pool;
  /**
   * @description 连接控制器
   */
  connController: ConnectionController<T>;
  /**
   * @description 数据库操作符
   */
  command: Command;
  /**
   * @description 构造正则表达式
   * @param regexp
   */
  RegExp(regexp: DatabaseRegExpLike | RegExp): DatabaseRegExp;
  /**
   * @description 获取集合
   * @param name
   */
  collection<T = any>(name: string): Collection<T>;
  /**
   * @description 发起事务
   * @param callback
   */
  runTransaction(callback: (transation: Transaction) => any): Promise<any>;
  /**
   * @description 开始事务
   */
  startTransaction(): Promise<Transaction>;
  /**
   * @description 创建连接池
   * @param config
   */
  createPool(config: PoolConfig): Pool;
}
