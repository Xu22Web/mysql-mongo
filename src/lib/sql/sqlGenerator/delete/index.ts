import { errHandler, MySQLErrorType } from '../../../../model/errorHandler';
import typeOf from '../../../../utils/typeOf';
import { sqlClip } from '../../../sql/sqlClip';
import {
  SQLGeneratorConfig,
  SQLLimit,
  SQLName,
  SQLOrderBy,
  SQLTypes,
  SQLWhere,
} from '../interface';
import { DeleteClipName, DeleteGenerator, DeletePropValue } from './interface';

/**
 * @description MySQL 删除 sql 语句生成器
 */
class MySQLDeleteGenerator implements DeleteGenerator {
  $type: SQLTypes.DELETE = SQLTypes.DELETE;
  $name?: SQLName;
  $where?: SQLWhere;
  $orderby?: SQLOrderBy;
  $limit?: SQLLimit;
  constructor(config?: SQLGeneratorConfig<DeleteGenerator>) {
    const { $name, $where, $orderby, $limit } = config || {};
    // 属性赋值
    typeOf.isNotBlankStr($name) && this.set('name', $name);
    typeOf.isNotEmptyObj($where) && this.set('where', $where);
    typeOf.isNotEmptyObj($orderby) && this.set('orderby', $orderby);
    typeOf.isNumber($limit) && this.set('limit', $limit);
  }
  get<T extends DeleteClipName>(clipName: T): DeletePropValue<T> {
    return <DeletePropValue<T>>this[`$${<DeleteClipName>clipName}`];
  }
  set<T extends DeleteClipName>(
    clipName: T,
    value: DeletePropValue<T>
  ): DeleteGenerator {
    // name
    if (clipName === 'name') {
      if (typeOf.isNotBlankStr(value)) {
        this.$name = <SQLName>value;
        return this;
      }
      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLDeleteGenerator', property 'name' type must be string!`
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
        `In class 'MySQLDeleteGenerator', property 'where' type must be 'SQLWhere'!`
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
        `In class 'MySQLDeleteGenerator', property 'orderby' type must be 'SQLOrderBy'!`
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
        `In class 'MySQLDeleteGenerator', property 'limit' type must be number!`
      );
    }
    return this;
  }
  exists(clipName: DeleteClipName): boolean {
    // name
    if (clipName == 'name') {
      return typeOf.isNotBlankStr(this[`$${clipName}`]);
    }
    // where | orderby
    if (clipName === 'where' || clipName == 'orderby') {
      return typeOf.isNotEmptyObj(this[`$${clipName}`]);
    }
    // limit
    if (clipName === 'limit') {
      return typeOf.isNumber(this[`$${clipName}`]);
    }
    // 报错：SQLGENERATOR_PROPERTY_ERROR
    throw errHandler.createError(
      MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
      `In class 'MySQLDeleteGenerator', don't exist property ${clipName}!`
    );
  }
  generate(): string {
    // 属性值
    const { $name, $where, $orderby, $limit } = this;
    // 不存在集合名
    if (!typeOf.isNotBlankStr($name)) {
      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLDeleteGenerator', don't exist property '$name'!`
      );
    }
    // 筛选片段
    const whereClip = sqlClip.whereClip($where);
    // 排序片段
    const orderByClip = sqlClip.orderByClip($orderby);
    // 限制条数片段
    const limitClip = sqlClip.limitClip($limit);
    // 集合名
    const nameClip = sqlClip.nameClip($name);
    // sql
    const sql = `delete from${nameClip}${whereClip}${orderByClip}${limitClip}`;

    return sql;
  }
}

export { MySQLDeleteGenerator };
