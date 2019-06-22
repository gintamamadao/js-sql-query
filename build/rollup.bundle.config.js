const util = require("./util");
const baseConfig = require("./rollup.config");
// const uglify = require("rollup-plugin-uglify-es");

module.exports = {
    ...baseConfig,
    output: {
        file: util.resolve("dist/js-sql-query.js"),
        format: "cjs"
    }
};
