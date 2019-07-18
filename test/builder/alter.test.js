const { Builder } = require("../../dist/js-sql-query");

describe("ALTER", () => {
    const builder = new Builder();
    test("ALTER:add", () => {
        const QUERY =
            "ALTER TABLE `table1` ADD COLUMN `field1` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '学生id'";
        expect(
            (() =>
                builder
                    .alter()
                    .table("table1")
                    .add("field1", {
                        type: "bigint",
                        unsigned: true,
                        notNull: true,
                        autoIncrement: true,
                        comment: "学生id"
                    }).query)()
        ).toBe(QUERY);
    });
    test("ALTER:drop", () => {
        const QUERY = "ALTER TABLE `table1` DROP COLUMN `field1`";
        expect(
            (() =>
                builder
                    .alter()
                    .table("table1")
                    .drop("field1").query)()
        ).toBe(QUERY);
    });
    test("ALTER:modify", () => {
        const QUERY = "ALTER TABLE `table1` MODIFY COLUMN `field1` VARCHAR(32)";
        expect(
            (() =>
                builder
                    .alter()
                    .table("table1")
                    .modify("field1", {
                        type: "varchar(32)"
                    }).query)()
        ).toBe(QUERY);
    });
    test("ALTER:change", () => {
        const QUERY = "ALTER TABLE `table1` CHANGE COLUMN `field1` `id` BIGINT";
        expect(
            (() =>
                builder
                    .alter()
                    .table("table1")
                    .change("field1", {
                        field: "id",
                        type: "bigint"
                    }).query)()
        ).toBe(QUERY);
    });
    test("ALTER:change", () => {
        expect(
            () =>
                builder
                    .alter()
                    .table("table1")
                    .change("field1").query
        ).toThrowError("错误的修改配置");
    });
    test("ALTER:change error", () => {
        expect(
            () =>
                builder
                    .alter()
                    .table("table1")
                    .change("field1", {}).query
        ).toThrowError("错误的修改配置");
    });
});
