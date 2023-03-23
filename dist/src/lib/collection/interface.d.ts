import { Connection, FieldInfo, OkPacket } from 'mysql';
import { SpecificType, StringExtendsType } from '../../utils/utilsTypes';
import { Aggregate } from '../aggregate/interface';
import { AggregateCommand, AggregateKey } from '../aggregateCommand/interface';
import { CommandLike } from '../command/interface';
import { Database, DatabaseType } from '../database/interface';
import { SQLJson, SQLJsonArray, SQLJsonObject, SQLLike, SQLLimit, SQLRegex, SQLSkip } from '../sql/sqlGenerator/interface';
/**
 * @description 记录数据
 */
export type RowData<T> = {
    [P in keyof T]?: T[P] extends string | number | boolean | null | SQLJson ? T[P] : never;
};
/**
 * @description 记录数据
 */
export type InsertData<T> = Partial<ConditionKey<T> | ConditionJsonObjectKey<T> | ConditionJsonArrayKey<T> | RowData<T>>;
/**
 * @description 过滤
 */
export type Filter<T> = {
    [P in keyof T]?: boolean;
} | {
    [key: string]: boolean;
};
/**
 * @description 筛选条件
 */
export type Where<T> = ConditionExtendsType<T> | ConditionExtendsType<ConditionKey<T>> | ConditionExtendsType<ConditionJsonObjectKey<T>> | ConditionExtendsType<ConditionJsonArrayKey<T>>;
/**
 * @description 类型扩展
 */
export type ConditionExtendsType<T> = {
    [P in keyof T]?: (T[P] extends number | boolean | SQLJson ? T[P] : T[P] extends string ? string | RegExp | SQLRegex | SQLLike : never) | CommandLike | null;
};
/**
 * @description 普通类型数组树
 */
export type JsonBaseArrayTree = (string | number | boolean | null | JsonBaseArrayTree)[];
/**
 * @description 对象类型数组树
 */
export type JsonObjectArrayTree = (SQLJsonObject | JsonObjectArrayTree)[];
/**
 * @description 数组键
 */
export type JsonArrayKey<T extends string, K extends SQLJsonArray> = (K extends (infer P extends JsonBaseArrayTree)[] ? JsonArrayIdentifier<JsonArrayKey<T, P>> : K extends (infer P extends SQLJsonObject)[] ? `${JsonObjectKey<JsonArrayIdentifier<T>, P>}` : K extends (infer P extends JsonObjectArrayTree)[] ? `${JsonArrayKey<JsonArrayIdentifier<T>, P>}` : never) | JsonArrayIdentifier<T>;
/**
 * @description 对象键
 */
export type JsonObjectKey<T extends string, K extends SQLJsonObject> = {
    [P in keyof K]: P extends string ? K[P] extends string | number | boolean | null ? JsonObjectIdentifier<T, P> : K[P] extends SQLJsonArray ? JsonObjectIdentifier<T, JsonArrayKey<P, K[P]>> | JsonObjectIdentifier<T, P> : K[P] extends SQLJsonObject ? JsonObjectIdentifier<T, JsonObjectKey<P, K[P]>> | JsonObjectIdentifier<T, P> : never : never;
}[keyof K];
/**
 * @description json 对象标识符
 */
export type JsonObjectIdentifier<T extends string = string, P extends string = string> = `${T}.${P}`;
/**
 * @description json 数组标识符
 */
export type JsonArrayIdentifier<T extends string = string> = `${T}[${number}]`;
/**
 * @description 解析对象键
 */
export type ResolveJsonObjectKey<T extends SQLJsonObject, K extends string> = K extends JsonObjectIdentifier<infer P, infer Q> ? P extends keyof T ? Q extends keyof T[P] ? T[P] extends SQLJsonObject ? ResolveJsonObjectKey<T[P], Q> : never : Q extends `${JsonArrayIdentifier<infer M>}${string}` ? M extends keyof T[P] ? T[P][M] extends SQLJsonArray ? ResolveJsonArrayKey<T[P][M], Q> : never : never : never : Q extends keyof ResolveJsonObjectKey<T, P> ? ResolveJsonObjectKey<T, P> : never : K extends `${JsonArrayIdentifier<infer P>}${string}` ? P extends keyof T ? T[P] extends SQLJsonArray ? ResolveJsonArrayKey<T[P], K> : never : never : K extends keyof T ? T[K] : never;
/**
 * @description 解析数组键
 */
export type ResolveJsonArrayKey<T extends SQLJsonArray, K extends string> = K extends `${JsonArrayIdentifier}${infer Q}` ? Q extends '' ? T extends (infer M extends string | number | boolean | SQLJson | null)[] ? M : never : Q extends JsonArrayIdentifier<''> ? T extends (infer M extends JsonBaseArrayTree)[] ? ResolveJsonArrayKey<M, Q> : never : Q extends JsonObjectIdentifier<infer M, infer N> ? M extends '' ? T extends (infer L extends SQLJsonObject)[] ? ResolveJsonObjectKey<L, N> : never : T extends (infer L extends JsonObjectArrayTree)[] ? ResolveJsonArrayKey<L, Q> : never : never : never;
/**
 * @description 条件对象类型键值
 */
export type ConditionJsonObjectKey<T> = {
    [P in AggregateKey<JsonObjectKey<SpecificType<T, SQLJsonObject>, T[SpecificType<T, SQLJsonObject>] extends SQLJsonObject ? T[SpecificType<T, SQLJsonObject>] : never>>]: P extends AggregateKey<infer Q> ? ResolveJsonObjectKey<T extends SQLJsonObject ? T : never, Q> : never;
};
/**
 * @description 条件数组类型键值
 */
export type ConditionJsonArrayKey<T> = {
    [P in AggregateKey<JsonArrayKey<SpecificType<T, SQLJsonArray>, T[SpecificType<T, SQLJsonArray>] extends SQLJsonArray ? T[SpecificType<T, SQLJsonArray>] : never>>]: P extends AggregateKey<infer Q> ? Q extends `${JsonArrayIdentifier<infer M>}${string}` ? M extends keyof T ? T[M] extends SQLJsonArray ? ResolveJsonArrayKey<T[M], Q> : never : never : never : never;
};
/**
 * @description 条件类型键值
 */
export type ConditionKey<T> = {
    [P in AggregateKey<StringExtendsType<keyof T>>]: P extends AggregateKey<`${infer U}`> ? U extends keyof T ? T[U] : never : never;
};
/**
 * @description 分组
 */
export type GroupBy = string[];
/**
 * @description 分组条件
 */
export type Having<T extends object> = AggregateCommand<T>[];
/**
 * @description 排序方法
 */
export type OrderBy<T> = {
    [P in keyof T]?: 'asc' | 'desc' | '';
} | {
    [key: string]: 'asc' | 'desc' | '';
};
/**
 * @description 执行结果
 */
export type QueryResult<T> = {
    result: T;
    status: boolean;
};
/**
 * @description 行数据
 */
export type RowDataPacket = {
    TABLE_CATALOG: string;
    TABLE_SCHEMA: string;
    TABLE_NAME: string;
    COLUMN_NAME: string;
    ORDINAL_POSITION: number;
    COLUMN_DEFAULT: null | string | number;
    IS_NULLABLE: string;
    DATA_TYPE: string;
    CHARACTER_MAXIMUM_LENGTH: null | number;
    CHARACTER_OCTET_LENGTH: null | number;
    NUMERIC_PRECISION: number;
    NUMERIC_SCALE: number;
    DATETIME_PRECISION: null | string | number;
    CHARACTER_SET_NAME: null | string;
    COLLATION_NAME: null | string;
    COLUMN_TYPE: string;
    COLUMN_KEY: string;
    EXTRA: string;
    PRIVILEGES: string;
    COLUMN_COMMENT: string;
    GENERATION_EXPRESSION: string;
};
/**
 * @description 配置
 */
export type CollectionConfig = {
    /**
     * @description 是否启用字符串json化
     */
    jsonParse?: boolean;
    /**
     * @description tinyint(1) 转换为 boolean
     */
    tinyIntToBool?: boolean;
    /**
     * @description 模式
     */
    mode: 'common' | 'transaction';
};
/**
 * @description 集合属性
 */
export type CollectionProps<T> = {
    $name: string;
    $filter?: Filter<T>;
    $where?: Where<T>;
    $skip?: number;
    $orderby?: OrderBy<T>;
    $limit?: number;
};
/**
 * @description 集合
 */
export interface Collection<T extends object> {
    /**
     * @description 集合名
     */
    $name: string;
    /**
     * @description 筛选字段
     */
    $filter?: Filter<T>;
    /**
     * @description 筛选条件
     */
    $where?: Where<T>;
    /**
     * @description 排序方法
     */
    $orderby?: OrderBy<T>;
    /**
     * @description 跳过几条记录
     */
    $skip?: number;
    /**
     * @description 最大条数
     */
    $limit?: number;
    /**
     * @description 配置
     */
    $config: CollectionConfig;
    /**
     * @description 当前连接
     */
    $conn?: Connection;
    /**
     * @description 数据库
     */
    $database: Database<DatabaseType>;
    /**
     * @description 创建集合
     * @param props
     */
    create(props: CollectionProps<T>): Collection<T>;
    /**
     * @description 聚合操作
     */
    aggregate(): Aggregate<T>;
    /**
     * @description 筛选字段
     * @param filter 过滤
     * @example field({id:true})
     */
    field(filter: Filter<T>): Collection<T>;
    /**
     * @description 筛选
     * @param data
     */
    where(data: Where<T>): Collection<T>;
    /**
     * @description 排序
     * @param orderBy
     */
    orderBy(orderBy: OrderBy<T>): Collection<T>;
    /**
     * @description 随机排序
     */
    random(): Collection<T>;
    /**
     * @description 限制记录条数
     * @param limit
     */
    limit(limit: SQLLimit): Collection<T>;
    /**
     * @description 跳过几条记录
     * @param skip
     */
    skip(skip: SQLSkip): Collection<T>;
    /**
     * @description 结果记录数
     */
    count(): Promise<QueryResult<number>>;
    /**
     * @description 获取数据
     * @returns
     */
    get(): Promise<QueryResult<RowData<T[]>>>;
    /**
     * @description 添加数据
     * @param data
     */
    add(data: RowData<T>): Promise<QueryResult<OkPacket>>;
    /**
     * @description 移除数据
     */
    remove(): Promise<QueryResult<OkPacket>>;
    /**
     * @description 更新数据
     * @param data
     */
    update(data: InsertData<T>): Promise<QueryResult<OkPacket>>;
    /**
     * @description 设置数据
     * @param data
     */
    set(data: InsertData<T>): Promise<QueryResult<OkPacket>>;
    /**
     * @description 获取字段
     */
    getFields(filter?: Filter<T>): Promise<RowDataPacket[]>;
    /**
     * @description 执行sql
     * @param sql
     */
    execSQL(sql: string): Promise<{
        results: any;
        fields: FieldInfo[] | undefined;
    }>;
}
