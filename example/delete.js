var { Builder } = require("../dist/js-sql-query.js");

var builder = new Builder();

var query = builder.delete().table("table1").query;
console.log(query); // DELETE FROM `table1`

var query = builder
    .delete()
    .table("table1")
    .step(100).query;
console.log(query); // DELETE FROM `table1` LIMIT 100

var query = builder
    .delete()
    .table("table1")
    .step(100)
    .descBy("field1").query;
console.log(query); // DELETE FROM `table1` ORDER BY `field1` DESC LIMIT 100

var query = builder
    .delete()
    .table("table1")
    .whereEqual({
        field1: "value1"
    }).query;
console.log(query); // DELETE FROM `table1` WHERE `field1` = 'value1'
