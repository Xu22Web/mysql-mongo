import {
  AggregateCommandLike,
  AggregateKey,
} from '../aggregateCommand/interface';
import { Collection, QueryResult, ResultData } from '../collection/interface';
import { Command } from '../command/interface';

/**
 * @description 项目
 */
export type AggregateProject = {
  [key: string]: number | string | boolean | AggregateCommandLike | null;
};
/**
 * @description 分组
 */
export type AggregateGroup = {
  [key: string]: AggregateCommandLike | AggregateKey;
};
/**
 * @description 过滤字段
 */
export type AggregateFilter = {
  [key: string]: boolean;
};
/**
 * @description 字段
 */
export type AggregateFields = {
  [key: string]: number | string | boolean | AggregateCommandLike | null;
};
/**
 * @description 筛选字段
 */
export type AggregateMatch = {
  [key: string]: number | string | boolean | Command | null;
};
/**
 * @description 排序
 */
export type AggregateSort = {
  [key: string]: 'asc' | 'desc' | '';
};

export interface Aggregate<T extends object> {
  /**
   * @description 集合
   */
  $collection: Collection<T>;
  /**
   * @description 添加新字段到输出的记录。经过 addFields 聚合阶段，输出的所有记录中除了输入时带有的字段外，还将带有 addFields 指定的字段。
   * @example
   * const $ = db.command.aggregate
   * db.collection('scores').aggregate()
   * .addFields({
   *   // 新增 totalHomework 字段为 homework 字段求和
   *   totalHomework: $.sum('$homework'),
   *   // 新增 totalQuiz 字段为 quiz 字段求和
   *   totalQuiz: $.sum('$quiz')
   * })
   * .end()
   */
  addFields(fields: AggregateFields): Aggregate<T>;
  /**
   * @description 计算上一聚合阶段输入到本阶段的记录数，输出一个记录，其中指定字段的值为记录数。
   */
  count(fieldName: AggregateKey): Aggregate<T>;
  /**
   * @description 标志聚合操作定义完成，发起实际聚合操作
   * @example
   * const $ = db.command.aggregate
   * db.collection('books').aggregate()
   * .group({
   *   // 按 category 字段分组
   *   _id: '$category',
   *   // avgSales 字段是组内所有记录的 sales 字段的平均值
   *   avgSales: $.avg('$sales')
   * })
   * .end()
   */
  end(): Promise<QueryResult<ResultData<T[]>>>;
  /**
   * @description 将输入记录按给定表达式分组，输出时每个记录代表一个分组，每个记录的 _id 是区分不同组的 key。输出记录中也可以包括累计值，将输出字段设为累计值即会从该分组中计算累计值。
   * @example
   * const $ = db.command.aggregate()
   * db.collection('avatar').aggregate()
   * .group({
   * // 按 alias 字段分组
   *  _id: '$alias',
   * // avgSales 字段是组内所有记录的 1 的求和值
   *  num: $.sum(1)
   * })
   * .end()
   */
  group(group: AggregateGroup): Aggregate<T>;
  /**
   * @description 指定一个正整数，跳过对应数量的文档，输出剩下的文档。
   * @example
   * // 跳过 5 条记录
   * db.collection('users')
   * .aggregate()
   * .skip(5)
   * .end()
   */
  skip(skip: number): Aggregate<T>;
  /**
   * @description 限制输出到下一阶段的记录数。
   * @example
   * const $ = db.command.aggregate()
   * // 限制 2 条记录
   * db.collection('items').aggregate()
   * .limit(2)
   * .end()
   */
  limit(limit: number): Aggregate<T>;
  /**
   * @description 根据条件过滤文档，并且把符合条件的文档传递给下一个流水线阶段。
   * @example
   * const _ = db.command
   * db.collection('articles').aggregate()
   * .match({
   *   // 作者 stark，年龄大于 18
   *   author: 'stark',
   *   age: _.gt(18)
   * })
   * .end()
   */
  match(fields: AggregateMatch): Aggregate<T>;
  /**
   * @description 把指定的字段传递给下一个流水线，指定的字段可以是某个已经存在的字段，也可以是计算出来的新字段。
   * @example
   * db.collection('articles')
   * .aggregate()
   * .project({
   *   // 新增 id 字段为 _id 字段值
   *   id:'$_id'
   *    // 显示 title 字段
   *   title: true,
   *   // 隐藏 author 字段
   *   author: false
   * })
   * .end()
   */
  project(project: AggregateProject): Aggregate<T>;
  /**
   * @description 把指定的字段传递给下一个流水线，指定的字段可以是某个已经存在的字段，也可以是计算出来的新字段。
   * @example
   * db.collection('articles')
   * .aggregate()
   * .filter({
   *    // 显示 title 字段
   *   title: true,
   *   // 隐藏 author 字段
   *   author: false
   * })
   * .end()
   */
  filter(project: AggregateFilter): Aggregate<T>;
  /**
   * @description 随机从文档中选取指定数量的记录。
   */
  sample(size: number): Aggregate<T>;
  /**
   * @description 根据指定的字段，对输入的文档进行排序。
   * @example
   * db.collection('articles')
   * .aggregate()
   * .sort({
   *    // 按 age 字段顺序排列
   *   age: 'asc',
   *   // 按 score 字段逆序排列
   *   score: 'desc'
   * })
   * .end()
   */
  sort(orderBy: AggregateSort): Aggregate<T>;
  /**
   * @description 根据传入的表达式，将传入的集合进行分组（group）。然后计算不同组的数量，并且将这些组按照它们的数量进行排序，返回排序后的结果。
   * @example
   * db.collection('articles')
   * .aggregate()
   * .sortByCount('atype')
   * .end()
   */
  sortByCount(fieldName: AggregateKey): Aggregate<T>;
}
/**
 * @description 任务类型
 */
export enum AggregateTaskType {
  NEWFIELDS,
  GROUPBY,
  MATCH,
  FILTER,
  ORDERBY,
  COUNT,
  LIMIT,
  SKIP,
}
/**
 * @description 任务
 */
export type AggregateTask = {
  $type: AggregateTaskType;
  $value:
    | AggregateFields
    | AggregateFilter
    | AggregateMatch
    | AggregateSort
    | AggregateGroup
    | number
    | string
    | boolean
    | null
    | (
        | number
        | string
        | boolean
        | null
        | AggregateCommandLike
        | AggregateKey
      )[];
};
