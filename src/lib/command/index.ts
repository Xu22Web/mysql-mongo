import { valuesToArr, valueToArr } from '../../utils/handler';
import typeOf from '../../utils/typeOf';
import { MySQLAggregateCommand } from '../aggregateCommand';
import { AggregateCommand } from '../aggregateCommand/interface';
import {
  Command,
  CommandCompareFilterType,
  CommandCompareSimpleType,
  CommandLogicNegativeType,
  CommandLogicSimpleType,
  CommandMixParamType,
  CommandMode,
  CommandNoneType,
  CommandNumberParamType,
  CommandType,
} from './interface';

/**
 * @description 命令操作
 */
class MySQLCommand implements Command {
  $value: CommandMixParamType[];
  $type: CommandType;
  $mode: CommandMode;
  constructor(
    value: CommandMixParamType[] = [],
    type: CommandType = CommandNoneType.NONE
  ) {
    this.$value = value;
    this.$type = type;
    this.$mode = 'command';
  }
  aggregate<T extends object = any>(): AggregateCommand<T> {
    return new MySQLAggregateCommand<T>();
  }
  and(value: CommandMixParamType[]): Command;
  and(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
  and(value: any, ...rest: any[]): Command {
    const results = valuesToArr<CommandMixParamType>(value, rest, this);
    return new MySQLCommand(results, CommandLogicSimpleType.AND);
  }
  or(value: CommandMixParamType[]): Command;
  or(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
  or(value: any, ...rest: any[]): Command {
    const results = valuesToArr<CommandMixParamType>(value, rest, this);
    return new MySQLCommand(results, CommandLogicSimpleType.OR);
  }
  not(value: Command): Command {
    const results = valueToArr<CommandMixParamType>(value);
    return new MySQLCommand(results, CommandLogicNegativeType.NOT);
  }
  nor(value: CommandMixParamType[]): Command;
  nor(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
  nor(value: any, ...rest: any[]): Command {
    const results = valuesToArr<CommandMixParamType>(value, rest, this);
    return new MySQLCommand(results, CommandLogicNegativeType.NOR);
  }
  nand(value: CommandMixParamType[]): Command;
  nand(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
  nand(value: any, ...rest: any[]): Command {
    const results = valuesToArr<CommandMixParamType>(value, rest, this);
    return new MySQLCommand(results, CommandLogicNegativeType.NAND);
  }
  eq(value: CommandMixParamType): Command {
    const cmd = new MySQLCommand([value], CommandCompareSimpleType.EQ);
    if (typeOf.objStructMatch(this, ['$value', '$type'])) {
      return this.and(cmd);
    }
    return cmd;
  }
  neq(value: CommandMixParamType): Command {
    const cmd = new MySQLCommand([value], CommandCompareSimpleType.NEQ);
    if (typeOf.objStructMatch(this, ['$value', '$type'])) {
      return this.and(cmd);
    }
    return cmd;
  }
  lt(value: CommandNumberParamType): Command {
    const cmd = new MySQLCommand([value], CommandCompareSimpleType.LT);
    if (typeOf.objStructMatch(this, ['$value', '$type'])) {
      return this.and(cmd);
    }
    return cmd;
  }
  lte(value: CommandNumberParamType): Command {
    const cmd = new MySQLCommand([value], CommandCompareSimpleType.LTE);
    if (typeOf.objStructMatch(this, ['$value', '$type'])) {
      return this.and(cmd);
    }
    return cmd;
  }
  gt(value: CommandNumberParamType): Command {
    const cmd = new MySQLCommand([value], CommandCompareSimpleType.GT);
    if (typeOf.objStructMatch(this, ['$value', '$type'])) {
      return this.and(cmd);
    }
    return cmd;
  }
  gte(value: CommandNumberParamType): Command {
    const cmd = new MySQLCommand([value], CommandCompareSimpleType.GTE);
    if (typeOf.objStructMatch(this, ['$value', '$type'])) {
      return this.and(cmd);
    }
    return cmd;
  }
  in(value: CommandMixParamType[]): Command;
  in(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
  in(value: any, ...rest: any[]): Command {
    const results = valuesToArr<CommandMixParamType>(value, rest);
    return new MySQLCommand(results, CommandCompareFilterType.IN);
  }
  nin(value: CommandMixParamType[]): Command;
  nin(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
  nin(value: any, ...rest: any[]): Command {
    const results = valuesToArr<CommandMixParamType>(value, rest);
    return new MySQLCommand(results, CommandCompareFilterType.NIN);
  }
}

const cmd = new MySQLCommand();

export { cmd, MySQLCommand };
