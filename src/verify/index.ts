import { Schema } from "schema-verify";
import { fieldDataArrVerify } from "./insert.verify";
import { funcInfoVerify, funcInputVerify } from "./combine.verify";
import { dialectVerify, manualSqlVerify } from "./safe.verify";
import { pageVerify, limitInfoVerify } from "./limit.verify";
import { orderInfoVerify, valueListVerify } from "./order.verify";
import {
    termDataVerify,
    termBracketVerify,
    termSignVerify,
    termLogicVerify,
    termValueVerify,
    termInVerify,
    termBetweenVerify,
    termInfoVerify
} from "./term.verify";
import { updateInfoVerify } from "./update.verify";
import { tableFieldVerify } from "./create.verify";

const strArrVerify = new Schema({
    type: Array,
    elements: {
        type: String,
        required: true,
        minLength: 1
    }
}).verify;

const strObjVerify = new Schema({
    type: Object,
    props: {
        type: String,
        required: true,
        minLength: 1
    }
}).verify;

const naturalVerify = new Schema({
    type: Number,
    natural: true
}).verify;

const integerVerify = new Schema({
    type: Number,
    integer: true
}).verify;

const fieldDataVerify = new Schema({
    type: Object,
    props: [
        [
            {
                required: true,
                type: String
            },
            {
                type: Number
            }
        ]
    ]
}).verify;

export {
    fieldDataVerify,
    fieldDataArrVerify,
    funcInfoVerify,
    funcInputVerify,
    dialectVerify,
    manualSqlVerify,
    pageVerify,
    limitInfoVerify,
    naturalVerify,
    integerVerify,
    orderInfoVerify,
    valueListVerify,
    strArrVerify,
    strObjVerify,
    termBracketVerify,
    termDataVerify,
    termSignVerify,
    termLogicVerify,
    termValueVerify,
    termInVerify,
    termBetweenVerify,
    termInfoVerify,
    updateInfoVerify,
    tableFieldVerify
};
