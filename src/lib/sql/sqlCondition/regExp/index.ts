import typeOf from '../../../../utils/typeOf';
import { DatabaseRegExp, DatabaseRegExpLike } from './interface';

class MySQLDatabaseRegExp implements DatabaseRegExp {
  $regex?: string;
  $options?: string;
  constructor($regex?: string, $options?: string) {
    this.$regex = $regex;
    this.$options = $options;
  }
  create(regexp: RegExp | DatabaseRegExpLike): MySQLDatabaseRegExp {
    let databaseRegxp: DatabaseRegExp = new MySQLDatabaseRegExp();
    if (typeOf.isRegx(regexp)) {
      const { flags, source } = <RegExp>regexp;
      databaseRegxp.$options = flags;
      databaseRegxp.$regex = source;
    }
    if (typeOf.objStructMatch(regexp, ['$regex', '$options'])) {
      databaseRegxp = <DatabaseRegExp>regexp;
    }
    return databaseRegxp;
  }
}
export { MySQLDatabaseRegExp };
