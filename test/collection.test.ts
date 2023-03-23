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

describe('collection', () => {
  it('get', async () => {
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
        .skip(2)
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
          json: _.eq({ b: 1 }),
        })
        .orderBy({
          a: 'asc',
        })
        .update({
          json: { b: 1 },
          c: 1,
        })
    ).toMatchInlineSnapshot(`
      {
        "result": OkPacket {
          "affectedRows": 0,
          "changedRows": 0,
          "fieldCount": 0,
          "insertId": 0,
          "message": "(Rows matched: 0  Changed: 0  Warnings: 0",
          "protocol41": true,
          "serverStatus": 34,
          "warningCount": 0,
        },
        "status": false,
      }
    `);
  });
  it('set', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          a: _.eq(1),
        })
        .orderBy({
          a: 'asc',
        })
        .set({
          _id,
          a: 1,
        })
    ).toMatchInlineSnapshot(`
      {
        "result": OkPacket {
          "affectedRows": 0,
          "changedRows": 0,
          "fieldCount": 0,
          "insertId": 0,
          "message": "(Rows matched: 0  Changed: 0  Warnings: 0",
          "protocol41": true,
          "serverStatus": 34,
          "warningCount": 0,
        },
        "status": false,
      }
    `);
  });
  it('remove', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          a: _.eq(10),
        })
        .remove()
    ).toMatchInlineSnapshot(`
      {
        "result": OkPacket {
          "affectedRows": 0,
          "changedRows": 0,
          "fieldCount": 0,
          "insertId": 0,
          "message": "",
          "protocol41": true,
          "serverStatus": 34,
          "warningCount": 0,
        },
        "status": false,
      }
    `);
  });
  it('count', async () => {
    expect(
      await db
        .collection<Test>('test')
        .where({
          '$json.c[0]': _.eq(1),
        })
        .field({
          b: false,
        })
        .count()
    ).toMatchInlineSnapshot(`
      {
        "result": RowDataPacket {
          "total": 0,
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
          '$json.c[0]': _.eq(1),
        })
        .random()
        .limit(1)
        .get()
    ).toMatchInlineSnapshot(`
      {
        "result": [],
        "status": false,
      }
    `);
  });
});
