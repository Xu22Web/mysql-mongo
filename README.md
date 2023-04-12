### 定义数据库配置

```ts
import { database, defineConfig } from 'mysql-mongo';
// 定义数据库
const db = database(
  defineConfig({
    // 连接配置
    connConfig: {
      // 用户名
      user: 'root',
      // 密码
      password: 'test123',
      // 数据库名
      database: 'test',
    },
    // 连接类型 'single' | 'pool'
    type: 'pool',
    // json 类型自动解析为 javascript 对象
    jsonParse: true,
    // tinyint(1) 转换为 boolean
    tinyIntToBool: true,
  })
);
```

### 集合（数据库中的表）

```ts
// 集合（数据库中的表 'test'）
db.collection('test');
```

### 简单查询记录

```ts
// 假设数据库表的字段
type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number[]; b: number };
  test: string;
};

// 查询 a = 1 且 json->$.c[0] = 1 的记录，仅展示 a、b 字段，且条数为 1 ，跳过 0 条记录
await db
  .collection<Test>('test')
  .where({
    // 普通字段
    a: 1,
    // json 字段
    '$json.c[0]': 1,
  })
  .field({
    a: true,
    b: true,
  })
  .limit(1)
  .skip(0)
  .get();

// 等价于 'select `a`, `b` from `test` where `a` = 1 or `a` = 2 limit 0, 1'
```

### 命令查询记录

```ts
// 假设数据库表的字段
type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number[]; b: number };
  test: string;
};

// 命令操作符
const _ = db.command;

// 查询 a = 1 或者 a = 2 的记录，仅展示 a、b 字段，且条数为 1 ，跳过 0 条记录
await db
  .collection<Test>('test')
  .where({
    a: _.eq(1).or(_.eq(2)),
    // 等价于 a: _.or(_.eq(1), _.eq(2)),
  })
  .field({
    a: true,
    b: true,
  })
  .limit(1)
  .skip(0)
  .get();

// 等价于 'select `a`, `b` from `test` where `a` = 1 or `a` = 2 limit 0, 1'
```

### 聚合查询记录

```ts
// 假设数据库表的字段
type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number[]; b: number };
  test: string;
};

// 聚合操作符
const $ = db.command.aggregate<Test>();

// 查询 a = 1 或者 a = 2 的记录，仅展示 a、b 字段，且条数为 1 ，跳过 0 条记录
await db
  .collection<Test>('test')
  .where($.or($.eq('$a', 1), $.eq('$a', 2)))
  .field({
    a: true,
    b: true,
  })
  .limit(1)
  .skip(0)
  .get();

// 等价于 'select `a`, `b` from `test` where `a` = 1 or `a` = 2 limit 0, 1'
```

### 随机记录

```ts
// 假设数据库表的字段
type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number[]; b: number };
  test: string;
};

// 查询 a = 1 的随机记录，且条数为 1 ，跳过 0 条记录
await db
  .collection<Test>('test')
  .where({
    a: 1,
  })
  .random()
  .limit(1)
  .skip(0)
  .get();

// 等价于 'select * from `test` where `a` = 1 order by rand() limit 0, 1'
```

### 正则查询记录

```ts
// 假设数据库表的字段
type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number[]; b: number };
  test: string;
};

// test 字段以 abc 开头、忽略大小写且开启多行匹配的记录，且条数为 1 ，跳过 0 条记录
await db
  .collection<Test>('test')
  .where({
    test: db.RegExp({
      // 以 abc 开头
      $regex: '^abc',
      // i 忽略大小写 且 m 多行匹配
      $options: 'im',
    }),
  })
  .limit(1)
  .skip(0)
  .get();

// 等价于 'select * from `test` where `test` regexp '^abc' limit 0, 1'
```

### 模糊查询记录

```ts
// 假设数据库表的字段
type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number[]; b: number };
  test: string;
};

// test 字段包含 abc 、忽略大小写且开启多行匹配的记录，且条数为 1 ，跳过 0 条记录
await db
  .collection<Test>('test')
  .where({
    test: db.Like({
      // 包含 abc
      $like: '%abc%',
      // i 忽略大小写 且 m 多行匹配
      $options: 'im',
    }),
  })
  .limit(1)
  .skip(0)
  .get();

// 等价于 'select * from `test` where `test` like '%abc%' limit 0, 1'
```

### 插入记录

> 注：javascript 对象会自动转换为 json

```ts
// 假设数据库表的字段
type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number[]; b: number };
  test: string;
};

// 插入记录
await db.collection<Test>('test').add({ a: 0, b: 0, c: -1, json: { c: [] } });

// 等价于 'insert into `test` set `a` = 0, `b` = 0, `c` = -1, `json` = json_object('c', json_array())'
```

### 更新记录

```ts
// 假设数据库表的字段
type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number[]; b: number };
  test: string;
};

// 更新 a = 1 记录
await db
  .collection<Test>('test')
  .where({
    a: 1,
  })
  .update({
    json: { c: [1] },
    c: 1,
  });

// 等价于 'update `test` set `json` = json_object('c', json_array(1)), `c` = 1 where `a` = 1'
```

### 设置记录

> 注：未更新的字段为默认值

```ts
// 假设数据库表的字段
type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number[]; b: number };
  test: string;
};

// 设置 a = 1 的记录
await db
  .collection<Test>('test')
  .where({
    a: 1,
  })
  .set({
    json: { c: [1] },
    c: 1,
  });

// 等价于 'update `test` set `a` = null, `b` = null, `c` = 1, `json` = json_object('c', json_array(1)), `test` = null where `a` = 1'
```

### 删除记录

```ts
// 假设数据库表的字段
type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number[]; b: number };
  test: string;
};

// 删除 a = 1 记录
await db
  .collection<Test>('test')
  .where({
    a: 1,
  })
  .remove();

// 等价于 'delete from `test` where `a` = 1'
```

### 统计记录数

```ts
// 假设数据库表的字段
type Test = {
  a: number;
  b: number;
  c: number;
  json: { c: number[]; b: number };
  test: string;
};

// 统计 a = 1 的记录数
await db
  .collection<Test>('test')
  .where({
    a: 1,
  })
  .count();

// select count(*) as total from `test` where `a` = 1
```

### 更多

聚合操作、新增字段、分组查询、事务处理等操作
