import { EnumToUnion } from '../../../../utils/utilsTypes';
import { SQLGenerator, SQLName, SQLRecord, SQLTypes } from '../interface';
/**
 * @description insert 语句所有片段名
 */
export declare enum InsertClipNames {
    RECORD = 0,
    NAME = 1
}
/**
 * @description insert 语句片段类型
 */
export type InsertClipName = EnumToUnion<typeof InsertClipNames>;
/**
 * @description insert 属性值
 */
export type InsertPropValue<T> = T extends 'name' ? SQLName : T extends 'record' ? SQLRecord : never;
/**
 * @description 生成插入 sql 语句
 */
export interface InsertGenerator extends SQLGenerator {
    $type: SQLTypes.INSERT;
    $name?: SQLName;
    $record?: SQLRecord;
    get<T extends InsertClipName>(clipName: T): InsertPropValue<T>;
    set<T extends InsertClipName>(clipName: T, value: InsertPropValue<T>): InsertGenerator;
}
