import { Connection, PoolConnection } from 'mysql';
import { Collection } from '../collection/interface';
import { Database, DatabaseType } from '../database/interface';
import { Transaction } from './interface';
declare class MySQLTransaction implements Transaction {
    $database: Database<DatabaseType>;
    $conn: Connection | PoolConnection;
    constructor(conn: Connection, database: Database<DatabaseType>);
    collection<T = any>(name: string): Collection<T>;
    commit(reason: any): Promise<void>;
    rollback(reason: any): Promise<void>;
}
export { MySQLTransaction };
