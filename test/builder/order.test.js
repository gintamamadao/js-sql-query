const { Builder } = require("../../dist/js-sql-query");

const builder = new Builder();

const ORDER_1 = "SELECT * FROM `table1` ORDER BY `field1` DESC";
const ORDER_2 = "SELECT * FROM `table1` ORDER BY `field1` ASC";
const ORDER_3 = "SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` DESC";
const ORDER_4 = "SELECT * FROM `table1` ORDER BY `field1` ASC, `field2` ASC";
const ORDER_5 = "SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` ASC";
const ORDER_6 =
    "SELECT * FROM `table1` ORDER BY FIELD(`field1`, 'value1', 'value2')";
const ORDER_7 =
    "SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` ASC, FIELD(`field3`, 'value1', 'value2')";

test(`ORDER_1: ${ORDER_1}`, () => {
    expect(order$1TestFn$1()).toBe(ORDER_1);
});

test(`ORDER_2: ${ORDER_2}`, () => {
    expect(order$2TestFn$1()).toBe(ORDER_2);
});

test(`ORDER_3: ${ORDER_3}`, () => {
    expect(order$3TestFn$1()).toBe(ORDER_3);
    expect(order$3TestFn$2()).toBe(ORDER_3);
});

test(`ORDER_4: ${ORDER_4}`, () => {
    expect(order$4TestFn$1()).toBe(ORDER_4);
    expect(order$4TestFn$2()).toBe(ORDER_4);
});

test(`ORDER_5: ${ORDER_5}`, () => {
    expect(order$5TestFn$1()).toBe(ORDER_5);
});

test(`ORDER_6: ${ORDER_6}`, () => {
    expect(order$6TestFn$1()).toBe(ORDER_6);
});

test(`ORDER_7: ${ORDER_7}`, () => {
    expect(order$7TestFn$1()).toBe(ORDER_7);
    expect(order$7TestFn$2()).toBe(ORDER_7);
});

const order$1TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .descBy("field1").query;

const order$2TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .ascBy("field1").query;

const order$3TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .descBy("field1", "field2").query;

const order$3TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .descBy(["field1", "field2"]).query;

const order$4TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .ascBy("field1", "field2").query;

const order$4TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .ascBy(["field1", "field2"]).query;

const order$5TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .descBy("field1")
        .ascBy("field2").query;

const order$6TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .orderField({
            field1: ["value1", "value2"]
        }).query;

const order$7TestFn$1 = () =>
    builder
        .select()
        .table("table1")
        .descBy("field1")
        .ascBy("field2")
        .orderField({
            field3: ["value1", "value2"]
        }).query;

const order$7TestFn$2 = () =>
    builder
        .select()
        .table("table1")
        .order(() =>
            builder.order
                .descBy("field1")
                .ascBy("field2")
                .orderField({
                    field3: ["value1", "value2"]
                })
        ).query;
