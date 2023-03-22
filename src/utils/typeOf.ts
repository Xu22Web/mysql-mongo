enum BaseType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  NULL = 'null',
  UNDEFINED = 'undefined',
  ARRAY = 'array',
  UNKNOWN = 'unknown',
}
enum ObjectExtendsType {
  FUNCTION = 'function',
  SET = 'set',
  REGEX = 'regex',
  MAP = 'map',
}
enum StringExtendsType {
  JSON = 'json',
  PLAIN = 'plain',
}
enum PlainExtendsType {
  BLANK = 'blank',
  NUMBER = 'number',
}
enum JSONExtendsType {
  ARRAY = 'array',
  OBJECT = 'object',
  BOOLEAN = 'boolean',
}
type PropsFuntion<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface TypeOfConstructor {
  /**
   * @description 获取类型
   * @param value
   */
  getType(value: any): BaseType | string;
  /**
   * @description 判断 Object 对象
   * @param value
   */
  isObject(value: any): value is object;
  /**
   * @description 判断 Function 函数
   * @param value
   */
  isFunction(value: any): value is Function;
  /**
   * @description 判断 RegExp 正则
   * @param value
   */
  isRegx(value: any): value is RegExp;
  /**
   * @description 判断 Set 集合对象
   * @param value
   */
  isSet<T = any>(value: any): value is Set<T>;
  /**
   * @description 判断 Map 对象
   * @param value
   */
  isMap<K = any, V = any>(value: any): value is Map<K, V>;
  /**
   * @description 判断 Array 数组
   * @param value
   */
  isArray<T = any>(value: any): value is T[];
  /**
   * @description 判断 Number 数字
   * @param value
   */
  isNumber(value: any): value is number;
  /**
   * @description 判断继承
   * @param value
   */
  isInsOf<T>(value: any, construct: T): boolean;
  /**
   * @description 判断字符串
   * @param value
   */
  isString(value: any): value is string;

  /**
   * @description 判断布尔
   * @param value
   */
  isBooloon(value: any): value is boolean;
  /**
   * @description 判断空数组
   * @param value
   */
  isEmptyArr<T = any>(value: any): value is T[];
  /**
   * @description 判断非空数组
   * @param value
   */
  isNotEmptyArr<T = any>(value: any): value is T[];
  /**
   * @description 判断空对象
   * @param value
   */
  isEmptyObj(value: any): value is object;
  /**
   * @description 判断非空对象
   * @param value
   */
  isNotEmptyObj(value: any): value is object;

  /**
   * @description 判断空字符
   * @param value
   */
  isBlankStr(value: any): value is string;
  /**
   * @description 判断非空字符
   * @param value
   */
  isNotBlankStr(value: any): value is string;
  /**
   * @description 判断 null
   * @param value
   */
  isNull(value: any): value is null;
  /**
   * @description 判断 undefined
   * @param value
   */
  isUndefined(value: any): value is undefined;
  /**
   * @description 判断非 undefined 和 null
   * @param value
   */
  isNotNullOrUndefined(value: any): boolean;
  /**
   * @description 判断 undefined 或 null
   * @param value
   */
  isNullOrUndefined(value: any): value is null | undefined;
  /**
   * @description 判断非 null
   * @param value
   */
  isNotNull(value: any): boolean;
  /**
   * @description 判断非 undefined
   * @param value
   */
  isNotUndefined(value: any): boolean;
  /**
   * @description 判断对象结构类型
   * @param value
   * @param keys
   */
  objStructMatch<T extends object = object>(
    value: any,
    keys: string[]
  ): value is T;
  /**
   * @description 判断对象结构值类型
   * @param value
   * @param template
   */
  objStructTypeMatch<T extends object = object>(
    value: any,
    template: { [key: string]: PropsFuntion<TypeOfConstructor> }
  ): value is T;
  /**
   * @description 是否为json
   * @param value
   */
  isJson(value: any): value is string;
  /**
   * @description 是否为json数组
   * @param value
   */
  isJsonArr(value: any): value is string;
  /**
   * @description 是否为json对象
   * @param value
   */
  isJsonObj(value: any): value is string;
  /**
   * @description 是否为json布尔
   * @param value
   */
  isJsonBool(value: any): value is string;
  /**
   * @description 字符匹配
   * @param value
   * @param regexp
   */
  strMatch(value: any, regexp: RegExp | string): boolean;
}

class TypeOf {
  static getType(value: any) {
    if (TypeOf.isUndefined(value)) {
      return BaseType.UNDEFINED;
    }
    if (TypeOf.isNull(value)) {
      return BaseType.NULL;
    }
    if (TypeOf.isNumber(value)) {
      return BaseType.NUMBER;
    }
    if (TypeOf.isString(value)) {
      if (TypeOf.isStrNum(value)) {
        return `${BaseType.STRING}.${StringExtendsType.PLAIN}.${PlainExtendsType.NUMBER}`;
      }
      if (TypeOf.isBlankStr(value)) {
        return `${BaseType.STRING}.${StringExtendsType.PLAIN}.${PlainExtendsType.BLANK}`;
      }
      if (TypeOf.isJson(value)) {
        if (TypeOf.isJsonArr(value)) {
          return `${BaseType.STRING}.${StringExtendsType.JSON}.${JSONExtendsType.ARRAY}`;
        }
        if (TypeOf.isJsonObj(value)) {
          return `${BaseType.STRING}.${StringExtendsType.JSON}.${JSONExtendsType.OBJECT}`;
        }
        if (TypeOf.isJsonBool(value)) {
          return `${BaseType.STRING}.${StringExtendsType.JSON}.${JSONExtendsType.BOOLEAN}`;
        }
        return `${BaseType.STRING}.${StringExtendsType.JSON}`;
      }
      return BaseType.STRING;
    }
    if (TypeOf.isBooloon(value)) {
      return BaseType.BOOLEAN;
    }
    if (TypeOf.isArray(value)) {
      return BaseType.ARRAY;
    }
    if (TypeOf.isObject(value)) {
      return BaseType.OBJECT;
    }
    if (TypeOf.isFunction(value)) {
      return `${BaseType.OBJECT}.${ObjectExtendsType.FUNCTION}`;
    }
    if (TypeOf.isSet(value)) {
      return `${BaseType.OBJECT}.${ObjectExtendsType.SET}`;
    }
    if (TypeOf.isMap(value)) {
      return `${BaseType.OBJECT}.${ObjectExtendsType.MAP}`;
    }
    if (TypeOf.isRegx(value)) {
      return `${BaseType.OBJECT}.${ObjectExtendsType.REGEX}`;
    }
    return BaseType.UNKNOWN;
  }
  static isObject(value: any): value is object {
    return Boolean(
      value &&
        typeof value === 'object' &&
        Object.prototype.toString.call(value) === '[object Object]'
    );
  }
  static isFunction(value: any): value is Function {
    return Boolean(
      value &&
        typeof value === 'function' &&
        Object.prototype.toString.call(value) === '[object Function]'
    );
  }
  static isRegx(value: any): value is RegExp {
    return Boolean(
      value &&
        typeof value === 'object' &&
        Object.prototype.toString.call(value) === '[object RegExp]'
    );
  }
  static isSet<T = any>(value: any): value is Set<T> {
    return Boolean(
      value &&
        typeof value === 'object' &&
        Object.prototype.toString.call(value) === '[object Set]'
    );
  }
  static isMap<K = any, V = any>(value: any): value is Map<K, V> {
    return Boolean(
      value &&
        typeof value === 'object' &&
        Object.prototype.toString.call(value) === '[object Map]'
    );
  }
  static isArray<T = any>(value: any): value is T[] {
    return Array.isArray(value);
  }
  static isNumber(value: any): value is number {
    return typeof value === 'number';
  }
  static isInsOf(value: any, construct: any): boolean {
    return Boolean(value instanceof construct);
  }
  static isString(value: any): value is string {
    return typeof value === 'string';
  }
  static isBooloon(value: any): value is boolean {
    return typeof value === 'boolean';
  }
  static isEmptyArr<T = any>(value: any): value is T[] {
    return Boolean(TypeOf.isArray(value) && !value.length);
  }
  static isNotEmptyArr<T = any>(value: any, length?: number): value is T[] {
    if (TypeOf.isNumber(length)) {
      return Boolean(TypeOf.isArray(value) && value.length === length);
    }
    return Boolean(TypeOf.isArray(value) && value.length);
  }
  static isEmptyObj(value: any): value is object {
    return Boolean(TypeOf.isObject(value) && !Object.keys(value).length);
  }
  static isNotEmptyObj(value: any): value is object {
    return Boolean(TypeOf.isObject(value) && Object.keys(value).length);
  }
  static isBlankStr(value: any): value is string {
    return Boolean(TypeOf.isString(value) && !value.length);
  }
  static isNotBlankStr(value: any): value is string {
    return Boolean(TypeOf.isString(value) && value.length);
  }
  static isNull(value: any): value is null {
    return value === null;
  }
  static isUndefined(value: any): value is undefined {
    return value === undefined;
  }
  static isNotNullOrUndefined(value: any): boolean {
    return !TypeOf.isNull(value) && !TypeOf.isUndefined(value);
  }
  static isNullOrUndefined(value: any): value is null | undefined {
    return TypeOf.isNull(value) || TypeOf.isUndefined(value);
  }
  static isNotNull(value: any): boolean {
    return !TypeOf.isNull(value);
  }
  static isNotUndefined(value: any): boolean {
    return !TypeOf.isUndefined(value);
  }
  static isJson(value: any): value is string {
    try {
      const res = JSON.parse(value);
      return res;
    } catch (error) {
      return false;
    }
  }
  static isJsonArr(value: any): value is string {
    try {
      const res = JSON.parse(value);
      return TypeOf.isArray(res);
    } catch (error) {
      return false;
    }
  }
  static isJsonObj(value: any): value is string {
    try {
      const res = JSON.parse(value);
      return TypeOf.isObject(res);
    } catch (error) {
      return false;
    }
  }
  static isJsonBool(value: any): value is string {
    try {
      const res = JSON.parse(value);
      return TypeOf.isBooloon(res);
    } catch (error) {
      return false;
    }
  }
  static isStrNum(value: any): value is string {
    return TypeOf.strMatch(value, /^\d+\.?\d*$/);
  }
  static strMatch(value: any, regexp: RegExp | string): value is string {
    const regx = new RegExp(regexp);
    return TypeOf.isString(value) && regx.test(value);
  }
  static objStructMatch<T extends object = object>(
    value: any,
    keys: string[]
  ): value is T {
    if (TypeOf.isNotEmptyObj(value) && TypeOf.isNotEmptyArr(keys)) {
      return keys.every((key) => {
        const regx = /^([a-zA-Z_$]+)\.([a-zA-Z_$.]+)$/;
        if (regx.test(key)) {
          const left = (<RegExpMatchArray>key.match(regx))[1];
          const right = (<RegExpMatchArray>key.match(regx))[2];
          return TypeOf.objStructMatch(value[<keyof typeof value>left], [
            right,
          ]);
        }
        return !TypeOf.isUndefined(value[<keyof typeof value>key]);
      });
    }
    return false;
  }
  static objStructTypeMatch<T extends object = object>(
    value: any,
    template: { [key: string]: PropsFuntion<TypeOf> }
  ): value is T {
    if (TypeOf.isNotEmptyObj(value) && TypeOf.isNotEmptyObj(template)) {
      // 普通匹配
      for (const key in template) {
        // 类型匹配
        const fnName = template[key];
        // 方法存在
        const matchFN = TypeOf.isFunction(TypeOf[fnName]);
        // 点表示法
        const subRegx = /^([a-zA-Z_$\[\]]+)\.([a-zA-Z_$.\[\]]+)$/;
        if (subRegx.test(key) && matchFN) {
          const left = (<RegExpMatchArray>key.match(subRegx))[1];
          const right = (<RegExpMatchArray>key.match(subRegx))[2];
          // 递归判别
          const res = TypeOf.objStructTypeMatch(
            value[<keyof typeof value>left],
            {
              [right]: fnName,
            }
          );
          if (!res) {
            return false;
          }
          continue;
        }
        // [key]表示法
        const templateRegx = /^\[key\]$/;
        if (templateRegx.test(key) && matchFN) {
          for (const subKey in value) {
            const res = (<Function>TypeOf[fnName])(
              value[<keyof typeof value>subKey]
            );
            if (!res) {
              return false;
            }
          }
          continue;
        }
        if (!TypeOf.isUndefined(value[<keyof typeof value>key]) && matchFN) {
          const res = (<Function>TypeOf[fnName])(
            value[<keyof typeof value>key]
          );
          if (!res) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }
}

const typeOf: TypeOfConstructor = TypeOf;

export default typeOf;
