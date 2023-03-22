import { DatabeseLike, DatabeseLikeConfig } from './interface';
declare class MySQLDatabeseLike implements DatabeseLike {
    $like?: string;
    $options?: string;
    constructor($like?: string, $options?: string);
    create(like: DatabeseLikeConfig): MySQLDatabeseLike;
}
export default MySQLDatabeseLike;
