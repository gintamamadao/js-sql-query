const { Builder } = require("../../dist/js-sql-query");

describe("UPDATE", () => {
    const builder = new Builder();
    test("SET", () => {
        const QUERY = "UPDATE `table1` SET `field1` = 'value1'";
        expect(
            (() =>
                builder
                    .update()
                    .table("table1")
                    .set({
                        field1: "value1"
                    }).query)()
        ).toBe(QUERY);
    });
    test("SET", () => {
        const QUERY =
            "UPDATE `table1` SET `field1` = 'value1', `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .update()
                    .table("table1")
                    .set({
                        field1: "value1",
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .update()
                    .table("table1")
                    .set({
                        field1: "value1"
                    })
                    .set({
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
    });
    test("LIMIT", () => {
        const QUERY = "UPDATE `table1` SET `field1` = 'value1' LIMIT 100";
        expect(
            (() =>
                builder
                    .update()
                    .table("table1")
                    .set({
                        field1: "value1"
                    })
                    .step(100).query)()
        ).toBe(QUERY);
    });
    test("SET", () => {
        const QUERY =
            "UPDATE `table1` SET `field1` = 'value1', `field2` = 'value2' WHERE `field3` = 'value3'";
        expect(
            (() =>
                builder
                    .update()
                    .table("table1")
                    .set({
                        field1: "value1",
                        field2: "value2"
                    })
                    .where$Equal({
                        field3: "value3"
                    }).query)()
        ).toBe(QUERY);
    });
    test("SET", () => {
        const QUERY =
            "UPDATE `table1` SET `field1` = `field1` + '1' WHERE `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .update()
                    .table("table1")
                    .add({
                        field1: 1
                    })
                    .where$Equal({
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
    });
    test("SET", () => {
        const QUERY =
            "UPDATE `table1` SET `field1` = `field1` - '1' WHERE `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .update()
                    .table("table1")
                    .minus({
                        field1: 1
                    })
                    .where$Equal({
                        field2: "value2"
                    }).query)()
        ).toBe(QUERY);
    });
    test("SET", () => {
        const QUERY =
            "UPDATE `table1` SET `field1` = 'value1' ORDER BY `field1` DESC LIMIT 100";
        expect(
            (() =>
                builder
                    .update()
                    .table("table1")
                    .set({
                        field1: "value1"
                    })
                    .step(100)
                    .descBy("field1").query)()
        ).toBe(QUERY);
    });
});
