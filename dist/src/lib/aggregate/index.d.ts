import { AggregateKey } from '../aggregateCommand/interface';
import { Collection, QueryResult, RowData } from '../collection/interface';
import { SelectGenerator } from '../sql/sqlGenerator/select/interface';
import { Aggregate, AggregateFields, AggregateFilter, AggregateGroup, AggregateMatch, AggregateProject, AggregateSort, AggregateTask } from './interface';
declare class MySQLAggregate<T> implements Aggregate<T> {
    $collection: Collection<T>;
    $taskList: AggregateTask[];
    constructor(collection: Collection<T>);
    handleTask(selectGen: SelectGenerator, task: AggregateTask): Promise<SelectGenerator>;
    preTaskList(): Promise<string>;
    addFields(fields: AggregateFields): Aggregate<T>;
    count(fieldName: AggregateKey): Aggregate<T>;
    end(): Promise<QueryResult<RowData<T[] | []>>>;
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
