var { Builder } = require("../dist/js-sql-query.js");

var builder = new Builder();

var query = builder
    .replace()
    .table("table1")
    .data({
        field1: "value1",
        field2: "value2"
    }).query;
console.log(query); // REPLACE INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )

var query = builder
    .replace()
    .table("table1")
    .fields("field1", "field2")
    .data({
        field1: "value1",
        field2: "value2",
        field3: "value3"
    }).query;
console.log(query); // REPLACE INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )

var query = builder
    .replace()
    .table("table1")
    .fields(["field1", "field2"])
    .data({
        field1: "value1",
        field2: "value2",
        field3: "value3"
    }).query;
console.log(query); // REPLACE INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )

var query = builder
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
console.log(query); // REPLACE INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' ), ( 'value4', 'value5' )

var query = builder
    .replace()
    .table("table1")
    .fields(["field1", "field2"])
    .values(() =>
        builder
            .select()
            .table("table1")
            .fields(["field1", "field2"])
    ).query;
console.log(query); // REPLACE INTO `table1` ( `field1`, `field2` )  VALUES SELECT `field1`, `field2` FROM `table1`
