import { DatabaseRegExp, DatabaseRegExpLike } from './interface';
declare class MySQLDatabaseRegExp implements DatabaseRegExp {
    $regex?: string;
    $options?: string;
    constructor($regex?: string, $options?: string);
    create(regexp: RegExp | DatabaseRegExpLike): MySQLDatabaseRegExp;
}
export { MySQLDatabaseRegExp };
