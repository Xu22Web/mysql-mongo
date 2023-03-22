import { objectMerge } from '../../../../utils/handler';
import typeOf from '../../../../utils/typeOf';
import { DatabeseLike, DatabeseLikeConfig } from './interface';

class MySQLDatabeseLike implements DatabeseLike {
  $like?: string;
  $options?: string;
  constructor($like?: string, $options?: string) {
    this.$like = $like;
    this.$options = $options;
  }
  create(like: DatabeseLikeConfig): MySQLDatabeseLike {
    // 新建对象
    const databaseLike = new MySQLDatabeseLike();
    if (typeOf.objStructMatch(like, ['$like', '$options'])) {
      objectMerge(databaseLike, like);
    }
    return databaseLike;
  }
}
export default MySQLDatabeseLike;
