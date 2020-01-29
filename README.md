# js-sql-query

> Node.js ORM for MySQL and Microsoft SQL Server

## 项目简介

> `Node.js` `orm` 框架，可以通过链式调用 `api` 快捷地生成 `sql` 语句，并且连接数据库执行。目前支持 `MySQL` 和 `Microsoft SQL Server` 这两种数据库。用 `Typescript` 编写，有完整类型声明。

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
npm i mssql --save
```

## 使用例子

```js
var SqlQuery = require("js-sql-query");

// 配置数据库相关信息，其中dialect 是配置数据类型，如果不配置，默认为 mysql。如果使用的是 Microsoft SQL Server，则配置值为 mssql
var sqlQuery = SqlQuery({
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
// exec() 返回的是一个 Promise 对象
```

---

# 目录

<!-- TOC -->

-   [Build SQL Api](#build-sql-api)
    -   [COMMEN](#commen)
        -   [table](#table)
        -   [build](#build)
        -   [storeSql](#storeSql)
        -   [getStore](#getStore)
        -   [cleanStoreSql](#cleanStoreSql)
    -   [INSERT/REPLACE](#insertreplace)
        -   [insert/replace](#insertreplace-1)
        -   [data](#data)
        -   [multiData](#multidata)
        -   [values](#values)
        -   [fields](#fields)
    -   [UPDATE](#update)
        -   [update](#update-1)
        -   [set](#set)
        -   [add](#add)
        -   [minus](#minus)
    -   [SELECT](#select)
        -   [select](#select-1)
        -   [fields](#fields-1)
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
        -   [delete](#delete-1)
    -   [CONDITION](#condition)
        -   [where](#where)
        -   [having](#having)
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
        -   [create](#create-1)
        -   [info](#info)
        -   [dataBase](#database)
    -   [ALTER](#alter)
        -   [alter](#alter-1)
        -   [add](#add)
        -   [drop](#drop)
        -   [modify](#modify)
        -   [change](#change)
-   [Connect To Db](#connect-to-db)
    -   [Connect Config](#connect-config)
    -   [Connect Api](#connect-api)
        -   [exec](#exec)
        -   [execAll](#execAll)
-   [Test Report](#test-report)

---

# Build SQL Api

**语句类型**

> 语句的基本类型有 `CREATE`，`INSERT`，`REPLACE`，`UPDATE`，`SELECT`，`DELETE`，其中 `INSERT` 和 `REPLACE` 的拼装逻辑是完全一样的，就合在一起讲。

> 不同的基本类型可以调用的 `api` 不完全一样，有些是公用的，有些是仅限某些基本类型才能调用。

**sql 语境**

> 如果我们仅仅需要 `sql` 语句并不需要连接数据库，就可以在新建对象时不传入参数，这时 `sql` 语句默认语境是 `mysql`，当然也可以传入字符串 `mysql` 或者 `mssql` 来指定语境。

```js
// 语境为 mysql
var sqlQuery = SqlQuery("mysql");

// 语境为 Microsoft SQL Server
var sqlQuery = SqlQuery("mssql");

// 不同语境生成的语句不完全一样，会根据相应的数据库类型进行适配
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

## COMMEN

> 通用 api, 在任何类型下都能调用的 api

### `table`

> 设置 sql 语句的要操作的 table

_参数_

> -   table (String): 表名

_例子_

> 设置一个当前的表名

```js
sqlQuery.select().table("table1");
```

> 设置一个默认的表名

```js
sqlQuery.table("test_table");
```

### `build`

> 获取调用 api 的结果，返回 sql 字符串

_参数_

> 无

_例子_

```js
sqlQuery
    .insert()
    .table("table1")
    .data({
        field1: "value1",
        field2: "value2"
    })
    .build();
// 输出 REPLACE INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )
```

### `storeSql`

> 执行 build 并把 build 出来的 sql 字符串缓存起来

_参数_

> 无

_例子_

```js
sqlQuery
    .insert()
    .table("table1")
    .data({
        field1: "value1",
        field2: "value2"
    })
    .storeSql();
```

### `getStore`

> 返回缓存起来的 sql 字符串

_参数_

> 无

_例子_

```js
sqlQuery.getStore();
```

### `cleanStoreSql`

> 清空缓存起来的 sql 字符串

_参数_

> 无

_例子_

```js
sqlQuery.cleanStoreSql();
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
    .where()
    .equal({
        field1: "value1"
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
    .where()
    .equal({
        field1: "value1"
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
    .where()
    .equal({
        field1: "value1"
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
    .where()
    .equal({
        field1: "value1"
    })
    .build();
```

```sql
DELETE FROM `table1` WHERE `field1` = 'value1'
```

---

## CONDITION

> 条件相关的 `api`

---

### `where`

> 指定之后调用的条件 api 的结果是属于 `WHERE` 后面的

_参数_

> 无

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .equal({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` = 'value1'
```

> 将条件 api 名第一个字母大写，前面加上 where 的前缀，可以直接指定该条件是属于 `WHERE` 后面的

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

### `having`

> 指定之后调用的条件 api 的结果是属于 `HAVING` 后面的

_参数_

> 无

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .having()
    .equal({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` HAVING `field1` = 'value1'
```

> 将条件 api 名第一个字母大写，前面加上 having 的前缀，可以直接指定该条件是属于 `HAVING` 后面的

```js
sqlQuery
    .select()
    .table("table1")
    .havingEqual({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` HAVING `field1` = 'value1'
```

### `equal`

> 条件 =

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .equal({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` = 'value1'
```

---

### `notEqual`

> 条件 <>

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .notEqual({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` <> 'value1'
```

---

### `in`

> 条件 IN

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，为所有有效值的集合

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .in({
        field1: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` IN ( 'value1', 'value2' )
```

---

### `notIn`

> 条件 NOT IN

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，为所有有效值的集合

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .notIn({
        field1: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT IN ( 'value1', 'value2' )
```

---

### `more`

> 条件 >

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .more({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` > 'value1'
```

---

### `less`

> 条件 <

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .less({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` < 'value1'
```

---

### `moreEqual`

> 条件 >=

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .moreEqual({
        field1: "value1"
    })
    .build();
```

```sql
 SELECT * FROM `table1` WHERE `field1` >= 'value1'
```

---

### `lessEqual`

> 条件 <=

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .lessEqual({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` <= 'value1'
```

---

### `like`

> 条件 LIKE

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .like({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` LIKE '%value1%'
```

---

### `notLike`

> 条件 NOT LIKE

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .notLike({
        field1: "value1"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT LIKE '%value1%'
```

---

### `between`

> 条件 BETWEEN

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，第一个和第二个值代表范围的上限和下限

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .between({
        field1: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` BETWEEN 'value1' AND 'value2'
```

---

### `notBetween`

> 条件 NOT BETWEEN

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，第一个和第二个值代表范围的上限和下限

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .notBetween({
        field1: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT BETWEEN 'value1' AND 'value2'
```

---

### `orEqual`

> 条件 =，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .orEqual({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` = 'value1' OR `field2` = 'value2'
```

---

### `orNotEqual`

> 条件 <>，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .orNotEqual({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` <> 'value1' OR `field2` <> 'value2'
```

---

### `orIn`

> 条件 IN，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，为所有有效值的集合

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .orIn({
        field1: ["value1", "value2"],
        field2: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` IN ( 'value1', 'value2' ) OR `field2` IN ( 'value1', 'value2' )
```

---

### `orNotIn`

> 条件 NOT IN，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，为所有有效值的集合

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .orNotIn({
        field1: ["value1", "value2"],
        field2: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT IN ( 'value1', 'value2' ) OR `field2` NOT IN ( 'value1', 'value2' )
```

---

### `orMore`

> 条件 >，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .orMore({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` > 'value1' OR `field2` > 'value2'
```

---

### `orLess`

> 条件 <，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .orLess({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` < 'value1' OR `field2` < 'value2'
```

---

### `orMoreEqual`

> 条件 >=，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .orMoreEqual({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` >= 'value1' OR `field2` >= 'value2'
```

---

### `orLessEqual`

> 条件 <=，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .orLessEqual({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` <= 'value1' OR `field2` <= 'value2'
```

---

### `orLike`

> 条件 LIKE，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .orLike({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` LIKE '%value1%' OR `field2` LIKE '%value2%'
```

---

### `orNotLike`

> 条件 NOT LIKE，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为逻辑值

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .orNotLike({
        field1: "value1",
        field2: "value2"
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT LIKE '%value1%' OR `field2` NOT LIKE '%value2%'
```

---

### `orBetween`

> 条件 BETWEEN，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，第一个和第二个值代表范围的上限和下限

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .orBetween({
        field1: ["value1", "value2"],
        field2: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` BETWEEN 'value1' AND 'value2' OR `field2` BETWEEN 'value1' AND 'value2'
```

---

### `orNotBetween`

> 条件 NOT BETWEEN，逻辑为或

_参数_

> -   object (Object): 条件信息，key 为字段，value 为数组，第一个和第二个值代表范围的上限和下限

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .orNotBetween({
        field1: ["value1", "value2"],
        field2: ["value1", "value2"]
    })
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` NOT BETWEEN 'value1' AND 'value2' OR `field2` NOT BETWEEN 'value1' AND 'value2'
```

---

### `bracket`

> 前后的条件分别用括号括起来

_参数_

> 无

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
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
    .build();
```

```sql
SELECT * FROM `table1` WHERE ( `field1` = 'value1' OR `field2` = 'value2' ) AND ( `field3` = 'value3' )
```

---

### `orBracket`

> 前后的条件分别用括号括起来，逻辑为或

_参数_

> 无

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .where()
    .equal({
        field1: "value1",
        field2: "value2"
    })
    .orBracket()
    .equal({
        field3: "value3"
    })
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
var sqlQuery = SqlQuery({
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

| 字段            |       类型       | 是否必填 |                              说明 |
| --------------- | :--------------: | :------: | --------------------------------: |
| host            |      string      |    是    |                    数据库主机地址 |
| port            | string or number |    否    |                    数据库主机端口 |
| user            |      string      |    是    |                      数据库用户名 |
| password        |      string      |    否    |                    数据库用户密码 |
| database        |      string      |    是    |                        表所在的库 |
| dialect         |      string      |    是    |        数据库的类型，默认为 mysql |
| connectionLimit |      number      |    否    |    连接池的最大连接数，默认为 1。 |
| connectTimeout  |      number      |    否    | 连接的超时时间，默认为 1000(ms)。 |

> 因为本框架是使用连接池的方式连接数据库，所以 connectionLimit 设置的值越大，那连接池里面缓存的连接数就越多。
> 同时如果连接池的连接都正在忙，那新的连接请求就会进入队列等待，所以不用担心连接数会超过数据库的最大限制。

---

## Connect Api

### `exec`

> 执行 sqlQuery 对象 build 生成的 sql 语句，执行完后返回的是一个 Promise 对象。
> exec 也可以直接执行 sql 语句。只需要传入 sql 语句作为参数即可。

_参数_

> sql? (String): 如果有，即执行输入 sql 语句，如果无，则执行 sqlQuery 对象 build 生成的 sql 语句。

_例子_

```js
var result = await sqlQuery
    .select()
    .table("table1")
    .fields("field1", "field2")
    .exec();
```

或者

```js
var result = await sqlQuery.exec("SELECT `field1`, `field2` FROM `table1`");
```

### `execAll`

> 执行 sqlQuery 缓存的 sql 语句数组，执行完后返回的是一个 Promise 对象。
> execAll 也可以直接执行 sql 语句。只需要传入 sql 语句数组作为参数即可。

_参数_

> sqls? (String[]): 如果有，即执行输入 sql 语句数组，如果无，则执行 sqlQuery 缓存的 sql 语句数组。

_例子_

```js
sqlQuery
    .select()
    .table("table1")
    .fields("field1", "field2")
    .storeSql();

var result = await sqlQuery.execAll();
```

或者

```js
var result = await sqlQuery.execAll([
    "SELECT `field1`, `field2` FROM `table1`"
]);
```

---

# Test Report

> Tests are using jest, to run the tests use:

```sh
$ npm run test
```

report detail

```sh
-----------------|----------|----------|----------|----------|-------------------|
File             |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------|----------|----------|----------|----------|-------------------|
All files        |     76.6 |    59.93 |    65.48 |    76.74 |                   |
 js-sql-query.js |     76.6 |    59.93 |    65.48 |    76.74 |... 3695,3696,3697 |
-----------------|----------|----------|----------|----------|-------------------|

Test Suites: 14 passed, 14 total
Tests:       145 passed, 145 total
Snapshots:   0 total
Time:        3.568s, estimated 4s
Ran all test suites.
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
