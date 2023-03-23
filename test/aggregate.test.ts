import { describe, expect, it } from 'vitest';
import { defineConfig } from '../';
import { database } from '../src/lib/database';
// 数据库
const db = database(
  defineConfig({
    connConfig: {
      database: 'test',
      password: 'test123',
    },
    type: 'pool',
    jsonParse: true,
    tinyIntToBool: true,
    debug: true,
  })
);

type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number[] };
  _id: string;
  test: { test: number }[];
};

const $ = db.command.aggregate<Test>();
const _ = db.command;

describe('aggregate', () => {
  it('project', async () => {
    const c = db.collection<Test>('test');
    expect(
      (
        await c
          .aggregate()
          .project({
            id: '$_id',
            _id: true,
            m: $.cmp('$c', '$a'),
          })
          .end()
      ).result.slice(0, 3)
    ).toMatchInlineSnapshot(`
      [
        RowDataPacket {
          "_id": "0.438318d53d62a",
          "id": "0.438318d53d62a",
          "m": -1,
        },
        RowDataPacket {
          "_id": "0.e36dd27a6c381",
          "id": "0.e36dd27a6c381",
          "m": -1,
        },
        RowDataPacket {
          "_id": "0.3bd0947e5c9ad",
          "id": "0.3bd0947e5c9ad",
          "m": -1,
        },
      ]
    `);
  });
  it('addFields', async () => {
    const c = db.collection<Test>('test');
    expect(
      (
        await c
          .aggregate()
          .addFields({
            id: $.upper('$_id'),
            _test: $.concat('$c', '$json.c'),
          })
          .addFields({
            _test_: '$_test',
            d: true,
          })
          .end()
      ).result.slice(0, 3)
    ).toMatchInlineSnapshot(`
      [
        RowDataPacket {
          "_test_": "-1[]",
          "d": 1,
        },
        RowDataPacket {
          "_test_": "-1[]",
          "d": 1,
        },
        RowDataPacket {
          "_test_": "-1[]",
          "d": 1,
        },
      ]
    `);
  });
  it('match', async () => {
    const c = db.collection<Test>('test');
    expect(
      (
        await c
          .aggregate()
          .match({
            a: _.eq('$test[0].test'),
          })
          .end()
      ).result.slice(0, 3)
    ).toMatchInlineSnapshot('[]');
  });
  it('group', async () => {
    expect(
      (
        await db
          .collection<Test>('test')
          .aggregate()
          .group({
            m: $.sum('$a'),
            c: '$a',
          })
          .end()
      ).result.slice(0, 3)
    ).toMatchInlineSnapshot(`
      [
        RowDataPacket {
          "c": 0,
          "m": 0,
        },
      ]
    `);
  });
  it('limit', async () => {
    expect(
      (
        await db.collection<Test>('test').aggregate().limit(1).end()
      ).result.slice(0, 3)
    ).toMatchInlineSnapshot(`
      [
        RowDataPacket {
          "_id": "0.438318d53d62a",
          "_timeStamp": null,
          "a": 0,
          "b": 0,
          "c": "-1",
          "d": null,
          "json": {
            "b": 1,
            "c": [],
          },
          "test": null,
        },
      ]
    `);
  });
  it('skip', async () => {
    const c = db.collection<Test>('test');
    expect(
      (await c.aggregate().limit(1).skip(1).end()).result.slice(0, 3)
    ).toMatchInlineSnapshot(`
      [
        RowDataPacket {
          "_id": "0.438318d53d62a",
          "_timeStamp": null,
          "a": 0,
          "b": 0,
          "c": "-1",
          "d": null,
          "json": {
            "b": 1,
            "c": [],
          },
          "test": null,
        },
      ]
    `);
  });
  it('sort', async () => {
    const c = db.collection<Test>('test');
    expect(
      (await c.aggregate().sort({ '$json.c[0]': 'asc' }).end()).result.slice(
        0,
        3
      )
    ).toMatchInlineSnapshot(`
      [
        RowDataPacket {
          "_id": "0.438318d53d62a",
          "_timeStamp": null,
          "a": 0,
          "b": 0,
          "c": "-1",
          "d": null,
          "json": {
            "b": 1,
            "c": [],
          },
          "test": null,
        },
        RowDataPacket {
          "_id": "0.e36dd27a6c381",
          "_timeStamp": null,
          "a": 0,
          "b": 0,
          "c": "-1",
          "d": null,
          "json": {
            "b": 1,
            "c": [],
          },
          "test": null,
        },
        RowDataPacket {
          "_id": "0.3bd0947e5c9ad",
          "_timeStamp": null,
          "a": 0,
          "b": 0,
          "c": "-1",
          "d": null,
          "json": {
            "b": 1,
            "c": [],
          },
          "test": null,
        },
      ]
    `);
  });
  it('count', async () => {
    const c = db.collection<Test>('test');
    expect(
      (
        await c
          .aggregate()
          .match({ '$json.c[0]': _.eq('$a') })
          .count('$a')
          .end()
      ).result.slice(0, 3)
    ).toMatchInlineSnapshot(`
      [
        RowDataPacket {
          "a": 0,
        },
      ]
    `);
  });
  it('sortByCount', async () => {
    const c = db.collection<Test>('test');
    expect(
      (
        await c.aggregate().sortByCount('$a').sortByCount('$count').end()
      ).result.slice(0, 3)
    ).toMatchInlineSnapshot(`
      [
        RowDataPacket {
          "_id": 32,
          "count": 1,
        },
      ]
    `);
  });
  it('sample', async () => {
    const c = db.collection<Test>('test');
    expect(
      (
        await c
          .aggregate()
          .sample(2)
          .match({ '$json.c[0]': _.eq('$a') })
          .end()
      ).result.slice(0, 3)
    ).toMatchInlineSnapshot('[]');
  });
});
