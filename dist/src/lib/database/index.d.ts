import { Connection, Pool } from 'mysql';
import { Collection } from '../collection/interface';
import { Command } from '../command/interface';
import { ConnectionController } from '../connectionController/interface';
import { Like, LikeConfig } from '../sql/sqlCondition/like/interface';
import { RegExpLike, RegExpLikeConfig } from '../sql/sqlCondition/regExpLike/interface';
import { Transaction } from '../transaction/interface';
import { Database, DatabaseConfig, DatabaseType } from './interface';
/**
 * @description MySQL 数据库
 */
declare class MySQLDatabase<T extends DatabaseType> implements Database<T> {
    command: Command;
    connController: ConnectionController<T>;
    $config: DatabaseConfig<T>;
    $conn?: Connection;
    $pool?: Pool;
    constructor(config: DatabaseConfig<T>);
    collection<T extends object = object>(name: string): Collection<T>;
    RegExp(regexp: RegExp | RegExpLikeConfig): RegExpLike;
    Like(like: LikeConfig): Like;
    createPool(): Pool;
    runTransaction(callback: (transaction: Transaction) => any): Promise<any>;
    startTransaction(): Promise<Transaction>;
}
/**
 * @description 实例化 MySQL 数据库
 */
declare const database: <T extends DatabaseType>(config: DatabaseConfig<T>) => Database<T>;
export { database, MySQLDatabase };
