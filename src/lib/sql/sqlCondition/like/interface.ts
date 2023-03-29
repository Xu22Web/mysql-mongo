/**
 * @description 数据库like表达式配置
 */
export type LikeConfig = {
  /**
   * @description 模糊匹配
   */
  $like: string;
  /**
   * @description 可选项
   * - "i" 忽略大小写
   * - "m" 跨行匹配
   */
  $options: string;
};
/**
 * @description 数据库like表达式
 */
export interface Like {
  /**
   * @description 模糊匹配
   */
  $like?: string;
  /**
   * @description 可选项
   * - "i" 忽略大小写
   * - "m" 跨行匹配
   */
  $options?: string;

  /**
   * @description 创建 DatabeseLike 对象
   * @param like
   */
  create(like: LikeConfig): Like;
}
