const { Builder } = require("../../dist/js-sql-query");

const builder = new Builder();

const REPLACE_1 =
    "REPLACE INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )";
const REPLACE_2 =
    "REPLACE INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' ), ( 'value4', 'value5' )";
const REPLACE_3 =
    "REPLACE INTO `table1` ( `field1`, `field2` )  VALUES SELECT `field1`, `field2` FROM `table1`";

test(`REPLACE_1: ${REPLACE_1}`, () => {
    expect(replace$1TestFn$1()).toBe(REPLACE_1);
    expect(replace$1TestFn$2()).toBe(REPLACE_1);
    expect(replace$1TestFn$3()).toBe(REPLACE_1);
});

test(`REPLACE_2: ${REPLACE_2}`, () => {
    expect(replace$2TestFn$1()).toBe(REPLACE_2);
});

test(`REPLACE_3: ${REPLACE_3}`, () => {
    expect(replace$3TestFn$1()).toBe(REPLACE_3);
});

const replace$1TestFn$1 = () =>
    builder
        .replace()
        .table("table1")
        .data({
            field1: "value1",
            field2: "value2"
        }).query;

const replace$1TestFn$2 = () =>
    builder
        .replace()
        .table("table1")
        .fields("field1", "field2")
        .data({
            field1: "value1",
            field2: "value2",
            field3: "value3"
        }).query;

const replace$1TestFn$3 = () =>
    builder
        .replace()
        .table("table1")
        .fields(["field1", "field2"])
        .data({
            field1: "value1",
            field2: "value2",
            field3: "value3"
        }).query;

const replace$2TestFn$1 = () =>
    builder
        .replace()
        .table("table1")
        .fields(["field1", "field2"])
        .multiData([
            {
                field1: "value1",
                field2: "value2",
                field3: "value3"
            },
            {
                field1: "value4",
                field2: "value5",
                field3: "value6"
            }
        ]).query;

const replace$3TestFn$1 = () =>
    builder
        .replace()
        .table("table1")
        .fields(["field1", "field2"])
        .values(() =>
            builder
                .select()
                .table("table1")
                .fields(["field1", "field2"])
        ).query;
