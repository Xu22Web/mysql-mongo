import { EnumToUnion } from '../../../../utils/utilsTypes';
import { SQLAlias, SQLFields, SQLGenerator, SQLGroupBy, SQLHaving, SQLLimit, SQLName, SQLNewFields, SQLOrderBy, SQLSkip, SQLTypes, SQLWhere } from '../interface';
/**
 * @description select 语句所有片段名
 */
export declare enum SelectClipNames {
    FIELDS = 0,
    NEWFIELDS = 1,
    NAME = 2,
    WHERE = 3,
    GROUPBY = 4,
    ORDERBY = 5,
    HAVING = 6,
    LIMIT = 7,
    SKIP = 8,
    CHILD = 9
}
/**
 * @description select 语句片段类型
 */
export type SelectClipName = EnumToUnion<typeof SelectClipNames>;
/**
 * @description select 属性值
 */
export type SelectPropValue<T> = T extends 'fields' ? SQLFields : T extends 'newfields' ? SQLNewFields : T extends 'name' ? SQLName | SQLAlias : T extends 'where' ? SQLWhere : T extends 'groupby' ? SQLGroupBy : T extends 'having' ? SQLHaving : T extends 'orderby' ? SQLOrderBy : T extends 'limit' ? SQLLimit : T extends 'skip' ? SQLSkip : T extends 'child' ? SelectGenerator : never;
/**
 * @description 生成选择 sql 语句
 */
export interface SelectGenerator extends SQLGenerator {
    $type: SQLTypes.SELECT;
    $fields?: SQLFields;
    $newfields?: SQLNewFields;
    $name?: SQLName | SQLAlias;
    $where?: SQLWhere;
    $groupby?: SQLGroupBy;
    $having?: SQLHaving;
    $orderby?: SQLOrderBy;
    $limit?: SQLLimit;
    $skip?: SQLSkip;
    $child?: SelectGenerator;
    get<T extends SelectClipName>(clipName: T): SelectPropValue<T>;
    set<T extends SelectClipName>(clipName: T, value: SelectPropValue<T>): SelectGenerator;
    subGenerate(alias: string, index: number): string;
}
