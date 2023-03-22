import { Connection, FieldInfo, Pool, PoolConnection } from 'mysql';
import { Database, DatabaseType } from '../database/interface';
/**
 * @description 连接控制器
 */
interface ConnectionController<T extends DatabaseType> {
  $type: T;
  $database: Database<T>;
  create(database: Database<T>): ConnectionController<T>;
  /**
   * @description 执行sql
   * @param sql
   * @param values
   */
  execSQL(
    conn: PoolConnection | Connection,
    sql: string,
    values?: any[]
  ): Promise<{ results: any; fields: FieldInfo[] | undefined }>;
  /**
   * @description 释放连接
   * @param conn
   */
  release(conn: Connection): void;
  /**
   * @description 获取单个连接
   */
  getSingleConn(): Promise<Connection>;
  /**
   * @description 获取连接池
   */
  getPoolConn(pool: Pool): Promise<PoolConnection>;
  /**
   * @description 获取连接
   */
  getConn(): Promise<Connection | PoolConnection>;
}

export { ConnectionController };
