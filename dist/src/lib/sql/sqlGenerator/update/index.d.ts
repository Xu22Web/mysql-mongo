import { SQLGeneratorConfig, SQLLimit, SQLName, SQLOrderBy, SQLRecord, SQLTypes, SQLWhere } from '../interface';
import { UpdateClipName, UpdateGenerator, UpdatePropValue } from './interface';
/**
 * @description MySQL 更新 sql 语句生成器
 */
declare class MySQLUpdateGenerator implements UpdateGenerator {
    $type: SQLTypes.UPDATE;
    $name?: SQLName;
    $record?: SQLRecord;
    $where?: SQLWhere;
    $orderby?: SQLOrderBy;
    $limit?: SQLLimit;
    constructor(config?: SQLGeneratorConfig<UpdateGenerator>);
    get<T extends UpdateClipName>(clipName: T): UpdatePropValue<T>;
    set<T extends UpdateClipName>(clipName: T, value: UpdatePropValue<T>): UpdateGenerator;
    exists(clipName: UpdateClipName): boolean;
    generate(): string;
}
export { MySQLUpdateGenerator };
