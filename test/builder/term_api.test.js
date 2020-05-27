const sqlQuery = require("../../lib/js-sql-query")

describe("SELECT:WHERE:TERM", () => {
    const builder = new sqlQuery();
    test("=", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` = 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .equal({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("<>", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` <> 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .notEqual({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("IN", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` IN ( 'value1', 'value2' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .in({
                        field1: ["value1", "value2"]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("NOT IN", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` NOT IN ( 'value1', 'value2' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .notIn({
                        field1: ["value1", "value2"]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test(">", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` > 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .more({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("<", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` < 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .less({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test(">=", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` >= 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .moreEqual({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("<=", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` <= 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .lessEqual({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("LIKE", () => {
        const QUERY = "SELECT * FROM `table1` WHERE `field1` LIKE '%value1%'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .like({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("NOT LIKE", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` NOT LIKE '%value1%'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .notLike({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("BETWEEN", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` BETWEEN 'value1' AND 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .between({
                        field1: ["value1", "value2"]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("NOT BETWEEN", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` NOT BETWEEN 'value1' AND 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .notBetween({
                        field1: ["value1", "value2"]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("AND", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .equal({
                        field1: "value1",
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .equal({
                        field1: "value1"
                    })
                    .equal({
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("AND", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` = 'value1' AND `field2` <> 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .equal({
                        field1: "value1"
                    })
                    .notEqual({
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("AND", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` <> 'value1' AND `field1` <> 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .notEqual({
                        field1: "value1"
                    })
                    .notEqual({
                        field1: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("OR", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` = 'value1' OR `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .orEqual({
                        field1: "value1",
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .orEqual({
                        field1: "value1"
                    })
                    .orEqual({
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("Bracket", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE ( `field1` = 'value1' OR `field2` = 'value2' ) AND ( `field3` = 'value3' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .orEqual({
                        field1: "value1",
                        field2: "value2"
                    })
                    .bracket()
                    .orEqual({
                        field3: "value3"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("OrBracket", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` = 'value3' )";
        expect(
            (() =>
                builder
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
                    .build())()
        ).toBe(QUERY);
    });
    test("OrBracket", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` IN ( 'value3', 'value4' ) )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .equal({
                        field1: "value1",
                        field2: "value2"
                    })
                    .orBracket()
                    .in({
                        field3: ["value3", "value4"]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("GROUP BY", () => {
        const QUERY =
            "SELECT COUNT(`field2`) FROM `table1` WHERE `field1` = 'value1' GROUP BY `field2`";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .equal({
                        field1: "value1"
                    })
                    .count("field2")
                    .groupBy("field2")
                    .build())()
        ).toBe(QUERY);
    });
});

describe("SELECT:HAVING:TERM", () => {
    const builder = new sqlQuery();
    test("=", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` = 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having()
                    .equal({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("=", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` = 'value1' HAVING `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .where()
                    .equal({
                        field1: "value1"
                    })
                    .having()
                    .equal({
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("=", () => {
        const QUERY =
            "SELECT * FROM `table1` WHERE `field1` = 'value1' HAVING `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having()
                    .equal({
                        field2: "value2"
                    })
                    .where()
                    .equal({
                        field1: "value1"
                    })
                    .build())()
        ).toBe(QUERY);
    });
});
