import { SQLAlias, SQLFields, SQLFilter, SQLGroupBy, SQLHaving, SQLLike, SQLName, SQLNewFields, SQLOrderBy, SQLRecord, SQLRegex, SQLWhere } from '../sqlGenerator/interface';
import { SqlClip } from './interface';
/**
 * @description sql 片段
 */
declare class MySQLClip implements SqlClip {
    nameClip(name?: SQLName | SQLAlias): string;
    fieldsClip(fields?: SQLFields, newfields?: SQLNewFields, group?: SQLGroupBy): string;
    newfieldsClip(newfields?: SQLNewFields): string;
    fieldFilterClip(filter?: SQLFilter): string;
    likeClip(key: string, value: SQLLike): string;
    regexClip(key: string, value: SQLRegex | RegExp): string;
    keyClip(key: string, json?: boolean): string;
    whereClip(where?: SQLWhere): string;
    groupByClip(groupBy?: SQLGroupBy): string;
    havingClip(having?: SQLHaving): string;
    orderByClip(orderBy?: SQLOrderBy): string;
    limitClip(limit?: number, skip?: number): string;
    recordClip(record?: SQLRecord): string;
}
declare const sqlClip: MySQLClip;
export { MySQLClip, sqlClip };
