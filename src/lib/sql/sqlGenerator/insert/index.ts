import { errHandler, MySQLErrorType } from '../../../../model/errorHandler';
import typeOf from '../../../../utils/typeOf';
import { sqlClip } from '../../../sql/sqlClip';
import { SQLGeneratorConfig, SQLName, SQLRecord, SQLTypes } from '../interface';
import { InsertClipName, InsertGenerator, InsertPropValue } from './interface';

/**
 * @description MySQL 插入 sql 语句生成器
 */
class MySQLInsertGenerator implements InsertGenerator {
  $type: SQLTypes.INSERT = SQLTypes.INSERT;
  $name?: SQLName;
  $record?: SQLRecord;
  constructor(config?: SQLGeneratorConfig<InsertGenerator>) {
    const { $record, $name } = config || {};

    // 属性赋值
    typeOf.isNotBlankStr($name) && this.set('name', $name);
    typeOf.isNotEmptyObj($record) && this.set('record', $record);
  }
  get<T extends InsertClipName>(clipName: T): InsertPropValue<T> {
    return <InsertPropValue<T>>this[`$${<InsertClipName>clipName}`];
  }
  set<T extends InsertClipName>(
    clipName: T,
    value: InsertPropValue<T>
  ): InsertGenerator {
    // record
    if (clipName === 'record') {
      if (typeOf.isNotEmptyObj(value)) {
        // 初始化
        this.$record = <SQLRecord>value;
        return this;
      }
      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLInsertGenerator', property 'record' type must be 'SQLRecord'!`
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
        `In class 'MySQLInsertGenerator', property 'name' type must be string!`
      );
    }
    return this;
  }
  exists(clipName: InsertClipName): boolean {
    // name
    if (clipName == 'name') {
      return typeOf.isNotBlankStr(this[`$${clipName}`]);
    }
    // record
    if (clipName === 'record') {
      return typeOf.isNotEmptyObj(this.$record);
    }
    // 报错：SQLGENERATOR_PROPERTY_ERROR
    throw errHandler.createError(
      MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
      `In class 'MySQLInsertGenerator', don't exist property '$name'!`
    );
  }
  generate(): string {
    // 属性值
    const { $name, $record } = this;
    // 存在集合名
    if (!typeOf.isNotBlankStr($name)) {
      // 报错：SQLGENERATOR_PROPERTY_ERROR
      throw errHandler.createError(
        MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR,
        `In class 'MySQLInsertGenerator', don't exist property '$name'!`
      );
    }
    // 集合名
    const nameClip = sqlClip.nameClip($name);
    // 记录
    const recordClip = sqlClip.recordClip($record);
    // sql
    const sql = `insert into${nameClip}${recordClip}`;

    return sql;
  }
}

export { MySQLInsertGenerator };
