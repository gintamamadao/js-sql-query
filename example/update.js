var { Builder } = require("../dist/js-sql-query.js");

var builder = new Builder();

var query = builder
    .update()
    .table("table1")
    .set({
        field1: "value1"
    }).query;
console.log(query); // UPDATE `table1` SET `field1` = 'value1'

var query = builder
    .update()
    .table("table1")
    .set({
        field1: "value1"
    })
    .step(100).query;
console.log(query); // UPDATE `table1` SET `field1` = 'value1' LIMIT 100

var query = builder
    .update()
    .table("table1")
    .set({
        field1: "value1"
    })
    .step(100)
    .descBy("field1").query;
console.log(query); // UPDATE `table1` SET `field1` = 'value1' ORDER BY `field1` DESC LIMIT 100

var query = builder
    .update()
    .table("table1")
    .set({
        field1: "value1",
        field2: "value2"
    })
    .whereEqual({
        field3: "value3"
    }).query;
console.log(query); // UPDATE `table1` SET `field1` = 'value1', `field2` = 'value2' WHERE `field3` = 'value3'

var query = builder
    .update()
    .table("table1")
    .add({
        field1: 1
    })
    .whereEqual({
        field2: "value2"
    }).query;
console.log(query); // UPDATE `table1` SET `field1` = `field1` + '1' WHERE `field2` = 'value2'

var query = builder
    .update()
    .table("table1")
    .minus({
        field1: 1
    })
    .whereEqual({
        field2: "value2"
    }).query;
console.log(query); // UPDATE `table1` SET `field1` = `field1` - '1' WHERE `field2` = 'value2'
