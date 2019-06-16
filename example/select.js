const { Builder } = require("../dist/js-sql-query.js");

const builder = new Builder();

const selectFn1 = () => builder.select().table("table1").query;
// SELECT * FROM `table1`

const selectFn2 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1", "field2").query;
// SELECT `field1`, `field2` FROM `table1`

const selectFn3 = () =>
    builder
        .select()
        .table("table1")
        .fields(["field1", "field2"]).query;
// SELECT `field1`, `field2` FROM `table1`

const selectFn4 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1")
        .count("field2").query;
// SELECT `field1`, COUNT(`field2`) FROM `table1`

const selectFn5 = () =>
    builder
        .select()
        .table("table1")
        .fields("field1", builder.func.count("field2")).query;
// SELECT `field1`, COUNT(`field2`) FROM `table1`

console.log(selectFn1(), "selectFn1()");
console.log(selectFn2(), "selectFn2()");
console.log(selectFn3(), "selectFn3()");
console.log(selectFn4(), "selectFn4()");
console.log(selectFn5(), "selectFn5()");
