```ts
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
```

```ts
type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number[]; b: number };
  test: string;
};

const $ = db.command.aggregate<Test>();
const _ = db.command;
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
  .get();
```

```ts
await db.collection<Test>('test').add({ a: 0, b: 0, c: -1, json: { c: [] } });
```

```ts
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
  });
```

```ts
await db
  .collection<Test>('test')
  .where({
    a: _.eq(1),
  })
  .orderBy({
    a: 'asc',
  })
  .set({
    a: 1,
  });
```

```ts
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
  .count();
```

```ts
await db
  .collection<Test>('test')
  .where({
    '$json.c[0]': _.eq(1),
  })
  .random()
  .limit(1)
  .skip(0)
  .get();
```
