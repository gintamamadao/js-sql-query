import Schema from "schema-verify";
export declare const pageSchema: Schema;
export declare const limitInfoSchema: Schema;
export declare const pageVerify: (data: any, throwError?: boolean | undefined, parent?: any) => boolean;
export declare const limitInfoVerify: (data: any, throwError?: boolean | undefined, parent?: any) => boolean;
