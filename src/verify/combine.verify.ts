import { Schema } from "schema-verify";
import { FuncTypes } from "../constant/enum";

export const funcInfoVerify = new Schema({
    type: Object,
    restrict: true,
    props: [
        {
            index: "funcFeild",
            required: true,
            type: String
        }
    ]
}).verify;

export const funcInputVerify = new Schema({
    type: Object,
    restrict: true,
    props: [
        {
            type: String,
            index: "func",
            required: true,
            custom: value => {
                return !!FuncTypes[value];
            }
        },
        [
            {
                index: "field",
                required: true,
                type: String
            },
            {
                type: Number
            }
        ]
    ]
}).verify;
