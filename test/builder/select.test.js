const { Builder } = require("../../dist/js-sql-query");

const builder = new Builder();

const select1 = "SELECT * FROM `table1`";
const selectFn1 = () => builder.select().table("table1").query;

const select2 = "SELECT `field1`, `field2` FROM `table1`";
const selectFn2 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1", "field2").query;

const select3 = "SELECT `field1`, `field2` FROM `table1`";
const selectFn3 = () =>
    builder
        .select()
        .table("table1")
        .fields(["field1", "field2"]).query;

const select4 = "SELECT `field1`, COUNT(`field2`) FROM `table1`";
const selectFn4 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .count("field2").query;

const select5 = "SELECT `field1`, COUNT(`field2`) FROM `table1`";
const selectFn5 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1", builder.func.count("field2")).query;

const select6 = "SELECT `field1`, COUNT(`field2`) FROM `table1`";
const selectFn6 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .funcFeilds(builder.func.count("field2")).query;

test(`select1: ${select1}`, () => {
    expect(selectFn1()).toBe(select1);
});

test(`select2: ${select2}`, () => {
    expect(selectFn2()).toBe(select2);
});

test(`select3: ${select3}`, () => {
    expect(selectFn3()).toBe(select3);
});

test(`select4: ${select4}`, () => {
    expect(selectFn4()).toBe(select4);
});

test(`select5: ${select5}`, () => {
    expect(selectFn5()).toBe(select5);
});

test(`select6: ${select6}`, () => {
    expect(selectFn6()).toBe(select6);
});
