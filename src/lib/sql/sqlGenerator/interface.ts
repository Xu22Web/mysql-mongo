import { EnumToUnion } from '../../../utils/utilsTypes';
import {
  AggregateCommandLike,
  AggregateKey
} from '../../aggregateCommand/interface';
import { CommandLike } from '../../command/interface';
import { DeleteClipName } from './delete/interface';
import { InsertClipName } from './insert/interface';
import { SelectClipName } from './select/interface';
import { UpdateClipName } from './update/interface';

/**
 * @description sql 生成器
 */
export interface SQLGenerator {
  /**
   * @description sql 类型
   */
  $type: SQLType;
  /**
   * @description 集合名
   */
  $name?: SQLName | SQLAlias;
  /**
   * @description 获取片段属性值
   * @param clipName
   */
  get(clipName: ClipName): PropValues;
  /**
   * @description 设置片段属性值
   * @param clipName
   * @param value
   */
  set(clipName: ClipName, value: PropValues): SQLGenerator;
  /**
   * @description 生成 sql 语句
   */
  generate(): string;
  /**
   * @description 配置片段是否存在
   */
  exists(clipName: ClipName): boolean;
}
/**
 * @description 所有 sql 类型
 */
export enum SQLTypes {
  SELECT,
  INSERT,
  UPDATE,
  DELETE,
}

/**
 * @description sql 类型
 */
export type SQLType = SQLTypes | EnumToUnion<typeof SQLTypes>;

/**
 * @description 片段类型
 */
export type ClipName =
  | SelectClipName
  | InsertClipName
  | DeleteClipName
  | UpdateClipName;

/**
 * @description 属性值
 */
export type PropValues =
  | SQLName
  | SQLFields
  | SQLNewFields
  | SQLWhere
  | SQLGroupBy
  | SQLOrderBy
  | SQLHaving
  | SQLRecord
  | SQLLimit
  | SQLSkip
  | SQLGenerator;

/**
 * @description 新字段
 */
export type SQLNewFields = {
  [key: string]:
    | AggregateCommandLike
    | AggregateKey
    | boolean
    | number
    | string
    | null
    | undefined;
};

/**
 * @description 字段
 */
export type SQLFields = string[];

/**
 * @description 集合别名
 */
export type SQLAlias = {
  [key: string]: AggregateKey;
};

/**
 * @description 集合名
 */
export type SQLName = string;

/**
 * @description 筛选
 */
export type SQLWhere = {
  [key: string]:
    | number
    | string
    | boolean
    | SQLJson
    | RegExp
    | SQLRegex
    | SQLLike
    | CommandLike
    | AggregateCommandLike
    | null
    | undefined;
};

/**
 * @description 分组
 */
export type SQLGroupBy = (AggregateKey | string)[];

/**
 * @description 排序
 */
export type SQLOrderBy = {
  [key: string]: 'desc' | 'asc' | '' | undefined;
};
/**
 * @description 分组条件
 */
export type SQLHaving = SQLWhere;

/**
 * @description 限制
 */
export type SQLLimit = number;

/**
 * @description 跳过
 */
export type SQLSkip = number;

/**
 * @description SQLJson
 */
export type SQLJson = SQLJsonObject | SQLJsonArray;

/**
 * @description SQLJsonObject
 */
export type SQLJsonObject = {
  [key: string]: string | number | boolean | SQLJson | null;
};

/**
 * @description SQLJsonArray
 */
export type SQLJsonArray = (string | number | boolean | SQLJson | null)[];

/**
 * @description 记录
 */
export type SQLRecord = {
  [key: string]: string | number | boolean | SQLJson | null | undefined;
};

/**
 * @description 过滤
 */
export type SQLFilter = {
  [key: string]: boolean | undefined;
};

/**
 * @description 筛选正则
 */
export type SQLRegex = {
  $regex: string;
  $options: string;
};

/**
 * @description 筛选相似
 */
export type SQLLike = {
  $like: string;
  $options: string;
};

/**
 * @description 属性值
 */
export type SQLGeneratorConfig<T> = {
  [P in keyof T]?: T[P] extends Function ? never : T[P];
};
