# js-sql-query

> Node.js ORM for MySQL and Microsoft SQL Server

## 项目简介

> 一个 orm 框架，可以通过链式调用 api 快捷地生成 sql 语句，并且连接数据库执行。目前支持 MySQL 和 Microsoft SQL Server 这两种数据库。

## 环境安装

-   安装本项目

```sh
npm i js-sql-query --save
```

-   如果使用的是 MySQL，需要安装依赖

```sh
npm i mysql --save
```

-   如果使用的是 Microsoft SQL Server，需要安装依赖

```sh
npm i tedious --save
npm i tedious-connection-pool --save
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

# 目录

<!-- TOC -->

-   [Build SQL Api](#build-sql-api)
    -   [INSERT/REPLACE](#insertreplace)
    -   [UPDATE](#update)
    -   [SELECT](#select)
    -   [DELETE](#delete)
    -   [WHERE](#where)
    -   [HAVING](#having)
    -   [TERM](#term)
    -   [ORDER](#order)
    -   [LIMIT/OFFSET](#limitoffset)
    -   [CREATE](#create)
    -   [ALTER](#alter)
-   [Connect To Db](#connect-to-db)
    -   [Connect Config](#connect-config)
    -   [Connect Api](#connect-api)

# Build SQL Api

**语句类型**

> 语句的基本类型有 CREATE，INSERT，REPLACE，UPDATE，SELECT，DELETE，其中 INSERT 和 REPLACE 的拼装逻辑是完全一样的，就合在一起讲。
> 不同的基本类型可以调用的 api 不完全一样，有些是公用的，有些是仅限某些基本类型才能调用。

**sql 语境**

> 如果我们仅仅需要 sql 语句并不需要连接数据库，就可以在新建对象时不传入参数，这时 sql 语句默认语境是 mysql，当然也可以传入字符串 mysql 或者 mssql 来指定语境。

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

## INSERT/REPLACE

> 插入数据类型语句

### insert/replace

> 指定为 REPLACE 类型语句

```js
sqlQuery.replace();
```

> 指定为 INSERT 类型语句

```js
sqlQuery.insert();
```

### data

> 设置 sql 语句的插入值信息

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

### multiData

> 设置 sql 语句多行插入值信息，一次插入一行或多行数据

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

### values

> 设置 sql 语句的插入值信息为子查询的结果

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

### fields

> 设置 sql 语句的插入值的字段

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

## UPDATE

> 更新数据类型语句

### update

> 指定 sql 语句为 UPDATE 类型

```js
sqlQuery.update();
```

### set

> 设置 sql 语句的更新信息，更新方式为覆盖

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

### add

> 设置 sql 语句的更新信息，更新方式为增加

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
UPDATE `table1` SET `field1` = `field1` + '1' WHERE `field2` = 'value2'
```

### minus

> 设置 sql 语句的更新信息，更新方式为减少

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
UPDATE `table1` SET `field1` = `field1` - '1' WHERE `field2` = 'value2'
```

## SELECT

> 查询数据类型语句

### select

> 指定 sql 语句为 SELECT 类型

```js
sqlQuery.select();
```

### fields

> 设置 sql 语句的要获取的字段

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

> 也可以添加函数

```js
sqlQuery
    .select()
    .table("table1")
    .fields("field1")
    .fields({ func: "count", field: "field2" })
    .build();
```

```sql
SELECT `field1`, COUNT(`field2`) FROM `table1`
```

### count 等函数

> 设置 sql 语句的函数，有 count，sum，max，min，avg，abs，ceil，floor，round，log，log2，exp，power，acos，asin，atan，cos，sin，tan，conv，random，rand，radians，degrees，distinct 等函数

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

### funcFeilds

> 设置 sql 语句的函数

```js
sqlQuery
    .select()
    .table("table1")
    .fields("field1")
    .funcFeilds(sqlQuery.func.count("field2"))
    .build();
```

```sql
SELECT `field1`, COUNT(`field2`) FROM `table1`
```

### groupBy

> 设置 sql 语句根据某个字段聚合

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

## DELETE

> 删除数据类型语句

### delete

> 指定 sql 语句为 DELETE 类型

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

## WHERE

> UPDATE、SELECT、DELETE 的 WHERE 条件逻辑拼装 api 是一样的。
> 条件之间的逻辑根据后面的 api 决定，api 名中有 Or 这个词就代表，该条件与前一个条件为逻辑或，否则为逻辑与。
> whereBracket 和 whereOrBracket 是特殊的 api，表示将 api 前后的条件分别用括号括起来，Or 代表括号之间的逻辑是或关系。

### where

> 添加条件字符串或者 Term 类型的 api

```js
sqlQuery
    .select()
    .table("table1")
    .where("`field1` = 'value1'")
    .build();
```

```sql
SELECT * FROM `table1` WHERE `field1` = 'value1'
```

### whereEqual

> 条件 =

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

### whereNotEqual

> 条件 <>

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

### whereIn

> 条件 IN

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

### whereNotIn

> 条件 NOT IN

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

### whereMore

> 条件 >

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

### whereLess

> 条件 <

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

### whereMoreEqual

> 条件 >=

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

### whereLessEqual

> 条件 <=

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

### whereLike

> 条件 LIKE

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

### whereNotLike

> 条件 NOT LIKE

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

### whereBetween

> 条件 BETWEEN

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

### whereNotBetween

> 条件 NOT BETWEEN

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

### whereOrEqual

> 条件 =，逻辑为或

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

### whereOrNotEqual

> 条件 <>，逻辑为或

### whereOrIn

> 条件 IN，逻辑为或

### whereOrNotIn

> 条件 NOT IN，逻辑为或

### whereOrMore

> 条件 >，逻辑为或

### whereOrLess

> 条件 <，逻辑为或

### whereOrMoreEqual

> 条件 >=，逻辑为或

### whereOrLessEqual

> 条件 <=，逻辑为或

### whereOrLike

> 条件 LIKE，逻辑为或

### whereOrNotLike

> 条件 NOT LIKE，逻辑为或

### whereOrBetween

> 条件 BETWEEN，逻辑为或

### whereOrNotBetween

> 条件 NOT BETWEEN，逻辑为或

### whereBracket

> 前后的条件分别用括号括起来

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

### whereOrBracket

> 前后的条件分别用括号括起来，和前一括号逻辑为或

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

## HAVING

> HAVING 的逻辑和 WHERE 是一样的，但仅限 SELECT 能调用。
> 为和 WHERE 做区分，HAVING 的 api 的前缀都是 having。

### having

> 添加手打的条件或者 Term 类型的 api

### havingEqual

> 条件 =

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

### havingNotEqual

> 条件 <>

### havingIn

> 条件 IN

### havingNotIn

> 条件 NOT IN

### havingMore

> 条件 >

### havingLess

> 条件 <

### havingMoreEqual

> 条件 >=

### havingLessEqual

> 条件 <=

### havingLike

> 条件 LIKE

### havingNotLike

> 条件 NOT LIKE

### havingBetween

> 条件 BETWEEN

### havingNotBetween

> 条件 NOT BETWEEN

### havingOrEqual

> 条件 =，逻辑为或

### havingOrNotEqual

> 条件 <>，逻辑为或

### havingOrIn

> 条件 IN，逻辑为或

### havingOrNotIn

> 条件 NOT IN，逻辑为或

### havingOrMore

> 条件 >，逻辑为或

### havingOrLess

> 条件 <，逻辑为或

### havingOrMoreEqual

> 条件 >=，逻辑为或

### havingOrLessEqual

> 条件 <=，逻辑为或

### havingOrLike

> 条件 LIKE，逻辑为或

### havingOrNotLike

> 条件 NOT LIKE，逻辑为或

### havingOrBetween

> 条件 BETWEEN，逻辑为或

### havingOrNotBetween

> 条件 NOT BETWEEN，逻辑为或

### havingBracket

> 前后的条件分别用括号括起来

### havingOrBracket

> 前后的条件分别用括号括起来，逻辑为或

## TERM

> Term 也是用于拼装语句的条件筛选的逻辑部分，拼装逻辑和 WHERE 和 HAVING 是一样的。
> Term 的 api 与 WHERE 和 HAVING 也是基本一样的，只是没有前缀。
> 如果条件语句过于复杂，可以用 term 使代码更简洁。

### equal

> 条件 =

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

### notEqual

> 条件 <>

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

### in

> 条件 IN

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

### notIn

> 条件 NOT IN

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

### more

> 条件 >

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

### less

> 条件 <

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

### moreEqual

> 条件 >=

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

### lessEqual

> 条件 <=

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

### like

> 条件 LIKE

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

### notLike

> 条件 NOT LIKE

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

### between

> 条件 BETWEEN

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

### notBetween

> 条件 NOT BETWEEN

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

### orEqual

> 条件 =，逻辑为或

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

### orNotEqual

> 条件 <>，逻辑为或

### orIn

> 条件 IN，逻辑为或

### orNotIn

> 条件 NOT IN，逻辑为或

### orMore

> 条件 >，逻辑为或

### orLess

> 条件 <，逻辑为或

### orMoreEqual

> 条件 >=，逻辑为或

### orLessEqual

> 条件 <=，逻辑为或

### orLike

> 条件 LIKE，逻辑为或

### orNotLike

> 条件 NOT LIKE，逻辑为或

### orBetween

> 条件 BETWEEN，逻辑为或

### orNotBetween

> 条件 NOT BETWEEN，逻辑为或

### bracket

> 前后的条件分别用括号括起来

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

### orBracket

> 前后的条件分别用括号括起来，逻辑为或

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

## ORDER

### descBy

> 根据某个字段降序排序

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

### ascBy

> 根据某个字段升序排序

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

### orderField

> 根据某个字段自定义序列排序

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

### order

> 输入的字符串或者 order api

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

## LIMIT/OFFSET

### offset

> 设置 sql 语句的 offset

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

### step

> 设置 sql 语句的 limit

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

### limit

> 设置 sql 语句的 limit，仅限 SELECT 类型使用

```js
sqlQuery
    .select()
    .table("table1")
    .limit(1, 10)
    .build();
```

```sql
SELECT * FROM `table1` LIMIT 10 OFFSET 1
```

### paging

> 设置 sql 语句的 limit，仅限 SELECT 类型使用

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

### findOne

> 限制只返回一个，仅限 SELECT 类型使用

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

## CREATE

> 新建表语句，把表的信息用一定的 json 数据格式保存，然后可以通过 api 转换成 sql 语句

### create

> 指定 sql 语句为 CREATE 类型

```js
sqlQuery.create();
```

### info

> 新建表的信息

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

## ALTER

> ALTER 类型语句

### alter

> 指定 sql 语句为 ALTER 类型

```js
sqlQuery.alter();
```

### add

> 添加字段

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

### drop

> 删除字段

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

### modify

> 修改字段

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

### change

> 修改字段

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

# Connect To Db

> 如果要连接数据库需要在新建对象时传入连接的配置，要执行语句需要调用 exec 属性方法。

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

## Connect Api

> api 只有一个就是 exec，exec()执行后返回的是一个 Promise 对象，所以推荐用 async/await 处理。
> exec 也可以直接执行 sql 语句。只需要传入 sql 语句作为参数即可。

```js
var result = await sqlQuery.exec("SELECT `field1`, `field2` FROM `table1`");
```

# Tests

> Tests are using jest, to run the tests use:

```sh
$ npm run test
```

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
