const { Builder } = require("../../dist/js-sql-query");

const builder = new Builder();

const TERM_1 = "SELECT * FROM `table1` WHERE `field1` = 'value1'";
const TERM_2 = "SELECT * FROM `table1` WHERE `field1` <> 'value1'";
const TERM_3 =
    "SELECT * FROM `table1` WHERE `field1` IN ( 'value1', 'value2' )";
const TERM_4 =
    "SELECT * FROM `table1` WHERE `field1` NOT IN ( 'value1', 'value2' )";
const TERM_5 = "SELECT * FROM `table1` WHERE `field1` > 'value1'";
const TERM_6 = "SELECT * FROM `table1` WHERE `field1` < 'value1'";
const TERM_7 = "SELECT * FROM `table1` WHERE `field1` >= 'value1'";
const TERM_8 = "SELECT * FROM `table1` WHERE `field1` <= 'value1'";
const TERM_9 = "SELECT * FROM `table1` WHERE `field1` LIKE '%value1%'";
const TERM_10 = "SELECT * FROM `table1` WHERE `field1` NOT LIKE '%value1%'";
const TERM_11 =
    "SELECT * FROM `table1` WHERE `field1` BETWEEN 'value1' AND 'value2'";
const TERM_12 =
    "SELECT * FROM `table1` WHERE `field1` NOT BETWEEN 'value1' AND 'value2'";
const TERM_13 =
    "SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` = 'value2'";
const TERM_14 =
    "SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` <> 'value2'";
const TERM_15 =
    "SELECT * FROM `table1` WHERE `field1` <> 'value1' AND `field1` <> 'value2'";
const TERM_16 =
    "SELECT * FROM `table1` WHERE `field1` = 'value1' OR `field2` = 'value2'";
const TERM_17 =
    "SELECT * FROM `table1` WHERE ( `field1` = 'value1' OR `field2` = 'value2' ) AND ( `field3` = 'value3' )";
const TERM_18 =
    "SELECT * FROM `table1` WHERE ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` = 'value3' )";
const TERM_19 =
    "SELECT * FROM `table1` WHERE ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` IN ( 'value3', 'value4' ) )";

test(`TERM_1: ${TERM_1}`, () => {
    expect(term$1TestFn$1()).toBe(TERM_1);
});

test(`TERM_2: ${TERM_2}`, () => {
    expect(term$2TestFn$1()).toBe(TERM_2);
});

test(`TERM_3: ${TERM_3}`, () => {
    expect(term$3TestFn$1()).toBe(TERM_3);
});

test(`TERM_4: ${TERM_4}`, () => {
    expect(term$4TestFn$1()).toBe(TERM_4);
});

test(`TERM_5: ${TERM_5}`, () => {
    expect(term$5TestFn$1()).toBe(TERM_5);
});

test(`TERM_6: ${TERM_6}`, () => {
    expect(term$6TestFn$1()).toBe(TERM_6);
});

test(`TERM_7: ${TERM_7}`, () => {
    expect(term$7TestFn$1()).toBe(TERM_7);
});

test(`TERM_8: ${TERM_8}`, () => {
    expect(term$8TestFn$1()).toBe(TERM_8);
});

test(`TERM_9: ${TERM_9}`, () => {
    expect(term$9TestFn$1()).toBe(TERM_9);
});

test(`TERM_10: ${TERM_10}`, () => {
    expect(term$10TestFn$1()).toBe(TERM_10);
});

test(`TERM_11: ${TERM_11}`, () => {
    expect(term$11TestFn$1()).toBe(TERM_11);
});

test(`TERM_12: ${TERM_12}`, () => {
    expect(term$12TestFn$1()).toBe(TERM_12);
});

test(`TERM_13: ${TERM_13}`, () => {
    expect(term$13TestFn$1()).toBe(TERM_13);
    expect(term$13TestFn$2()).toBe(TERM_13);
});

test(`TERM_14: ${TERM_14}`, () => {
    expect(term$14TestFn$1()).toBe(TERM_14);
});

test(`TERM_15: ${TERM_15}`, () => {
    expect(term$15TestFn$1()).toBe(TERM_15);
});

test(`TERM_16: ${TERM_16}`, () => {
    expect(term$16TestFn$1()).toBe(TERM_16);
    expect(term$16TestFn$2()).toBe(TERM_16);
});

test(`TERM_17: ${TERM_17}`, () => {
    expect(term$17TestFn$1()).toBe(TERM_17);
});

test(`TERM_18: ${TERM_18}`, () => {
    expect(term$18TestFn$1()).toBe(TERM_18);
});

test(`TERM_19: ${TERM_19}`, () => {
    expect(term$19TestFn$1()).toBe(TERM_19);
});

const term$1TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.equal({
                field1: "value1"
            })
        ).query;

const term$2TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.noEqual({
                field1: "value1"
            })
        ).query;

const term$3TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.in({
                field1: ["value1", "value2"]
            })
        ).query;

const term$4TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.notIn({
                field1: ["value1", "value2"]
            })
        ).query;

const term$5TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.more({
                field1: "value1"
            })
        ).query;

const term$6TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.less({
                field1: "value1"
            })
        ).query;

const term$7TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.moreEqual({
                field1: "value1"
            })
        ).query;

const term$8TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.lessEqual({
                field1: "value1"
            })
        ).query;

const term$9TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.like({
                field1: "value1"
            })
        ).query;

const term$10TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.notLike({
                field1: "value1"
            })
        ).query;

const term$11TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.between({
                field1: ["value1", "value2"]
            })
        ).query;

const term$12TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.notBetween({
                field1: ["value1", "value2"]
            })
        ).query;

const term$13TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.equal({
                field1: "value1",
                field2: "value2"
            })
        ).query;

const term$13TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term
                .equal({
                    field1: "value1"
                })
                .equal({
                    field2: "value2"
                })
        ).query;

const term$14TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term
                .equal({
                    field1: "value1"
                })
                .noEqual({
                    field2: "value2"
                })
        ).query;

const term$15TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term
                .noEqual({
                    field1: "value1"
                })
                .noEqual({
                    field1: "value2"
                })
        ).query;

const term$16TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term.orEqual({
                field1: "value1",
                field2: "value2"
            })
        ).query;

const term$16TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term
                .orEqual({
                    field1: "value1"
                })
                .orEqual({
                    field2: "value2"
                })
        ).query;

const term$17TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term
                .orEqual({
                    field1: "value1"
                })
                .orEqual({
                    field2: "value2"
                })
                .bracket()
                .orEqual({
                    field3: "value3"
                })
        ).query;

const term$18TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term
                .equal({
                    field1: "value1",
                    field2: "value2"
                })
                .orBracket()
                .equal({
                    field3: "value3"
                })
        ).query;

const term$19TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .where(() =>
            builder.term
                .equal({
                    field1: "value1",
                    field2: "value2"
                })
                .orBracket()
                .in({
                    field3: ["value3", "value4"]
                })
        ).query;
