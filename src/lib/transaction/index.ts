import { Connection, PoolConnection } from 'mysql';
import { MySQLCollection } from '../collection';
import { Collection } from '../collection/interface';
import { Database, DatabaseType } from '../database/interface';
import { Transaction } from './interface';

/**
 * @description MySQl 事务
 */
class MySQLTransaction implements Transaction {
  $database: Database<DatabaseType>;
  $conn: Connection | PoolConnection;
  constructor(conn: Connection, database: Database<DatabaseType>) {
    this.$database = database;
    this.$conn = conn;
  }
  collection<T extends object = object>(name: string): Collection<T> {
    const { jsonParse, tinyIntToBool } = this.$database.$config;
    const newCollection = new MySQLCollection<T>(
      this.$database,
      { $name: name },
      { jsonParse, tinyIntToBool, mode: 'transaction' },
      this.$conn
    );
    return newCollection;
  }
  commit(reason: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.$conn.commit((err) => {
        if (err) {
          reject(err);
          return;
        }
        this.$database.connController.release(this.$conn);
        resolve(reason);
      });
    });
  }
  rollback(reason: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.$conn.rollback(() => {
        resolve(reason);
      });
    });
  }
}

export { MySQLTransaction };
