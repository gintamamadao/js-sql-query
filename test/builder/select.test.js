const { Builder } = require("../../dist/js-sql-query");

const builder = new Builder();

const SELECT_1 = "SELECT * FROM `table1`";
const SELECT_2 = "SELECT `field1`, `field2` FROM `table1`";
const SELECT_3 = "SELECT `field1`, COUNT(`field2`) FROM `table1`";
const SELECT_4 =
    "SELECT `field1`, COUNT(`field2`), SUM(`field3`) FROM `table1`";
const SELECT_5 =
    "SELECT `field1`, COUNT(`field2`) FROM `table1` GROUP BY `field2`";
const SELECT_6 =
    "SELECT `field1`, COUNT(`field2`) FROM `table1` GROUP BY `field2`, `field3`";

test(`SELECT_1: ${SELECT_1}`, () => {
    expect(select$1TestFn$1()).toBe(SELECT_1);
    expect(select$1TestFn$2()).toBe(SELECT_1);
    expect(select$1TestFn$3()).toBe(SELECT_1);
});

test(`SELECT_2: ${SELECT_2}`, () => {
    expect(select$2TestFn$1()).toBe(SELECT_2);
    expect(select$2TestFn$2()).toBe(SELECT_2);
    expect(select$2TestFn$3()).toBe(SELECT_2);
});

test(`SELECT_3: ${SELECT_3}`, () => {
    expect(select$3TestFn$1()).toBe(SELECT_3);
    expect(select$3TestFn$2()).toBe(SELECT_3);
    expect(select$3TestFn$3()).toBe(SELECT_3);
    expect(select$3TestFn$4()).toBe(SELECT_3);
    expect(select$3TestFn$5()).toBe(SELECT_3);
});

test(`SELECT_4: ${SELECT_4}`, () => {
    expect(select$4TestFn$1()).toBe(SELECT_4);
    expect(select$4TestFn$2()).toBe(SELECT_4);
    expect(select$4TestFn$3()).toBe(SELECT_4);
    expect(select$4TestFn$4()).toBe(SELECT_4);
    expect(select$4TestFn$5()).toBe(SELECT_4);
    expect(select$4TestFn$6()).toBe(SELECT_4);
    expect(select$4TestFn$7()).toBe(SELECT_4);
});

test(`SELECT_5: ${SELECT_5}`, () => {
    expect(select$5TestFn$1()).toBe(SELECT_5);
});

test(`SELECT_6: ${SELECT_6}`, () => {
    expect(select$6TestFn$1()).toBe(SELECT_6);
    expect(select$6TestFn$2()).toBe(SELECT_6);
});

const select$1TestFn$1 = () => builder.select().table("table1").query;

const select$1TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .fields("*").query;

const select$1TestFn$3 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .fields("*").query;

const select$2TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1", "field2").query;

const select$2TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .fields("field2").query;

const select$2TestFn$3 = () =>
    builder
        .select()
        .table("table1")
        .fields(["field1", "field2"]).query;

const select$3TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .count("field2").query;

const select$3TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .fields(builder.func.count("field2")).query;

const select$3TestFn$3 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .fields({ func: "count", field: "field2" }).query;

const select$3TestFn$4 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .funcFeilds(builder.func.count("field2")).query;

const select$3TestFn$5 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .funcFeilds({ func: "count", field: "field2" }).query;

const select$4TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .count("field2")
        .sum("field3").query;

const select$4TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1", builder.func.count("field2"), {
            func: "sum",
            field: "field3"
        }).query;

const select$4TestFn$3 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .funcFeilds(
            { func: "count", field: "field2" },
            { func: "sum", field: "field3" }
        ).query;

const select$4TestFn$4 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .funcFeilds(builder.func.count("field2"), {
            func: "sum",
            field: "field3"
        }).query;

const select$4TestFn$5 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .funcFeilds(builder.func.count("field2"))
        .funcFeilds({
            func: "sum",
            field: "field3"
        }).query;

const select$4TestFn$6 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .count("field2")
        .funcFeilds({
            func: "sum",
            field: "field3"
        }).query;

const select$4TestFn$7 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .fields(builder.func.count("field2"))
        .funcFeilds({
            func: "sum",
            field: "field3"
        }).query;

const select$5TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .count("field2")
        .groupBy("field2").query;

const select$6TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .count("field2")
        .groupBy("field2", "field3").query;

const select$6TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .count("field2")
        .groupBy("field2")
        .groupBy("field3").query;
