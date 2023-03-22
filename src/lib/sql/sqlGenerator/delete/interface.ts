import { EnumToUnion } from '../../../../utils/utilsTypes';
import {
  SQLGenerator,
  SQLLimit,
  SQLName,
  SQLOrderBy,
  SQLSkip,
  SQLTypes,
  SQLWhere,
} from '../interface';
/**
 * @description delete 语句所有片段名
 */
export enum DeleteClipNames {
  NAME,
  WHERE,
  ORDERBY,
  LIMIT,
}

/**
 * @description delete 语句片段类型
 */
export type DeleteClipName = EnumToUnion<typeof DeleteClipNames>;

/**
 * @description delete 属性值
 */
export type DeletePropValue<T> = T extends 'name'
  ? SQLName
  : T extends 'where'
  ? SQLWhere
  : T extends 'orderby'
  ? SQLOrderBy
  : T extends 'limit'
  ? SQLSkip
  : never;

/**
 * @description 生成删除 sql 语句
 */
export interface DeleteGenerator extends SQLGenerator {
  $type: SQLTypes.DELETE;
  $name?: SQLName;
  $where?: SQLWhere;
  $orderby?: SQLOrderBy;
  $limit?: SQLLimit;
  get<T extends DeleteClipName>(clipName: T): DeletePropValue<T>;
  set<T extends DeleteClipName>(
    clipName: T,
    value: DeletePropValue<T>
  ): DeleteGenerator;
}
