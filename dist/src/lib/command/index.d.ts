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
    and(value: CommandMixParamType[]): Command;
    and(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
    or(value: CommandMixParamType[]): Command;
    or(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
    not(value: Command): Command;
    nor(value: CommandMixParamType[]): Command;
    nor(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
    nand(value: CommandMixParamType[]): Command;
    nand(value: CommandMixParamType, ...rest: CommandMixParamType[]): Command;
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
