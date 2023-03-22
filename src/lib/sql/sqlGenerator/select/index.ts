import { escapeId } from 'mysql';
import { errHandler, MySQLErrorType } from '../../../../model/errorHandler';
import typeOf from '../../../../utils/typeOf';
import { sqlClip } from '../../../sql/sqlClip';
import {
  SQLAlias,
  SQLFields,
  SQLGeneratorConfig,
  SQLGroupBy,
  SQLHaving,
  SQLLimit,
  SQLName,
  SQLNewFields,
  SQLOrderBy,
  SQLSkip,
  SQLTypes,
  SQLWhere,
} from '../interface';
import { SelectClipName, SelectGenerator, SelectPropValue } from './interface';
/**
 * @description MySQL 选择 sql 语句生成器
 */
class MySQLSelectGenerator implements SelectGenerator {
  $type: SQLTypes.SELECT = SQLTypes.SELECT;
  $fields?: SQLFields;
  $newfields?: SQLNewFields;
  $name?: SQLName | SQLAlias;
  $where?: SQLWhere;
  $groupby?: SQLGroupBy;
  $orderby?: SQLOrderBy;
  $having?: SQLHaving;
  $limit?: SQLLimit;
  $skip?: SQLSkip;
  $child?: SelectGenerator;
  constructor(config?: SQLGeneratorConfig<SelectGenerator>) {
    // 获取配置
    const {
      $fields,
      $newfields,
      $name,
      $where,
      $orderby,
      $groupby,
      $having,
      $limit,
      $skip,
      $child,
    } = config || {};

    // 属性赋值
    (typeOf.isNotBlankStr($name) || typeOf.isNotEmptyObj($name)) &&
      this.set('name', $name);
    typeOf.isNotEmptyArr($fields) && this.set('fields', $fields);
    typeOf.isNotEmptyObj($newfields) && this.set('newfields', $newfields);
    typeOf.isNotEmptyObj($where) && this.set('where', $where);
    typeOf.isNotEmptyObj($orderby) && this.set('orderby', $orderby);
    typeOf.isNotEmptyObj($groupby) && this.set('groupby', $groupby);
    typeOf.isNotEmptyObj($having) && this.set('having', $having);
    typeOf.isNumber($limit) && this.set('limit', $limit);
    typeOf.isNumber($skip) && this.set('skip', $skip);
    typeOf.isNotEmptyObj($child) && this.set('child', $child);
  }
  get<T extends SelectClipName>(clipName: T): SelectPropValue<T> {
    return <SelectPropValue<T>>this[`$${<SelectClipName>clipName}`];
  }
  set<T extends SelectClipName>(
    clipName: T,
    value: SelectPropValue<T>
  ): SelectGenerator {
    // 类型匹配
    // fields
    if (clipName === 'fields') {
      if (typeOf.isNotEmptyArr(value)) {
        this.$fields = <SQLFields>value;
        return this;
      }
      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLSelectGenerator', property 'fields' type must be 'SQLFields'!`
      );
    }
    // newfields
    if (clipName === 'newfields') {
      if (typeOf.isNotEmptyObj(value)) {
        this.$newfields = <SQLNewFields>value;
        return this;
      }
      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLSelectGenerator', property 'newfields' type must be 'SQLNewFields'!`
      );
    }
    // name
    if (clipName === 'name') {
      if (typeOf.isNotBlankStr(value)) {
        this.$name = <SQLName>value;
        return this;
      }
      if (typeOf.isNotEmptyObj(value)) {
        this.$name = <SQLAlias>value;
        return this;
      }
      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLSelectGenerator', property 'name' type must be string or 'SQLAlias'!`
      );
    }
    // where
    if (clipName === 'where') {
      if (typeOf.isNotEmptyObj(value)) {
        // 初始化
        this.$where = {};
        for (const key in value) {
          this.$where[key] = (<SQLWhere>value)[key];
        }
        return this;
      }

      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLSelectGenerator', property 'where' type must be 'SQLWhere'!`
      );
    }
    // groupby
    if (clipName === 'groupby') {
      if (typeOf.isNotEmptyArr(value)) {
        this.$groupby = <SQLGroupBy>value;
        return this;
      }

      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLSelectGenerator', property 'groupby' type must be 'SQLGroupBy'!`
      );
    }
    // having
    if (clipName === 'having') {
      if (typeOf.isNotEmptyObj(value)) {
        this.$having = <SQLHaving>value;
        return this;
      }

      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLSelectGenerator', property 'having' type must be 'SQLName'!`
      );
    }
    // orderby
    if (clipName === 'orderby') {
      if (typeOf.isNotEmptyObj(value)) {
        this.$orderby = <SQLOrderBy>value;
        return this;
      }

      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLSelectGenerator', property 'orderby' type must be 'SQLOrderBy'!`
      );
    }
    // limit
    if (clipName === 'limit' || clipName === 'skip') {
      if (typeOf.isNumber(value)) {
        this.$limit = <SQLLimit>value;
        return this;
      }

      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLSelectGenerator', property 'limit' type must be number!`
      );
    }
    // skip
    if (clipName === 'skip') {
      if (typeOf.isNumber(value)) {
        this.$skip = <SQLSkip>value;
        return this;
      }

      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLSelectGenerator', property 'skip' type must be number!`
      );
    }
    // child
    if (clipName === 'child') {
      if (typeOf.isNotEmptyObj(value)) {
        this.$child = <SelectGenerator>value;
        return this;
      }

      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLSelectGenerator', property 'child' type must be 'SelectGenerator'!`
      );
    }

    return this;
  }
  exists(clipName: SelectClipName): boolean {
    // name
    if (clipName == 'name') {
      return (
        typeOf.isNotBlankStr(this[`$${clipName}`]) ||
        typeOf.isNotEmptyObj(this[`$${clipName}`])
      );
    }
    // newfields | where | orderby | having | child
    if (
      clipName === 'newfields' ||
      clipName === 'where' ||
      clipName === 'orderby' ||
      clipName === 'having' ||
      clipName === 'child'
    ) {
      return typeOf.isNotEmptyObj(this[`$${clipName}`]);
    }
    // limit | skip
    if (clipName === 'limit' || clipName === 'skip') {
      return typeOf.isNumber(this[`$${clipName}`]);
    }
    // fields | groupby
    if (clipName == 'fields' || clipName === 'groupby') {
      return typeOf.isNotEmptyArr(this[`$${clipName}`]);
    }
    // 报错：SQLGENERATOR_PROPERTY_ERROR
    throw errHandler.createError(
      MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
      `In class 'MySQLSelectGenerator', don't exist property ${clipName}!`
    );
  }
  generate(): string {
    // 属性值
    const {
      $fields,
      $newfields,
      $name,
      $where,
      $orderby,
      $groupby,
      $having,
      $limit,
      $skip,
    } = this;

    if (typeOf.isNotBlankStr($name) || typeOf.isNotEmptyObj($name)) {
      // 字段筛选
      const fieldsClip = sqlClip.fieldsClip($fields, $newfields, $groupby);
      // 筛选片段
      const whereClip = sqlClip.whereClip($where);
      // 排序片段
      const orderByClip = sqlClip.orderByClip($orderby);
      // 限制条数片段
      const limitClip = sqlClip.limitClip($limit, $skip);
      // 集合名
      const nameClip = sqlClip.nameClip($name);
      // 分组
      const groupByClip = sqlClip.groupByClip($groupby);
      // 分组筛选
      const havingClip = sqlClip.havingClip($having);
      // sql
      const sql = `select${fieldsClip}from${nameClip}${whereClip}${groupByClip}${havingClip}${orderByClip}${limitClip}`;

      return sql;
    }
    // 报错：SQLGENERATOR_PROPERTY_ERROR
    throw errHandler.createError(
      MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
      `In class 'MySQLSelectGenerator', don't exist property '$name'!`
    );
  }
  subGenerate(alias: string, index: number = 0): string {
    // 属性值
    const {
      $fields,
      $newfields,
      $name,
      $where,
      $orderby,
      $groupby,
      $having,
      $limit,
      $skip,
      $child,
    } = this;
    // 字段筛选
    const fieldsClip = sqlClip.fieldsClip($fields, $newfields, $groupby);
    // 筛选片段
    const whereClip = sqlClip.whereClip($where);
    // 排序片段
    const orderByClip = sqlClip.orderByClip($orderby);
    // 限制条数片段
    const limitClip = sqlClip.limitClip($limit, $skip);
    // 分组
    const groupByClip = sqlClip.groupByClip($groupby);
    // 分组筛选
    const havingClip = sqlClip.havingClip($having);
    // 存在别名
    if (typeOf.isNotBlankStr(alias)) {
      // 别名序号
      const aliasClip = `${alias}${index++}`;
      if (typeOf.isNotBlankStr($name) || typeOf.isNotEmptyObj($name)) {
        let subGenClip = sqlClip.nameClip($name);
        // sql
        const sql = `select${fieldsClip}from${subGenClip}${whereClip}${groupByClip}${havingClip}${orderByClip}${limitClip}`;
        return sql;
      } else if (typeOf.isNotEmptyObj($child)) {
        let subGenClip = ` (${$child.subGenerate(alias, index)}) as ${escapeId(
          aliasClip
        )} `;
        // sql
        const sql = `select${fieldsClip}from${subGenClip}${whereClip}${groupByClip}${havingClip}${orderByClip}${limitClip}`;
        return sql;
      }
    }
    // 报错：SQLGENERATOR_PROPERTY_ERROR
    throw errHandler.createError(
      MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
      `In class 'MySQLSelectGenerator', don't exist property '$name'!`
    );
  }
}

export { MySQLSelectGenerator };
