import { Schema } from "schema-verify";
import { TermSign, TermLogic } from "../constant/enum";

export const termDataVerify = new Schema({
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
                length: { min: 1 },
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
}).verify;

export const termSignVerify = new Schema({
    type: String,
    enum: TermSign
}).verify;

export const termLogicVerify = new Schema({
    type: String,
    enum: TermLogic
}).verify;

export const termValueVerify = new Schema([
    {
        required: true,
        type: String
    },
    {
        type: Number
    }
]).verify;

export const termInVerify = new Schema({
    type: Array,
    length: { min: 1 },
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
}).verify;

export const termBetweenVerify = new Schema({
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
}).verify;

export const termBracketVerify = new Schema({
    type: Object,
    restrict: true,
    props: [
        {
            index: "position",
            required: true,
            type: Number,
            range: {
                min: 1
            }
        },
        {
            index: "logic",
            required: true,
            type: String,
            enum: TermLogic
        }
    ]
}).verify;

export const termInfoVerify = new Schema({
    type: Object,
    restrict: true,
    props: [
        {
            index: "field",
            required: true,
            type: String,
            length: { min: 1 }
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
                length: { min: 1 },
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
}).verify;
