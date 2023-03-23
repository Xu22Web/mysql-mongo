import { describe, expect, it } from 'vitest';
import { $ } from '../src/lib/aggregateCommand';
import { database } from '../src/lib/database';
import { sqlCommandClip } from '../src/lib/sql/sqlClip/sqlCommandClip';
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

const _ = db.command;

describe.skip('logic', () => {
  it('and', () => {
    expect(
      sqlCommandClip.cmdControllerClip('test', _.eq(1).and(_.eq(true)))
    ).toMatchInlineSnapshot('"`test` = 1 and `test` = true"');
  });
  it('or', () => {
    expect(
      sqlCommandClip.cmdControllerClip('test', _.eq(1).or(_.eq(null)))
    ).toMatchInlineSnapshot('"`test` = 1 or `test` is null"');
  });
  it('not', () => {
    expect(
      sqlCommandClip.cmdControllerClip('test', _.not(_.eq(0)))
    ).toMatchInlineSnapshot('"not(`test` = 0)"');
  });
  it('nand', () => {
    expect(
      sqlCommandClip.cmdControllerClip('test', _.eq(1).nand(_.eq(true)))
    ).toMatchInlineSnapshot('"not(`test` = 1 and `test` = true)"');
  });
  it('nor', () => {
    expect(
      sqlCommandClip.cmdControllerClip('test', _.eq(1).nor(_.eq(true)))
    ).toMatchInlineSnapshot('"not(`test` = 1 or `test` = true)"');
  });
});

describe.skip('compare', () => {
  it('eq', () => {
    expect(
      sqlCommandClip.cmdControllerClip('test', _.eq(1))
    ).toMatchInlineSnapshot('"`test` = 1"');
  });

  it('neq', () => {
    expect(
      sqlCommandClip.cmdControllerClip('test', _.neq(1))
    ).toMatchInlineSnapshot('"`test` != 1"');
  });

  it('lt', () => {
    expect(
      sqlCommandClip.cmdControllerClip('test', _.lt(1))
    ).toMatchInlineSnapshot('"`test` < 1"');
  });

  it('lte', () => {
    expect(
      sqlCommandClip.cmdControllerClip('test', _.lte(1))
    ).toMatchInlineSnapshot('"`test` <= 1"');
  });

  it('gt', () => {
    expect(
      sqlCommandClip.cmdControllerClip('test', _.gt(1))
    ).toMatchInlineSnapshot('"`test` > 1"');
  });

  it('gte', () => {
    expect(
      sqlCommandClip.cmdControllerClip('test', _.gte(1))
    ).toMatchInlineSnapshot('"`test` >= 1"');
  });

  it('in', () => {
    expect(
      sqlCommandClip.cmdControllerClip('test', _.in([0, 1, $.abs(-1).sin()]))
    ).toMatchInlineSnapshot('"`test` in (0, 1, sin(abs(-1)))"');
  });

  it('nin', () => {
    expect(
      sqlCommandClip.cmdControllerClip('test', _.nin(0, 1, $.abs(-1).sin()))
    ).toMatchInlineSnapshot('"`test` not in (0, 1, sin(abs(-1)))"');
  });
});
