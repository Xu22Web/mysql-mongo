import { AggregateCommand } from '../aggregateCommand/interface';
import { Command, CommandMixParamType, CommandMode, CommandNumberParamType, CommandType } from './interface';
/**
 * @description MySQL命令操作
 */
declare class MySQLCommand implements Command {
    $mode: CommandMode;
    $type: CommandType | undefined;
    $value: CommandMixParamType[] | undefined;
    constructor(value?: CommandMixParamType[], type?: CommandType);
    aggregate<T extends object = object>(): AggregateCommand<T>;
    and(value: Command[]): Command;
    and(value: Command, ...rest: Command[]): Command;
    or(value: Command[]): Command;
    or(value: Command, ...rest: Command[]): Command;
    not(value: Command): Command;
    nor(value: Command[]): Command;
    nor(value: Command, ...rest: Command[]): Command;
    nand(value: Command[]): Command;
    nand(value: Command, ...rest: Command[]): Command;
    eq(value: CommandMixParamType): Command;
    neq(value: CommandMixParamType): Command;
    lt(value: CommandNumberParamType): Command;
    lte(value: CommandNumberParamType): Command;
    gt(value: CommandNumberParamType): Command;
    gte(value: CommandNumberParamType): Command;
    in(value: CommandMixParamType[]): Command;
    in(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
    nin(value: CommandMixParamType[]): Command;
    nin(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
}
declare const cmd: MySQLCommand;
export { cmd, MySQLCommand };
