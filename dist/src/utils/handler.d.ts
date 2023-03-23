import { FieldInfo } from 'mysql';
import { AggregateKey } from '../lib/aggregateCommand/interface';
/**
 * @description 生成数组
 * @param value
 * @param rest
 * @returns
 */
export declare const valuesToArr: <T>(value: T | T[], rest: T | T[], that?: T | undefined) => T[];
/**
 * @description 生成数组
 * @param value
 * @returns
 */
export declare const valueToArr: <T>(value?: T | undefined, that?: T | undefined) => T[];
/**
 * @description 合并对象
 * @param target
 * @param source
 */
export declare const objectMerge: (target: object, ...sourceList: (object | undefined)[]) => object;
/**
 * @description 判断键
 * @param value
 */
export declare const isKey: (value: any) => value is `$${string}`;
/**
 * @description 判断数组键
 * @param value
 */
export declare const isArrayKey: (value: any) => value is string;
/**
 * @description 判断对象键
 * @param value
 */
export declare const isObjectKey: (value: any) => value is string;
/**
 * @description 判断json键
 * @param value
 */
export declare const isJsonKey: (value: any) => value is string;
/**
 * @description 获取所有键
 * @param value
 */
export declare const getArrayKey: (value: string) => string[];
/**
 * @description 获取所有键
 * @param value
 */
export declare const getAllKey: (value: AggregateKey) => string[][];
/**
 * @description 获取键路径
 * @param key
 * @returns
 */
export declare const getKey: (rawKey: AggregateKey) => string;
/**
 * @description 获取键路径
 * @param key
 * @returns
 */
export declare const getJsonKeyPath: (key: AggregateKey) => string[];
/**
 * @description JSON字符串结果转换为对象
 * @param fields
 * @param results
 */
export declare const parseJson: (fields: FieldInfo[], results: any[]) => void;
/**
 * @description tinyint(1)结果转布尔
 * @param fields
 * @param results
 */
export declare const tinyToBoolean: (fields: FieldInfo[], results: any[]) => void;
