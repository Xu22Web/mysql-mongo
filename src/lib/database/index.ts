import { Connection, createPool, Pool } from 'mysql';
import { MySQLCollection } from '../collection';
import { Collection } from '../collection/interface';
import { cmd } from '../command';
import { Command } from '../command/interface';
import { MySQLConnectionController } from '../connectionController';
import { ConnectionController } from '../connectionController/interface';
import { MySQLRegExpLike } from '../sql/sqlCondition/regExpLike';
import {
  RegExpLike,
  RegExpLikeConfig,
} from '../sql/sqlCondition/regExpLike/interface';
import { MySQLTransaction } from '../transaction';
import { Transaction } from '../transaction/interface';
import { Database, DatabaseConfig, DatabaseType } from './interface';

/**
 * @description MySQL 数据库
 */
class MySQLDatabase<T extends DatabaseType> implements Database<T> {
  command: Command = cmd;
  connController: ConnectionController<T>;
  $config: DatabaseConfig<T>;
  $conn?: Connection;
  $pool?: Pool;
  constructor(config: DatabaseConfig<T>) {
    const { type } = config;
    // 配置
    this.$config = config;
    // 连接池
    if (type === 'pool') {
      this.$pool = this.createPool();
    }
    // 获取连接控制
    this.connController = new MySQLConnectionController(this);
  }
  collection<T extends object = object>(name: string): Collection<T> {
    // 配置
    const { jsonParse, tinyIntToBool } = this.$config;
    const newCollection = new MySQLCollection<T>(
      this,
      { $name: name },
      { jsonParse, tinyIntToBool, mode: 'common' }
    );
    return newCollection;
  }
  RegExp(regexp: RegExp | RegExpLikeConfig): RegExpLike {
    const newRegExp = new MySQLRegExpLike();
    return newRegExp.create(regexp);
  }
  createPool(): Pool {
    // 创建连接池
    const pool = createPool(this.$config.connConfig);
    return pool;
  }
  async runTransaction(
    callback: (transaction: Transaction) => any
  ): Promise<any> {
    // 获取事务
    const transaction = await this.startTransaction();
    const res = await callback(transaction);
    return res;
  }
  async startTransaction(): Promise<Transaction> {
    // 获取连接
    const conn = await this.connController.getConn();
    return new Promise<Transaction>((resolve, reject) => {
      conn.beginTransaction((err: any) => {
        if (err) {
          reject(err);
          return;
        }
        // 事务
        const transation = new MySQLTransaction(conn, this);
        resolve(transation);
      });
    });
  }
}

/**
 * @description 实例化 MySQL 数据库
 */
const database = <T extends DatabaseType>(
  config: DatabaseConfig<T>
): Database<T> => {
  // 实例化 MySQL 数据库
  const db = new MySQLDatabase(config);
  return db;
};

export { database, MySQLDatabase };
