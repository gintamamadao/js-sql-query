var { Builder } = require("../dist/js-sql-query.js");

var builder = new Builder();

var query = builder
    .select()
    .table("table1")
    .descBy("field1").query;
console.log(query); // SELECT * FROM `table1` ORDER BY `field1` DESC

var query = builder
    .select()
    .table("table1")
    .ascBy("field1").query;
console.log(query); // SELECT * FROM `table1` ORDER BY `field1` ASC

var query = builder
    .select()
    .table("table1")
    .descBy("field1", "field2").query;
console.log(query); // SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` DESC

var query = builder
    .select()
    .table("table1")
    .descBy(["field1", "field2"]).query;
console.log(query); // SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` DESC

var query = builder
    .select()
    .table("table1")
    .ascBy("field1", "field2").query;
console.log(query); // SELECT * FROM `table1` ORDER BY `field1` ASC, `field2` ASC

var query = builder
    .select()
    .table("table1")
    .ascBy(["field1", "field2"]).query;
console.log(query); // SELECT * FROM `table1` ORDER BY `field1` ASC, `field2` ASC

var query = builder
    .select()
    .table("table1")
    .descBy("field1")
    .ascBy("field2").query;
console.log(query); // SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` ASC

var query = builder
    .select()
    .table("table1")
    .orderField({
        field1: ["value1", "value2"]
    }).query;
console.log(query); // SELECT * FROM `table1` ORDER BY FIELD(`field1`, 'value1', 'value2')

var query = builder
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
console.log(query); // SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` ASC, FIELD(`field3`, 'value1', 'value2')