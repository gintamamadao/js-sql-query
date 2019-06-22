const { Builder } = require("../../dist/js-sql-query");

const builder = new Builder();

const INSERT_1 =
    "INSERT INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )";
const INSERT_2 =
    "INSERT INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' ), ( 'value4', 'value5' )";
const INSERT_3 =
    "INSERT INTO `table1` ( `field1`, `field2` )  VALUES SELECT `field1`, `field2` FROM `table1`";

test(`INSERT_1: ${INSERT_1}`, () => {
    expect(insert$1TestFn$1()).toBe(INSERT_1);
    expect(insert$1TestFn$2()).toBe(INSERT_1);
    expect(insert$1TestFn$3()).toBe(INSERT_1);
});

test(`INSERT_2: ${INSERT_2}`, () => {
    expect(insert$2TestFn$1()).toBe(INSERT_2);
});

test(`INSERT_3: ${INSERT_3}`, () => {
    expect(insert$3TestFn$1()).toBe(INSERT_3);
});

const insert$1TestFn$1 = () =>
    builder
        .insert()
        .table("table1")
        .data({
            field1: "value1",
            field2: "value2"
        }).query;

const insert$1TestFn$2 = () =>
    builder
        .insert()
        .table("table1")
        .fields("field1", "field2")
        .data({
            field1: "value1",
            field2: "value2",
            field3: "value3"
        }).query;

const insert$1TestFn$3 = () =>
    builder
        .insert()
        .table("table1")
        .fields(["field1", "field2"])
        .data({
            field1: "value1",
            field2: "value2",
            field3: "value3"
        }).query;

const insert$2TestFn$1 = () =>
    builder
        .insert()
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

const insert$3TestFn$1 = () =>
    builder
        .insert()
        .table("table1")
        .fields(["field1", "field2"])
        .values(() =>
            builder
                .select()
                .table("table1")
                .fields(["field1", "field2"])
        ).query;
