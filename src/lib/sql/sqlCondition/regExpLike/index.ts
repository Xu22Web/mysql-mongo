import typeOf from '../../../../utils/typeOf';
import { RegExpLike, RegExpLikeConfig } from './interface';

/**
 * @description MySQL 正则匹配
 */
class MySQLRegExpLike implements RegExpLike {
  $regex?: string;
  $options?: string;
  constructor($regex?: string, $options?: string) {
    this.$regex = $regex;
    this.$options = $options;
  }
  create(regexp: RegExp | RegExpLikeConfig): RegExpLike {
    // 正则表达式
    if (typeOf.isRegx(regexp)) {
      const { flags, source } = <RegExp>regexp;
      return new MySQLRegExpLike(source, flags);
    }
    const { $regex, $options } = regexp;
    return new MySQLRegExpLike($regex, $options);
  }
}

export { MySQLRegExpLike };
