const sqlQuery = require("../../lib/js-sql-query")

describe("SELECT:ORDER BY", () => {
    const builder = new sqlQuery();
    test("ORDER", () => {
        const QUERY = "SELECT * FROM `table1` ORDER BY `field1` DESC";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .descBy("field1")
                    .build())()
        ).toBe(QUERY);
    });
    test("ORDER", () => {
        const QUERY = "SELECT * FROM `table1` ORDER BY `field1` ASC";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .ascBy("field1")
                    .build())()
        ).toBe(QUERY);
    });
    test("ORDER", () => {
        const QUERY =
            "SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` DESC";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .descBy("field1", "field2")
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .descBy(["field1", "field2"])
                    .build())()
        ).toBe(QUERY);
    });
    test("ORDER", () => {
        const QUERY =
            "SELECT * FROM `table1` ORDER BY `field1` ASC, `field2` ASC";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .ascBy("field1", "field2")
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .ascBy(["field1", "field2"])
                    .build())()
        ).toBe(QUERY);
    });
    test("ORDER", () => {
        const QUERY =
            "SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` ASC";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .descBy("field1")
                    .ascBy("field2")
                    .build())()
        ).toBe(QUERY);
    });
    test("ORDER", () => {
        const QUERY =
            "SELECT * FROM `table1` ORDER BY FIELD(`field1`, 'value1', 'value2')";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .orderField({
                        field1: ["value1", "value2"]
                    })
                    .build())()
        ).toBe(QUERY);
    });
    test("ORDER", () => {
        const QUERY =
            "SELECT * FROM `table1` ORDER BY `field1` DESC, `field2` ASC, FIELD(`field3`, 'value1', 'value2')";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .descBy("field1")
                    .ascBy("field2")
                    .orderField({
                        field3: ["value1", "value2"]
                    })
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
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
                    )
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .order(
                        builder.order
                            .descBy("field1")
                            .ascBy("field2")
                            .orderField({
                                field3: ["value1", "value2"]
                            })
                    )
                    .build())()
        ).toBe(QUERY);
    });
});
