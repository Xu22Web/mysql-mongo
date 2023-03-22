import typeOf from '../utils/typeOf';
/**
 * @description 错误类型
 */
export enum MySQLErrorType {
  ARGUMENTS_TYPE_ERROR,
  ARGUMENTS_LENGTH_ERROR,
  UNEXPECTED_TOKEN,
  DATABASE_INIT_ERROR,
  COLLECTION_INIT_ERROR,
  COLLECTION_GET_ERROR,
  COLLECTION_ADD_ERROR,
  COLLECTION_DELETE_ERROR,
  COLLECTION_UPDATE_ERROR,
  COLLECTION_SET_ERROR,
  COLLECTION_REMOVE_ERROR,
  COLLECTION_GETFIELDS_ERROR,
  COLLECTION_PROPERTY_ERROR,
  SQLGENERATOR_PROPERTY_ERROR,
  AGGREGATE_END_ERROR,
}

export interface ErrorHandlerConstructor {
  /**
   * @description 抛出异常
   * @param err
   * @param cause
   */
  createError(err: MySQLErrorType | string, cause?: string | Error): Error;
}

export class MySQLErrorHandler extends Error {
  static createError(err: MySQLErrorType | string, cause?: string | Error) {
    if (typeOf.isNumber(err)) {
      if (typeOf.isString(cause)) {
        return new Error(
          `${<string>MySQLErrorType[err]} [Caused By: ${cause}]`
        );
      }
      if (typeOf.isInsOf(cause, Error)) {
        return new Error(
          `${<string>MySQLErrorType[err]} [Caused By: ${cause?.stack}]`
        );
      }
      return new Error(<string>MySQLErrorType[err]);
    }
    if (typeOf.isString(err)) {
      if (typeOf.isString(cause)) {
        return new Error(`${<string>err} [Caused By: ${cause}]`);
      }
      if (typeOf.isInsOf(cause, Error)) {
        return new Error(`${<string>err} [Caused By: ${cause?.stack}]`);
      }
      return new Error(<string>err);
    }
    return new Error(<string>err, { cause });
  }
}
// 错误处理
export const errHandler: ErrorHandlerConstructor = MySQLErrorHandler;
