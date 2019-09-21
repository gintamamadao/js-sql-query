const util = require("./util");
const typescript = require("rollup-plugin-typescript");
const babel = require("rollup-plugin-babel");
const nodeResolve = require("rollup-plugin-node-resolve");
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
    module: "ES6",
    target: "ESNext"
};

module.exports = {
    input: util.resolve("src/index.ts"),
    plugins: [
        typescript(typescriptOptions),
        nodeResolve({ extensions }),
        commonjs({ extensions, ignore: ["conditional-runtime-dependency"] }),
        babel(babelOptions)
    ],
    external: ["schema-verify"]
};
