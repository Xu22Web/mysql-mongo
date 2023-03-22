import { SQLGeneratorConfig, SQLLimit, SQLName, SQLOrderBy, SQLTypes, SQLWhere } from '../interface';
import { DeleteClipName, DeleteGenerator, DeletePropValue } from './interface';
/**
 * @description MySQL 删除 sql 语句生成器
 */
declare class MySQLDeleteGenerator implements DeleteGenerator {
    $type: SQLTypes.DELETE;
    $name?: SQLName;
    $where?: SQLWhere;
    $orderby?: SQLOrderBy;
    $limit?: SQLLimit;
    constructor(config?: SQLGeneratorConfig<DeleteGenerator>);
    get<T extends DeleteClipName>(clipName: T): DeletePropValue<T>;
    set<T extends DeleteClipName>(clipName: T, value: DeletePropValue<T>): DeleteGenerator;
    exists(clipName: DeleteClipName): boolean;
    generate(): string;
}
export { MySQLDeleteGenerator };
