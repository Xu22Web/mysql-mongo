import { errHandler, MySQLErrorType } from '../../../../model/errorHandler';
import typeOf from '../../../../utils/typeOf';
import { sqlClip } from '../../../sql/sqlClip';
import {
  SQLGeneratorConfig,
  SQLLimit,
  SQLName,
  SQLOrderBy,
  SQLRecord,
  SQLTypes,
  SQLWhere
} from '../interface';
import { UpdateClipName, UpdateGenerator, UpdatePropValue } from './interface';

/**
 * @description MySQL 更新 sql 语句生成器
 */
class MySQLUpdateGenerator implements UpdateGenerator {
  $type: SQLTypes.UPDATE = SQLTypes.UPDATE;
  $name?: SQLName;
  $record?: SQLRecord;
  $where?: SQLWhere;
  $orderby?: SQLOrderBy;
  $limit?: SQLLimit;
  constructor(config?: SQLGeneratorConfig<UpdateGenerator>) {
    const { $name, $where, $orderby, $limit, $record } = config || {};

    // 属性赋值
    typeOf.isNotBlankStr($name) && this.set('name', $name);
    typeOf.isNotEmptyObj($where) && this.set('where', $where);
    typeOf.isNotEmptyObj($orderby) && this.set('orderby', $orderby);
    typeOf.isNumber($limit) && this.set('limit', $limit);
    typeOf.isNotEmptyObj($record) && this.set('record', $record);
  }
  get<T extends UpdateClipName>(clipName: T): UpdatePropValue<T> {
    return <UpdatePropValue<T>>this[`$${<UpdateClipName>clipName}`];
  }
  set<T extends UpdateClipName>(
    clipName: T,
    value: UpdatePropValue<T>
  ): UpdateGenerator {
    // record
    if (clipName === 'record') {
      if (typeOf.isNotEmptyObj(value)) {
        this.$record = <SQLRecord>value;
        return this;
      }
      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLInsertGenerator', property 'record' type must be 'SQLRecord'`
      );
    }
    // name
    if (clipName === 'name') {
      if (typeOf.isNotBlankStr(value)) {
        this.$name = <SQLName>value;
        return this;
      }
      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLUpdateGenerator', property 'name' type must be 'SQLName' as string`
      );
    }
    // where
    if (clipName === 'where') {
      if (typeOf.isNotEmptyObj(value)) {
        this.$where = <SQLWhere>value;
        return this;
      }

      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLUpdateGenerator', property 'where' type must be 'SQLWhere'`
      );
    }
    // orderby
    if (clipName === 'orderby') {
      if (typeOf.objStructTypeMatch(value, { '[key]': 'isNotBlankStr' })) {
        this.$orderby = <SQLOrderBy>value;
        return this;
      }

      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLUpdateGenerator', property 'orderby' type must be 'SQLOrderBy'`
      );
    }
    // limit
    if (clipName === 'limit') {
      if (typeOf.isNumber(value)) {
        this.$limit = <SQLLimit>value;
        return this;
      }

      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLUpdateGenerator', property 'limit' type must be 'SQLLimit' as number`
      );
    }
    // 报错：SQLGENERATOR_PROPERTY_ERROR
    throw errHandler.createError(
      MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
      `Don't exist property ${clipName}!`
    );
  }
  exists(clipName: UpdateClipName): boolean {
    // name
    if (clipName == 'name') {
      return typeOf.isNotBlankStr(this[`$${clipName}`]);
    }
    // where| orderby| record
    if (
      clipName === 'where' ||
      clipName === 'orderby' ||
      clipName === 'record'
    ) {
      return typeOf.isNotEmptyObj(this[`$${clipName}`]);
    }
    // limit
    if (clipName === 'limit') {
      return typeOf.isNumber(this[`$${clipName}`]);
    }
    // 报错：SQLGENERATOR_PROPERTY_ERROR
    throw errHandler.createError(
      MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
      `Don't exist property ${clipName}!`
    );
  }
  generate(): string {
    // 属性值
    const { $name, $where, $orderby, $limit, $record } = this;
    // 存在集合名
    if (typeOf.isNotBlankStr($name)) {
      // 筛选片段
      const whereClip = sqlClip.whereClip($where);
      // 排序片段
      const orderByClip = sqlClip.orderByClip($orderby);
      // 限制条数片段
      const limitClip = sqlClip.limitClip($limit);
      // 集合名
      const nameClip = sqlClip.nameClip($name);
      // 记录
      const recordClip = sqlClip.recordClip($record);
      // sql
      const sql = `update${nameClip}${recordClip}${whereClip}${orderByClip}${limitClip}`;

      return sql;
    }
    // 报错：SQLGENERATOR_PROPERTY_ERROR
    throw errHandler.createError(
      MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
      `In class 'MySQLUpdateGenerator', don't exist property '$name'!`
    );
  }
}

export { MySQLUpdateGenerator };

