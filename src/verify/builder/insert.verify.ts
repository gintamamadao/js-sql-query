import { Schema } from "schema-verify";

const fieldDataArrSchema = new Schema({
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
});

export const fieldDataArrVerify = fieldDataArrSchema.verify;
