import { Schema } from "schema-verify";
import { OrderTypes } from "../../constant/builder/enum";

export const orderInfoSchema = new Schema({
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
                        minLength: 1
                    },
                    {
                        type: Number
                    }
                ]
            ]
        }
    ]
});

export const valueListSchema = new Schema({
    type: Array,
    elements: [
        [
            {
                type: String,
                required: true,
                minLength: 1
            },
            {
                type: Number
            }
        ]
    ]
});

export const orderInfoVerify = orderInfoSchema.verify;
export const valueListVerify = valueListSchema.verify;
