import { describe, expect, it } from 'vitest';
import { sqlClip } from '../src/lib/sql/sqlClip';

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
  it.skip('whereClip', () => {
    expect(
      sqlClip.whereClip({
        json: { a: 0 },
        '$test[0]': [{ a: 0 }],
      })
    ).toEqual(
      " where `json` = json_object('a', 0) and `test`->'$[0]' = json_array(json_object('a', 0))"
    );
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
