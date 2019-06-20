const { Builder } = require("../../dist/js-sql-query");

const builder = new Builder();

const WHERE_1 = "SELECT * FROM `table1` WHERE `field1` = 'value1'";
const WHERE_2 = "SELECT * FROM `table1` WHERE `field1` <> 'value1'";
const WHERE_3 =
    "SELECT * FROM `table1` WHERE `field1` IN ( 'value1', 'value2' )";
const WHERE_4 =
    "SELECT * FROM `table1` WHERE `field1` NOT IN ( 'value1', 'value2' )";
const WHERE_5 = "SELECT * FROM `table1` WHERE `field1` > 'value1'";
const WHERE_6 = "SELECT * FROM `table1` WHERE `field1` < 'value1'";
const WHERE_7 = "SELECT * FROM `table1` WHERE `field1` >= 'value1'";
const WHERE_8 = "SELECT * FROM `table1` WHERE `field1` <= 'value1'";
const WHERE_9 = "SELECT * FROM `table1` WHERE `field1` LIKE '%value1%'";
const WHERE_10 = "SELECT * FROM `table1` WHERE `field1` NOT LIKE '%value1%'";
const WHERE_11 =
    "SELECT * FROM `table1` WHERE `field1` BETWEEN 'value1' AND 'value2'";
const WHERE_12 =
    "SELECT * FROM `table1` WHERE `field1` NOT BETWEEN 'value1' AND 'value2'";
const WHERE_13 =
    "SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` = 'value2'";
const WHERE_14 =
    "SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` <> 'value2'";
const WHERE_15 =
    "SELECT * FROM `table1` WHERE `field1` <> 'value1' AND `field1` <> 'value2'";
const WHERE_16 =
    "SELECT * FROM `table1` WHERE `field1` = 'value1' OR `field2` = 'value2'";
const WHERE_17 =
    "SELECT * FROM `table1` WHERE ( `field1` = 'value1' OR `field2` = 'value2' ) AND ( `field3` = 'value3' )";
const WHERE_18 =
    "SELECT * FROM `table1` WHERE ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` = 'value3' )";
const WHERE_19 =
    "SELECT * FROM `table1` WHERE ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` IN ( 'value3', 'value4' ) )";

test(`WHERE_1: ${WHERE_1}`, () => {
    expect(where$1TestFn$1()).toBe(WHERE_1);
    expect(where$1TestFn$2()).toBe(WHERE_1);
    expect(where$1TestFn$3()).toBe(WHERE_1);
});

test(`WHERE_2: ${WHERE_2}`, () => {
    expect(where$2TestFn$1()).toBe(WHERE_2);
});

test(`WHERE_3: ${WHERE_3}`, () => {
    expect(where$3TestFn$1()).toBe(WHERE_3);
});

test(`WHERE_4: ${WHERE_4}`, () => {
    expect(where$4TestFn$1()).toBe(WHERE_4);
});

test(`WHERE_5: ${WHERE_5}`, () => {
    expect(where$5TestFn$1()).toBe(WHERE_5);
});

test(`WHERE_6: ${WHERE_6}`, () => {
    expect(where$6TestFn$1()).toBe(WHERE_6);
});

test(`WHERE_7: ${WHERE_7}`, () => {
    expect(where$7TestFn$1()).toBe(WHERE_7);
});

test(`WHERE_8: ${WHERE_8}`, () => {
    expect(where$8TestFn$1()).toBe(WHERE_8);
});

test(`WHERE_9: ${WHERE_9}`, () => {
    expect(where$9TestFn$1()).toBe(WHERE_9);
});

test(`WHERE_10: ${WHERE_10}`, () => {
    expect(where$10TestFn$1()).toBe(WHERE_10);
});

test(`WHERE_11: ${WHERE_11}`, () => {
    expect(where$11TestFn$1()).toBe(WHERE_11);
});

test(`WHERE_12: ${WHERE_12}`, () => {
    expect(where$12TestFn$1()).toBe(WHERE_12);
});

test(`WHERE_13: ${WHERE_13}`, () => {
    expect(where$13TestFn$1()).toBe(WHERE_13);
    expect(where$13TestFn$2()).toBe(WHERE_13);
});

test(`WHERE_14: ${WHERE_14}`, () => {
    expect(where$14TestFn$1()).toBe(WHERE_14);
});

test(`WHERE_15: ${WHERE_15}`, () => {
    expect(where$15TestFn$1()).toBe(WHERE_15);
});

test(`WHERE_16: ${WHERE_16}`, () => {
    expect(where$16TestFn$1()).toBe(WHERE_16);
    expect(where$16TestFn$2()).toBe(WHERE_16);
});

test(`WHERE_17: ${WHERE_17}`, () => {
    expect(where$17TestFn$1()).toBe(WHERE_17);
});

test(`WHERE_18: ${WHERE_18}`, () => {
    expect(where$18TestFn$1()).toBe(WHERE_18);
});

test(`WHERE_19: ${WHERE_19}`, () => {
    expect(where$19TestFn$1()).toBe(WHERE_19);
});

const where$1TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$Equal({
            field1: "value1"
        }).query;

const where$1TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .where(() => "`field1` = 'value1'").query;

const where$1TestFn$3 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.equal({
                field1: "value1"
            })
        ).query;

const where$2TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$NoEqual({
            field1: "value1"
        }).query;

const where$3TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$In({
            field1: ["value1", "value2"]
        }).query;

const where$4TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$NotIn({
            field1: ["value1", "value2"]
        }).query;

const where$5TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$More({
            field1: "value1"
        }).query;

const where$6TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$Less({
            field1: "value1"
        }).query;

const where$7TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$MoreEqual({
            field1: "value1"
        }).query;

const where$8TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$LessEqual({
            field1: "value1"
        }).query;

const where$9TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$Like({
            field1: "value1"
        }).query;

const where$10TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$NotLike({
            field1: "value1"
        }).query;

const where$11TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$Between({
            field1: ["value1", "value2"]
        }).query;

const where$12TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$NotBetween({
            field1: ["value1", "value2"]
        }).query;

const where$13TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$Equal({
            field1: "value1",
            field2: "value2"
        }).query;

const where$13TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .where$Equal({
            field1: "value1"
        })
        .where$Equal({
            field2: "value2"
        }).query;

const where$14TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$Equal({
            field1: "value1"
        })
        .where$NoEqual({
            field2: "value2"
        }).query;

const where$15TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$NoEqual({
            field1: "value1"
        })
        .where$NoEqual({
            field1: "value2"
        }).query;

const where$16TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$OrEqual({
            field1: "value1",
            field2: "value2"
        }).query;

const where$16TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .where$OrEqual({
            field1: "value1"
        })
        .where$OrEqual({
            field2: "value2"
        }).query;

const where$17TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$OrEqual({
            field1: "value1"
        })
        .where$OrEqual({
            field2: "value2"
        })
        .where$Bracket()
        .where$OrEqual({
            field3: "value3"
        }).query;

const where$18TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$Equal({
            field1: "value1",
            field2: "value2"
        })
        .where$OrBracket()
        .where$Equal({
            field3: "value3"
        }).query;

const where$19TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where$Equal({
            field1: "value1",
            field2: "value2"
        })
        .where$OrBracket()
        .where$In({
            field3: ["value3", "value4"]
        }).query;
