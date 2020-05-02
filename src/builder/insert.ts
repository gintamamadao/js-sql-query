import { argStrArrTrans } from "../util/util";
import Query from "./query";
import { QueryTypes } from "../constant/enum";
import { FieldData } from "../constant/interface";
import { Type } from "schema-verify";
import {
    fieldDataVerify,
    fieldDataArrVerify,
    strArrVerify,
} from "../verify/builder/index";
import ErrMsg from "../error/builder/index";

const SQL_NAME = "valuesSql";
class Insert extends Query {
    protected insertData: FieldData;
    protected insertFields: string[];
    protected insertDataArr: FieldData[];
    protected queryType: QueryTypes;
    protected valuesSql: string | Function = "";
    constructor() {
        super();
        this.queryType = QueryTypes.insert;
        this.insertData = {};
        this.insertFields = [];
        this.insertDataArr = [];
    }

    data(data: FieldData): this {
        if (!fieldDataVerify(data)) {
            throw new Error(ErrMsg.errorFieldData);
        }
        const insertData: FieldData = Type.object.safe(this.insertData);
        this.insertData = Object.assign({}, insertData, data);
        return this;
    }

    fields(arg: any, ...otherArgs: any[]): this {
        const args: string[] = argStrArrTrans(arg, otherArgs);
        const insertFields: string[] = Type.array.safe(this.insertFields);
        const result: string[] = (<string[]>[]).concat(insertFields, args);
        this.insertFields = Array.from(new Set(result));
        return this;
    }

    multiData(dataArr: FieldData[]): this {
        if (!fieldDataArrVerify(dataArr)) {
            throw new Error(ErrMsg.errorFieldDataArr);
        }
        const insertDataArr: FieldData[] = Type.array.safe(this.insertDataArr);
        this.insertDataArr = (<FieldData[]>[]).concat(insertDataArr, dataArr);
        return this;
    }

    values(sql: string | Function): this {
        this.manualSql(sql, SQL_NAME);
        return this;
    }

    protected formatValuesSql(): string {
        return this.formatManualSql(SQL_NAME);
    }

    protected formatFields(): string[] {
        const insertData: FieldData = this.insertData;
        const insertFields: string[] = this.insertFields;
        const insertDataArr: FieldData[] = this.insertDataArr;
        let fields: string[] = [];

        if (strArrVerify(insertFields)) {
            fields = insertFields;
        } else if (fieldDataVerify(insertData)) {
            fields = Object.keys(insertData);
        } else if (fieldDataArrVerify(insertDataArr)) {
            fields = Object.keys(insertDataArr[0]);
        }

        if (!strArrVerify(fields)) {
            throw new Error(ErrMsg.errorFields);
        }

        return fields;
    }

    protected formatValues(fields: string[]): string {
        fields = Type.array.safe(fields);
        let result = "";
        const valuesSql: string = this.formatValuesSql();
        const insertData: FieldData = this.insertData;
        const insertDataArr: FieldData[] = this.insertDataArr;
        const valuesArr: string[] = [];

        const valuesStrFormat = (data: FieldData): string => {
            const valuesStr: string = fields
                .map((field) => this.safeValue(data[field]))
                .join(", ");
            return `( ${valuesStr} )`;
        };
        const valuesArrStrFormat = (arr: FieldData[]): string => {
            for (const data of arr) {
                if (Type.object.isNotEmpty(data)) {
                    valuesArr.push(valuesStrFormat(data));
                }
            }
            return valuesArr.join(", ");
        };

        if (Type.string.isNotEmpty(valuesSql)) {
            result = valuesSql;
        } else if (fieldDataVerify(insertData)) {
            result = valuesStrFormat(insertData);
        } else if (fieldDataArrVerify(insertDataArr)) {
            result = valuesArrStrFormat(insertDataArr);
        }

        if (!Type.string.isNotEmpty(result)) {
            throw new Error(ErrMsg.errorInsertValues);
        }
        return `VALUES ${result}`;
    }

    build(): string {
        const type: QueryTypes = this.queryType;
        const table: string = this.getQueryTable();

        const fields: string[] = this.formatFields();
        const valuesStr: string = this.formatValues(fields);
        const fieldsStr = fields.map((field) => this.safeKey(field)).join(", ");
        return `${type} INTO ${table} ( ${fieldsStr} )  ${valuesStr}`;
    }
}

export default Insert;
