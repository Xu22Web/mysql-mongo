/**
 * @description 数据库like表达式配置
 */
export type LikeConfig = {
  $like: string;
  $options: string;
};
/**
 * @description 数据库like表达式
 */
export interface Like {
  $like?: string;
  $options?: string;

  /**
   * @description 创建 DatabeseLike 对象
   * @param like
   */
  create(like: LikeConfig): Like;
}
