import { FieldInfo, Types } from 'mysql';
import typeOf from './typeOf';
import {
  AggregateArrayKey,
  AggregateKey,
} from '../lib/aggregateCommand/interface';

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
    // value 为数组
    value = <T[]>value;
    if (typeOf.isArray(rest)) {
      // rest 为数组
      rest = <T[]>rest;
      if (that !== undefined) {
        return [that, ...value, ...rest];
      }
      return [...value, ...rest];
    }
    if (typeOf.isNotUndefined(rest)) {
      rest = <T>rest;
      if (that !== undefined) {
        return [that, ...value, rest];
      }
      return [...value, rest];
    }
  }
  if (typeOf.isNotUndefined(value)) {
    // value 为数组
    value = <T>value;
    if (typeOf.isArray(rest)) {
      // rest 为数组
      rest = <T[]>rest;
      if (that !== undefined) {
        return [that, value, ...rest];
      }
      return [value, ...rest];
    }
    if (typeOf.isNotUndefined(rest)) {
      rest = <T>rest;
      if (that !== undefined) {
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
 * @description 生成参数数组
 * @param args
 * @returns
 */
export const argsToArr = <T extends any[]>(args: T, length?: number) => {
  // 第一个参数为数组
  if (typeOf.isNotEmptyArr(args[0])) {
    if (length) {
      if (args[0].length === length) {
        return args[0];
      }
    } else {
      return args[0];
    }
  }
  //  所有参数为数组
  if (typeOf.isNotEmptyArr(args)) {
    if (length) {
      if (args.length === length) {
        return args;
      }
    } else {
      return args;
    }
  }
  throw new Error(`An argument for 'args' was not provided`);
};

/**
 * @description 合并对象
 * @param target
 * @param source
 */
export const objectMerge = (
  target: object,
  source1: object,
  source2?: object
): object => {
  // 属性
  const keys = Object.keys(source1);
  keys.forEach((key) => {
    if (typeOf.isObject(source1[<keyof object>key])) {
      if (typeOf.isObject(target[<keyof object>key])) {
        objectMerge(target[<keyof object>key], source1[<keyof object>key]);
        return;
      }
      (<object>target[<keyof object>key]) = objectMerge(
        {},
        source1[<keyof object>key]
      );
      return;
    }
    if (typeOf.isArray(source1[<keyof object>key])) {
      if (typeOf.isArray(target[<keyof object>key])) {
        (<any[]>target[<keyof object>key]) = [
          ...(<any[]>target[<keyof object>key]),
          ...(<any[]>source1[<keyof object>key]).map((item) =>
            typeOf.isObject(item) ? objectMerge({}, item) : item
          ),
        ];
        return;
      }
      (<any[]>target[<keyof object>key]) = [
        ...(<any[]>source1[<keyof object>key]).map((item) =>
          typeOf.isObject(item) ? objectMerge({}, item) : item
        ),
      ];
      return;
    }
    target[<keyof object>key] = source1[<keyof object>key];
  });
  if (typeOf.isObject(source2)) {
    return objectMerge(target, source2);
  }
  return target;
};
/**
 * @description 判断键
 * @param value
 */
export const isKey = (value: any): value is AggregateKey => {
  return typeOf.strMatch(value, /(?<=\$).*/);
};
/**
 * @description 判断键
 * @param value
 */
export const isArrayKey = (value: any): value is AggregateArrayKey => {
  return typeOf.strMatch(value, /.*\[\d+\]/);
};
/**
 * @description 获取所有键
 * @param value
 */
export const getKey = (value: AggregateKey) => {
  const key = value.match(/(?<=\$).*/)![0];
  return key.split('.');
};
/**
 * @description 获取所有键
 * @param value
 */
export const getArrayKey = (value: AggregateArrayKey): string[] => {
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
  const key = value.match(/(?<=\$).*/)![0];
  const allKeys = key.split('.').map((k) => {
    if (isArrayKey(k)) {
      return getArrayKey(k);
    }
    return k;
  });
  return allKeys;
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
 * @description 对象、数组转化JSON字符串
 * @param fields
 * @param results
 */
export const stringfyJson = (data: object) => {
  for (const key in data) {
    if (<any>data[<keyof object>key] instanceof Object) {
      (<string>data[<keyof object>key]) = JSON.stringify(
        data[<keyof object>key]
      );
    }
  }
  return data;
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
