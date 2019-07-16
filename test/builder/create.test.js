const { Builder } = require("../../dist/js-sql-query");

describe("CREATE", () => {
    const builder = new Builder();
    test("test", () => {
        const info = {
            tableName: "t_anomaly_banner_info",
            primaryKey: "Fanomal_id",
            uniqueKey: {
                keyName: "Fpage_sign",
                combineFields: ["Fpage_sign"]
            },
            engine: "InnoDB",
            autoIncrement: 10000,
            defaultCharset: "utf8",
            comment: "页面的不规则banner信息",
            fields: [
                {
                    field: "Fanomal_id",
                    type: "bigint(20)",
                    unsigned: true,
                    autoIncrement: true,
                    notNull: true,
                    default: "0",
                    onUpdate: "CURRENT_TIMESTAMP",
                    comment: "页面标志"
                },
                {
                    field: "Fpage_sign",
                    type: "varchar(32)",
                    unsigned: true,
                    autoIncrement: true,
                    notNull: true,
                    default: "0",
                    onUpdate: "CURRENT_TIMESTAMP",
                    comment: "页面标志"
                }
            ]
        };
        builder.create().info(info).query;
    });
});
