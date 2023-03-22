import { database, defineConfig } from 'mysql-mongo';

const db = database(
  defineConfig({
    connConfig: {
      database: 'test',
      password: 'test123',
    },
    jsonParse: true,
  })
);

db.collection<{}>('test')
  .limit(5)
  .get()
  .then((res) => console.log(res));
