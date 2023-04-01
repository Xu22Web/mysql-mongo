import { describe, expect, it } from 'vitest';
import { $ } from '../src/lib/aggregateCommand';
import { AggregateCommand } from '../src/lib/aggregateCommand/interface';
import { sqlClip } from '../src/lib/sql/sqlClip';

const aggr = <AggregateCommand<{ a: number; b: number }>>$;

describe.skip('sqlClip', () => {
  it('keyClip', () => {
    expect(sqlClip.keyClip('json')).toBe('`json`');
    expect(sqlClip.keyClip('json', true)).toBe("`json`->'$'");
    expect(sqlClip.keyClip('$json')).toBe('`json`');
    expect(sqlClip.keyClip('$json', true)).toBe("`json`->'$'");
    expect(sqlClip.keyClip('$json[0].test')).toBe("`json`->'$[0].test'");
    expect(sqlClip.keyClip('$json.test')).toBe("`json`->'$.test'");
    expect(sqlClip.keyClip('$json.test[0]')).toBe("`json`->'$.test[0]'");
  });

  it('whereClip', () => {
    expect(
      sqlClip.whereClip({
        json: { a: 0 },
        '$test[0]': [{ a: 0 }],
      })
    ).toEqual(
      " where `json` = json_object('a', 0) and `test`->'$[0]' = json_array(json_object('a', 0))"
    );
  });

  it('whereClip.aggregate', () => {
    expect(
      sqlClip.whereClip(aggr.or(aggr.eq('$a', 1), aggr.eq('$b', null)))
    ).toEqual(' where (`a` = 1) or (`b` is null)');
  });

  it('havingClip', () => {
    expect(
      sqlClip.havingClip({
        json: { a: 0 },
        '$test[0]': [{ a: 0 }],
      })
    ).toEqual(
      " having `json` = json_object('a', 0) and `test`->'$[0]' = json_array(json_object('a', 0))"
    );
  });

  it('havingClip.aggregate', () => {
    expect(
      sqlClip.havingClip(aggr.or(aggr.eq('$a', 1), aggr.eq('$b', null)))
    ).toEqual(' having (`a` = 1) or (`b` is null)');
  });

  it('recordClip', () => {
    expect(
      sqlClip.recordClip({
        json: { a: 0 },
        '$test[0]': [{ a: 0 }],
      })
    ).toEqual(
      " set `json` = json_object('a', 0), `test`->'$[0]' = json_array(json_object('a', 0))"
    );
  });
});
