import { SQLAlias, SQLFields, SQLGeneratorConfig, SQLGroupBy, SQLHaving, SQLLimit, SQLName, SQLNewFields, SQLOrderBy, SQLSkip, SQLTypes, SQLWhere } from '../interface';
import { SelectClipName, SelectGenerator, SelectPropValue } from './interface';
/**
 * @description MySQL 选择 sql 语句生成器
 */
declare class MySQLSelectGenerator implements SelectGenerator {
    $type: SQLTypes.SELECT;
    $fields?: SQLFields;
    $newfields?: SQLNewFields;
    $name?: SQLName | SQLAlias;
    $where?: SQLWhere;
    $groupby?: SQLGroupBy;
    $orderby?: SQLOrderBy;
    $having?: SQLHaving;
    $limit?: SQLLimit;
    $skip?: SQLSkip;
    $child?: SelectGenerator;
    constructor(config?: SQLGeneratorConfig<SelectGenerator>);
    get<T extends SelectClipName>(clipName: T): SelectPropValue<T>;
    set<T extends SelectClipName>(clipName: T, value: SelectPropValue<T>): SelectGenerator;
    exists(clipName: SelectClipName): boolean;
    generate(): string;
    subGenerate(alias: string, index?: number): string;
}
export { MySQLSelectGenerator };
