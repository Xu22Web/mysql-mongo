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

describe('SQLGenerator', () => {
  it.skip('project', async () => {
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
          "_id": "Yt5G4CBq9sv2G5XqPNyoIWEPYfzGz5BE",
          "id": "Yt5G4CBq9sv2G5XqPNyoIWEPYfzGz5BE",
          "m": -1,
        },
        RowDataPacket {
          "_id": "RCX9RSBRLC11ooa1D174At7Gr1Ktc7rE",
          "id": "RCX9RSBRLC11ooa1D174At7Gr1Ktc7rE",
          "m": 0,
        },
        RowDataPacket {
          "_id": "G3QYsNv21ItdCDZpAY6JIk88aMpx297i",
          "id": "G3QYsNv21ItdCDZpAY6JIk88aMpx297i",
          "m": 1,
        },
      ]
    `);
  });
  it.skip('addFields', async () => {
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
          "_test_": "1[100]",
          "d": 1,
        },
        RowDataPacket {
          "_test_": "1[100]",
          "d": 1,
        },
        RowDataPacket {
          "_test_": "1[100]",
          "d": 1,
        },
      ]
    `);
  });
  it.skip('match', async () => {
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
    ).toMatchInlineSnapshot(`
      [
        RowDataPacket {
          "_id": "RCX9RSBRLC11ooa1D174At7Gr1Ktc7rE",
          "_timeStamp": "1664186961018",
          "a": 1,
          "b": 2,
          "c": 1,
          "d": false,
          "json": "{\\"c\\": [1]}",
          "test": "[{\\"test\\": 1}]",
        },
        RowDataPacket {
          "_id": "9607dY6OlJ0kU16XGP1n2t94wkvJFRUQ",
          "_timeStamp": "1664091740968",
          "a": 1,
          "b": 0,
          "c": 1,
          "d": null,
          "json": "{\\"c\\": [1]}",
          "test": "[{\\"test\\": 1}]",
        },
        RowDataPacket {
          "_id": "2bT0HbzSA6qc7dUR2aeP7qBF6fffyvAG",
          "_timeStamp": "1664091744586",
          "a": 1,
          "b": 0,
          "c": 2,
          "d": null,
          "json": "{\\"c\\": [1]}",
          "test": "[{\\"test\\": 1}]",
        },
      ]
    `);
  });
  it.skip('group', async () => {
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
        RowDataPacket {
          "c": 1,
          "m": 3,
        },
        RowDataPacket {
          "c": 2,
          "m": 14,
        },
      ]
    `);
  });
  it.skip('limit', async () => {
    expect(
      (
        await db.collection<Test>('test').aggregate().limit(1).end()
      ).result.slice(0, 3)
    ).toMatchInlineSnapshot(`
      [
        RowDataPacket {
          "_id": "Yt5G4CBq9sv2G5XqPNyoIWEPYfzGz5BE",
          "_timeStamp": "1664091258149",
          "a": 2,
          "b": 2,
          "c": 1,
          "d": true,
          "json": "{\\"c\\": [100]}",
          "test": "[{\\"test\\": 1}]",
        },
      ]
    `);
  });
  it.skip('skip', async () => {
    const c = db.collection<Test>('test');
    expect((await c.aggregate().limit(1).skip(1).end()).result.slice(0, 3))
      .toMatchInlineSnapshot(`
        [
          RowDataPacket {
            "_id": "RCX9RSBRLC11ooa1D174At7Gr1Ktc7rE",
            "_timeStamp": "1664186961018",
            "a": 1,
            "b": 2,
            "c": 1,
            "d": false,
            "json": "{\\"c\\": [100]}",
            "test": "[{\\"test\\": 1}]",
          },
        ]
      `);
  });
  it.skip('sort', async () => {
    const c = db.collection<Test>('test');
    expect(
      (await c.aggregate().sort({ '$json.c[0]': 'asc' }).end()).result.slice(
        0,
        3
      )
    ).toMatchInlineSnapshot(`
        [
          RowDataPacket {
            "_id": "Yt5G4CBq9sv2G5XqPNyoIWEPYfzGz5BE",
            "_timeStamp": "1664091258149",
            "a": 2,
            "b": 2,
            "c": 1,
            "d": true,
            "json": "{\\"c\\": [1]}",
            "test": "[{\\"test\\": 1}]",
          },
          RowDataPacket {
            "_id": "RCX9RSBRLC11ooa1D174At7Gr1Ktc7rE",
            "_timeStamp": "1664186961018",
            "a": 1,
            "b": 2,
            "c": 1,
            "d": false,
            "json": "{\\"c\\": [1]}",
            "test": "[{\\"test\\": 1}]",
          },
          RowDataPacket {
            "_id": "G3QYsNv21ItdCDZpAY6JIk88aMpx297i",
            "_timeStamp": "1664186961018",
            "a": 0,
            "b": 2,
            "c": 1,
            "d": true,
            "json": "{\\"c\\": [1]}",
            "test": "[{\\"test\\": 1}]",
          },
        ]
      `);
  });
  it.skip('count', async () => {
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
          "a": 3,
        },
      ]
    `);
  });
  it.skip('sortByCount', async () => {
    const c = db.collection<Test>('test');
    expect(
      (
        await c.aggregate().sortByCount('$a').sortByCount('$count').end()
      ).result.slice(0, 3)
    ).toMatchInlineSnapshot(`
      [
        RowDataPacket {
          "_id": 3,
          "count": 1,
        },
        RowDataPacket {
          "_id": 5,
          "count": 1,
        },
        RowDataPacket {
          "_id": 7,
          "count": 1,
        },
      ]
    `);
  });
  it.skip('sample', async () => {
    const c = db.collection<Test>('test');
    expect(
      (
        await c
          .aggregate()
          .sample(2)
          .match({ '$json.c[0]': _.eq('$a') })
          .end()
      ).result.slice(0, 3)
    ).toMatchInlineSnapshot(`
      [
        RowDataPacket {
          "_id": "9607dY6OlJ0kU16XGP1n2t94wkvJFRUQ",
          "_timeStamp": "1664091740968",
          "a": 1,
          "b": 0,
          "c": 1,
          "d": null,
          "json": "{\\"c\\": [1]}",
          "test": "[{\\"test\\": 1}]",
        },
        RowDataPacket {
          "_id": "2bT0HbzSA6qc7dUR2aeP7qBF6fffyvAG",
          "_timeStamp": "1664091744586",
          "a": 1,
          "b": 0,
          "c": 2,
          "d": null,
          "json": "{\\"c\\": [1]}",
          "test": "[{\\"test\\": 1}]",
        },
      ]
    `);
  });
});
