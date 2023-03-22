import { EnumToUnion } from '../../../../utils/utilsTypes';
import {
  SQLGenerator,
  SQLLimit,
  SQLName,
  SQLOrderBy,
  SQLRecord,
  SQLTypes,
  SQLWhere,
} from '../interface';
/**
 * @description update 语句所有片段名
 */
export enum UpdateClipNames {
  NAME,
  WHERE,
  ORDERBY,
  LIMIT,
  RECORD,
}

/**
 * @description update 语句片段类型
 */
export type UpdateClipName = EnumToUnion<typeof UpdateClipNames>;

/**
 * @description update 属性值
 */
export type UpdatePropValue<T> = T extends 'name'
  ? SQLName
  : T extends 'where'
  ? SQLWhere
  : T extends 'orderby'
  ? SQLOrderBy
  : T extends 'limit'
  ? SQLLimit
  : T extends 'record'
  ? SQLRecord
  : never;

/**
 * @description 生成更新 sql 语句
 */
export interface UpdateGenerator extends SQLGenerator {
  $type: SQLTypes.UPDATE;
  $name?: SQLName;
  $record?: SQLRecord;
  $where?: SQLWhere;
  $orderby?: SQLOrderBy;
  $limit?: SQLLimit;
  get<T extends UpdateClipName>(clipName: T): UpdatePropValue<T>;
  set<T extends UpdateClipName>(
    clipName: T,
    value: UpdatePropValue<T>
  ): UpdateGenerator;
}
