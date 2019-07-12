var { Builder } = require("../dist/js-sql-query.js");

var builder = new Builder();

var query = builder
    .select()
    .table("table1")
    .where$Equal({
        field1: "value1"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` = 'value1'

var query = builder
    .select()
    .table("table1")
    .where$NotEqual({
        field1: "value1"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` <> 'value1'

var query = builder
    .select()
    .table("table1")
    .where$In({
        field1: ["value1", "value2"]
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` IN ( 'value1', 'value2' )

var query = builder
    .select()
    .table("table1")
    .where$NotIn({
        field1: ["value1", "value2"]
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` NOT IN ( 'value1', 'value2' )

var query = builder
    .select()
    .table("table1")
    .where$More({
        field1: "value1"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` > 'value1'

var query = builder
    .select()
    .table("table1")
    .where$Less({
        field1: "value1"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` < 'value1'

var query = builder
    .select()
    .table("table1")
    .where$MoreEqual({
        field1: "value1"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` >= 'value1'

var query = builder
    .select()
    .table("table1")
    .where$LessEqual({
        field1: "value1"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` <= 'value1'

var query = builder
    .select()
    .table("table1")
    .where$Like({
        field1: "value1"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` LIKE '%value1%'

var query = builder
    .select()
    .table("table1")
    .where$NotLike({
        field1: "value1"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` NOT LIKE '%value1%'

var query = builder
    .select()
    .table("table1")
    .where$Between({
        field1: ["value1", "value2"]
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` BETWEEN 'value1' AND 'value2'

var query = builder
    .select()
    .table("table1")
    .where$NotBetween({
        field1: ["value1", "value2"]
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` NOT BETWEEN 'value1' AND 'value2'

var query = builder
    .select()
    .table("table1")
    .where$Equal({
        field1: "value1",
        field2: "value2"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` = 'value2'

var query = builder
    .select()
    .table("table1")
    .where$Equal({
        field1: "value1"
    })
    .where$NotEqual({
        field2: "value2"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` <> 'value2'

var query = builder
    .select()
    .table("table1")
    .where$NotEqual({
        field1: "value1"
    })
    .where$NotEqual({
        field1: "value2"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` <> 'value1' AND `field1` <> 'value2'

var query = builder
    .select()
    .table("table1")
    .where$OrEqual({
        field1: "value1",
        field2: "value2"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` = 'value1' OR `field2` = 'value2'

var query = builder
    .select()
    .table("table1")
    .where$OrEqual({
        field1: "value1"
    })
    .where$OrEqual({
        field1: "value2"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE `field1` = 'value1' OR `field1` = 'value2'

var query = builder
    .select()
    .table("table1")
    .where$OrEqual({
        field1: "value1"
    })
    .where$OrEqual({
        field2: "value2"
    })
    .where$Bracket()
    .where$OrEqual({
        field3: "value3"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE ( `field1` = 'value1' OR `field2` = 'value2' ) AND ( `field3` = 'value3' )

var query = builder
    .select()
    .table("table1")
    .where$Equal({
        field1: "value1",
        field2: "value2"
    })
    .where$OrBracket()
    .where$Equal({
        field3: "value3"
    }).query;
console.log(query); // SELECT * FROM `table1` WHERE ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` = 'value3' )
