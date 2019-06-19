var { Builder } = require("../dist/js-sql-query.js");

var builder = new Builder();

var query = builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.equal({
            field1: "value1"
        })
    ).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` = 'value1'
