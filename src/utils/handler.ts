import { FieldInfo, Types } from 'mysql';
import { AggregateKey } from '../lib/aggregateCommand/interface';
import typeOf from './typeOf';

/**
 * @description 生成数组
 * @param value
 * @param rest
 * @returns
 */
export const valuesToArr = <T>(
  value: T | T[],
  rest: T | T[],
  that?: T
): T[] => {
  if (typeOf.isNotEmptyArr(value)) {
    if (typeOf.isArray(rest)) {
      if (typeOf.objStructMatch(that, ['$type', '$value'])) {
        return [that, ...value, ...rest];
      }
      return [...value, ...rest];
    }
    if (typeOf.isNotUndefined(rest)) {
      if (typeOf.objStructMatch(that, ['$type', '$value'])) {
        return [that, ...value, rest];
      }
      return [...value, rest];
    }
    return value;
  }
  if (typeOf.isNotUndefined(value)) {
    if (typeOf.isArray(rest)) {
      if (typeOf.objStructMatch(that, ['$type', '$value'])) {
        return [that, value, ...rest];
      }
      return [value, ...rest];
    }
    if (typeOf.isNotUndefined(rest)) {
      if (typeOf.objStructMatch(that, ['$type', '$value'])) {
        return [that, value, rest];
      }
      return [value, rest];
    }
  }
  throw new Error(`An argument for 'value' was not provided`);
};

/**
 * @description 生成数组
 * @param value
 * @returns
 */
export const valueToArr = <T>(value?: T, that?: T): T[] => {
  if (
    typeOf.isUndefined(value) &&
    typeOf.objStructMatch(that, ['$value', '$type'])
  ) {
    return [that];
  }
  if (typeOf.isNotUndefined(value)) {
    return [<T>value];
  }
  throw new Error(`An argument for 'value' was not provided`);
};

/**
 * @description 合并对象
 * @param target
 * @param source
 */
export const objectMerge = (
  target: object,
  ...sourceList: (object | undefined)[]
): object => {
  const sources = sourceList.filter((s) => typeOf.isInsOf(s, Object));
  const source = sources[0];
  if (typeOf.isNullOrUndefined(source)) {
    return target;
  }
  for (const key in source) {
    if (typeOf.isObject(source[<keyof object>key])) {
      if (typeOf.isObject(target[<keyof object>key])) {
        objectMerge(target[<keyof object>key], source[<keyof object>key]);
        continue;
      }
      (<object>target[<keyof object>key]) = objectMerge(
        {},
        source[<keyof object>key]
      );
      continue;
    }

    if (typeOf.isArray(source[<keyof object>key])) {
      if (typeOf.isArray(target[<keyof object>key])) {
        objectMerge(target[<keyof object>key], source[<keyof object>key]);
        continue;
      }
      (<object>target[<keyof object>key]) = objectMerge(
        [],
        source[<keyof object>key]
      );
      continue;
    }
    target[<keyof object>key] = source[<keyof object>key];
  }

  const restsSource = sources.slice(1);
  return objectMerge(target, ...restsSource);
};

/**
 * @description 判断键
 * @param value
 */
export const isKey = (value: any): value is AggregateKey => {
  return typeOf.strMatch(value, /(?<=\$).*/);
};

/**
 * @description 判断数组键
 * @param value
 */
export const isArrayKey = (value: any): value is string => {
  return typeOf.strMatch(value, /(.*)\[\d+\](.*)/);
};

/**
 * @description 判断对象键
 * @param value
 */
export const isObjectKey = (value: any): value is string => {
  return typeOf.strMatch(value, /(.*)\.(.*)/);
};

/**
 * @description 判断json键
 * @param value
 */
export const isJsonKey = (value: any): value is string => {
  return isObjectKey(value) || isArrayKey(value);
};

/**
 * @description 获取所有键
 * @param value
 */
export const getArrayKey = (value: string): string[] => {
  const key = value.match(/(.*)\[(\d+)\]/);
  if (isArrayKey(key![1])) {
    const keys = getArrayKey(key![1]);
    return [...keys, key![2]];
  }
  return [key![1], key![2]];
};

/**
 * @description 获取所有键
 * @param value
 */
export const getAllKey = (value: AggregateKey) => {
  const key = getKey(value);
  const allKeys = key.split('.').map((k) => {
    if (isArrayKey(k)) {
      return getArrayKey(k);
    }
    return k;
  });
  return allKeys;
};

/**
 * @description 获取键路径
 * @param key
 * @returns
 */
export const getKey = (rawKey: AggregateKey): string => {
  const [key] = rawKey.match(/(?<=\$).*/)!;
  return key;
};

/**
 * @description 获取键路径
 * @param key
 * @returns
 */
export const getJsonKeyPath = (key: AggregateKey): string[] => {
  // 获取子键
  const keys = getAllKey(key);
  if (keys.length !== 1 || typeOf.isNotEmptyArr(keys[0])) {
    // 获取字段
    const [field, ...subFields] = keys;
    const subKeys = subFields.map((subField) => {
      if (typeOf.isNotEmptyArr(subField)) {
        const [arrayField, ...indexs] = subField;
        const indexField = indexs.map((index) => `[${index}]`).join('');
        return `${arrayField}${indexField}`;
      }
      return subField;
    });
    if (typeOf.isNotEmptyArr(field)) {
      const [arrayField, ...indexs] = field;
      const indexField = indexs.map((index) => `[${index}]`).join('');
      return [arrayField, `$${[indexField, ...subKeys].join('.')}`];
    }
    return [field, `$.${subKeys.join('.')}`];
  }
  return [keys[0], '$'];
};

/**
 * @description JSON字符串结果转换为对象
 * @param fields
 * @param results
 */
export const parseJson = (fields: FieldInfo[], results: any[]) => {
  fields
    .filter((field) => field.type === Types.JSON)
    .forEach((field) => {
      results.forEach((res) => {
        if (typeOf.isJson(res[field.name])) {
          res[field.name] = JSON.parse(res[field.name]);
        }
      });
    });
};


/**
 * @description tinyint(1)结果转布尔
 * @param fields
 * @param results
 */
export const tinyToBoolean = (fields: FieldInfo[], results: any[]) => {
  fields
    .filter((field) => field.type === Types.TINY && field.length === 1)
    .forEach((field) => {
      results.forEach((res) => {
        if (typeOf.isNumber(res[field.name])) {
          res[field.name] = Boolean(res[field.name]);
        }
      });
    });
};
