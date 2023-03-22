import { Connection, FieldInfo, PoolConnection } from 'mysql';
import { Database, DatabaseType } from '../database/interface';
import { ConnectionController } from './interface';
/**
 * @description mysql连接控制
 * @example
 * const controller = new MySQLConnectionController(database: Database)
 */
declare class MySQLConnectionController<T extends DatabaseType> implements ConnectionController<T> {
    $type: T;
    $database: Database<T>;
    constructor(database: Database<T>);
    create(database: Database<T>): ConnectionController<T>;
    getPoolConn(): Promise<PoolConnection>;
    getSingleConn(): Promise<Connection>;
    getConn(): Promise<Connection | PoolConnection>;
    execSQL(conn: PoolConnection | Connection, sql: string, values?: any[]): Promise<{
        results: any;
        fields: FieldInfo[] | undefined;
    }>;
    release(conn: PoolConnection | Connection): void;
}
export { MySQLConnectionController };
