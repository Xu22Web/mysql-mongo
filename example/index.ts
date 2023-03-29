import { database, defineConfig } from 'mysql-mongo';

const db = database(
  defineConfig({
    connConfig: {
      database: 'test',
      password: 'test123',
    },
    jsonParse: true,
    debug: true,
  })
);

type Test = {
  _id: string;
  a: number;
  b: number;
  c: number;
  json: { c: number; b: number };
  test: { test: number }[];
  d: boolean;
};

const _id = Math.random().toString(16);

db.collection<Test>('test')
  .add({
    _id,
    a: 0,
    test: [{ test: 0 }],
  })
  .then((res) => console.log(res));

db.collection<Test>('test')
  .limit(3)
  .skip(0)
  .get()
  .then((res) => console.log(res));

db.collection<Test>('test')
  .where({ _id })
  .update({
    a: 1,
  })
  .then((res) => console.log(res));

db.collection<Test>('test')
  .limit(3)
  .get()
  .then((res) => console.log(res));

db.collection<Test>('test')
  .where({ _id, '$test[0].test': 0 })
  .remove()
  .then((res) => console.log(res));

db.collection<Test>('test')
  .limit(3)
  .get()
  .then((res) => console.log(res));
