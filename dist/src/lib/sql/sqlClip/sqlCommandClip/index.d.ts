import { CommandLike, CommandMixParamType, CommandProps } from '../../../command/interface';
import { SQLCommandClip } from './interface';
/**
 * @description command clip 片段
 */
declare class MySQLCommandClip implements SQLCommandClip {
    cmdValueClip(key: string, value: CommandMixParamType): string | null;
    cmdControllerClip(key: string, command: CommandLike): string;
    and(key: string, command: CommandProps): string;
    or(key: string, command: CommandProps): string;
    not(key: string, command: CommandProps): string;
    nor(key: string, command: CommandProps): string;
    nand(key: string, command: CommandProps): string;
    eq(key: string, command: CommandProps): string;
    neq(key: string, command: CommandProps): string;
    lt(key: string, command: CommandProps): string;
    lte(key: string, command: CommandProps): string;
    gt(key: string, command: CommandProps): string;
    gte(key: string, command: CommandProps): string;
    in(key: string, command: CommandProps): string;
    nin(key: string, command: CommandProps): string;
}
declare const sqlCommandClip: MySQLCommandClip;
export { sqlCommandClip, MySQLCommandClip };
