/**
 * @description 错误类型
 */
export declare enum MySQLErrorType {
    ARGUMENTS_TYPE_ERROR = 0,
    ARGUMENTS_LENGTH_ERROR = 1,
    UNEXPECTED_TOKEN = 2,
    DATABASE_INIT_ERROR = 3,
    COLLECTION_INIT_ERROR = 4,
    COLLECTION_GET_ERROR = 5,
    COLLECTION_ADD_ERROR = 6,
    COLLECTION_DELETE_ERROR = 7,
    COLLECTION_UPDATE_ERROR = 8,
    COLLECTION_SET_ERROR = 9,
    COLLECTION_REMOVE_ERROR = 10,
    COLLECTION_GETFIELDS_ERROR = 11,
    COLLECTION_PROPERTY_ERROR = 12,
    SQLGENERATOR_PROPERTY_ERROR = 13,
    AGGREGATE_END_ERROR = 14
}
export interface ErrorHandlerConstructor {
    /**
     * @description 抛出异常
     * @param err
     * @param cause
     */
    createError(err: MySQLErrorType | string, cause?: string | Error): Error;
}
export declare class MySQLErrorHandler extends Error {
    static createError(err: MySQLErrorType | string, cause?: string | Error): Error;
}
export declare const errHandler: ErrorHandlerConstructor;
