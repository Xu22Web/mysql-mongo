import { describe, expect, it } from 'vitest';
import { database } from '../src/lib/database';
import {
  MySQLDeleteGenerator,
  MySQLInsertGenerator,
  MySQLSelectGenerator,
  MySQLUpdateGenerator,
} from '../src/lib/sql/sqlGenerator';
import { defineConfig } from '../src/utils/defineConfig';

const db = database(
  defineConfig({
    connConfig: {
      database: 'test',
      password: 'test123',
    },
    type: 'pool',
    jsonParse: true,
    tinyIntToBool: true,
  })
);

type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number; b: number };
  test: number;
};

const $ = db.command.aggregate<Test>();
const _ = db.command;

describe('sql', () => {
  it('select', async () => {
    expect(
      new MySQLSelectGenerator()
        .set('fields', ['json'])
        .set('where', { a: _.eq(0).and(_.eq(null)) })
        .set('name', 'test')
        .set('newfields', { tesat: $.eq('$test', 0) })
        .generate()
    ).toMatchInlineSnapshot(
      '"select `json`, (`test` = 0) as `tesat` from `test`  where `a` = 0 and `a` is null"'
    );
  });
  it('insert', async () => {
    expect(
      new MySQLInsertGenerator()
        .set('name', 'test')
        .set('record', { json: { a: 1, b: 1 } })
        .generate()
    ).toMatchInlineSnapshot(
      '"insert into `test`  set `json` = \'{\\\\\\"a\\\\\\":1,\\\\\\"b\\\\\\":1}\'"'
    );
  });
  it('delete', async () => {
    expect(
      new MySQLDeleteGenerator()
        .set('name', 'test')
        .set('where', { json: true })
        .set('orderby', { test: 'asc' })
        .set('limit', 1)
        .generate()
    ).toMatchInlineSnapshot(
      '"delete from `test`  where binary `json` = true order by `test` asc limit 1"'
    );
  });
  it('update', async () => {
    expect(
      new MySQLUpdateGenerator()
        .set('name', 'test')
        .set('record', { json: { c: [100] } })
        .set('where', { json: true })
        .set('orderby', { test: 'asc' })
        .generate()
    ).toMatchInlineSnapshot(
      '"update `test`  set `json` = \'{\\\\\\"c\\\\\\":[100]}\' where binary `json` = true order by `test` asc"'
    );
  });
});
