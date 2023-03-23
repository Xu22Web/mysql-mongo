import { Connection, PoolConnection } from 'mysql';
import { Collection } from '../collection/interface';
import { Database, DatabaseType } from '../database/interface';

export interface Transaction {
  $database: Database<DatabaseType>;
  $conn: Connection | PoolConnection;
  /**
   * @description 提交事务
   * @param reason
   */
  commit(reason?: any): Promise<void>;
  /**
   * @description 回滚事务
   * @param reason
   */
  rollback(reason?: any): Promise<void>;
  /**
   * @description 集合
   * @param name
   */
  collection<T extends object = object>(name: string): Collection<T>;
}
