const util = require("./util");
const typescript = require("rollup-plugin-typescript2");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const babelOptions = {
    extensions,
    runtimeHelpers: true,
    presets: [
        [
            "@babel/env",
            {
                modules: false,
                targets: {
                    node: "10.15.3"
                }
            }
        ]
    ]
};

const typescriptOptions = {
    strict: true,
    declaration: true,
    module: "ES6",
    target: "es2017"
};

module.exports = {
    input: util.resolve("src/index.ts"),
    plugins: [
        typescript(),
        commonjs({ extensions, ignore: ["conditional-runtime-dependency"] }),
        babel(babelOptions)
    ],
    external: ["schema-verify"]
};
