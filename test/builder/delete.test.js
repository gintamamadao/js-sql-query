const { Builder } = require("../../dist/js-sql-query");

const builder = new Builder();

const DELETE_1 = "DELETE FROM `table1`";
const DELETE_2 = "DELETE FROM `table1` LIMIT 100";
const DELETE_3 = "DELETE FROM `table1` ORDER BY `field1` DESC LIMIT 100";
const DELETE_4 = "DELETE FROM `table1` WHERE `field1` = 'value1'";

test(`DELETE_1: ${DELETE_1}`, () => {
    expect(delete$1TestFn$1()).toBe(DELETE_1);
});

test(`DELETE_2: ${DELETE_2}`, () => {
    expect(delete$2TestFn$1()).toBe(DELETE_2);
});

test(`DELETE_3: ${DELETE_3}`, () => {
    expect(delete$3TestFn$1()).toBe(DELETE_3);
});

test(`DELETE_4: ${DELETE_4}`, () => {
    expect(delete$4TestFn$1()).toBe(DELETE_4);
});

const delete$1TestFn$1 = () => builder.delete().table("table1").query;

const delete$2TestFn$1 = () =>
    builder
        .delete()
        .table("table1")
        .step(100).query;

const delete$3TestFn$1 = () =>
    builder
        .delete()
        .table("table1")
        .step(100)
        .descBy("field1").query;

const delete$4TestFn$1 = () =>
    builder
        .delete()
        .table("table1")
        .where$Equal({
            field1: "value1"
        }).query;
