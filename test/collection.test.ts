import { describe, expect, it } from 'vitest';
import { defineConfig } from '../';
import { database } from '../src/lib/database';

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
  json: { c: number[]; b: number };
  test: string;
};

const $ = db.command.aggregate<Test>();
const _ = db.command;

describe('SQLGenerator', () => {
  it.skip('get', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          '$json.c[0]': _.eq(1),
        })
        .field({
          b: true,
          '$json.c[0]': false,
        })
        .limit(1)
        .skip(0)
        .get()
    ).toMatchInlineSnapshot(`
      {
        "queryStatus": false,
        "result": [],
        "status": false,
      }
    `);
  });
  it.skip('add', async () => {
    expect(
      await db
        .collection<Test>('test')
        .add({ a: 0, b: 0, c: -1, json: { c: [] } })
    ).toMatchInlineSnapshot(`
        {
          "queryStatus": true,
          "result": OkPacket {
            "affectedRows": 1,
            "changedRows": 0,
            "fieldCount": 0,
            "insertId": 0,
            "message": "",
            "protocol41": true,
            "serverStatus": 2,
            "warningCount": 0,
          },
          "status": true,
        }
      `);
  });
  it.skip('update', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          json: _.eq({ b: 1 }),
        })
        .limit(10)
        .orderBy({
          a: 'asc',
        })
        .update({
          json: { b: 1 },
          c: 1,
        })
    ).toMatchInlineSnapshot(`
      {
        "queryStatus": true,
        "result": OkPacket {
          "affectedRows": 1,
          "changedRows": 0,
          "fieldCount": 0,
          "insertId": 0,
          "message": "(Rows matched: 1  Changed: 0  Warnings: 0",
          "protocol41": true,
          "serverStatus": 34,
          "warningCount": 0,
        },
        "status": true,
      }
    `);
  });
  it.skip('set', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          a: _.eq(1),
        })
        .limit(1)
        .orderBy({
          a: 'asc',
        })
        .set({
          a: 1,
        })
    ).toMatchInlineSnapshot(`
      {
        "queryStatus": true,
        "result": OkPacket {
          "affectedRows": 1,
          "changedRows": 1,
          "fieldCount": 0,
          "insertId": 0,
          "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
          "protocol41": true,
          "serverStatus": 34,
          "warningCount": 0,
        },
        "status": true,
      }
    `);
  });
  it.skip('remove', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          a: _.eq(10),
        })
        .limit(1)
        .orderBy({
          a: 'asc',
        })
        .remove()
    ).toMatchInlineSnapshot(`
      {
        "queryStatus": true,
        "result": OkPacket {
          "affectedRows": 1,
          "changedRows": 0,
          "fieldCount": 0,
          "insertId": 0,
          "message": "",
          "protocol41": true,
          "serverStatus": 34,
          "warningCount": 0,
        },
        "status": true,
      }
    `);
  });
  it.skip('count', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          '$json.c[0]': _.eq(1),
        })
        .field({
          b: false,
        })
        .limit(1)
        .skip(0)
        .count()
    ).toMatchInlineSnapshot(`
      {
        "queryStatus": true,
        "result": RowDataPacket {
          "total": 2,
        },
        "status": true,
      }
    `);
  });
  it.skip('random', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          '$json.c[0]': _.eq(1),
        })
        .random()
        .limit(1)
        .skip(0)
        .get()
    ).toMatchInlineSnapshot(`
      {
        "queryStatus": true,
        "result": [
          RowDataPacket {
            "_id": "n7MN6ihH8C123R18dDaBnF4tetH1g06s",
            "_timeStamp": "1664091764785",
            "a": 0,
            "b": 0,
            "c": -1,
            "d": null,
            "json": "{\\"c\\": [1]}",
            "test": "[{\\"test\\": 1}]",
          },
        ],
        "status": true,
      }
    `);
  });
});
