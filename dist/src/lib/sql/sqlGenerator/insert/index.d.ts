import { SQLGeneratorConfig, SQLName, SQLRecord, SQLTypes } from '../interface';
import { InsertClipName, InsertGenerator, InsertPropValue } from './interface';
/**
 * @description MySQL 插入 sql 语句生成器
 */
declare class MySQLInsertGenerator implements InsertGenerator {
    $type: SQLTypes.INSERT;
    $name?: SQLName;
    $record?: SQLRecord;
    constructor(config?: SQLGeneratorConfig<InsertGenerator>);
    get<T extends InsertClipName>(clipName: T): InsertPropValue<T>;
    set<T extends InsertClipName>(clipName: T, value: InsertPropValue<T>): InsertGenerator;
    exists(clipName: InsertClipName): boolean;
    generate(): string;
}
export { MySQLInsertGenerator };
