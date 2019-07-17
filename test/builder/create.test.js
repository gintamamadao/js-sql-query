const { Builder } = require("../../dist/js-sql-query");

describe("CREATE", () => {
    const builder = new Builder();
    test("test", () => {
        const info = {
            tableName: "a",
            primaryKey: "b",
            uniqueKey: {
                keyName: "Fpage_sign",
                combineFields: ["Fpage_sign"]
            },
            engine: "InnoDB",
            autoIncrement: 10000,
            defaultCharset: "utf8",
            comment: "bbb",
            fields: [
                {
                    field: "c",
                    type: "bigint(20)",
                    unsigned: true,
                    autoIncrement: true,
                    notNull: true,
                    default: "0",
                    onUpdate: "CURRENT_TIMESTAMP",
                    comment: "dd"
                },
                {
                    field: "d",
                    type: "varchar(32)",
                    unsigned: true,
                    autoIncrement: true,
                    notNull: true,
                    default: "0",
                    onUpdate: "CURRENT_TIMESTAMP",
                    comment: "d"
                }
            ]
        };
        builder.create().info(info).query;
    });
});
