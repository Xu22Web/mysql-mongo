import { RegExpLike, RegExpLikeConfig } from './interface';
/**
 * @description MySQL 正则匹配
 */
declare class MySQLRegExpLike implements RegExpLike {
    $regex?: string;
    $options?: string;
    constructor($regex?: string, $options?: string);
    create(regexp: RegExp | RegExpLikeConfig): RegExpLike;
}
export { MySQLRegExpLike };
