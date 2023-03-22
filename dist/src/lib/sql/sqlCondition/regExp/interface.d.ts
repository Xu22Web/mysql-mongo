/**
 * @description 数据库正则表达式配置
 */
export type DatabaseRegExpLike = {
    /**
     * @description 正则表达
     */
    $regex: string;
    /**
     * @description 可选项
     * - "i" 忽略大小写
     * - "m" 跨行匹配
     */
    $options: string;
};
/**
 * @description 数据库正则表达式
 */
export interface DatabaseRegExp {
    /**
     * @description 正则表达
     */
    $regex?: string;
    /**
     * @description 可选项
     * - "i" 忽略大小写
     * - "m" 跨行匹配
     */
    $options?: string;
    create(regexp: DatabaseRegExpLike | RegExp): DatabaseRegExp;
}
