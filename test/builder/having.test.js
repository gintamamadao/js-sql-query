const { Builder } = require("../../dist/js-sql-query");

describe("SELECT:HAVING", () => {
    const builder = new Builder();
    test("=", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` = 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$Equal({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having(() =>
                        builder.term.equal({
                            field1: "value1"
                        })
                    ).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having(
                        builder.term.equal({
                            field1: "value1"
                        })
                    ).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having(() => "`field1` = 'value1'").query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having("`field1` = 'value1'").query)()
        ).toBe(QUERY);
    });
    test("<>", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` <> 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$NoEqual({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test("IN", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` IN ( 'value1', 'value2' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$In({
                        field1: ["value1", "value2"]
                    }).query)()
        ).toBe(QUERY);
    });
    test("NOT IN", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` NOT IN ( 'value1', 'value2' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$NotIn({
                        field1: ["value1", "value2"]
                    }).query)()
        ).toBe(QUERY);
    });
    test(">", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` > 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$More({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test("<", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` < 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$Less({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test(">=", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` >= 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$MoreEqual({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test("<=", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` <= 'value1'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$LessEqual({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test("LIKE", () => {
        const QUERY = "SELECT * FROM `table1` HAVING `field1` LIKE '%value1%'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$Like({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test("NOT LIKE", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` NOT LIKE '%value1%'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$NotLike({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test("BETWEEN", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` BETWEEN 'value1' AND 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$Between({
                        field1: ["value1", "value2"]
                    }).query)()
        ).toBe(QUERY);
    });
    test("NOT BETWEEN", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` NOT BETWEEN 'value1' AND 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$NotBetween({
                        field1: ["value1", "value2"]
                    }).query)()
        ).toBe(QUERY);
    });
    test("AND", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` = 'value1' AND `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$Equal({
                        field1: "value1",
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$Equal({
                        field1: "value1"
                    })
                    .having$Equal({
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
    });
    test("AND", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` = 'value1' AND `field2` <> 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$Equal({
                        field1: "value1"
                    })
                    .having$NoEqual({
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
    });
    test("AND", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` <> 'value1' AND `field1` <> 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$NoEqual({
                        field1: "value1"
                    })
                    .having$NoEqual({
                        field1: "value2"
                    }).query)()
        ).toBe(QUERY);
    });
    test("OR", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING `field1` = 'value1' OR `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$OrEqual({
                        field1: "value1",
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$OrEqual({
                        field1: "value1"
                    })
                    .having$OrEqual({
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
    });
    test("Bracket", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING ( `field1` = 'value1' OR `field2` = 'value2' ) AND ( `field3` = 'value3' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$OrEqual({
                        field1: "value1",
                        field2: "value2"
                    })
                    .having$Bracket()
                    .having$OrEqual({
                        field3: "value3"
                    }).query)()
        ).toBe(QUERY);
    });
    test("OrBracket", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` = 'value3' )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$Equal({
                        field1: "value1",
                        field2: "value2"
                    })
                    .having$OrBracket()
                    .having$Equal({
                        field3: "value3"
                    }).query)()
        ).toBe(QUERY);
    });
    test("OrBracket", () => {
        const QUERY =
            "SELECT * FROM `table1` HAVING ( `field1` = 'value1' AND `field2` = 'value2' ) OR ( `field3` IN ( 'value3', 'value4' ) )";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .having$Equal({
                        field1: "value1",
                        field2: "value2"
                    })
                    .having$OrBracket()
                    .having$In({
                        field3: ["value3", "value4"]
                    }).query)()
        ).toBe(QUERY);
    });
});
