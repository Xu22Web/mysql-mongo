import { AggregateKey } from '../aggregateCommand/interface';
import { Collection, QueryResult, ResultData } from '../collection/interface';
import { SelectGenerator } from '../sql/sqlGenerator/select/interface';
import { Aggregate, AggregateFields, AggregateFilter, AggregateGroup, AggregateMatch, AggregateProject, AggregateSort, AggregateTask } from './interface';
/**
 * @description MySQl 聚合操作
 */
declare class MySQLAggregate<T extends object> implements Aggregate<T> {
    $collection: Collection<T>;
    $taskList: AggregateTask[];
    constructor(collection: Collection<T>);
    handleTask(selectGen: SelectGenerator, task: AggregateTask): Promise<SelectGenerator>;
    preTaskList(): Promise<string>;
    addFields(fields: AggregateFields): Aggregate<T>;
    count(fieldName: AggregateKey): Aggregate<T>;
    end(): Promise<QueryResult<ResultData<T[]>>>;
    group(group: AggregateGroup): Aggregate<T>;
    skip(skip: number): Aggregate<T>;
    limit(limit: number): Aggregate<T>;
    match(fields: AggregateMatch): Aggregate<T>;
    project(project: AggregateProject): Aggregate<T>;
    filter(filter: AggregateFilter): Aggregate<T>;
    sample(size: number): Aggregate<T>;
    sort(orderby: AggregateSort): Aggregate<T>;
    sortByCount(fieldName: AggregateKey): Aggregate<T>;
}
export { MySQLAggregate };
