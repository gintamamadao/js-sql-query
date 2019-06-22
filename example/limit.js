var { Builder } = require("../dist/js-sql-query.js");

var builder = new Builder();

var query = builder
    .select()
    .table("table1")
    .offset(1).query;
console.log(query); // SELECT * FROM `table1` OFFSET 1

var query = builder
    .select()
    .table("table1")
    .step(10).query;
console.log(query); // SELECT * FROM `table1` LIMIT 10

var query = builder
    .select()
    .table("table1")
    .limit(1, 10).query;
console.log(query); // SELECT * FROM `table1` LIMIT 10 OFFSET 1

var query = builder
    .select()
    .table("table1")
    .paging(1, 10).query;
console.log(query); // SELECT * FROM `table1` LIMIT 10

var query = builder
    .select()
    .table("table1")
    .paging(2, 10).query;
console.log(query); // SELECT * FROM `table1` LIMIT 10 OFFSET 10

var query = builder
    .select()
    .table("table1")
    .findOne().query;
console.log(query); // SELECT * FROM `table1` LIMIT 1
