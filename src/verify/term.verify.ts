import { Schema } from "schema-verify";
import { TermSign, TermLogic } from "../constant/enum";

const termDataSchema = new Schema({
    type: Object,
    props: [
        [
            {
                required: true,
                type: String
            },
            {
                type: Number
            },
            {
                type: Array,
                minLength: 1,
                elements: [
                    [
                        {
                            type: String,
                            required: true
                        },
                        {
                            type: Number
                        }
                    ]
                ]
            }
        ]
    ]
});

const termSignSchema = new Schema({
    type: String,
    enum: TermSign
});

const termLogicSchema = new Schema({
    type: String,
    enum: TermLogic
});

const termValueSchema = new Schema([
    {
        required: true,
        type: String
    },
    {
        type: Number
    }
]);

const termInSchema = new Schema({
    type: Array,
    minLength: 1,
    elements: [
        [
            {
                type: String,
                required: true
            },
            {
                type: Number
            }
        ]
    ]
});

const termBetweenSchema = new Schema({
    type: Array,
    length: 2,
    elements: [
        [
            {
                type: String,
                required: true
            },
            {
                type: Number
            }
        ]
    ]
});

const termBracketSchema = new Schema({
    type: Object,
    restrict: true,
    props: [
        {
            index: "position",
            required: true,
            type: Number,
            min: 1
        },
        {
            index: "logic",
            required: true,
            type: String,
            enum: TermLogic
        }
    ]
});

const termInfoSchema = new Schema({
    type: Object,
    restrict: true,
    props: [
        {
            index: "field",
            required: true,
            type: String,
            minLength: 1
        },
        [
            {
                index: "value",
                required: true,
                type: String
            },
            {
                type: Number
            },
            {
                type: Array,
                minLength: 1,
                elements: [
                    [
                        {
                            type: String,
                            required: true
                        },
                        {
                            type: Number
                        }
                    ]
                ]
            }
        ],
        {
            index: "sign",
            required: true,
            type: String,
            enum: TermSign
        },
        {
            index: "logic",
            required: true,
            type: String,
            enum: TermLogic
        }
    ]
});

export const termDataVerify = termDataSchema.verify;
export const termSignVerify = termSignSchema.verify;
export const termLogicVerify = termLogicSchema.verify;
export const termValueVerify = termValueSchema.verify;
export const termInVerify = termInSchema.verify;
export const termBetweenVerify = termBetweenSchema.verify;
export const termBracketVerify = termBracketSchema.verify;
export const termInfoVerify = termInfoSchema.verify;
