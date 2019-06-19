var { Builder } = require("../dist/js-sql-query.js");

var builder = new Builder();

var query = builder.select().table("table1").query;
console.log(query); // SELECT * FROM `table1`

var query = builder
    .select()
    .table("table1")
    .fields("*").query;
console.log(query); // SELECT * FROM `table1`

var query = builder
    .select()
    .table("table1")
    .fields("field1", "field2").query;
console.log(query); // SELECT `field1`, `field2` FROM `table1`

var query = builder
    .select()
    .table("table1")
    .fields(["field1", "field2"]).query;
console.log(query); // SELECT `field1`, `field2` FROM `table1`

var query = builder
    .select()
    .table("table1")
    .fields("field1")
    .count("field2").query;
console.log(query); // SELECT `field1`, COUNT(`field2`) FROM `table1`

var query = builder
    .select()
    .table("table1")
    .fields("field1")
    .fields(builder.func.count("field2")).query;
console.log(query); // SELECT `field1`, COUNT(`field2`) FROM `table1`

var query = builder
    .select()
    .table("table1")
    .fields("field1")
    .fields({ func: "count", field: "field2" }).query;
console.log(query); // SELECT `field1`, COUNT(`field2`) FROM `table1`

var query = builder
    .select()
    .table("table1")
    .fields("field1")
    .funcFeilds({ func: "count", field: "field2" }).query;
console.log(query); // SELECT `field1`, COUNT(`field2`) FROM `table1`

var query = builder
    .select()
    .table("table1")
    .fields("field1")
    .funcFeilds(builder.func.count("field2")).query;
console.log(query); // SELECT `field1`, COUNT(`field2`) FROM `table1`

var query = builder
    .select()
    .table("table1")
    .fields("field1")
    .count("field2")
    .sum("field3").query;
console.log(query); // SELECT `field1`, COUNT(`field2`), SUM(`field3`) FROM `table1`

var query = builder
    .select()
    .table("table1")
    .fields("field1")
    .funcFeilds(
        { func: "count", field: "field2" },
        { func: "sum", field: "field3" }
    ).query;
console.log(query); // SELECT `field1`, COUNT(`field2`), SUM(`field3`) FROM `table1`

var query = builder
    .select()
    .table("table1")
    .fields("field1")
    .funcFeilds(builder.func.count("field2"), builder.func.sum("field3")).query;
console.log(query); // SELECT `field1`, COUNT(`field2`), SUM(`field3`) FROM `table1`

var query = builder
    .select()
    .table("table1")
    .fields("field1")
    .count("field2")
    .groupBy("field2").query;
console.log(query); // SELECT `field1`, COUNT(`field2`) FROM `table1` GROUP BY `field2`

var query = builder
    .select()
    .table("table1")
    .fields("field1")
    .count("field2")
    .groupBy("field2", "field3").query;
console.log(query); // SELECT `field1`, COUNT(`field2`) FROM `table1` GROUP BY `field2`, `field3`
