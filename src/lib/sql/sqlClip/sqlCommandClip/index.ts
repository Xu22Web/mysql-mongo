import { escape } from 'mysql';
import { sqlClip } from '../';
import { errHandler, MySQLErrorType } from '../../../../model/errorHandler';
import typeOf from '../../../../utils/typeOf';
import { isCommand, isKey } from '../../../../utils/utils';
import { $ } from '../../../aggregateCommand';
import { AggregateCommandLike } from '../../../aggregateCommand/interface';
import {
  CommandCompareFilterType,
  CommandCompareSimpleType,
  CommandLike,
  CommandLogicNegativeType,
  CommandLogicSimpleType,
  CommandMixParamType,
  CommandProps,
} from '../../../command/interface';
import { SQLJsonArray, SQLJsonObject } from '../../sqlGenerator/interface';
import { sqlAggregateCommandClip } from '../sqlAggregateCommandClip';
import { SQLCommandClip } from './interface';

/**
 * @description command clip 片段
 */
class MySQLCommandClip implements SQLCommandClip {
  cmdValueClip(key: string, value: CommandMixParamType): string {
    // Command 类型
    if (isCommand(value)) {
      return this.cmdControllerClip(key, value);
    }
    // AggregateCommand 类型
    if (
      typeOf.objStructMatch<AggregateCommandLike>(value, ['$value', '$type']) &&
      value.$mode === 'aggregate'
    ) {
      return sqlAggregateCommandClip.aggrControllerClip(value);
    }
    // 字符键表达式
    if (isKey(value)) {
      const key = sqlClip.keyClip(value);
      return key;
    }
    // number、string、boolean 类型
    if (
      typeOf.isNumber(value) ||
      typeOf.isString(value) ||
      typeOf.isBooloon(value)
    ) {
      return `${escape(value)}`;
    }
    // null 类型
    if (typeOf.isNull(value)) {
      return 'null';
    }
    //  array 类型
    if (typeOf.isArray(value)) {
      return sqlAggregateCommandClip.aggrControllerClip(
        $.json_array(<SQLJsonArray>value)
      );
    }
    // object 类型
    if (typeOf.isObject(value)) {
      return sqlAggregateCommandClip.aggrControllerClip(
        $.json_object(<SQLJsonObject>value)
      );
    }
    return '';
  }
  cmdControllerClip(key: string, command: CommandLike): string {
    // 类型
    const { $type } = command;

    // 非 Command 类型
    if (!isCommand(command)) {
      throw errHandler.createError(
        MySQLErrorType.ARGUMENTS_TYPE_ERROR,
        `command must be a 'CommandLike'`
      );
    }

    // 逻辑操作符
    if ($type === CommandLogicSimpleType.AND) {
      return this.and(key, command);
    }
    if ($type === CommandLogicSimpleType.OR) {
      return this.or(key, command);
    }
    if ($type === CommandLogicNegativeType.NOT) {
      return this.not(key, command);
    }
    if ($type === CommandLogicNegativeType.NAND) {
      return this.nand(key, command);
    }
    if ($type === CommandLogicNegativeType.NOR) {
      return this.nor(key, command);
    }
    // 比较操作符
    if ($type === CommandCompareSimpleType.EQ) {
      return this.eq(key, command);
    }
    if ($type === CommandCompareSimpleType.NEQ) {
      return this.neq(key, command);
    }
    if ($type === CommandCompareSimpleType.LT) {
      return this.lt(key, command);
    }
    if ($type === CommandCompareSimpleType.LTE) {
      return this.lte(key, command);
    }
    if ($type === CommandCompareSimpleType.GT) {
      return this.gt(key, command);
    }
    if ($type === CommandCompareSimpleType.GTE) {
      return this.gte(key, command);
    }
    if ($type === CommandCompareFilterType.IN) {
      return this.in(key, command);
    }
    if ($type === CommandCompareFilterType.NIN) {
      return this.nin(key, command);
    }
    throw errHandler.createError(
      MySQLErrorType.ARGUMENTS_TYPE_ERROR,
      `command.type don't exist`
    );
  }
  and(key: string, command: CommandProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = command;
    // 参数
    const args = rawArgs.map((rawArg) => this.cmdValueClip(key, rawArg));
    return args.join(` ${symbol} `);
  }
  or(key: string, command: CommandProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = command;
    // 参数
    const args = rawArgs.map((rawArg) => this.cmdValueClip(key, rawArg));
    return args.join(` ${symbol} `);
  }
  not(key: string, command: CommandProps): string {
    // 值
    const { $value: rawArgs } = command;
    // 参数
    const args = rawArgs.map((rawArg) => this.cmdValueClip(key, rawArg));
    return `not(${args[0]})`;
  }
  nor(key: string, command: CommandProps): string {
    // 值
    const { $value: rawArgs } = command;
    // 参数
    const args = rawArgs.map((rawArg) => this.cmdValueClip(key, rawArg));
    return `not(${args.join(` or `)})`;
  }
  nand(key: string, command: CommandProps): string {
    // 值
    const { $value: rawArgs } = command;
    // 参数
    const args = rawArgs.map((rawArg) => this.cmdValueClip(key, rawArg));
    return `not(${args.join(` and `)})`;
  }
  eq(key: string, command: CommandProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = command;
    // 字段
    const fieldKey = sqlClip.keyClip(key);
    // 参数
    const args = rawArgs.map((rawArg) => this.cmdValueClip(key, rawArg));
    // null
    if (args[0] === 'null') {
      return `${fieldKey} is ${args[0]}`;
    }
    return `${fieldKey} ${symbol} ${args[0]}`;
  }
  neq(key: string, command: CommandProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = command;
    // 字段
    const fieldKey = sqlClip.keyClip(key);
    // 参数
    const args = rawArgs.map((rawArg) => this.cmdValueClip(key, rawArg));
    // null
    if (args[0] === 'null') {
      return `${fieldKey} is not ${args[0]}`;
    }
    return `${fieldKey} ${symbol} ${args[0]}`;
  }
  lt(key: string, command: CommandProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = command;
    // 字段
    const fieldKey = sqlClip.keyClip(key);
    // 参数
    const args = rawArgs.map((rawArg) => this.cmdValueClip(key, rawArg));
    return `${fieldKey} ${symbol} ${args[0]}`;
  }
  lte(key: string, command: CommandProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = command;
    // 字段
    const fieldKey = sqlClip.keyClip(key);
    // 参数
    const args = rawArgs.map((rawArg) => this.cmdValueClip(key, rawArg));
    return `${fieldKey} ${symbol} ${args[0]}`;
  }
  gt(key: string, command: CommandProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = command;
    // 字段
    const fieldKey = sqlClip.keyClip(key);
    // 参数
    const args = rawArgs.map((rawArg) => this.cmdValueClip(key, rawArg));
    return `${fieldKey} ${symbol} ${args[0]}`;
  }
  gte(key: string, command: CommandProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = command;
    // 字段
    const fieldKey = sqlClip.keyClip(key);
    // 参数
    const args = rawArgs.map((rawArg) => this.cmdValueClip(key, rawArg));
    return `${fieldKey} ${symbol} ${args[0]}`;
  }
  in(key: string, command: CommandProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = command;
    // 字段
    const fieldKey = sqlClip.keyClip(key);
    // 参数
    const args = rawArgs.map((rawArg) => this.cmdValueClip(key, rawArg));
    return `${fieldKey} ${symbol} (${args.join(', ')})`;
  }
  nin(key: string, command: CommandProps): string {
    // 值
    const { $value: rawArgs, $type: symbol } = command;
    // 字段
    const fieldKey = sqlClip.keyClip(key);
    // 参数
    const args = rawArgs.map((rawArg) => this.cmdValueClip(key, rawArg));
    return `${fieldKey} ${symbol} (${args.join(', ')})`;
  }
}

const sqlCommandClip = new MySQLCommandClip();

export { sqlCommandClip, MySQLCommandClip };
