import {
  Command,
  CommandLike,
  CommandMixParamType,
  CommandProps,
} from '../../../command/interface';

/**
 * @description SQLCommandClip
 */
export type SQLCommandClip<
  T = Omit<Command, '$mode' | '$value' | '$type' | 'aggregate'>
> = {
  [P in keyof T]: (key: string, command: CommandProps) => string;
} & {
  /**
   * @description 命令值片段
   * @param key
   * @param value
   */
  cmdValueClip(key: string, value: CommandMixParamType): string;
  /**
   * @description 命令操作控制
   * @param command 命令
   */
  cmdControllerClip(key: string, command: CommandLike): string;
};
