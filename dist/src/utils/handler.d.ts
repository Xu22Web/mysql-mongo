import { FieldInfo } from 'mysql';
import { AggregateArrayKey, AggregateKey } from '../lib/aggregateCommand/interface';
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
 * @description 生成参数数组
 * @param args
 * @returns
 */
export declare const argsToArr: <T extends any[]>(args: T, length?: number) => any[];
/**
 * @description 合并对象
 * @param target
 * @param source
 */
export declare const objectMerge: (target: object, source1: object, source2?: object) => object;
/**
 * @description 判断键
 * @param value
 */
export declare const isKey: (value: any) => value is `$${string}`;
/**
 * @description 判断键
 * @param value
 */
export declare const isArrayKey: (value: any) => value is AggregateArrayKey<string>;
/**
 * @description 获取所有键
 * @param value
 */
export declare const getKey: (value: AggregateKey) => string[];
/**
 * @description 获取所有键
 * @param value
 */
export declare const getArrayKey: (value: AggregateArrayKey) => string[];
/**
 * @description 获取所有键
 * @param value
 */
export declare const getAllKey: (value: AggregateKey) => (string | string[])[];
/**
 * @description JSON字符串结果转换为对象
 * @param fields
 * @param results
 */
export declare const parseJson: (fields: FieldInfo[], results: any[]) => void;
/**
 * @description 对象、数组转化JSON字符串
 * @param fields
 * @param results
 */
export declare const stringfyJson: (data: object) => object;
/**
 * @description tinyint(1)结果转布尔
 * @param fields
 * @param results
 */
export declare const tinyToBoolean: (fields: FieldInfo[], results: any[]) => void;
