import { Like, LikeConfig } from './interface';

/**
 * @description MySQL 模糊匹配
 */
class MySQLLike implements Like {
  $like?: string;
  $options?: string;
  constructor($like?: string, $options?: string) {
    this.$like = $like;
    this.$options = $options;
  }
  create(like: LikeConfig): MySQLLike {
    const { $like, $options } = like;
    return new MySQLLike($like, $options);
  }
}

export default MySQLLike;
