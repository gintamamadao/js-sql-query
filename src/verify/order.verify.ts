import { Schema } from "schema-verify";
import { OrderTypes } from "../constant/enum";

export const orderInfoVerify = new Schema({
    type: Object,
    restrict: true,
    props: [
        {
            index: "field",
            required: true,
            type: String
        },
        {
            index: "type",
            required: true,
            type: String,
            enum: OrderTypes
        },
        {
            index: "list",
            type: Array,
            elements: [
                [
                    {
                        type: String,
                        required: true,
                        length: { min: 1 }
                    },
                    {
                        type: Number
                    }
                ]
            ]
        }
    ]
}).verify;

export const valueListVerify = new Schema({
    type: Array,
    elements: [
        [
            {
                type: String,
                required: true,
                length: { min: 1 }
            },
            {
                type: Number
            }
        ]
    ]
}).verify;
