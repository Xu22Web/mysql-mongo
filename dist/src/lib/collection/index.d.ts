import { Connection, FieldInfo, PoolConnection } from 'mysql';
import { Aggregate } from '../aggregate/interface';
import { Database, DatabaseType } from '../database/interface';
import { Collection, CollectionConfig, CollectionProps, Filter, OkPacket, OrderBy, QueryResult, RowData, RowDataPacket, Where } from './interface';
/**
 * @description mysql 集合
 * @example // 获取数据
 * new MySQLCollection<T>(name)
 * .where(where)
 * .get()
 * @example // 添加数据
 * new MySQLCollection<T>(name)
 * .where(where)
 * .add(data)
 * @example // 删除数据
 * new MySQLCollection<T>(name)
 * .where(where)
 * .remove()
 * @example // 修改数据数据
 * new MySQLCollection<T>(name)
 * .where(where)
 * .update(data)
 */
declare class MySQLCollection<T> implements Collection<T> {
    $name: string;
    $filter?: Filter<T>;
    $where?: Where<T>;
    $orderby?: OrderBy<T>;
    $skip?: number;
    $limit?: number;
    $config: CollectionConfig;
    $conn?: Connection;
    $database: Database<DatabaseType>;
    constructor(database: Database<DatabaseType>, props: CollectionProps<T>, config: CollectionConfig, conn?: Connection | PoolConnection);
    create(props: Omit<CollectionProps<T>, '$name'>): Collection<T>;
    aggregate(): Aggregate<T>;
    field(filter: Filter<T>): Collection<T>;
    where(where: Where<T>): Collection<T>;
    orderBy(orderBy: OrderBy<T>): Collection<T>;
    random(): Collection<T>;
    limit(limit: number): Collection<T>;
    skip(skip: number): Collection<T>;
    execSQL(sql: string): Promise<{
        results: any;
        fields: FieldInfo[] | undefined;
    }>;
    count(): Promise<QueryResult<number>>;
    get(): Promise<QueryResult<RowData<T[] | []>>>;
    add(data: RowData<T>): Promise<QueryResult<OkPacket | null>>;
    remove(): Promise<QueryResult<OkPacket | null>>;
    update(data: RowData<T>): Promise<QueryResult<OkPacket | null>>;
    set(data: RowData<T>): Promise<QueryResult<OkPacket | null>>;
    getFields(filter?: Filter<T>): Promise<RowDataPacket[]>;
}
export { MySQLCollection };
