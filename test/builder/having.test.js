const { Builder } = require("../../dist/js-sql-query");

const builder = new Builder();

const HAVING_1 = "SELECT * FROM `table1` HAVING `field1` = 'value1'";
const HAVING_2 = "SELECT * FROM `table1` HAVING `field1` <> 'value1'";
const HAVING_3 =
    "SELECT * FROM `table1` HAVING `field1` IN ( 'value1', 'value2' )";
const HAVING_4 =
    "SELECT * FROM `table1` HAVING `field1` NOT IN ( 'value1', 'value2' )";
const HAVING_5 = "SELECT * FROM `table1` HAVING `field1` > 'value1'";
const HAVING_6 = "SELECT * FROM `table1` HAVING `field1` < 'value1'";
const HAVING_7 = "SELECT * FROM `table1` HAVING `field1` >= 'value1'";
const HAVING_8 = "SELECT * FROM `table1` HAVING `field1` <= 'value1'";
const HAVING_9 = "SELECT * FROM `table1` HAVING `field1` LIKE '%value1%'";
const HAVING_10 = "SELECT * FROM `table1` HAVING `field1` NOT LIKE '%value1%'";
const HAVING_11 =
    "SELECT * FROM `table1` HAVING `field1` BETWEEN 'value1' AND 'value2'";
const HAVING_12 =
    "SELECT * FROM `table1` HAVING `field1` NOT BETWEEN 'value1' AND 'value2'";
const HAVING_13 =
    "SELECT * FROM `table1` HAVING `field1` = 'value1' AND `field2` = 'value2'";
const HAVING_14 =
    "SELECT * FROM `table1` HAVING `field1` = 'value1' AND `field2` <> 'value2'";
const HAVING_15 =
    "SELECT * FROM `table1` HAVING `field1` <> 'value1' AND `field1` <> 'value2'";
const HAVING_16 =
    "SELECT * FROM `table1` HAVING `field1` = 'value1' OR `field2` = 'value2'";
const HAVING_17 =
    "SELECT * FROM `table1` HAVING ( `field1` = 'value1' OR `field2` = 'value2' ) AND ( `field3` = 'value3' )";
const HAVING_18 =
    "SELECT * FROM `table1` HAVING ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` = 'value3' )";
const HAVING_19 =
    "SELECT * FROM `table1` HAVING ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` IN ( 'value3', 'value4' ) )";

test(`HAVING_1: ${HAVING_1}`, () => {
    expect(having$1TestFn$1()).toBe(HAVING_1);
});

test(`HAVING_2: ${HAVING_2}`, () => {
    expect(having$2TestFn$1()).toBe(HAVING_2);
});

test(`HAVING_3: ${HAVING_3}`, () => {
    expect(having$3TestFn$1()).toBe(HAVING_3);
});

test(`HAVING_4: ${HAVING_4}`, () => {
    expect(having$4TestFn$1()).toBe(HAVING_4);
});

test(`HAVING_5: ${HAVING_5}`, () => {
    expect(having$5TestFn$1()).toBe(HAVING_5);
});

test(`HAVING_6: ${HAVING_6}`, () => {
    expect(having$6TestFn$1()).toBe(HAVING_6);
});

test(`HAVING_7: ${HAVING_7}`, () => {
    expect(having$7TestFn$1()).toBe(HAVING_7);
});

test(`HAVING_8: ${HAVING_8}`, () => {
    expect(having$8TestFn$1()).toBe(HAVING_8);
});

test(`HAVING_9: ${HAVING_9}`, () => {
    expect(having$9TestFn$1()).toBe(HAVING_9);
});

test(`HAVING_10: ${HAVING_10}`, () => {
    expect(having$10TestFn$1()).toBe(HAVING_10);
});

test(`HAVING_11: ${HAVING_11}`, () => {
    expect(having$11TestFn$1()).toBe(HAVING_11);
});

test(`HAVING_12: ${HAVING_12}`, () => {
    expect(having$12TestFn$1()).toBe(HAVING_12);
});

test(`HAVING_13: ${HAVING_13}`, () => {
    expect(having$13TestFn$1()).toBe(HAVING_13);
    expect(having$13TestFn$2()).toBe(HAVING_13);
});

test(`HAVING_14: ${HAVING_14}`, () => {
    expect(having$14TestFn$1()).toBe(HAVING_14);
});

test(`HAVING_15: ${HAVING_15}`, () => {
    expect(having$15TestFn$1()).toBe(HAVING_15);
});

test(`HAVING_16: ${HAVING_16}`, () => {
    expect(having$16TestFn$1()).toBe(HAVING_16);
    expect(having$16TestFn$2()).toBe(HAVING_16);
});

test(`HAVING_17: ${HAVING_17}`, () => {
    expect(having$17TestFn$1()).toBe(HAVING_17);
});

test(`HAVING_18: ${HAVING_18}`, () => {
    expect(having$18TestFn$1()).toBe(HAVING_18);
});

test(`HAVING_19: ${HAVING_19}`, () => {
    expect(having$19TestFn$1()).toBe(HAVING_19);
});

const having$1TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$Equal({
            field1: "value1"
        }).query;

const having$2TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$NoEqual({
            field1: "value1"
        }).query;

const having$3TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$In({
            field1: ["value1", "value2"]
        }).query;

const having$4TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$NotIn({
            field1: ["value1", "value2"]
        }).query;

const having$5TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$More({
            field1: "value1"
        }).query;

const having$6TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$Less({
            field1: "value1"
        }).query;

const having$7TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$MoreEqual({
            field1: "value1"
        }).query;

const having$8TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$LessEqual({
            field1: "value1"
        }).query;

const having$9TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$Like({
            field1: "value1"
        }).query;

const having$10TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$NotLike({
            field1: "value1"
        }).query;

const having$11TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$Between({
            field1: ["value1", "value2"]
        }).query;

const having$12TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$NotBetween({
            field1: ["value1", "value2"]
        }).query;

const having$13TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$Equal({
            field1: "value1",
            field2: "value2"
        }).query;

const having$13TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .having$Equal({
            field1: "value1"
        })
        .having$Equal({
            field2: "value2"
        }).query;

const having$14TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$Equal({
            field1: "value1"
        })
        .having$NoEqual({
            field2: "value2"
        }).query;

const having$15TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$NoEqual({
            field1: "value1"
        })
        .having$NoEqual({
            field1: "value2"
        }).query;

const having$16TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$OrEqual({
            field1: "value1",
            field2: "value2"
        }).query;

const having$16TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .having$OrEqual({
            field1: "value1"
        })
        .having$OrEqual({
            field2: "value2"
        }).query;

const having$17TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$OrEqual({
            field1: "value1"
        })
        .having$OrEqual({
            field2: "value2"
        })
        .having$Bracket()
        .having$OrEqual({
            field3: "value3"
        }).query;

const having$18TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$Equal({
            field1: "value1",
            field2: "value2"
        })
        .having$OrBracket()
        .having$Equal({
            field3: "value3"
        }).query;

const having$19TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .having$Equal({
            field1: "value1",
            field2: "value2"
        })
        .having$OrBracket()
        .having$In({
            field3: ["value3", "value4"]
        }).query;
