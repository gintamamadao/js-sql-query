const sqlQuery = require("../../lib/js-sql-query")

describe("UPDATE", () => {
    const builder = new sqlQuery();
    test("SET", () => {
        const QUERY = "UPDATE `table1` SET `field1` = 'value1'";
        expect(
            (() =>
                builder
                    .update()
                    .table("table1")
                    .set({
                        field1: "value1"
                    })
                    .build())()
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
                    })
                    .build())()
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
                    })
                    .build())()
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
                    .step(100)
                    .build())()
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
                    .whereEqual({
                        field3: "value3"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("SET", () => {
        const QUERY =
            "UPDATE `table1` SET `field1` = `field1` + 1 WHERE `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .update()
                    .table("table1")
                    .add({
                        field1: 1
                    })
                    .whereEqual({
                        field2: "value2"
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("SET", () => {
        const QUERY =
            "UPDATE `table1` SET `field1` = `field1` - 1 WHERE `field2` = 'value2'";
        expect(
            (() =>
                builder
                    .update()
                    .table("table1")
                    .minus({
                        field1: 1
                    })
                    .whereEqual({
                        field2: "value2"
                    })
                    .build())()
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
                    .descBy("field1")
                    .build())()
        ).toBe(QUERY);
    });
});
