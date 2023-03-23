import {
  AggregateCommand,
  AggregateCommandLike,
  AggregateMixParamType,
  AggregateProps,
} from '../../../aggregateCommand/interface';
import { SQLJson } from '../../sqlGenerator/interface';

/**
 * @description SQLAggregateCommandClip
 */
export type SQLAggregateCommandClip<
  T = Omit<AggregateCommand, '$mode' | '$value' | '$type'>
> = {
  [P in keyof T]: (aggregate: AggregateProps) => string;
} & {
  /**
   * @description 聚合操作控制
   * @param aggregate 聚合操作
   */
  aggrControllerClip(aggregate: AggregateCommandLike): string;
  /**
   * @description 聚合值片段
   * @param value
   */
  aggrValueClip(value: AggregateMixParamType): string | SQLJson | null;
  /**
   * @description 聚合值片段
   * @param value
   */
  aggrJsonValueClip(value: AggregateMixParamType): string | SQLJson | null;
};
