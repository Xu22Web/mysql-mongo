import { describe, expect, it } from 'vitest';
import { database } from '../src/lib/database';
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
    debug: true,
  })
);

type Test = {
  _id: string;
  a: number;
  b: number;
  c: number;
  json: { c: number[]; b: number };
  test: string;
};

const _ = db.command;

const _id = Math.random().toString(16);

describe.skip('collection', () => {
  it('get', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          '$json.c': _.eq([]),
        })
        .field({
          b: true,
          '$json.c': true,
        })
        .limit(1)
        .skip(1)
        .get()
    ).toMatchInlineSnapshot(`
      {
        "result": [],
        "status": false,
      }
    `);
  });
  it('add', async () => {
    expect(
      await db.collection<Test>('test').add({
        _id,
        a: 0,
        b: 0,
        c: -1,
        json: { c: [], b: 1 },
      })
    ).toMatchInlineSnapshot(`
      {
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
  it('update', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          '$json.c': _.eq([]),
        })
        .orderBy({
          a: 'asc',
        })
        .update({
          json: { b: 1, c: [] },
          c: 1,
        })
    ).toMatchInlineSnapshot(`
      {
        "result": OkPacket {
          "affectedRows": 2,
          "changedRows": 1,
          "fieldCount": 0,
          "insertId": 0,
          "message": "(Rows matched: 2  Changed: 1  Warnings: 0",
          "protocol41": true,
          "serverStatus": 34,
          "warningCount": 0,
        },
        "status": true,
      }
    `);
  });
  it('set', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          _id,
          a: _.eq(0),
        })
        .orderBy({
          a: 'asc',
        })
        .set({
          a: 1,
        })
    ).toMatchInlineSnapshot(`
      {
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
  it('count', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          '$json.c': _.eq([]),
        })
        .field({
          b: false,
        })
        .count()
    ).toMatchInlineSnapshot(`
      {
        "result": RowDataPacket {
          "total": 1,
        },
        "status": true,
      }
    `);
  });
  it('random', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          '$json.c': _.eq([]),
        })
        .random()
        .limit(1)
        .get()
    ).toMatchInlineSnapshot(`
      {
        "result": [
          RowDataPacket {
            "_id": "0.8ce88990149b9",
            "_timeStamp": null,
            "a": 0,
            "b": 0,
            "c": "1",
            "d": null,
            "json": {
              "b": 1,
              "c": [],
            },
            "test": null,
          },
        ],
        "status": true,
      }
    `);
    it('remove', async () => {
      expect(
        await db
          .collection<Test>('test')
          .where({
            _id,
          })
          .remove()
      ).toMatchInlineSnapshot(`
          {
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
  });
});
