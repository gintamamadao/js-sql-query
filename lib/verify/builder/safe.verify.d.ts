import Schema from "schema-verify";
export declare const dialectSchema: Schema;
export declare const manualSqlSchema: Schema;
export declare const dialectVerify: (data: any, throwError?: boolean | undefined, parent?: any) => boolean;
export declare const manualSqlVerify: (data: any, throwError?: boolean | undefined, parent?: any) => boolean;
