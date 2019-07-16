# js-sql-query

js sql query builder

## 项目简介

项目的目标是做一个基于 js 的类 orm 插件，来用于 node 后台开发。目前完成的功能有增删查改的 sql 语句的组装逻辑及其相关测试。
项目逻辑用 ts 编写，用 rollup 打包成 js 文件，rollup 的编译配置在 build 文件夹下。

## 安装

```sh
npm i js-sql-query --save
```

## 目录

<!-- TOC -->

-   [api](#api)
    -   [Builder](#Builder)
        -   [INSERT/REPLACE](#INSERTREPLACE)
        -   [UPDATE](#UPDATE)
        -   [SELECT](#SELECT)
        -   [DELETE](#DELETE)
        -   [WHERE](#WHERE)
        -   [HAVING](#HAVING)
        -   [Term](#Term)
        -   [ORDER](#ORDER)
        -   [LIMIT/OFFSET](#LIMITOFFSET)

# api

## Builder

```js
var { Builder } = require("js-sql-query");
var builder = new Builder();
```

-   新建时指定数据库类型 mysql，mssql，postgresql，sqlite

```js
var builder = new Builder("mysql");
```

-   设置要操作的表名

```js
builder.table("table1");
```

-   语句类型

语句的基本类型有 INSERT，REPLACE， UPDATE，SELECT，DELETE，其中 INSERT 和 REPLACE 的拼装逻辑是完全一样的，就合在一起讲
不同的基本类型可以调用的 api 不完全一样，有些是公用的，有些是仅限某些基本类型才能调用。

### INSERT/REPLACE

#### insert/replace

-   指定 sql 语句为 INSERT/REPLACE

#### table

-   设置 sql 语句的表名

#### data

-   设置 sql 语句的插入值信息

#### multiData

-   设置 sql 语句多行插入值信息，一次插入一行或多行数据

#### values

-   设置 sql 语句的插入值信息为子查询的结果

#### fields

-   设置 sql 语句的插入值的字段

#### build

-   获取拼装后的 sql 语句

#### query

-   获取拼装后的 sql 语句

#### insert 例子：

```js
builder
    .insert()
    .table("table1")
    .data({
        field1: "value1",
        field2: "value2"
    })
    .build();
// INSERT INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )

builder
    .replace()
    .table("table1")
    .data({
        field1: "value1",
        field2: "value2"
    }).query;
// REPLACE INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )

builder
    .insert()
    .table("table1")
    .fields("field1", "field2")
    .data({
        field1: "value1",
        field2: "value2",
        field3: "value3"
    }).query;
// INSERT INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )

builder
    .insert()
    .table("table1")
    .fields(["field1", "field2"])
    .data({
        field1: "value1",
        field2: "value2",
        field3: "value3"
    }).query;
// INSERT INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' )

builder
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
    ]).query;
// INSERT INTO `table1` ( `field1`, `field2` )  VALUES ( 'value1', 'value2' ), ( 'value4', 'value5' )

builder
    .insert()
    .table("table1")
    .fields(["field1", "field2"])
    .values(() =>
        builder
            .select()
            .table("table1")
            .fields(["field1", "field2"])
    ).query;
// INSERT INTO `table1` ( `field1`, `field2` )  VALUES SELECT `field1`, `field2` FROM `table1`
```

### UPDATE

#### update

-   指定 sql 语句为 UPDATE

#### table

-   设置 sql 语句的表名

#### set

-   设置 sql 语句的更新信息，更新方式为覆盖

#### add

-   设置 sql 语句的更新信息，更新方式为增加

#### minus

-   设置 sql 语句的更新信息，更新方式为减少

#### build

-   获取拼装后的 sql 语句

#### query

-   获取拼装后的 sql 语句

#### update 例子：

```js
builder
    .update()
    .table("table1")
    .set({
        field1: "value1"
    })
    .build();
// UPDATE `table1` SET `field1` = 'value1'

builder
    .update()
    .table("table1")
    .set({
        field1: "value1"
    })
    .step(100).query;
// UPDATE `table1` SET `field1` = 'value1' LIMIT 100

builder
    .update()
    .table("table1")
    .set({
        field1: "value1"
    })
    .step(100)
    .descBy("field1").query;
// UPDATE `table1` SET `field1` = 'value1' ORDER BY `field1` DESC LIMIT 100

builder
    .update()
    .table("table1")
    .set({
        field1: "value1",
        field2: "value2"
    })
    .whereEqual({
        field3: "value3"
    }).query;
// UPDATE `table1` SET `field1` = 'value1', `field2` = 'value2' WHERE `field3` = 'value3'

builder
    .update()
    .table("table1")
    .add({
        field1: 1
    })
    .whereEqual({
        field2: "value2"
    }).query;
// UPDATE `table1` SET `field1` = `field1` + '1' WHERE `field2` = 'value2'

builder
    .update()
    .table("table1")
    .minus({
        field1: 1
    })
    .whereEqual({
        field2: "value2"
    }).query;
// UPDATE `table1` SET `field1` = `field1` - '1' WHERE `field2` = 'value2'
```

### SELECT

#### select

-   指定 sql 语句为 SELECT

#### table

-   设置 sql 语句的表名

#### fields

-   设置 sql 语句的要获取的字段

#### count 等函数

-   设置 sql 语句的函数，有 count,sum,max,min,avg,abs,ceil,floor,round,log,log2,exp,power,acos,asin,atan,cos,sin,tan,conv,random,rand,radians,degrees,distinct

#### funcFeilds

-   设置 sql 语句的函数

#### groupBy

-   设置 sql 语句根据某个字段聚合

#### build

-   获取拼装后的 sql 语句

#### query

-   获取拼装后的 sql 语句

#### select 例子：

```js
builder
    .select()
    .table("table1")
    .fields("*")
    .build();
// SELECT * FROM `table1`

builder
    .select()
    .table("table1")
    .fields("field1", "field2").query;
// SELECT `field1`, `field2` FROM `table1`

builder
    .select()
    .table("table1")
    .fields(["field1", "field2"]).query;
// SELECT `field1`, `field2` FROM `table1`

builder
    .select()
    .table("table1")
    .fields("field1")
    .count("field2").query;
// SELECT `field1`, COUNT(`field2`) FROM `table1`

builder
    .select()
    .table("table1")
    .fields("field1")
    .fields(builder.func.count("field2")).query;
// SELECT `field1`, COUNT(`field2`) FROM `table1`

builder
    .select()
    .table("table1")
    .fields("field1")
    .fields({ func: "count", field: "field2" }).query;
// SELECT `field1`, COUNT(`field2`) FROM `table1`

builder
    .select()
    .table("table1")
    .fields("field1")
    .funcFeilds({ func: "count", field: "field2" }).query;
// SELECT `field1`, COUNT(`field2`) FROM `table1`

builder
    .select()
    .table("table1")
    .fields("field1")
    .funcFeilds(builder.func.count("field2")).query;
// SELECT `field1`, COUNT(`field2`) FROM `table1`

builder
    .select()
    .table("table1")
    .fields("field1")
    .count("field2")
    .sum("field3").query;
// SELECT `field1`, COUNT(`field2`), SUM(`field3`) FROM `table1`

builder
    .select()
    .table("table1")
    .fields("field1")
    .funcFeilds(
        { func: "count", field: "field2" },
        { func: "sum", field: "field3" }
    ).query;
// SELECT `field1`, COUNT(`field2`), SUM(`field3`) FROM `table1`

builder
    .select()
    .table("table1")
    .fields("field1")
    .funcFeilds(builder.func.count("field2"), builder.func.sum("field3")).query;
// SELECT `field1`, COUNT(`field2`), SUM(`field3`) FROM `table1`

builder
    .select()
    .table("table1")
    .fields("field1")
    .count("field2")
    .groupBy("field2").query;
// SELECT `field1`, COUNT(`field2`) FROM `table1` GROUP BY `field2`

builder
    .select()
    .table("table1")
    .fields("field1")
    .count("field2")
    .groupBy("field2", "field3").query;
// SELECT `field1`, COUNT(`field2`) FROM `table1` GROUP BY `field2`, `field3`
```

### DELETE

#### delete

-   指定 sql 语句为 DELETE

#### table

-   设置 sql 语句的表名

#### build

-   获取拼装后的 sql 语句

#### query

-   获取拼装后的 sql 语句

#### delete 例子：

```js
builder
    .delete()
    .table("table1")
    .step(100).query;
// DELETE FROM `table1` LIMIT 100

builder
    .delete()
    .table("table1")
    .step(100)
    .descBy("field1").query;
// DELETE FROM `table1` ORDER BY `field1` DESC LIMIT 100

builder
    .delete()
    .table("table1")
    .whereEqual({
        field1: "value1"
    }).query;
// DELETE FROM `table1` WHERE `field1` = 'value1'
```

### WHERE

-   UPDATE、SELECT、DELETE 的条件逻辑拼装 api 是一样的。
-   条件之间的逻辑根据后面的 api 决定，api 名中有 Or 这个词就代表，该条件与前一个条件为或关系，否则为与
-   whereBracket 和 whereOrBracket 是特殊的 api，表示将 api 前后的条件分别用括号括起来，Or 代表括号之间的逻辑是或关系

#### where

-   添加手打的条件或者 Term 类型的 api

#### whereEqual

-   条件 =

#### whereNotEqual

-   条件 <>

#### whereIn

-   条件 IN

#### whereNotIn

-   条件 NOT IN

#### whereMore

-   条件 >

#### whereLess

-   条件 <

#### whereMoreEqual

-   条件 >=

#### whereLessEqual

-   条件 <=

#### whereLike

-   条件 LIKE

#### whereNotLike

-   条件 NOT LIKE

#### whereBetween

-   条件 BETWEEN

#### whereNotBetween

-   条件 NOT BETWEEN

#### whereOrEqual

-   条件 =，和前一条件逻辑为或

#### whereOrNotEqual

-   条件 <>，和前一条件逻辑为或

#### whereOrIn

-   条件 IN，和前一条件逻辑为或

#### whereOrNotIn

-   条件 NOT IN，和前一条件逻辑为或

#### whereOrMore

-   条件 >，和前一条件逻辑为或

#### whereOrLess

-   条件 <，和前一条件逻辑为或

#### whereOrMoreEqual

-   条件 >=，和前一条件逻辑为或

#### whereOrLessEqual

-   条件 <=，和前一条件逻辑为或

#### whereOrLike

-   条件 LIKE，和前一条件逻辑为或

#### whereOrNotLike

-   条件 NOT LIKE，和前一条件逻辑为或

#### whereOrBetween

-   条件 BETWEEN，和前一条件逻辑为或

#### whereOrNotBetween

-   条件 NOT BETWEEN，和前一条件逻辑为或

#### whereBracket

-   前后的条件分别用括号括起来

#### whereOrBracket

-   前后的条件分别用括号括起来，和前一括号逻辑为或

#### where 例子：

```js
builder
    .select()
    .table("table1")
    .where("`field1` = 'value1'").query;
// SELECT * FROM `table1` WHERE `field1` = 'value1'

builder
    .select()
    .table("table1")
    .whereEqual({
        field1: "value1"
    }).query;
// SELECT * FROM `table1` WHERE `field1` = 'value1'

builder
    .select()
    .table("table1")
    .whereNotEqual({
        field1: "value1"
    }).query;
// SELECT * FROM `table1` WHERE `field1` <> 'value1'

builder
    .select()
    .table("table1")
    .whereIn({
        field1: ["value1", "value2"]
    }).query;
// SELECT * FROM `table1` WHERE `field1` IN ( 'value1', 'value2' )

builder
    .select()
    .table("table1")
    .whereNotIn({
        field1: ["value1", "value2"]
    }).query;
// SELECT * FROM `table1` WHERE `field1` NOT IN ( 'value1', 'value2' )

builder
    .select()
    .table("table1")
    .whereMore({
        field1: "value1"
    }).query;
// SELECT * FROM `table1` WHERE `field1` > 'value1'

builder
    .select()
    .table("table1")
    .whereLess({
        field1: "value1"
    }).query;
// SELECT * FROM `table1` WHERE `field1` < 'value1'

builder
    .select()
    .table("table1")
    .whereMoreEqual({
        field1: "value1"
    }).query;
// SELECT * FROM `table1` WHERE `field1` >= 'value1'

builder
    .select()
    .table("table1")
    .whereLessEqual({
        field1: "value1"
    }).query;
// SELECT * FROM `table1` WHERE `field1` <= 'value1'

builder
    .select()
    .table("table1")
    .whereLike({
        field1: "value1"
    }).query;
// SELECT * FROM `table1` WHERE `field1` LIKE '%value1%'

builder
    .select()
    .table("table1")
    .whereNotLike({
        field1: "value1"
    }).query;
// SELECT * FROM `table1` WHERE `field1` NOT LIKE '%value1%'

builder
    .select()
    .table("table1")
    .whereBetween({
        field1: ["value1", "value2"]
    }).query;
// SELECT * FROM `table1` WHERE `field1` BETWEEN 'value1' AND 'value2'

builder
    .select()
    .table("table1")
    .whereNotBetween({
        field1: ["value1", "value2"]
    }).query;
// SELECT * FROM `table1` WHERE `field1` NOT BETWEEN 'value1' AND 'value2'

builder
    .select()
    .table("table1")
    .whereEqual({
        field1: "value1",
        field2: "value2"
    }).query;
// SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` = 'value2'

builder
    .select()
    .table("table1")
    .whereEqual({
        field1: "value1"
    })
    .whereNotEqual({
        field2: "value2"
    }).query;
// SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` <> 'value2'

builder
    .select()
    .table("table1")
    .whereNotEqual({
        field1: "value1"
    })
    .whereNotEqual({
        field1: "value2"
    }).query;
// SELECT * FROM `table1` WHERE `field1` <> 'value1' AND `field1` <> 'value2'

builder
    .select()
    .table("table1")
    .whereOrEqual({
        field1: "value1",
        field2: "value2"
    }).query;
// SELECT * FROM `table1` WHERE `field1` = 'value1' OR `field2` = 'value2'

builder
    .select()
    .table("table1")
    .whereOrEqual({
        field1: "value1"
    })
    .whereOrEqual({
        field1: "value2"
    }).query;
// SELECT * FROM `table1` WHERE `field1` = 'value1' OR `field1` = 'value2'

builder
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
    }).query;
// SELECT * FROM `table1` WHERE ( `field1` = 'value1' OR `field2` = 'value2' ) AND ( `field3` = 'value3' )

builder
    .select()
    .table("table1")
    .whereEqual({
        field1: "value1",
        field2: "value2"
    })
    .whereOrBracket()
    .whereEqual({
        field3: "value3"
    }).query;
// SELECT * FROM `table1` WHERE ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` = 'value3' )
```

### HAVING

-   HAVING 的逻辑和 WHERE 是一样的，但仅限 SELECT 能调用
-   为和 WHERE 做区分，HAVING 的 api 的前缀都是 HAVING

#### having

-   添加手打的条件或者 Term 类型的 api

#### havingEqual

-   条件 =

#### havingNotEqual

-   条件 <>

#### havingIn

-   条件 IN

#### havingNotIn

-   条件 NOT IN

#### havingMore

-   条件 >

#### havingLess

-   条件 <

#### havingMoreEqual

-   条件 >=

#### havingLessEqual

-   条件 <=

#### havingLike

-   条件 LIKE

#### havingNotLike

-   条件 NOT LIKE

#### havingBetween

-   条件 BETWEEN

#### havingNotBetween

-   条件 NOT BETWEEN

#### havingOrEqual

-   条件 =，和前一条件逻辑为或

#### havingOrNotEqual

-   条件 <>，和前一条件逻辑为或

#### havingOrIn

-   条件 IN，和前一条件逻辑为或

#### havingOrNotIn

-   条件 NOT IN，和前一条件逻辑为或

#### havingOrMore

-   条件 >，和前一条件逻辑为或

#### havingOrLess

-   条件 <，和前一条件逻辑为或

#### havingOrMoreEqual

-   条件 >=，和前一条件逻辑为或

#### havingOrLessEqual

-   条件 <=，和前一条件逻辑为或

#### havingOrLike

-   条件 LIKE，和前一条件逻辑为或

#### havingOrNotLike

-   条件 NOT LIKE，和前一条件逻辑为或

#### havingOrBetween

-   条件 BETWEEN，和前一条件逻辑为或

#### havingOrNotBetween

-   条件 NOT BETWEEN，和前一条件逻辑为或

#### havingBracket

-   前后的条件分别用括号括起来

#### havingOrBracket

-   前后的条件分别用括号括起来，和前一括号逻辑为或

#### having 例子：

-   基本和 where 一样，可以看项目中的 example 文件夹下的例子

### Term

-   Term 也是用于拼装语句的条件部分，拼装逻辑和 WHERE 和 HAVING 是一样的。
-   Term 的 api 与 WHERE 和 HAVING 也是基本一样的，只是没有前缀。
-   如果语句条件过于复杂，可以用 term 使代码更简洁。

#### equal

-   条件 =

#### notEqual

-   条件 <>

#### in

-   条件 IN

#### notIn

-   条件 NOT IN

#### more

-   条件 >

#### less

-   条件 <

#### moreEqual

-   条件 >=

#### lessEqual

-   条件 <=

#### like

-   条件 LIKE

#### notLike

-   条件 NOT LIKE

#### between

-   条件 BETWEEN

#### notBetween

-   条件 NOT BETWEEN

#### orEqual

-   条件 =，和前一条件逻辑为或

#### orNotEqual

-   条件 <>，和前一条件逻辑为或

#### orIn

-   条件 IN，和前一条件逻辑为或

#### orNotIn

-   条件 NOT IN，和前一条件逻辑为或

#### orMore

-   条件 >，和前一条件逻辑为或

#### orLess

-   条件 <，和前一条件逻辑为或

#### orMoreEqual

-   条件 >=，和前一条件逻辑为或

#### orLessEqual

-   条件 <=，和前一条件逻辑为或

#### orLike

-   条件 LIKE，和前一条件逻辑为或

#### orNotLike

-   条件 NOT LIKE，和前一条件逻辑为或

#### orBetween

-   条件 BETWEEN，和前一条件逻辑为或

#### orNotBetween

-   条件 NOT BETWEEN，和前一条件逻辑为或

#### bracket

-   前后的条件分别用括号括起来

#### orBracket

-   前后的条件分别用括号括起来，和前一括号逻辑为或

#### Term 例子：

```js
builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.equal({
            field1: "value1"
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` = 'value1'

builder
    .select()
    .table("table1")
    .having(() =>
        builder.term.equal({
            field1: "value1"
        })
    ).query;
// SELECT * FROM `table1` HAVING `field1` = 'value1'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.notEqual({
            field1: "value1"
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` <> 'value1'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.in({
            field1: ["value1", "value2"]
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` IN ( 'value1', 'value2' )

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.notIn({
            field1: ["value1", "value2"]
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` NOT IN ( 'value1', 'value2' )

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.more({
            field1: "value1"
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` > 'value1'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.less({
            field1: "value1"
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` < 'value1'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.moreEqual({
            field1: "value1"
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` >= 'value1'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.lessEqual({
            field1: "value1"
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` <= 'value1'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.like({
            field1: "value1"
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` LIKE '%value1%'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.notLike({
            field1: "value1"
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` NOT LIKE '%value1%'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.between({
            field1: ["value1", "value2"]
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` BETWEEN 'value1' AND 'value2'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.notBetween({
            field1: ["value1", "value2"]
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` NOT BETWEEN 'value1' AND 'value2'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.equal({
            field1: "value1",
            field2: "value2"
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` <> 'value2'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term
            .equal({
                field1: "value1"
            })
            .notEqual({
                field2: "value2"
            })
    ).query;
// SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` <> 'value2'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term
            .notEqual({
                field1: "value1"
            })
            .notEqual({
                field1: "value2"
            })
    ).query;
// SELECT * FROM `table1` WHERE `field1` <> 'value1' AND `field1` <> 'value2'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term.orEqual({
            field1: "value1",
            field2: "value2"
        })
    ).query;
// SELECT * FROM `table1` WHERE `field1` = 'value1' OR `field2` = 'value2'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term
            .orEqual({
                field1: "value1"
            })
            .orEqual({
                field1: "value2"
            })
    ).query;
// SELECT * FROM `table1` WHERE `field1` = 'value1' OR `field1` = 'value2'

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term
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
    ).query;
// SELECT * FROM `table1` WHERE ( `field1` = 'value1' OR `field2` = 'value2' ) AND ( `field3` = 'value3' )

builder
    .select()
    .table("table1")
    .where(() =>
        builder.term
            .equal({
                field1: "value1",
                field2: "value2"
            })
            .orBracket()
            .equal({
                field3: "value3"
            })
    ).query;
// SELECT * FROM `table1` WHERE ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` = 'value3' )
```

### ORDER

#### descBy

-   根据某个字段降序排序

#### ascBy

-   根据某个字段升序排序

#### orderField

-   根据某个字段自定义序列排序

#### order

-   输入手打的排序方式或者 order api

#### ORDER 例子：

```js
builder
    .select()
    .table("table1")
    .descBy("field1").query;
// SELECT * FROM `table1` ORDER BY `field1` DESC

builder
    .select()
    .table("table1")
    .ascBy("field1").query;
// SELECT * FROM `table1` ORDER BY `field1` ASC

builder
    .select()
    .table("table1")
    .descBy("field1", "field2").query;
// SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` DESC

builder
    .select()
    .table("table1")
    .descBy(["field1", "field2"]).query;
// SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` DESC

builder
    .select()
    .table("table1")
    .ascBy("field1", "field2").query;
// SELECT * FROM `table1` ORDER BY `field1` ASC, `field2` ASC

builder
    .select()
    .table("table1")
    .ascBy(["field1", "field2"]).query;
// SELECT * FROM `table1` ORDER BY `field1` ASC, `field2` ASC

builder
    .select()
    .table("table1")
    .descBy("field1")
    .ascBy("field2").query;
// SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` ASC

builder
    .select()
    .table("table1")
    .orderField({
        field1: ["value1", "value2"]
    }).query;
// SELECT * FROM `table1` ORDER BY FIELD(`field1`, 'value1', 'value2')

builder
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
// SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` ASC, FIELD(`field3`, 'value1', 'value2')
```

### LIMIT/OFFSET

#### offset

-   设置 sql 语句的 offset

#### step

-   设置 sql 语句的 limit

#### limit

-   设置 sql 语句的 limit，仅限 SELECT 类型使用

#### paging

-   设置 sql 语句的 limit，仅限 SELECT 类型使用

#### findOne

-   限制只返回一个，仅限 SELECT 类型使用

#### LIMIT/OFFSET 例子：

```js
builder
    .select()
    .table("table1")
    .offset(1).query;
// SELECT * FROM `table1` OFFSET 1

builder
    .select()
    .table("table1")
    .step(10).query;
// SELECT * FROM `table1` LIMIT 10

builder
    .select()
    .table("table1")
    .limit(1, 10).query;
// SELECT * FROM `table1` LIMIT 10 OFFSET 1

builder
    .select()
    .table("table1")
    .paging(1, 10).query;
// SELECT * FROM `table1` LIMIT 10

builder
    .select()
    .table("table1")
    .paging(2, 10).query;
// SELECT * FROM `table1` LIMIT 10 OFFSET 10

builder
    .select()
    .table("table1")
    .findOne().query;
// SELECT * FROM `table1` LIMIT 1
```
