import { describe, expect, it } from 'vitest';
import { database } from '../src/lib/database';
import { sqlAggregateCommandClip } from '../src/lib/sql/sqlClip/sqlAggregateCommandClip';
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
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.and('$a', true))
    ).toMatchInlineSnapshot('"`a` and true"');
  });
  it('or', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.or('$d', false))
    ).toMatchInlineSnapshot('"`d` or false"');
  });
  it('not', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.not(true))
    ).toMatchInlineSnapshot('"not(true)"');
  });
  it('nand', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.nand('$d', false))
    ).toMatchInlineSnapshot('"not(`d` and false)"');
  });
  it('nor', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.nor('$d', false))
    ).toMatchInlineSnapshot('"not(`d` or false)"');
  });
});
describe('compare', () => {
  it('cmp', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.cmp('$a', '$b'))
    ).toMatchInlineSnapshot('"if(`a` > `b`, 1, if(`a` = `b`, 0, -1))"');
  });

  it('eq', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.eq('$a', '$b'))
    ).toMatchInlineSnapshot('"(`a` = `b`)"');
  });

  it('neq', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.neq('$a', '$b'))
    ).toMatchInlineSnapshot('"(`a` != `b`)"');
  });

  it('lt', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.lt('$a', '$b'))
    ).toMatchInlineSnapshot('"(`a` < `b`)"');
  });

  it('lte', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.lte('$a', '$b'))
    ).toMatchInlineSnapshot('"(`a` <= `b`)"');
  });

  it('gt', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.gt('$a', '$b'))
    ).toMatchInlineSnapshot('"(`a` > `b`)"');
  });

  it('gte', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.gte('$a', '$b'))
    ).toMatchInlineSnapshot('"(`a` >= `b`)"');
  });

  it('in', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.in('$a', ['$a', '$b']))
    ).toMatchInlineSnapshot('"`a` in (`a`, `b`)"');
  });

  it('nin', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.nin('$a', ['$a', '$b']))
    ).toMatchInlineSnapshot('"`a` not in (`a`, `b`)"');
  });
});

describe('calculate', () => {
  it('abs', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.abs('$a'))
    ).toMatchInlineSnapshot('"abs(`a`)"');
  });

  it('ceil', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.ceil('$a'))
    ).toMatchInlineSnapshot('"ceil(`a`)"');
  });

  it('floor', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.floor('$a'))
    ).toMatchInlineSnapshot('"floor(`a`)"');
  });

  it('round', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.round('$a'))
    ).toMatchInlineSnapshot('"round(`a`)"');
  });

  it('ln', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.ln('$a'))
    ).toMatchInlineSnapshot('"ln(`a`)"');
  });

  it('log10', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.log10('$a'))
    ).toMatchInlineSnapshot('"log10(`a`)"');
  });

  it('sin', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.sin('$a'))
    ).toMatchInlineSnapshot('"sin(`a`)"');
  });

  it('asin', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.asin('$a'))
    ).toMatchInlineSnapshot('"asin(`a`)"');
  });

  it('cos', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.cos('$a'))
    ).toMatchInlineSnapshot('"cos(`a`)"');
  });

  it('acos', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.acos('$a'))
    ).toMatchInlineSnapshot('"acos(`a`)"');
  });

  it('tan', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.tan('$a'))
    ).toMatchInlineSnapshot('"tan(`a`)"');
  });

  it('atan', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.atan('$a'))
    ).toMatchInlineSnapshot('"atan(`a`)"');
  });

  it('cot', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.cot('$a'))
    ).toMatchInlineSnapshot('"cot(`a`)"');
  });

  it('sqrt', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.sqrt('$a'))
    ).toMatchInlineSnapshot('"sqrt(`a`)"');
  });

  it('exp', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.exp('$a'))
    ).toMatchInlineSnapshot('"exp(`a`)"');
  });

  it('sign', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.sign('$a'))
    ).toMatchInlineSnapshot('"sign(`a`)"');
  });

  it('log', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.log('$a', '$b'))
    ).toMatchInlineSnapshot('"log(`a`, `b`)"');
  });

  it('mod', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.mod('$a', '$b'))
    ).toMatchInlineSnapshot('"mod(`a`, `b`)"');
  });

  it('pow', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.pow('$a', '$b'))
    ).toMatchInlineSnapshot('"pow(`a`, `b`)"');
  });

  it('greatest', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.greatest('$a', '$b'))
    ).toMatchInlineSnapshot('"greatest(`a`, `b`)"');
  });

  it('least', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.least('$a', '$b'))
    ).toMatchInlineSnapshot('"least(`a`, `b`)"');
  });

  it('subtract', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.subtract('$a', '$b'))
    ).toMatchInlineSnapshot('"(`a`-`b`)"');
  });

  it('multiply', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.multiply('$a', '$b'))
    ).toMatchInlineSnapshot('"(`a`*`b`)"');
  });

  it('divide', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.divide('$a', '$b'))
    ).toMatchInlineSnapshot('"(`a`/`b`)"');
  });
});

describe('string', () => {
  it('length', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.length('$a'))
    ).toMatchInlineSnapshot('"length(`a`)"');
  });

  it('reverse', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.reverse('$a'))
    ).toMatchInlineSnapshot('"reverse(`a`)"');
  });

  it('trim', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.trim('$a'))
    ).toMatchInlineSnapshot('"trim(`a`)"');
  });

  it('lower', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.lower('$a'))
    ).toMatchInlineSnapshot('"lower(`a`)"');
  });

  it('upper', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.upper('$a'))
    ).toMatchInlineSnapshot('"upper(`a`)"');
  });

  it('left', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.left('$a', 1))
    ).toMatchInlineSnapshot('"left(`a`, 1)"');
  });

  it('right', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.right('$a', 1))
    ).toMatchInlineSnapshot('"right(`a`, 1)"');
  });

  it('replace', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.replace('$a', '1', '2'))
    ).toMatchInlineSnapshot("\"replace(`a`, '1', '2')\"");
  });

  it('substring', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.substring('$a', 0, 1))
    ).toMatchInlineSnapshot('"substring(`a`, 0, 1)"');
  });

  it('insert', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.insert('$a', 0, 1, '1'))
    ).toMatchInlineSnapshot('"insert(`a`, 0, 1, \'1\')"');
  });

  it('concat', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.concat('$a', '$c'))
    ).toMatchInlineSnapshot('"concat(`a`, `c`)"');
  });
});

describe('accumulate', () => {
  it('avg', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.avg('$a'))
    ).toMatchInlineSnapshot('"avg(`a`)"');
  });

  it('max', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.max('$a'))
    ).toMatchInlineSnapshot('"max(`a`)"');
  });

  it('min', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.min('$a'))
    ).toMatchInlineSnapshot('"min(`a`)"');
  });

  it('sum', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.sum('$a'))
    ).toMatchInlineSnapshot('"sum(`a`)"');
  });

  it('count', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.count('$a'))
    ).toMatchInlineSnapshot('"count(`a`)"');
  });
});

describe('condition', () => {
  it('cond', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.cond('$d', true, false))
    ).toMatchInlineSnapshot('"if(`d`, true, false)"');
  });

  it('ifnull', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.ifnull('$d', true))
    ).toMatchInlineSnapshot('"ifnull(`d`, true)"');
  });
});

describe('json', () => {
  it('json_array', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip($.json_array([null, 1, '$a']))
    ).toMatchInlineSnapshot('"json_array(null, 1, `a`)"');
  });

  it('json_object', async () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip(
        $.json_object({ price: 1, name: 'test' })
      )
    ).toMatchInlineSnapshot("\"json_object('price', 1,'name', 'test')\"");
  });

  it('json_array_append', () => {
    expect(
      sqlAggregateCommandClip.aggrControllerClip(
        $.json_array_append('$json.c', 1)
      )
    ).toMatchInlineSnapshot("\"json_array_append(`json`->'$.c', '$', 1)\"");
  });
});
