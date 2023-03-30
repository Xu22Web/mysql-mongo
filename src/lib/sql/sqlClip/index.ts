import { escape, escapeId } from 'mysql';
import { errHandler, MySQLErrorType } from '../../../model/errorHandler';
import {
  getJsonKeyPath,
  getKey,
  isJsonKey,
  isKey,
} from '../../../utils/handler';
import typeOf from '../../../utils/typeOf';
import { $ } from '../../aggregateCommand';
import {
  AggregateCommandLike,
  AggregateProps,
} from '../../aggregateCommand/interface';
import { CommandProps } from '../../command/interface';
import { MySQLRegExpLike } from '../sqlCondition/regExpLike';
import {
  SQLAlias,
  SQLFields,
  SQLFilter,
  SQLGroupBy,
  SQLHaving,
  SQLJsonArray,
  SQLJsonObject,
  SQLLike,
  SQLName,
  SQLNewFields,
  SQLOrderBy,
  SQLRecord,
  SQLRegex,
  SQLWhere,
} from '../sqlGenerator/interface';
import { SqlClip } from './interface';
import { sqlAggregateCommandClip } from './sqlAggregateCommandClip';
import { sqlCommandClip } from './sqlCommandClip';

/**
 * @description sql 片段
 */
class MySQLClip implements SqlClip {
  nameClip(name?: SQLName | SQLAlias): string {
    if (typeOf.isNotBlankStr(name)) {
      // string
      return ` ${escapeId(<string>name)} `;
    }
    if (typeOf.isNotEmptyObj(name)) {
      // keys
      const nameKeys = Object.keys(name);
      return nameKeys
        .map((key) => ` ${escapeId(key)} as ${escapeId(name[key])} `)
        .join(', ');
    }
    // 报错：ARGUMENTS_TYPE_ERROR
    throw errHandler.createError(
      MySQLErrorType.ARGUMENTS_TYPE_ERROR,
      `name must to be SQLName | SQLAlias`
    );
  }
  fieldsClip(
    fields?: SQLFields,
    newfields?: SQLNewFields,
    group?: SQLGroupBy
  ): string {
    // 字段片段
    const fieldsClip: string[] = [];
    if (group) {
      // 分组键
      const groupKeys = group.map((field) => this.keyClip(field));
      // 旧字段
      if (typeOf.isNotEmptyArr(fields)) {
        // 新字段
        if (typeOf.isNotEmptyObj(newfields)) {
          // 去除重复
          fields
            .filter(
              (field) =>
                !typeOf.isNotUndefined(newfields[field]) &&
                typeOf.isNotUndefined(field)
            )
            .forEach((field) => {
              const fieldKey = this.keyClip(field);
              if (groupKeys.includes(fieldKey)) {
                fieldsClip.push(fieldKey);
              }
            });
        } else {
          fields
            .filter(
              (field) =>
                typeOf.isNotUndefined(field) && groupKeys.includes(field)
            )
            .forEach((field) => {
              const fieldKey = this.keyClip(field);
              if (groupKeys.includes(fieldKey)) {
                fieldsClip.push(fieldKey);
              }
            });
        }
      }
      // 新字段
      if (typeOf.isNotEmptyObj(newfields)) {
        // 新字段片段
        const newfieldsClip = this.newfieldsClip(newfields);
        fieldsClip.push(newfieldsClip);
      }
    } else {
      // 旧字段
      if (typeOf.isNotEmptyArr(fields)) {
        if (typeOf.isNotEmptyObj(newfields)) {
          // 去除重复
          fields
            .filter(
              (field) =>
                !typeOf.isNotUndefined(newfields[field]) &&
                typeOf.isNotUndefined(field)
            )
            .forEach((field) => fieldsClip.push(this.keyClip(field)));
        } else {
          fields
            .filter((field) => typeOf.isNotUndefined(field))
            .forEach((field) => fieldsClip.push(this.keyClip(field)));
        }
      }
      // 新字段
      if (typeOf.isNotEmptyObj(newfields)) {
        const newfieldsClip = this.newfieldsClip(newfields);
        fieldsClip.push(newfieldsClip);
      }
    }
    return typeOf.isNotEmptyArr(fieldsClip)
      ? ` ${fieldsClip.join(', ')} `
      : ' * ';
  }
  newfieldsClip(newfields?: SQLNewFields): string {
    // 字段片段
    let newfieldsClip: string[] = [];
    if (typeOf.isNotEmptyObj(newfields)) {
      // 字段数组
      const fieldKeys = Object.keys(newfields);

      fieldKeys.forEach((fieldKey) => {
        const { $mode } = <AggregateCommandLike>newfields[fieldKey];
        // 聚合命令操作
        if (
          typeOf.objStructMatch(newfields[fieldKey], ['$value', '$type']) &&
          $mode === 'aggregate'
        ) {
          const aggregate = <AggregateProps>newfields[fieldKey];
          const asKey = this.keyClip(fieldKey);
          newfieldsClip.push(
            `${sqlAggregateCommandClip.aggrControllerClip(
              aggregate
            )} as ${asKey}`
          );
          return;
        }
        // 聚合键
        if (
          typeOf.isNotBlankStr(newfields[fieldKey]) &&
          isKey(newfields[fieldKey])
        ) {
          const oldAsKey = this.keyClip(<string>newfields[fieldKey]);
          const asKey = this.keyClip(fieldKey);
          if (asKey !== oldAsKey) {
            newfieldsClip.push(`${oldAsKey} as ${asKey}`);
            return;
          }
          newfieldsClip.push(`${oldAsKey}`);
          return;
        }
        // number, string, boolean, null
        if (
          typeOf.isNumber(newfields[fieldKey]) ||
          typeOf.isString(newfields[fieldKey]) ||
          typeOf.isBooloon(newfields[fieldKey]) ||
          typeOf.isNull(newfields[fieldKey])
        ) {
          const asKey = this.keyClip(fieldKey);
          const oldAsKey = escape(newfields[fieldKey]);
          if (asKey !== oldAsKey) {
            newfieldsClip.push(`${oldAsKey} as ${asKey}`);
            return;
          }
          newfieldsClip.push(`${oldAsKey}`);
          return;
        }
        // 报错：ARGUMENTS_TYPE_ERROR
        throw errHandler.createError(
          MySQLErrorType.ARGUMENTS_TYPE_ERROR,
          'In newfieldsClip, a argument type must be number, string, boolean, null, AggregateCommand, or AggregateKey'
        );
      });
      return newfieldsClip.join(', ');
    }
    // 报错：ARGUMENTS_TYPE_ERROR
    throw errHandler.createError(
      MySQLErrorType.ARGUMENTS_TYPE_ERROR,
      `newfields must to be SQLNewFields`
    );
  }
  fieldFilterClip(filter?: SQLFilter): string {
    // 过滤行
    const filterColumnClip: string[] = [];

    if (typeOf.isNotEmptyObj(filter)) {
      // 前缀
      filterColumnClip.push(' and ');
      // 字段数组
      const filterKeys = Object.keys(filter);
      filterColumnClip.push(
        filterKeys
          .map((key) =>
            filter[key]
              ? `column_name = ${escape(key)}`
              : `column_name != ${escape(key)}`
          )
          .join(' and ')
      );
    }
    return filterColumnClip.join('');
  }
  likeClip(key: string, value: SQLLike): string {
    // 字段
    const fieldKey = this.keyClip(key);
    // flags
    const options = value.$options.split('');
    if (options.includes('i')) {
      return `${fieldKey} like ${escape(value.$like)}`;
    }
    return `binary ${fieldKey} like ${escape(value.$like)}`;
  }
  regexClip(key: string, value: SQLRegex | RegExp): string {
    // 正则
    let regex = new MySQLRegExpLike().create(value);
    // 非法正则
    if (!typeOf.objStructMatch(regex, ['$regex', '$options'])) {
      // 报错：ARGUMENTS_TYPE_ERROR
      throw errHandler.createError(
        MySQLErrorType.ARGUMENTS_TYPE_ERROR,
        `expected key is string, value is SQLRegex or RegExp`
      );
    }
    // 字段
    const fieldKey = this.keyClip(key);
    // SQLRegex
    const { $options, $regex } = regex;
    if ($options) {
      // 大小写
      if ($options.includes('i')) {
        // 单行
        if (!$options.includes('m')) {
          return `${fieldKey} regexp "^${escape($regex).replace(
            /^'(.*)'$/,
            '$1'
          )}[^(\\n)]*$"`;
        }
        return `${fieldKey} regexp ${escape($regex)}`;
      }
      // 多行
      if ($options.includes('m')) {
        return `binary ${fieldKey} regexp ${escape($regex)}`;
      }
    }
    return `binary ${fieldKey} regexp "^${escape($regex).replace(
      /^'(.*)'$/,
      '$1'
    )}[^(\n)]*$"`;
  }
  keyClip(key: string, json?: boolean): string {
    key = key.trim();
    // 非法 key
    if (!key) {
      // 报错：ARGUMENTS_TYPE_ERROR
      throw errHandler.createError(
        MySQLErrorType.ARGUMENTS_TYPE_ERROR,
        `expected key is string`
      );
    }
    // key
    if (isKey(key)) {
      // json
      if (isJsonKey(key) || json) {
        const [field, path] = getJsonKeyPath(key);
        return `${escapeId(field)}->${escape(path)}`;
      }
      return escapeId(getKey(key));
    }
    // json
    if (json) {
      return `${escapeId(key)}->'$'`;
    }
    return escapeId(key);
  }
  whereClip(where?: SQLWhere): string {
    // where
    const whereClip: string[] = [];
    if (typeOf.isNotEmptyObj(where)) {
      // 前缀
      whereClip.push(' where ');
      // 字段数组
      const fieldKeys = Object.keys(where);
      whereClip.push(
        fieldKeys
          .map((key) => {
            // SQLLike 模糊查询
            if (typeOf.objStructMatch(where[key], ['$like', '$options'])) {
              return this.likeClip(key, <SQLLike>where[key]);
            }
            // 标准正则、SQLRegex 正则表达式
            if (
              typeOf.objStructMatch(where[key], ['$regex', '$options']) ||
              typeOf.isRegx(where[key])
            ) {
              return this.regexClip(key, <SQLRegex>where[key]);
            }
            // Command 命令
            if (typeOf.objStructMatch(where[key], ['$value', '$type'])) {
              // 命令操作
              const newWhere = <CommandProps>where[key];
              const { $mode } = newWhere;
              if ($mode === 'command') {
                return sqlCommandClip.cmdControllerClip(key, newWhere);
              }
            }
            // 字段
            const fieldKey = this.keyClip(key);
            // 对象
            if (typeOf.isObject(where[key])) {
              const value = sqlAggregateCommandClip.aggrControllerClip(
                $.json_object(<SQLJsonObject>where[key])
              );
              return `${fieldKey} = ${value}`;
            }
            // 数组
            if (typeOf.isArray(where[key])) {
              const value = sqlAggregateCommandClip.aggrControllerClip(
                $.json_array(<SQLJsonArray>where[key])
              );
              return `${fieldKey} = ${value}`;
            }
            // null
            if (typeOf.isNull(where[key])) {
              return `binary ${fieldKey} is null`;
            }
            // number, string, boolean
            if (
              typeOf.isNumber(where[key]) ||
              typeOf.isString(where[key]) ||
              typeOf.isBooloon(where[key])
            ) {
              return `binary ${fieldKey} = ${escape(where[key])}`;
            }

            // 报错：ARGUMENTS_TYPE_ERROR
            throw errHandler.createError(
              MySQLErrorType.ARGUMENTS_TYPE_ERROR,
              'In whereClip, a argument type must be number, string, boolean, null, RegExp, Command, SQLLike or SQLRegex'
            );
          })
          .join(' and ')
      );
    }
    return whereClip.join('');
  }
  groupByClip(groupBy?: SQLGroupBy): string {
    // 分组
    const groupByClip: string[] = [];
    if (typeOf.isNotEmptyArr(groupBy)) {
      // 前缀
      groupByClip.push(' group by ');
      // 排序数组
      groupByClip.push(
        groupBy.map((groupByKey) => this.keyClip(groupByKey)).join(', ')
      );
    }
    return groupByClip.join('');
  }
  havingClip(where?: SQLHaving): string {
    // having
    const havingClip: string[] = [];
    if (typeOf.isNotEmptyObj(where)) {
      // 前缀
      havingClip.push(' having ');
      // 字段数组
      const fieldKeys = Object.keys(where);
      havingClip.push(
        fieldKeys
          .map((key) => {
            // 字段
            const fieldKey = this.keyClip(key);
            // SQLLike 模糊查询
            if (typeOf.objStructMatch(where[key], ['$like', '$options'])) {
              const newWhere = <SQLLike>where[key];
              const options = newWhere.$options.split('');
              if (options.includes('i')) {
                return `${fieldKey} like ${escape(newWhere.$like)}`;
              }
              return `binary ${fieldKey} like ${escape(newWhere.$like)}`;
            }
            // SQLRegex 正则表达式
            if (typeOf.objStructMatch(where[key], ['$regex', '$options'])) {
              const newWhere = <SQLRegex>where[key];
              const options = newWhere.$options.split('');
              if (options.includes('i')) {
                return `${fieldKey} regexp ${escape(newWhere.$regex)}`;
              }
              return `binary ${fieldKey} regexp ${escape(newWhere.$regex)}`;
            }
            // Command 命令
            if (typeOf.objStructMatch(where[key], ['$value', '$type'])) {
              // 命令操作
              const newWhere = <CommandProps>where[key];
              const { $mode } = newWhere;
              if ($mode === 'command') {
                return sqlCommandClip.cmdControllerClip(key, newWhere);
              }
            }
            // null
            if (typeOf.isNull(where[key])) {
              return `binary ${fieldKey} is null`;
            }
            // number, string, boolean
            if (
              typeOf.isNumber(where[key]) ||
              typeOf.isString(where[key]) ||
              typeOf.isBooloon(where[key])
            ) {
              return `binary ${fieldKey} = ${escape(where[key])}`;
            }
            // 报错：ARGUMENTS_TYPE_ERROR
            throw errHandler.createError(
              MySQLErrorType.ARGUMENTS_TYPE_ERROR,
              'In havingClip, a argument type must be number, string, boolean, null, RegExp, Command, SQLLike or SQLRegex'
            );
          })
          .join(' and ')
      );
    }
    return havingClip.join('');
  }
  orderByClip(orderBy?: SQLOrderBy): string {
    // 排序
    const orderByClip: string[] = [];
    if (typeOf.isNotEmptyObj(orderBy)) {
      // 前缀
      orderByClip.push(' order by ');
      // 排序数组
      const orderByKeys = Object.keys(orderBy);
      orderByClip.push(
        orderByKeys
          .map((key) => {
            // 随机排序
            if (key.toLowerCase() === 'rand()') {
              return `rand()`;
            }
            // 字段
            const fieldKey = this.keyClip(key);
            const orders = ['asc', 'desc', ''];
            if (
              typeOf.isString(orderBy[key]) &&
              orders.includes(<string>orderBy[key])
            ) {
              return `${fieldKey} ${orderBy[key]}`;
            }

            // 报错：ARGUMENTS_TYPE_ERROR
            throw errHandler.createError(
              MySQLErrorType.ARGUMENTS_TYPE_ERROR,
              `In OrderBy, 'order' value type must be 'asc', 'desc' or ''`
            );
          })
          .join(', ')
      );
    }
    return orderByClip.join('');
  }
  limitClip(limit?: number, skip?: number): string {
    // 限制记录条数
    const limitClip: string[] = [];
    if (typeOf.isNumber(limit)) {
      // 前缀
      limitClip.push(' limit ');
      if (typeOf.isNumber(skip)) {
        limitClip.push(`${skip}, ${limit}`);
      } else {
        limitClip.push(`${limit}`);
      }
    }
    if (typeOf.isNumber(skip) && !typeOf.isNumber(limit)) {
      // 报错：UNEXPECTED_TOKEN
      throw errHandler.createError(
        MySQLErrorType.UNEXPECTED_TOKEN,
        `'skip' must be used with 'limit'`
      );
    }
    return limitClip.join('');
  }
  recordClip(record?: SQLRecord) {
    // 限制记录条数
    const recordClip: string[] = [];
    if (typeOf.isNotEmptyObj(record)) {
      // 前缀
      recordClip.push(' set ');
      const recordKeys = Object.keys(record);
      recordClip.push(
        recordKeys
          .map((key) => {
            // 字段
            const fieldKey = this.keyClip(key);
            // 对象
            if (typeOf.isObject(record[key])) {
              const value = sqlAggregateCommandClip.aggrControllerClip(
                $.json_object(<SQLJsonObject>record[key])
              );
              return `${fieldKey} = ${value}`;
            }
            // 数组
            if (typeOf.isArray(record[key])) {
              const value = sqlAggregateCommandClip.aggrControllerClip(
                $.json_array(<SQLJsonArray>record[key])
              );
              return `${fieldKey} = ${value}`;
            }
            return `${fieldKey} = ${escape(record[key])}`;
          })
          .join(', ')
      );
    }
    return recordClip.join('');
  }
}

const sqlClip = new MySQLClip();

export { MySQLClip, sqlClip };
