import {
  AggregateCommand,
  AggregateCommandLike,
} from '../../../aggregateCommand/interface';

/**
 * @description SQLAggregateCommandClip
 */
export type SQLAggregateCommandClip<
  T = Omit<AggregateCommand, '$mode' | '$value' | '$type'>
> = {
  [P in keyof T]: (aggregate: AggregateCommandLike<any, any, any>) => string;
};
