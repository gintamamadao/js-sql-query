const sqlQuery = require("../../lib/js-sql-query")

describe("LIMIT", () => {
    const builder = new sqlQuery();
    test("OFFSET", () => {
        const QUERY = "SELECT * FROM `table1` OFFSET 1";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .offset(1)
                    .build())()
        ).toBe(QUERY);
    });
    test("LIMIT", () => {
        const QUERY = "SELECT * FROM `table1` LIMIT 10";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .step(10)
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .paging(1, 10)
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .limit(0, 10)
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .limit(10)
                    .build())()
        ).toBe(QUERY);
    });
    test("LIMIT", () => {
        const QUERY = "SELECT * FROM `table1` LIMIT 10 OFFSET 1";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .limit(1, 10)
                    .build())()
        ).toBe(QUERY);
    });
    test("LIMIT", () => {
        const QUERY = "SELECT * FROM `table1` LIMIT 10 OFFSET 10";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .paging(2, 10)
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .limit(10, 10)
                    .build())()
        ).toBe(QUERY);
    });
    test("LIMIT", () => {
        const QUERY = "SELECT * FROM `table1` LIMIT 1";
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .findOne()
                    .build())()
        ).toBe(QUERY);
        expect(
            (() =>
                builder
                    .select()
                    .table("table1")
                    .limit(0, 1)
                    .build())()
        ).toBe(QUERY);
    });
});
