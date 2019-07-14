import { Schema } from "schema-verify";

export const fieldDataArrVerify = new Schema({
    type: Array,
    elements: {
        type: Object,
        required: true,
        props: [
            [
                {
                    type: String
                },
                {
                    type: Number
                }
            ]
        ]
    }
}).verify;
