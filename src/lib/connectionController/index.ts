import {
  Connection,
  createConnection,
  FieldInfo,
  Pool,
  PoolConnection,
} from 'mysql';
import typeOf from '../../utils/typeOf';
import { Database, DatabaseType } from '../database/interface';
import { ConnectionController } from './interface';

/**
 * @description MySQL 连接控制
 * @example
 * const controller = new MySQLConnectionController(database: Database)
 */
class MySQLConnectionController<T extends DatabaseType>
  implements ConnectionController<T>
{
  $type: T;
  $database: Database<T>;
  constructor(database: Database<T>) {
    this.$database = database;
    this.$type = database.$config.type;
  }
  create(database: Database<T>): ConnectionController<T> {
    const controller = new MySQLConnectionController(database);
    return controller;
  }
  async getPoolConn(): Promise<PoolConnection> {
    return new Promise((resolve, reject) => {
      // 连接不存在
      if (!this.$database.$pool) {
        reject("connection pool of database don't exist");
        return;
      }
      // 连接非连接池
      if (this.$database.$config.type !== 'pool') {
        reject('database config `type` must be `pool`');
        return;
      }
      // 连接池
      const pool = <Pool>this.$database.$pool;
      // 获取连接
      pool.getConnection((err, conn) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(conn);
      });
    });
  }
  async getSingleConn(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      // 连接非单连接
      if (this.$database.$config.type !== 'single') {
        reject('database config type must be `single`');
        return;
      }
      // 连接
      const conn = createConnection(this.$database.$config.connConfig);
      // 获取连接
      conn.connect((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(conn);
      });
    });
  }
  getConn(): Promise<Connection | PoolConnection> {
    // 单连接
    if (this.$type === 'single') {
      return this.getSingleConn();
    }
    // 连接池
    if (this.$type === 'pool') {
      return this.getPoolConn();
    }
    throw new Error('Failed to obtain a connection!');
  }
  async execSQL(
    conn: PoolConnection | Connection,
    sql: string,
    values?: any[]
  ) {
    // 调试模式
    this.$database.$config.debug && console.log({ sql, values });
    return new Promise<{ results: any; fields: FieldInfo[] | undefined }>(
      async (resolve, reject) => {
        if (typeOf.isNotEmptyArr(values)) {
          // 执行sql语句
          conn.query(sql, values, (err, results, fields) => {
            if (err) {
              this.release(conn);
              reject(err);
              return;
            }
            resolve({ results, fields: fields || [] });
          });
          return;
        }
        // 执行sql语句
        conn.query(sql, (err, results, fields) => {
          if (err) {
            this.release(conn);
            reject(err);
            return;
          }
          resolve({ results, fields: fields });
        });
      }
    );
  }
  release(conn: PoolConnection | Connection) {
    if (conn) {
      if (this.$type === 'pool') {
        const poolConn = <PoolConnection>conn;
        poolConn.release();
      }
      if (this.$type === 'single') {
        const singleConn = <Connection>conn;
        singleConn.end();
      }
    }
  }
}
export { MySQLConnectionController };
