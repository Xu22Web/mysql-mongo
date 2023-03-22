import { Connection, Pool } from 'mysql';
import { Collection } from '../collection/interface';
import { Command } from '../command/interface';
import { ConnectionController } from '../connectionController/interface';
import { DatabaseRegExp, DatabaseRegExpLike } from '../sql/sqlCondition/regExp/interface';
import { Transaction } from '../transaction/interface';
import { Database, DatabaseConfig, DatabaseType } from './interface';
declare class MySQLDatabase<T extends DatabaseType> implements Database<T> {
    command: Command;
    connController: ConnectionController<T>;
    $config: DatabaseConfig<T>;
    $conn?: Connection;
    $pool?: Pool;
    constructor(config: DatabaseConfig<T>);
    collection<T = any>(name: string): Collection<T>;
    RegExp(regexp: RegExp | DatabaseRegExpLike): DatabaseRegExp;
    createPool(): Pool;
    runTransaction(callback: (transaction: Transaction) => any): Promise<any>;
    startTransaction(): Promise<Transaction>;
}
/**
 * @description 实例化 MySQL 数据库
 */
declare const database: <T extends DatabaseType>(config: DatabaseConfig<T>) => Database<T>;
export { database, MySQLDatabase };
