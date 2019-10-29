import { Schema } from "schema-verify";

const fieldsMapSchema = new Schema({
    type: Object,
    props: {
        type: Array,
        elements: {
            type: String,
            required: true,
            minLength: 1
        }
    }
});

const fieldsAsMapSchema = new Schema({
    type: Object,
    props: {
        type: Object,
        props: {
            type: String,
            required: true,
            minLength: 1
        }
    }
});

const joinInfoSchema = new Schema({
    type: Object,
    props: {
        tableName: {
            type: String,
            required: true,
            minLength: 1
        },
        termInfos: {
            type: Array,
            required: true,
            elements: {
                type: Object,
                props: {
                    symbol: {
                        type: String,
                        required: true,
                        minLength: 1
                    },
                    tableFields: {
                        type: Object,
                        props: {
                            type: String,
                            required: true,
                            minLength: 1
                        }
                    }
                }
            }
        }
    }
});

export const fieldsMapVerify = fieldsMapSchema.verify;
export const fieldsAsMapVerify = fieldsAsMapSchema.verify;
export const joinInfoVerify = joinInfoSchema.verify;
