const { Builder } = require("../../dist/js-sql-query");

const builder = new Builder();

const UPDATE_1 = "UPDATE `table1` SET `field1` = 'value1'";
const UPDATE_2 = "UPDATE `table1` SET `field1` = 'value1' LIMIT 100";
const UPDATE_3 =
    "UPDATE `table1` SET `field1` = 'value1', `field2` = 'value2' WHERE `field3` = 'value3'";
const UPDATE_4 =
    "UPDATE `table1` SET `field1` = `field1` + '1' WHERE `field2` = 'value2'";
const UPDATE_5 =
    "UPDATE `table1` SET `field1` = `field1` - '1' WHERE `field2` = 'value2'";
const UPDATE_6 =
    "UPDATE `table1` SET `field1` = 'value1' ORDER BY `field1` DESC LIMIT 100";

test(`UPDATE_1: ${UPDATE_1}`, () => {
    expect(update$1TestFn$1()).toBe(UPDATE_1);
});

test(`UPDATE_2: ${UPDATE_2}`, () => {
    expect(update$2TestFn$1()).toBe(UPDATE_2);
});

test(`UPDATE_3: ${UPDATE_3}`, () => {
    expect(update$3TestFn$1()).toBe(UPDATE_3);
});

test(`UPDATE_4: ${UPDATE_4}`, () => {
    expect(update$4TestFn$1()).toBe(UPDATE_4);
});

test(`UPDATE_5: ${UPDATE_5}`, () => {
    expect(update$5TestFn$1()).toBe(UPDATE_5);
});

test(`UPDATE_6: ${UPDATE_6}`, () => {
    expect(update$6TestFn$1()).toBe(UPDATE_6);
});

const update$1TestFn$1 = () =>
    builder
        .update()
        .table("table1")
        .set({
            field1: "value1"
        }).query;

const update$2TestFn$1 = () =>
    builder
        .update()
        .table("table1")
        .set({
            field1: "value1"
        })
        .step(100).query;

const update$3TestFn$1 = () =>
    builder
        .update()
        .table("table1")
        .set({
            field1: "value1",
            field2: "value2"
        })
        .where$Equal({
            field3: "value3"
        }).query;

const update$4TestFn$1 = () =>
    builder
        .update()
        .table("table1")
        .add({
            field1: 1
        })
        .where$Equal({
            field2: "value2"
        }).query;

const update$5TestFn$1 = () =>
    builder
        .update()
        .table("table1")
        .minus({
            field1: 1
        })
        .where$Equal({
            field2: "value2"
        }).query;

const update$6TestFn$1 = () =>
    builder
        .update()
        .table("table1")
        .set({
            field1: "value1"
        })
        .step(100)
        .descBy("field1").query;
