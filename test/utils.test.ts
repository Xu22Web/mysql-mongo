import { describe, expect, it } from 'vitest';
import { getJsonKeyPath } from '../src/utils/utils';

describe.skip('utils', () => {
  it('getJsonKeyPath', () => {
    expect(getJsonKeyPath('$json')).toEqual(['json', '$']);
    expect(getJsonKeyPath('$json.test[0]')).toEqual(['json', '$.test[0]']);
    expect(getJsonKeyPath('$json.test[0].test')).toEqual([
      'json',
      '$.test[0].test',
    ]);
    expect(getJsonKeyPath('$json[0].test')).toEqual(['json', '$[0].test']);
    expect(getJsonKeyPath('$json[0][0].test')).toEqual([
      'json',
      '$[0][0].test',
    ]);
    expect(getJsonKeyPath('$json[0].test[0]')).toEqual([
      'json',
      '$[0].test[0]',
    ]);
  });
});
