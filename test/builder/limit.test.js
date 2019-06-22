const { Builder } = require("../../dist/js-sql-query");

const builder = new Builder();

const LIMIT_1 = "SELECT * FROM `table1` OFFSET 1";
const LIMIT_2 = "SELECT * FROM `table1` LIMIT 10";
const LIMIT_3 = "SELECT * FROM `table1` LIMIT 10 OFFSET 1";
const LIMIT_4 = "SELECT * FROM `table1` LIMIT 10 OFFSET 10";
const LIMIT_5 = "SELECT * FROM `table1` LIMIT 1";

test(`LIMIT_1: ${LIMIT_1}`, () => {
    expect(limit$1TestFn$1()).toBe(LIMIT_1);
});

test(`LIMIT_2: ${LIMIT_2}`, () => {
    expect(limit$2TestFn$1()).toBe(LIMIT_2);
    expect(limit$2TestFn$2()).toBe(LIMIT_2);
    expect(limit$2TestFn$3()).toBe(LIMIT_2);
    expect(limit$2TestFn$4()).toBe(LIMIT_2);
});

test(`LIMIT_3: ${LIMIT_3}`, () => {
    expect(limit$3TestFn$1()).toBe(LIMIT_3);
});

test(`LIMIT_4: ${LIMIT_4}`, () => {
    expect(limit$4TestFn$1()).toBe(LIMIT_4);
    expect(limit$4TestFn$2()).toBe(LIMIT_4);
});

test(`LIMIT_5: ${LIMIT_5}`, () => {
    expect(limit$5TestFn$1()).toBe(LIMIT_5);
    expect(limit$5TestFn$2()).toBe(LIMIT_5);
});

const limit$1TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .offset(1).query;

const limit$2TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .step(10).query;

const limit$2TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .paging(1, 10).query;

const limit$2TestFn$3 = () =>
    builder
        .select()
        .table("table1")
        .limit(0, 10).query;

const limit$2TestFn$4 = () =>
    builder
        .select()
        .table("table1")
        .limit(10).query;

const limit$3TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .limit(1, 10).query;

const limit$4TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .paging(2, 10).query;

const limit$4TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .limit(10, 10).query;

const limit$5TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .findOne().query;

const limit$5TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .limit(0, 1).query;
