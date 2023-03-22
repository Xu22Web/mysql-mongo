import { describe, expect, it } from 'vitest';
import { defineConfig } from '../';
import { database } from '../src/lib/database';
import { sqlClip } from '../src/lib/sql/sqlClip';

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
  json: { c: number; b: number };
  test: { test: number }[];
  d: boolean;
};

const $ = db.command.aggregate<Test>();

describe('boolean', () => {
  it('and', () => {
    expect(sqlClip.aggrControllerClip($.and('$a', true))).toMatchInlineSnapshot(
      '"`a` and true"'
    );
  });
  it('or', () => {
    expect(
      sqlClip.aggrControllerClip($.and('$d', false))
    ).toMatchInlineSnapshot('"`d` and false"');
  });
  it('not', () => {
    expect(sqlClip.aggrControllerClip($.not(true))).toMatchInlineSnapshot(
      '"not(true)"'
    );
  });
  it('nand', () => {
    expect(
      sqlClip.aggrControllerClip($.nand('$d', false))
    ).toMatchInlineSnapshot('"not(`d` and false)"');
  });
  it('nor', () => {
    expect(
      sqlClip.aggrControllerClip($.nor('$d', false))
    ).toMatchInlineSnapshot('"not(`d` or false)"');
  });
});
describe('compare', () => {
  it('cmp', () => {
    expect(sqlClip.aggrControllerClip($.cmp('$a', '$b'))).toMatchInlineSnapshot(
      '"if(`a` > `b`, 1, if(`a` = `b`, 0, -1))"'
    );
  });

  it('eq', () => {
    expect(sqlClip.aggrControllerClip($.eq('$a', '$b'))).toMatchInlineSnapshot(
      '"(`a` = `b`)"'
    );
  });

  it('neq', () => {
    expect(sqlClip.aggrControllerClip($.neq('$a', '$b'))).toMatchInlineSnapshot(
      '"(`a` != `b`)"'
    );
  });

  it('lt', () => {
    expect(sqlClip.aggrControllerClip($.lt('$a', '$b'))).toMatchInlineSnapshot(
      '"(`a` < `b`)"'
    );
  });

  it('lte', () => {
    expect(sqlClip.aggrControllerClip($.lte('$a', '$b'))).toMatchInlineSnapshot(
      '"(`a` <= `b`)"'
    );
  });

  it('gt', () => {
    expect(sqlClip.aggrControllerClip($.gt('$a', '$b'))).toMatchInlineSnapshot(
      '"(`a` > `b`)"'
    );
  });

  it('gte', () => {
    expect(sqlClip.aggrControllerClip($.gte('$a', '$b'))).toMatchInlineSnapshot(
      '"(`a` >= `b`)"'
    );
  });

  it('in', () => {
    expect(
      sqlClip.aggrControllerClip($.in('$a', ['$a', '$b']))
    ).toMatchInlineSnapshot('"`a` in (`a`, `b`)"');
  });

  it('nin', () => {
    expect(
      sqlClip.aggrControllerClip($.nin('$a', ['$a', '$b']))
    ).toMatchInlineSnapshot('"`a` not in (`a`, `b`)"');
  });
});

describe('calculate', () => {
  it('abs', () => {
    expect(sqlClip.aggrControllerClip($.abs('$a'))).toMatchInlineSnapshot(
      '"abs(`a`)"'
    );
  });

  it('ceil', () => {
    expect(sqlClip.aggrControllerClip($.ceil('$a'))).toMatchInlineSnapshot(
      '"ceil(`a`)"'
    );
  });

  it('floor', () => {
    expect(sqlClip.aggrControllerClip($.floor('$a'))).toMatchInlineSnapshot(
      '"floor(`a`)"'
    );
  });

  it('round', () => {
    expect(sqlClip.aggrControllerClip($.round('$a'))).toMatchInlineSnapshot(
      '"round(`a`)"'
    );
  });

  it('ln', () => {
    expect(sqlClip.aggrControllerClip($.ln('$a'))).toMatchInlineSnapshot(
      '"ln(`a`)"'
    );
  });

  it('log10', () => {
    expect(sqlClip.aggrControllerClip($.log10('$a'))).toMatchInlineSnapshot(
      '"log10(`a`)"'
    );
  });

  it('sin', () => {
    expect(sqlClip.aggrControllerClip($.sin('$a'))).toMatchInlineSnapshot(
      '"sin(`a`)"'
    );
  });

  it('asin', () => {
    expect(sqlClip.aggrControllerClip($.asin('$a'))).toMatchInlineSnapshot(
      '"asin(`a`)"'
    );
  });

  it('cos', () => {
    expect(sqlClip.aggrControllerClip($.cos('$a'))).toMatchInlineSnapshot(
      '"cos(`a`)"'
    );
  });

  it('acos', () => {
    expect(sqlClip.aggrControllerClip($.acos('$a'))).toMatchInlineSnapshot(
      '"acos(`a`)"'
    );
  });

  it('tan', () => {
    expect(sqlClip.aggrControllerClip($.tan('$a'))).toMatchInlineSnapshot(
      '"tan(`a`)"'
    );
  });

  it('atan', () => {
    expect(sqlClip.aggrControllerClip($.atan('$a'))).toMatchInlineSnapshot(
      '"atan(`a`)"'
    );
  });

  it('cot', () => {
    expect(sqlClip.aggrControllerClip($.cot('$a'))).toMatchInlineSnapshot(
      '"cot(`a`)"'
    );
  });

  it('sqrt', () => {
    expect(sqlClip.aggrControllerClip($.sqrt('$a'))).toMatchInlineSnapshot(
      '"sqrt(`a`)"'
    );
  });

  it('exp', () => {
    expect(sqlClip.aggrControllerClip($.exp('$a'))).toMatchInlineSnapshot(
      '"exp(`a`)"'
    );
  });

  it('sign', () => {
    expect(sqlClip.aggrControllerClip($.sign('$a'))).toMatchInlineSnapshot(
      '"sign(`a`)"'
    );
  });

  it('log', () => {
    expect(sqlClip.aggrControllerClip($.log('$a', '$b'))).toMatchInlineSnapshot(
      '"log(`a`, `b`)"'
    );
  });

  it('mod', () => {
    expect(sqlClip.aggrControllerClip($.mod('$a', '$b'))).toMatchInlineSnapshot(
      '"mod(`a`, `b`)"'
    );
  });

  it('pow', () => {
    expect(sqlClip.aggrControllerClip($.pow('$a', '$b'))).toMatchInlineSnapshot(
      '"pow(`a`, `b`)"'
    );
  });

  it('greatest', () => {
    expect(
      sqlClip.aggrControllerClip($.greatest('$a', '$b'))
    ).toMatchInlineSnapshot('"greatest(`a`, `b`)"');
  });

  it('least', () => {
    expect(
      sqlClip.aggrControllerClip($.least('$a', '$b'))
    ).toMatchInlineSnapshot('"least(`a`, `b`)"');
  });

  it('subtract', () => {
    expect(
      sqlClip.aggrControllerClip($.subtract('$a', '$b'))
    ).toMatchInlineSnapshot('"(`a`-`b`)"');
  });

  it('multiply', () => {
    expect(
      sqlClip.aggrControllerClip($.multiply('$a', '$b'))
    ).toMatchInlineSnapshot('"(`a`*`b`)"');
  });

  it('divide', () => {
    expect(
      sqlClip.aggrControllerClip($.divide('$a', '$b'))
    ).toMatchInlineSnapshot('"(`a`/`b`)"');
  });
});

describe('string', () => {
  it('length', () => {
    expect(sqlClip.aggrControllerClip($.length('$a'))).toMatchInlineSnapshot(
      '"length(`a`)"'
    );
  });

  it('reverse', () => {
    expect(sqlClip.aggrControllerClip($.reverse('$a'))).toMatchInlineSnapshot(
      '"reverse(`a`)"'
    );
  });

  it('trim', () => {
    expect(sqlClip.aggrControllerClip($.trim('$a'))).toMatchInlineSnapshot(
      '"trim(`a`)"'
    );
  });

  it('lower', () => {
    expect(sqlClip.aggrControllerClip($.lower('$a'))).toMatchInlineSnapshot(
      '"lower(`a`)"'
    );
  });

  it('upper', () => {
    expect(sqlClip.aggrControllerClip($.upper('$a'))).toMatchInlineSnapshot(
      '"upper(`a`)"'
    );
  });

  it('left', () => {
    expect(sqlClip.aggrControllerClip($.left('$a', 1))).toMatchInlineSnapshot(
      '"left(`a`, 1)"'
    );
  });

  it('right', () => {
    expect(sqlClip.aggrControllerClip($.right('$a', 1))).toMatchInlineSnapshot(
      '"right(`a`, 1)"'
    );
  });

  it('replace', () => {
    expect(
      sqlClip.aggrControllerClip($.replace('$a', '1', '2'))
    ).toMatchInlineSnapshot("\"replace(`a`, '1', '2')\"");
  });

  it('substring', () => {
    expect(
      sqlClip.aggrControllerClip($.substring('$a', 0, 1))
    ).toMatchInlineSnapshot('"substring(`a`, 0, 1)"');
  });

  it('insert', () => {
    expect(
      sqlClip.aggrControllerClip($.insert('$a', 0, 1, '1'))
    ).toMatchInlineSnapshot('"insert(`a`, 0, 1, \'1\')"');
  });

  it('concat', () => {
    expect(
      sqlClip.aggrControllerClip($.concat('$a', '$c'))
    ).toMatchInlineSnapshot('"concat(`a`, `c`)"');
  });
});

describe('accumulate', () => {
  it('avg', () => {
    expect(sqlClip.aggrControllerClip($.avg('$a'))).toMatchInlineSnapshot(
      '"avg(`a`)"'
    );
  });

  it('max', () => {
    expect(sqlClip.aggrControllerClip($.max('$a'))).toMatchInlineSnapshot(
      '"max(`a`)"'
    );
  });

  it('min', () => {
    expect(sqlClip.aggrControllerClip($.min('$a'))).toMatchInlineSnapshot(
      '"min(`a`)"'
    );
  });

  it('sum', () => {
    expect(sqlClip.aggrControllerClip($.sum('$a'))).toMatchInlineSnapshot(
      '"sum(`a`)"'
    );
  });

  it('count', () => {
    expect(sqlClip.aggrControllerClip($.count('$a'))).toMatchInlineSnapshot(
      '"count(`a`)"'
    );
  });
});

describe('condition', () => {
  it('cond', () => {
    expect(
      sqlClip.aggrControllerClip($.cond('$d', true, false))
    ).toMatchInlineSnapshot('"if(`d`, true, false)"');
  });

  it('ifnull', () => {
    expect(
      sqlClip.aggrControllerClip($.ifnull('$d', true))
    ).toMatchInlineSnapshot('"ifnull(`d`, true)"');
  });
});

describe('json', () => {
  it('json_array', () => {
    expect(
      sqlClip.aggrControllerClip($.json_array([null, 1, '$a']))
    ).toMatchInlineSnapshot('"json_array(null, 1, `a`)"');
  });

  it('json_object', async () => {
    expect(
      sqlClip.aggrControllerClip($.json_object({ price: 1, name: 'test' }))
    ).toMatchInlineSnapshot("\"json_object('price', 1,'name', 'test')\"");
  });

  it('json_array_append', () => {
    expect(
      sqlClip.aggrControllerClip($.json_array_append('$json.c', 1))
    ).toMatchInlineSnapshot("\"json_array_append(`json`->'$.c', '$', 1)\"");
  });
});
