const util = require("./util");
const typescript = require("rollup-plugin-typescript2");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const pkg = require("../package.json");
const { terser } = require("rollup-plugin-terser");

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const babelOptions = {
    extensions,
    runtimeHelpers: true,
    presets: [
        [
            "@babel/env",
            {
                modules: false,
            },
        ],
    ],
    plugins: ["@babel/transform-runtime"],
};

module.exports = [
    {
        input: util.resolve("src/index.ts"),
        output: [{ file: pkg.module, format: "cjs" }],
        plugins: [
            typescript(),
            commonjs({
                extensions,
                ignore: ["conditional-runtime-dependency"],
            }),
            babel(babelOptions),
        ],
        external: ["schema-verify", "@babel/runtime", "regenerator-runtime"],
    },
];
