# js-sql-query

> Node.js ORM for MySQL and Microsoft SQL Server

## 项目简介

> 一个 `orm` 框架，可以通过链式调用 `api` 快捷地生成 `sql` 语句，并且连接数据库执行。目前支持 `MySQL` 和 `Microsoft SQL Server` 这两种数据库。

## 环境安装

> 安装本项目

```sh
npm i js-sql-query --save
```

> 如果使用的是 MySQL，需要安装依赖

```sh
npm i mysql --save
```

> 如果使用的是 Microsoft SQL Server，需要安装依赖

```sh
npm i tedious@1.14.0 --save
npm i tedious-connection-pool@1.0.5 --save
```

## 使用例子

```js
var SqlQuery = require("js-sql-query");

// 配置数据库相关信息，其中dialect 是配置数据类型，如果不配置，默认为 mysql。如果使用的是 Microsoft SQL Server，则配置值为 mssql
var sqlQuery = new SqlQuery({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "test_db",
    dialect: "mysql"
});

// 调用 api 生成 sql 语句 SELECT `field1`, `field2` FROM `table1`，并连接数据库执行语句
var result = await sqlQuery
    .select()
    .table("table1")
    .fields("field1", "field2")
    .exec();
// exec() 返回的是一个 Promise 对象， 所以用 async/await 语法获取最后结果
```

---

# 目录

<!-- TOC -->

-   [Build SQL Api](#build-sql-api)
    -   [INSERT/REPLACE](#insertreplace)
        -   [insert/replace](#insertreplace)
        -   [data](#data)
        -   [multiData](#multidata)
        -   [values](#values)
        -   [fields](#fields)
    -   [UPDATE](#update)
        -   [update](#update)
        -   [set](#set)
        -   [add](#add)
        -   [minus](#minus)
    -   [SELECT](#select)
        -   [select](#select)
        -   [fields](#fields)
        -   [count 等函数](#count-等函数)
        -   [groupBy](#groupby)
        -   [asMap](#asmap)
        -   [multiTables](#multitables)
        -   [tableFields](#tablefields)
        -   [tableAsMap](#tableasmap)
        -   [innerJoin](#innerjoin)
        -   [leftJoin](#leftjoin)
        -   [rightJoin](#rightjoin)
    -   [DELETE](#delete)
        -   [delete](#delete)
    -   [WHERE](#where)
        -   [where](#where)
        -   [whereEqual](#whereequal)
        -   [whereNotEqual](#wherenotequal)
        -   [whereIn](#wherein)
        -   [whereNotIn](#wherenotin)
        -   [whereMore](#wheremore)
        -   [whereLess](#whereless)
        -   [whereMoreEqual](#wheremoreequal)
        -   [whereLessEqual](#wherelessequal)
        -   [whereLike](#wherelike)
        -   [whereNotLike](#wherenotlike)
        -   [whereBetween](#wherebetween)
        -   [whereNotBetween](#wherenotbetween)
        -   [whereOrEqual](#whereorequal)
        -   [whereOrNotEqual](#whereornotequal)
        -   [whereOrIn](#whereorin)
        -   [whereOrNotIn](#whereornotin)
        -   [whereOrMore](#whereormore)
        -   [whereOrLess](#whereorless)
        -   [whereOrMoreEqual](#whereormoreequal)
        -   [whereOrLessEqual](#whereorlessequal)
        -   [whereOrLike](#whereorlike)
        -   [whereOrNotLike](#whereornotlike)
        -   [whereOrBetween](#whereorbetween)
        -   [whereOrNotBetween](#whereornotbetween)
        -   [whereBracket](#wherebracket)
        -   [whereOrBracket](#whereorbracket)
    -   [HAVING](#having)
        -   [having](#having)
        -   [havingEqual](#havingequal)
        -   [havingNotEqual](#havingnotequal)
        -   [havingIn](#havingin)
        -   [havingNotIn](#havingnotin)
        -   [havingMore](#havingmore)
        -   [havingLess](#havingless)
        -   [havingMoreEqual](#havingmoreequal)
        -   [havingLessEqual](#havinglessequal)
        -   [havingLike](#havinglike)
        -   [havingNotLike](#havingnotlike)
        -   [havingBetween](#havingbetween)
        -   [havingNotBetween](#havingnotbetween)
        -   [havingOrEqual](#havingorequal)
        -   [havingOrNotEqual](#havingornotequal)
        -   [havingOrIn](#havingorin)
        -   [havingOrNotIn](#havingornotin)
        -   [havingOrMore](#havingormore)
        -   [havingOrMoreEqual](#havingormoreequal)
        -   [havingOrLessEqual](#havingorlessequal)
        -   [havingOrLike](#havingorlike)
        -   [havingOrNotLike](#havingornotlike)
        -   [havingOrBetween](#havingorbetween)
        -   [havingOrNotBetween](#havingornotbetween)
        -   [havingBracket](#havingbracket)
        -   [havingOrBracket](#havingorbracket)
    -   [TERM](#term)
        -   [equal](#equal)
        -   [notEqual](#notequal)
        -   [in](#in)
        -   [notIn](#notin)
        -   [more](#more)
        -   [less](#less)
        -   [moreEqual](#moreequal)
        -   [lessEqual](#lessequal)
        -   [like](#like)
        -   [notLike](#notlike)
        -   [between](#between)
        -   [notBetween](#notbetween)
        -   [orEqual](#orequal)
        -   [orNotEqual](#ornotequal)
        -   [orIn](#orin)
        -   [orNotIn](#ornotin)
        -   [orMore](#ormore)
        -   [orLess](#orless)
        -   [orMoreEqual](#ormoreequal)
        -   [orLessEqual](#orlessequal)
        -   [orLike](#orlike)
        -   [orNotLike](#ornotlike)
        -   [orBetween](#orbetween)
        -   [orNotBetween](#ornotbetween)
        -   [bracket](#bracket)
        -   [orBracket](#orbracket)
    -   [ORDER](#order)
        -   [descBy](#descBy)
        -   [ascBy](#ascBy)
        -   [orderField](#orderfield)
        -   [order](#order)
    -   [LIMIT/OFFSET](#limitoffset)
        -   [offset](#offset)
        -   [step](#step)
        -   [paging](#paging)
        -   [findOne](#findOne)
    -   [CREATE](#create)
        -   [create](#create)
        -   [info](#info)
        -   [dataBase](#database)
    -   [ALTER](#alter)
        -   [alter](#alter)
        -   [add](#add)
        -   [drop](#drop)
        -   [modify](#modify)
        -   [change](#change)
-   [Connect To Db](#connect-to-db)
    -   [Connect Config](#connect-config)
    -   [Connect Api](#connect-api)
        -   [exec](#exec)

---

# Build SQL Api

**语句类型**

> 语句的基本类型有 `CREATE`，`INSERT`，`REPLACE`，`UPDATE`，`SELECT`，`DELETE`，其中 `INSERT` 和 `REPLACE` 的拼装逻辑是完全一样的，就合在一起讲。

> 不同的基本类型可以调用的 `api` 不完全一样，有些是公用的，有些是仅限某些基本类型才能调用。

**sql 语境**

> 如果我们仅仅需要 `sql` 语句并不需要连接数据库，就可以在新建对象时不传入参数，这时 `sql` 语句默认语境是 `mysql`，当然也可以传入字符串 `mysql` 或者 `mssql` 来指定语境。

```js
// 语境为 mysql
var sqlQuery = new SqlQuery("mysql");

// 语境为 Microsoft SQL Server
var sqlQuery = new SqlQuery("mssql");

// 不同语境生成的语句不完全一样，会根据相应的数据库类型进行适配
```

> 可以设置一个默认的表名，这样每条 sql 语句就不用都特意指定一次。

```js
sqlQuery.table("test_table");
```

> 通过调用 build 可以获取拼装所得的语句, 只有执行了 build 才会开始拼装语句

```js
sqlQuery
    .insert()
    .table("table1")
    .data({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

> 上面执行结果是以下的 sql 语句：

```sql
REPLACE INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )
```

---

## INSERT/REPLACE

> 插入数据类型语句

---

### `insert/replace`

> 指定为 INSERT/REPLACE 类型语句

_参数_

> 无

_例子_

```js
sqlQuery.insert();
```

```js
sqlQuery.replace();
```

---

### `data`

> 设置 `sql` 语句的插入值信息

_参数_

> -   object (Object): 要插入的数据，key 为字段，value 为值

_例子_

```js
sqlQuery
    .replace()
    .table("table1")
    .data({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
REPLACE INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )
```

---

### `multiData`

> 设置 sql 语句多行插入值信息，一次插入一行或多行数据

_参数_

> -   array (Array): 数组每个 item 是要插入的数据，key 为字段，value 为值

_例子_

```js
sqlQuery
    .insert()
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
    ])
    .build();
```

```sql
INSERT INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' ), ( 'value4', 'value5' )
```

---

### `values`

> 设置 sql 语句的插入的值信息

_参数_

> -   valuesInfo (String | Function): VALUES 后面的值信息，如果是字符串则是 `VALUES ${valuesInfo}`, 函数则是 `VALUES ${valuesInfo()}`

_例子_

```js
sqlQuery
    .insert()
    .table("table1")
    .fields(["field1", "field2"])
    .values(() =>
        sqlQuery
            .select()
            .table("table1")
            .fields(["field1", "field2"])
    )
    .build();
```

```sql
INSERT INTO `table1` ( `field1`, `field2` )  VALUES SELECT `field1`, `field2` FROM `table1`
```

---

### `fields`

> 设置 sql 语句的插入值的字段

_参数_

> -   fields (...String | Array): 可以是多个字符串，或者字符串数组

_例子_

```js
sqlQuery
    .insert()
    .table("table1")
    .fields("field1", "field2")
    .data({
        field1: "value1",
        field2: "value2",
        field3: "value3"
    })
    .build();
```

```sql
INSERT INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )
```

---

## UPDATE

> 更新数据类型语句

---

### `update`

> 指定 sql 语句为 UPDATE 类型

_参数_

> 无

_例子_

```js
sqlQuery.update();
```

---

### `set`

> 设置 sql 语句的更新信息，更新方式为覆盖

_参数_

> -   object (Object): 要更新的数据，key 为字段，value 为值

_例子_

```js
sqlQuery
    .update()
    .table("table1")
    .set({
        field1: "value1",
        field2: "value2"
    })
    .whereEqual({
        field3: "value3"
    })
    .build();
```

```sql
UPDATE `table1` SET `field1` = 'value1', `field2` = 'value2' WHERE `field3` = 'value3'
```

---

### `add`

> 设置 sql 语句的更新信息，更新方式为增加

_参数_

> -   object (Object): 要更新的数据，key 为字段，value 为增量

_例子_

```js
sqlQuery
    .update()
    .table("table1")
    .add({
        field1: 1
    })
    .whereEqual({
        field2: "value2"
    })
    .build();
```

```sql
UPDATE `table1` SET `field1` = `field1` + 1 WHERE `field2` = 'value2'
```

---

### `minus`

> 设置 sql 语句的更新信息，更新方式为减少

_参数_

> -   object (Object): 要更新的数据，key 为字段，value 为减量

_例子_

```js
sqlQuery
    .update()
    .table("table1")
    .minus({
        field1: 1
    })
    .whereEqual({
        field2: "value2"
    })
    .build();
```

```sql
UPDATE `table1` SET `field1` = `field1` - 1 WHERE `field2` = 'value2'
```

## SELECT

> 查询数据类型语句

---

### `select`

> 指定 sql 语句为 SELECT 类型

_参数_

> 无

_例子_

```js
sqlQuery.select();
```

---

### `fields`

> 设置 sql 语句的要获取的字段

_参数_

> -   fields (...(String | Object)): 需要的字段名或者带函数的字段

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .fields("field1", "field2") //参数也可以是字符串数组，即 ["field1", "field2"]
    .build();
```

```sql
SELECT `field1`, `field2` FROM `table1`
```

> 也可以是对象，函数信息

```js
sqlQuery
    .select()
    .table("table1")
    .fields("field1")
    .fields(
        { func: "count", field: "field2" },
        { func: "count", field: "field3" }
    )
    .build();
```

```sql
SELECT `field1`, COUNT(`field2`), COUNT(`field3`) FROM `table1`
```

---

### `count` 等函数

> 设置 sql 语句的函数，有 count，sum，max，min，avg，abs，ceil，floor，round，log，log2，exp，power，acos，asin，atan，cos，sin，tan，conv，random，rand，radians，degrees，distinct 等函数

_参数_

> -   field (string): 字段名

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .fields("field1")
    .count("field2")
    .build();
```

```sql
SELECT `field1`, COUNT(`field2`) FROM `table1`
```

---

### `groupBy`

> 设置 sql 语句根据某个字段聚合

_参数_

> -   field (String): 字段名

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .fields("field1")
    .count("field2")
    .groupBy("field2")
    .build();
```

```sql
SELECT `field1`, COUNT(`field2`) FROM `table1` GROUP BY `field2`
```

### `asMap`

> 字段的映射名

_参数_

> -   map (Object): key 为字段名，value 为映射名

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .fields("field1")
    .asMap({
        field1: "field1_as"
    })
    .build();
```

```sql
SELECT `field1` AS `field1_as` FROM `table1`
```

### `multiTables`

> 设置多个表名

_参数_

> -   tables (...String): 表名

_例子_

```js
sqlQuery
    .select()
    .multiTables("table1", "table2")
    .build();
```

```sql
SELECT * FROM `table1`, `table2`
```

### `tableFields`

> 设置表名与字段名的对应关系

_参数_

> -   feildsMap (Object): 表名与字段名的对应关系

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .tableFields({
        table1: ["field1", "field2"]
    })
    .build();
```

```sql
SELECT `table1`.`field1`, `table1`.`field2` FROM `table1`
```

### `tableAsMap`

> 设置表的字段名相关的映射名

_参数_

> -   asMap (Object): 表的字段名相关的映射名

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .tableFields({
        table1: ["field1", "field2"]
    })
    .tableAsMap({
        table1: {
            field1: "field1_as",
            field2: "field2_as"
        }
    })
    .build();
```

```sql
SELECT `table1`.`field1` AS `field1_as`, `table1`.`field2` AS `field2_as` FROM `table1`
```

### `innerJoin`

> 设置联表查询信息

_参数_

> -   joinInfo (Object): 联表查询信息

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .innerJoin({
        tableName: "table2",
        termInfos: [
            {
                symbol: "=",
                tableFields: {
                    table1: "field1",
                    table2: "field2"
                }
            }
        ]
    })
    .build();
```

```sql
SELECT * FROM `table1` INNER JOIN `table2` ON (`table1`.`field1` = `table2`.`field2`)
```

### `leftJoin`

> 设置联表查询信息，联查类型为 left join

_参数和逻辑与 innerJoin api 一致_

---

### `rightJoin`

> 设置联表查询信息，联查类型为 right join

_参数和逻辑与 rightJoin api 一致_

---

## DELETE

> 删除数据类型语句

---

### `delete`

> 指定 sql 语句为 DELETE 类型

_参数_

> 无

_例子_

```js
sqlQuery.delete();
```

> DELETE 类型并没有特有的 api

```js
sqlQuery
    .delete()
    .table("table1")
    .whereEqual({
        field1: "value1"
    })
    .build();
```

```sql
DELETE FROM `table1` WHERE `field1` = 'value1'
```

---

## WHERE

> `UPDATE`、`SELECT`、`DELETE` 的 `WHERE` 条件逻辑拼装 `api` 是一样的。

> 条件之间的逻辑根据后面的 `api` 决定，`api` 名中有 `Or` 这个词就代表，该条件与前一个条件为逻辑或，否则为逻辑与。

> `whereBracket` 和 `whereOrBracket` 是特殊的 `api`，表示将 `api` 前后的条件分别用括号括起来，`Or` 代表括号之间的逻辑是或关系。

---

### `where`

> WHERE 后面的信息

_参数_

> -   whereInfo (String | Function): WHERE 后面的值信息，如果是字符串则是 `WHERE ${whereInfo}`, 函数则是 `WHERE ${whereInfo()}`

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where("`field1` = 'value1'")
    .build();
```

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        builder.term.equal({
            field1: "value1"
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` = 'value1'
```

---

### `whereEqual`

> 条件 =

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereEqual({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` = 'value1'
```

---

### `whereNotEqual`

> 条件 <>

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereNotEqual({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` <> 'value1'
```

---

### `whereIn`

> 条件 IN

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，为所有有效值的集合

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereIn({
        field1: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` IN ( 'value1', 'value2' )
```

---

### `whereNotIn`

> 条件 NOT IN

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，为所有有效值的集合

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereNotIn({
        field1: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT IN ( 'value1', 'value2' )
```

---

### `whereMore`

> 条件 >

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereMore({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` > 'value1'
```

---

### `whereLess`

> 条件 <

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereLess({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` < 'value1'
```

---

### `whereMoreEqual`

> 条件 >=

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereMoreEqual({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` >= 'value1'
```

---

### `whereLessEqual`

> 条件 <=

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereLessEqual({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` <= 'value1'
```

---

### `whereLike`

> 条件 LIKE

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereLike({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` LIKE '%value1%'
```

---

### `whereNotLike`

> 条件 NOT LIKE

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereNotLike({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT LIKE '%value1%'
```

---

### `whereBetween`

> 条件 BETWEEN

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，第一个和第二个值代表范围的上限和下限

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereBetween({
        field1: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` BETWEEN 'value1' AND 'value2'
```

---

### `whereNotBetween`

> 条件 NOT BETWEEN

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，第一个和第二个值代表范围的上限和下限

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereNotBetween({
        field1: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT BETWEEN 'value1' AND 'value2'
```

---

### `whereOrEqual`

> 条件 =，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereOrEqual({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` = 'value1' OR `field2` = 'value2'
```

---

### `whereOrNotEqual`

> 条件 <>，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereOrNotEqual({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` <> 'value1' OR `field2` <> 'value2'
```

---

### `whereOrIn`

> 条件 IN，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，为所有有效值的集合

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereOrIn({
        field1: ["value1", "value2"],
        field2: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` IN ( 'value1', 'value2' ) OR `field2` IN ( 'value1', 'value2' )
```

---

### `whereOrNotIn`

> 条件 NOT IN，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereOrNotIn({
        field1: ["value1", "value2"],
        field2: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT IN ( 'value1', 'value2' ) OR `field2` NOT IN ( 'value1', 'value2' )
```

---

### `whereOrMore`

> 条件 >，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereOrMore({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` > 'value1' OR `field2` > 'value2'
```

---

### `whereOrLess`

> 条件 <，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereOrLess({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` < 'value1' OR `field2` < 'value2'
```

---

### `whereOrMoreEqual`

> 条件 >=，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereOrMoreEqual({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` >= 'value1' OR `field2` >= 'value2'
```

---

### `whereOrLessEqual`

> 条件 <=，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereOrLessEqual({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` <= 'value1' OR `field2` <= 'value2'
```

---

### `whereOrLike`

> 条件 LIKE，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereOrLike({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` LIKE '%value1%' OR `field2` LIKE '%value2%'
```

---

### `whereOrNotLike`

> 条件 NOT LIKE，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereOrNotLike({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT LIKE '%value1%' OR `field2` NOT LIKE '%value2%'
```

---

### `whereOrBetween`

> 条件 BETWEEN，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，第一个和第二个值代表范围的上限和下限

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereOrBetween({
        field1: ["value1", "value2"],
        field2: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` BETWEEN 'value1' AND 'value2' OR `field2` BETWEEN 'value1' AND 'value2'
```

---

### `whereOrNotBetween`

> 条件 NOT BETWEEN，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，第一个和第二个值代表范围的上限和下限

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereOrNotBetween({
        field1: ["value1", "value2"],
        field2: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT BETWEEN 'value1' AND 'value2' OR `field2` NOT BETWEEN 'value1' AND 'value2'
```

---

### `whereBracket`

> 前后的条件分别用括号括起来

_参数_

> 无

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereOrEqual({
        field1: "value1"
    })
    .whereOrEqual({
        field2: "value2"
    })
    .whereBracket()
    .whereOrEqual({
        field3: "value3"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE ( `field1` = 'value1' OR `field2` = 'value2' ) AND ( `field3` = 'value3' )
```

---

### `whereOrBracket`

> 前后的条件分别用括号括起来，和前一括号逻辑为或

_参数_

> 无

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .whereEqual({
        field1: "value1",
        field2: "value2"
    })
    .whereOrBracket()
    .whereEqual({
        field3: "value3"
    })
    .build();
```

```sql
 SELECT * FROM `table1` WHERE ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` = 'value3' )
```

---

## HAVING

> `HAVING` 的 `api` 的参数和逻辑跟 `WHERE` 的 `api` 是一样的，但仅限 `SELECT` 能调用。

> 但为和 `WHERE` 做区分，`HAVING` 的 `api` 的前缀都是 `having`，而 `WHERE` 的 `api` 的前缀都是 `where`。

---

### `having`

> HAVING 后面的信息

_参数_

> -   havingInfo (String | Function): HAVING 后面的值信息，如果是字符串则是 `HAVING ${havingInfo}`, 函数则是 `HAVING ${havingInfo()}`

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .having("`field1` = 'value1'")
    .build();
```

```js
sqlQuery
    .select()
    .table("table1")
    .having(() =>
        builder.term.equal({
            field1: "value1"
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` HAVING `field1` = 'value1'
```

---

### `havingEqual`

> 条件 =

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .havingEqual({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
 SELECT * FROM `table1` HAVING `field1` = 'value1' AND `field2` = 'value2'
```

---

### `havingNotEqual`

> 条件 <>

_参数和逻辑与 whereNotEqual api 一致_

---

### `havingIn`

> 条件 IN

_参数和逻辑与 whereIn api 一致_

---

### `havingNotIn`

> 条件 NOT IN

_参数和逻辑与 whereNotIn api 一致_

---

### `havingMore`

> 条件 >

_参数和逻辑与 whereMore api 一致_

---

### `havingLess`

> 条件 <

_参数和逻辑与 whereLess api 一致_

---

### `havingMoreEqual`

> 条件 >=

_参数和逻辑与 whereMoreEqual api 一致_

---

### `havingLessEqual`

> 条件 <=

_参数和逻辑与 whereLessEqual api 一致_

---

### `havingLike`

> 条件 LIKE

_参数和逻辑与 whereLike api 一致_

---

### `havingNotLike`

> 条件 NOT LIKE

_参数和逻辑与 whereNotLike api 一致_

---

### `havingBetween`

> 条件 BETWEEN

_参数和逻辑与 whereBetween api 一致_

---

### `havingNotBetween`

> 条件 NOT BETWEEN

_参数和逻辑与 whereNotBetween api 一致_

---

### `havingOrEqual`

> 条件 =，逻辑为或

_参数和逻辑与 whereOrEqual api 一致_

---

### `havingOrNotEqual`

> 条件 <>，逻辑为或

_参数和逻辑与 whereOrNotEqual api 一致_

---

### `havingOrIn`

> 条件 IN，逻辑为或

_参数和逻辑与 whereOrIn api 一致_

---

### `havingOrNotIn`

> 条件 NOT IN，逻辑为或

_参数和逻辑与 whereOrNotIn api 一致_

---

### `havingOrMore`

> 条件 >，逻辑为或

_参数和逻辑与 whereOrMore api 一致_

---

### `havingOrLess`

> 条件 <，逻辑为或

_参数和逻辑与 whereOrLess api 一致_

---

### `havingOrMoreEqual`

> 条件 >=，逻辑为或

_参数和逻辑与 whereOrMoreEqual api 一致_

---

### `havingOrLessEqual`

> 条件 <=，逻辑为或

_参数和逻辑与 whereOrLessEqual api 一致_

---

### `havingOrLike`

> 条件 LIKE，逻辑为或

_参数和逻辑与 whereOrLike api 一致_

---

### `havingOrNotLike`

> 条件 NOT LIKE，逻辑为或

_参数和逻辑与 whereOrNotLike api 一致_

---

### `havingOrBetween`

> 条件 BETWEEN，逻辑为或

_参数和逻辑与 whereOrBetween api 一致_

---

### `havingOrNotBetween`

> 条件 NOT BETWEEN，逻辑为或

_参数和逻辑与 whereOrNotBetween api 一致_

---

### `havingBracket`

> 前后的条件分别用括号括起来

_参数和逻辑与 whereBracket api 一致_

---

### `havingOrBracket`

> 前后的条件分别用括号括起来，逻辑为或

_参数和逻辑与 whereOrBracket api 一致_

---

## TERM

> `Term` 的 `api` 的参数和逻辑跟 `WHERE` 和 `HAVING` 的 `api` 是一样的。

> `Term` 没有前缀，如果条件语句过于复杂，可以用 `term` 使代码更简洁。

---

### `equal`

> 条件 =

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term.equal({
            field1: "value1"
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` = 'value1'
```

---

### `notEqual`

> 条件 <>

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term.notEqual({
            field1: "value1"
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` <> 'value1'
```

---

### `in`

> 条件 IN

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term.in({
            field1: ["value1", "value2"]
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` IN ( 'value1', 'value2' )
```

---

### `notIn`

> 条件 NOT IN

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term.notIn({
            field1: ["value1", "value2"]
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT IN ( 'value1', 'value2' )
```

---

### `more`

> 条件 >

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term.more({
            field1: "value1"
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` > 'value1'
```

---

### `less`

> 条件 <

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term.less({
            field1: "value1"
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` < 'value1'
```

---

### `moreEqual`

> 条件 >=

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term.moreEqual({
            field1: "value1"
        })
    )
    .build();
```

```sql
 SELECT * FROM `table1` WHERE `field1` >= 'value1'
```

---

### `lessEqual`

> 条件 <=

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term.lessEqual({
            field1: "value1"
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` <= 'value1'
```

---

### `like`

> 条件 LIKE

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term.like({
            field1: "value1"
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` LIKE '%value1%'
```

---

### `notLike`

> 条件 NOT LIKE

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term.notLike({
            field1: "value1"
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT LIKE '%value1%'
```

---

### `between`

> 条件 BETWEEN

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term.between({
            field1: ["value1", "value2"]
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` BETWEEN 'value1' AND 'value2'
```

---

### `notBetween`

> 条件 NOT BETWEEN

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term.notBetween({
            field1: ["value1", "value2"]
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT BETWEEN 'value1' AND 'value2'
```

---

### `orEqual`

> 条件 =，逻辑为或

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term.orEqual({
            field1: "value1",
            field2: "value2"
        })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` = 'value1' OR `field2` = 'value2'
```

---

### `orNotEqual`

> 条件 <>，逻辑为或

_参数和逻辑与 whereOrNotEqual api 一致_

---

### `orIn`

> 条件 IN，逻辑为或

_参数和逻辑与 whereOrIn api 一致_

---

### `orNotIn`

> 条件 NOT IN，逻辑为或

_参数和逻辑与 whereOrNotIn api 一致_

---

### `orMore`

> 条件 >，逻辑为或

_参数和逻辑与 whereOrMore api 一致_

---

### `orLess`

> 条件 <，逻辑为或

_参数和逻辑与 whereOrLess api 一致_

---

### `orMoreEqual`

> 条件 >=，逻辑为或

_参数和逻辑与 whereOrMoreEqual api 一致_

---

### `orLessEqual`

> 条件 <=，逻辑为或

_参数和逻辑与 whereOrLessEqual api 一致_

---

### `orLike`

> 条件 LIKE，逻辑为或

_参数和逻辑与 whereOrLike api 一致_

---

### `orNotLike`

> 条件 NOT LIKE，逻辑为或

_参数和逻辑与 whereOrNotLike api 一致_

---

### `orBetween`

> 条件 BETWEEN，逻辑为或

_参数和逻辑与 whereOrBetween api 一致_

---

### `orNotBetween`

> 条件 NOT BETWEEN，逻辑为或

_参数和逻辑与 whereOrNotBetween api 一致_

---

### `bracket`

> 前后的条件分别用括号括起来

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term
            .orEqual({
                field1: "value1"
            })
            .orEqual({
                field2: "value2"
            })
            .bracket()
            .orEqual({
                field3: "value3"
            })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE ( `field1` = 'value1' OR `field2` = 'value2' ) AND ( `field3` = 'value3' )
```

---

### `orBracket`

> 前后的条件分别用括号括起来，逻辑为或

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where(() =>
        sqlQuery.term
            .equal({
                field1: "value1",
                field2: "value2"
            })
            .orBracket()
            .equal({
                field3: "value3"
            })
    )
    .build();
```

```sql
SELECT * FROM `table1` WHERE ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` = 'value3' )
```

---

## ORDER

> 设置 `sql` 的查找数据的排序逻辑

---

### `descBy`

> 根据某些字段降序排序

_参数_

> -   fields (...String): 字段名

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .descBy("field1")
    .build();
```

```sql
SELECT * FROM `table1` ORDER BY `field1` DESC
```

```js
sqlQuery
    .select()
    .table("table1")
    .descBy("field1", "field2")
    .build();
```

```sql
SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` DESC
```

---

### `ascBy`

> 根据某些字段升序排序

_参数_

> -   fields (...String): 字段名

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .ascBy("field1", "field2")
    .build();
```

```sql
SELECT * FROM `table1` ORDER BY `field1` ASC, `field2` ASC
```

```js
sqlQuery
    .select()
    .table("table1")
    .descBy("field1")
    .ascBy("field2")
    .build();
```

```sql
SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` ASC
```

---

### `orderField`

> 根据某个字段自定义序列排序

_参数_

> -   object (Object): 要更新的数据，key 为字段，value 为数组，数组值的顺序就是查询数据的排序根据。

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .orderField({
        field1: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` ORDER BY FIELD(`field1`, 'value1', 'value2')
```

---

### `order`

> 设置 ORDER BY 后面的信息

_参数_

> -   orderInfo (String | Function): VALUES 后面的值信息，如果是字符串则是 `ORDER BY ${orderInfo}`, 函数则是 `ORDER BY ${orderInfo()}`

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .order(() =>
        sqlQuery.order
            .descBy("field1")
            .ascBy("field2")
            .orderField({
                field3: ["value1", "value2"]
            })
    )
    .build();
```

```sql
SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` ASC, FIELD(`field3`, 'value1', 'value2')
```

---

## LIMIT/OFFSET

> 设置查找数据的步长和偏移

---

### `offset`

> 设置 sql 语句的偏移

_参数_

> -   offset (Number): 偏移量

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .offset(1)
    .build();
```

```sql
SELECT * FROM `table1` OFFSET 1
```

---

### `step`

> 设置 sql 语句的步长

_参数_

> -   step (Number): 步长量

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .step(10)
    .build();
```

```sql
SELECT * FROM `table1` LIMIT 10
```

---

### `paging`

> 设置 sql 语句的步长和偏移。

_参数_

> -   page (Number): 页码，从 1 开始算；
> -   pageSize (Number): 一页包含的数量；

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .paging(2, 10)
    .build();
```

```sql
SELECT * FROM `table1` LIMIT 10 OFFSET 10
```

---

### `findOne`

> 限制只返回一个，仅限 SELECT 类型使用

_参数_

> 无

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .findOne()
    .build();
```

```sql
SELECT * FROM `table1` LIMIT 1
```

---

## CREATE

> 新建表语句，把表的信息用一定的 json 数据格式保存，然后可以通过 `api` 转换成 `sql` 语句。

> 仅支持`MySQL`类型数据库

---

### `create`

> 指定 sql 语句为 CREATE 类型

_参数_

> 无

_例子_

```js
sqlQuery.create();
```

---

### `info`

> 新建表的信息

_参数_

> -   object (Object): 表信息

_例子_

**将下面的 sql 语句用 json 数据格式保存:**

```sql
  CREATE TABLE student (
         `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '学生id',
        `name` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '学生名字',
        `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
        CONSTRAINT `id` PRIMARY KEY (`id`),
       CONSTRAINT `pk_id` UNIQUE KEY (`id`,`name`)
  ) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8 COMMENT='学生信息表';
```

```js
const tableInfo = {
    tableName: "student",
    primaryKey: "id",
    uniqueKey: {
        keyName: "pk_id",
        combineFields: ["id", "name"]
    },
    engine: "InnoDB",
    autoIncrement: 10000,
    defaultCharset: "utf8",
    comment: "学生信息表",
    fields: [
        {
            field: "id",
            type: "bigint",
            unsigned: true,
            notNull: true,
            autoIncrement: true,
            comment: "学生id"
        },
        {
            field: "name",
            type: "varchar(32)",
            default: "",
            notNull: true,
            comment: "学生名字"
        },
        {
            field: "update_time",
            type: "timestamp",
            notNull: true,
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            comment: "最后更新时间"
        }
    ]
};
```

**将 json 数据格式转换成 sql 语句**

```js
sqlQuery
    .create()
    .info(tableInfo)
    .build();
```

```sql
CREATE TABLE IF NOT EXISTS student ( `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '学生id',`name` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '学生名字',`update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',CONSTRAINT `id` PRIMARY KEY (`id`),CONSTRAINT `pk_id` UNIQUE KEY (`id`,`name`) ) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8 COMMENT='学生信息表';
```

**字段结构说明**

-   tableName，表名
-   primaryKey，主键
-   uniqueKey，索引
-   engine，即 ENGINE
-   autoIncrement，即 AUTO_INCREMENT，设置自增位置或者是否是自增字段
-   defaultCharset，即 DEFAULT CHARSET
-   comment，备注
-   fields，字段信息
-   field，字段名
-   type，数据类型
-   unsigned，无符号数值
-   notNull，不允许为空
-   default，设置默认值
-   onUpdate，数据更新时字段的更新值

---

### `dataBase`

> 新建数据库

_参数_

> -   dataBaseName (String): 数据库名

_例子_

```js
sqlQuery
    .create()
    .dataBase("database1")
    .build();
```

```sql
CREATE DATABASE database1
```

## ALTER

> `ALTER` 类型语句，用于改变表信息。

> 仅支持`MySQL`类型数据库。

---

### `alter`

> 指定 sql 语句为 ALTER 类型

_参数_

> 无

_例子_

```js
sqlQuery.alter();
```

---

### `add`

> 添加字段

_参数_

> -   object (Object): 字段信息

_例子_

```js
sqlQuery
    .alter()
    .table("table1")
    .add({
        field: "field1",
        type: "bigint",
        unsigned: true,
        notNull: true,
        autoIncrement: true,
        comment: "学生id"
    })
    .build();
```

```sql
ALTER TABLE `table1` ADD COLUMN `field1` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '学生id'
```

---

### `drop`

> 删除字段

_参数_

> -   field (String): 字段名

_例子_

```js
sqlQuery
    .alter()
    .table("table1")
    .drop("field1")
    .build();
```

```sql
ALTER TABLE `table1` DROP COLUMN `field1`
```

---

### `modify`

> 修改字段

_参数_

> -   field (String): 字段名；
> -   object (Object): 字段信息；

_例子_

```js
sqlQuery
    .alter()
    .table("table1")
    .modify("field1", {
        type: "varchar(32)"
    })
    .build();
```

```sql
ALTER TABLE `table1` MODIFY COLUMN `field1` VARCHAR(32)
```

---

### `change`

> 修改字段

_参数_

> -   field (String): 字段名；
> -   object (Object): 字段信息；

_例子_

```js
sqlQuery
    .alter()
    .table("table1")
    .change("field1", {
        field: "id",
        type: "bigint"
    })
    .build();
```

```sql
ALTER TABLE `table1` CHANGE COLUMN `field1` `id` BIGINT
```

**字段结构说明**

> 数据字段结构和 CREATE 是基本一样的，但没有 table 相关的字段

-   autoIncrement，设置是否是自增字段
-   comment，备注
-   field，字段名
-   type，数据类型
-   unsigned，无符号数值
-   notNull，不允许为空
-   default，设置默认值
-   onUpdate，数据更新时字段的更新值

---

# Connect To Db

> 如果要连接数据库需要在新建对象时传入连接的配置，要执行语句需要调用 `exec` 属性方法。

```js
var SqlQuery = require("js-sql-query");
var sqlQuery = new SqlQuery({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "test_db",
    dialect: "mysql"
});
var result = await sqlQuery
    .select()
    .table("table1")
    .fields("field1", "field2")
    .exec();
```

---

## Connect Config

| 字段            |       类型       | 是否必填 |                           说明 |
| --------------- | :--------------: | :------: | -----------------------------: |
| host            |      string      |    是    |                 数据库主机地址 |
| port            | string or number |    否    |                 数据库主机端口 |
| user            |      string      |    是    |                   数据库用户名 |
| password        |      string      |    否    |                 数据库用户密码 |
| database        |      string      |    是    |                     表所在的库 |
| dialect         |      string      |    是    |     数据库的类型，默认为 mysql |
| connectionLimit |      number      |    是    | 连接池的最大连接数，默认为 1。 |

> 因为本框架是使用连接池的方式连接数据库，所以 connectionLimit 设置的值越大，那连接池里面缓存的连接数就越多。
> 同时如果连接池的连接都正在忙，那新的连接请求就会进入队列等待，所以不用担心连接数会超过数据库的最大限制。

---

## Connect Api

### `exec`

> api 只有一个就是 exec，exec()执行完后返回的是一个 Promise 对象。

> exec 也可以直接执行 sql 语句。只需要传入 sql 语句作为参数即可。

_参数_

> string? (String): 如果有，即执行输入 sql 语句，如果无，则执行 sqlQuery 对象 build 生成的 sql 语句。

_例子_

```js
var result = await sqlQuery.exec("SELECT `field1`, `field2` FROM `table1`");
```

---

# Tests

> Tests are using jest, to run the tests use:

```sh
$ npm run test
```

---

# License (MIT)

```
Copyright (c) 2019 gintamamadao

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
