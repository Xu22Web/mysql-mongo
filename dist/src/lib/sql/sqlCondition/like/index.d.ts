import { Like, LikeConfig } from './interface';
/**
 * @description MySQL 模糊匹配
 */
declare class MySQLLike implements Like {
    $like?: string;
    $options?: string;
    constructor($like?: string, $options?: string);
    create(like: LikeConfig): MySQLLike;
}
export default MySQLLike;
