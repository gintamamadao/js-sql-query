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
        -   [INSERT](#INSERT)
        -   [UPDATE](#UPDATE)
        -   [SELECT](#SELECT)
        -   [DELETE](#DELETE)

# api

## Builder

```js
var { Builder } = require("js-sql-query");
var builder = new Builder();
```

新建时指定数据库类型 mysql，mssql，postgresql，sqlite

```js
var builder = new Builder("mysql");
```

### INSERT

#### insert

-   指定 sql 语句为 INSERT

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
    }).query;
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
    .where$Equal({
        field3: "value3"
    }).query;
// UPDATE `table1` SET `field1` = 'value1', `field2` = 'value2' WHERE `field3` = 'value3'

builder
    .update()
    .table("table1")
    .add({
        field1: 1
    })
    .where$Equal({
        field2: "value2"
    }).query;
// UPDATE `table1` SET `field1` = `field1` + '1' WHERE `field2` = 'value2'

builder
    .update()
    .table("table1")
    .minus({
        field1: 1
    })
    .where$Equal({
        field2: "value2"
    }).query;
// UPDATE `table1` SET `field1` = `field1` - '1' WHERE `field2` = 'value2'
```
