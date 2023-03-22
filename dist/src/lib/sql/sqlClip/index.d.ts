import { AggregateCommandLike, AggregateMixParamType } from '../../aggregateCommand/interface';
import { CommandLike, CommandMixParamType } from '../../command/interface';
import { SQLAlias, SQLFields, SQLFilter, SQLGroupBy, SQLHaving, SQLLike, SQLName, SQLNewFields, SQLOrderBy, SQLRecord, SQLRegex, SQLWhere } from '../sqlGenerator/interface';
import { SqlClip } from './interface';
/**
 * @description sql片段
 */
declare class MySQLClip implements SqlClip {
    aggrValueClip(value: AggregateMixParamType<object>): string;
    aggrJsonValueClip(value: AggregateMixParamType<object>): string;
    aggrJsonClip(aggregate: AggregateCommandLike): string;
    aggrControllerClip(aggregate: AggregateCommandLike): string;
    cmdValueClip(key: string, value: CommandMixParamType): string | null;
    cmdCompareClip(key: string, command: CommandLike): string;
    cmdLogicClip(key: string, command: CommandLike): string;
    cmdControllerClip(key: string, command: CommandLike | AggregateCommandLike): string;
    nameClip(name?: SQLName | SQLAlias): string;
    fieldsClip(fields?: SQLFields, newfields?: SQLNewFields, group?: SQLGroupBy): string;
    newfieldsClip(newfields?: SQLNewFields): string;
    fieldFilterClip(filter?: SQLFilter): string;
    likeClip(key: string, value: SQLLike): string;
    regexClip(key: string, value: SQLRegex | RegExp): string;
    keyClip(key: string): string;
    whereClip(where?: SQLWhere): string;
    groupByClip(groupBy?: SQLGroupBy): string;
    havingClip(where?: SQLHaving): string;
    orderByClip(orderBy?: SQLOrderBy): string;
    limitClip(limit?: number, skip?: number): string;
    recordClip(record?: SQLRecord): string;
}
declare const sqlClip: MySQLClip;
export { MySQLClip, sqlClip };
