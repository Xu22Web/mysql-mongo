/**
 * @description 数据库like表达式配置
 */
export type DatabeseLikeConfig = {
  $like: string;
  $options: string;
};
/**
 * @description 数据库like表达式
 */
export interface DatabeseLike {
  $like?: string;
  $options?: string;

  /**
   * @description 创建 DatabeseLike 对象
   * @param like
   */
  create(like: DatabeseLikeConfig): DatabeseLike;
}
