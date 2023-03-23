import { escape, escapeId } from 'mysql';
import { errHandler, MySQLErrorType } from '../../../model/errorHandler';
import { getAllKey, isKey } from '../../../utils/handler';
import typeOf from '../../../utils/typeOf';
import {
  AggregateCommandLike,
  AggregateProps,
} from '../../aggregateCommand/interface';
import { CommandProps } from '../../command/interface';
import {
  SQLAlias,
  SQLFields,
  SQLFilter,
  SQLGroupBy,
  SQLHaving,
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
    return '';
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
    }
    return newfieldsClip.join(', ');
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
    let regex: Partial<SQLRegex | null> = null;
    // 正则表达式
    if (typeOf.isRegx(value)) {
      const { flags, source } = <RegExp>value;
      regex = { $regex: source, $options: flags };
    }
    // SQLRegex 正则表达式
    if (typeOf.objStructMatch(value, ['$regex', '$options'])) {
      regex = <SQLRegex>value;
    }
    if (regex) {
      // 字段
      const fieldKey = this.keyClip(key);
      if (typeOf.objStructMatch(<SQLRegex>regex, ['$regex', '$options'])) {
        // SQLRegex
        const { $options, $regex } = <SQLRegex>regex;
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
        return `binary ${fieldKey} regexp "^${escape($regex).replace(
          /^'(.*)'$/,
          '$1'
        )}[^(\n)]*$"`;
      }
    }
    return '';
  }
  keyClip(key: string): string {
    // 是否是键
    if (isKey(key)) {
      // 获取子键
      const keys = getAllKey(key);
      if (keys.length !== 1 || typeOf.isNotEmptyArr(keys[0])) {
        // 获取字段
        const [field, ...subFields] = keys;
        const subKeys = subFields.map((subField) => {
          if (typeOf.isNotEmptyArr(subField)) {
            const [arrayField, ...indexs] = subField;
            const indexField = indexs.map((index) => `[${index}]`).join('');
            return `${arrayField}${indexField}`;
          }
          return subField;
        });
        if (typeOf.isNotEmptyArr(field)) {
          const [arrayField, ...indexs] = field;
          const indexField = indexs.map((index) => `[${index}]`).join('');
          return `${escapeId(arrayField)}->${escape(
            `$${[indexField, ...subKeys].join('.')}`
          )}`;
        }
        return `${escapeId(field)}->${escape(`$.${subKeys.join('.')}`)}`;
      }
      return escapeId(keys[0]);
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
            // 对象、数组
            if (typeOf.isObject(where[key]) || typeOf.isArray(where[key])) {
              return `${fieldKey} = cast(${escape(
                JSON.stringify(where[key])
              )} as json)`;
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
            if (typeOf.isNotUndefined(record[key])) {
              if (typeOf.isObject(record[key]) || typeOf.isArray(record[key])) {
                return `${fieldKey} = ${escape(
                  JSON.stringify((<SQLRecord>record)[key])
                )}`;
              }
              return `${fieldKey} = ${escape(record[key])}`;
            }
          })
          .join(', ')
      );
    }
    return recordClip.join('');
  }
}

const sqlClip = new MySQLClip();

export { MySQLClip, sqlClip };
