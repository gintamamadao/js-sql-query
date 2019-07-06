import { argStrArrTrans } from "../util/util";
import Query from "./query";
import { QueryTypes, DialectTypes } from "../constant/enum";
import { FieldData } from "../constant/interface";
import { Type } from "schema-verify";

const SQL_NAME = "valuesSql";
class Insert extends Query {
    protected insertData: FieldData;
    protected insertFields: string[];
    protected insertDataArr: FieldData[];
    protected queryType: QueryTypes;
    protected valuesSql: string | Function;
    constructor(dialectType: DialectTypes) {
        super();
        this.queryType = QueryTypes.insert;
        this.dialectType = dialectType;
        this.insertData = {};
        this.insertFields = [];
        this.insertDataArr = [];
    }

    data(data: FieldData) {
        if (!Type.object.isNotEmpty(data)) {
            throw new Error("Illegal Field Data");
        }
        const insertData: FieldData = Type.object.safe(this.insertData);
        this.insertData = Object.assign({}, insertData, data);
        return this;
    }

    fields(arg: any, ...otherArgs: any[]) {
        const args: string[] = argStrArrTrans(arg, otherArgs);
        const insertFields: string[] = Type.array.safe(this.insertFields);
        const result = [].concat(insertFields, args);
        this.insertFields = Array.from(new Set(result));
        return this;
    }

    multiData(dataArr: FieldData[]) {
        if (!Type.array.isNotEmpty(dataArr)) {
            throw new Error("Illegal Field Data Array");
        }
        const insertDataArr: FieldData[] = Type.array.safe(this.insertDataArr);
        this.insertDataArr = [].concat(insertDataArr, dataArr);
        return this;
    }

    values(sql: string | Function) {
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
        let fields: string[];

        if (Type.array.isNotEmpty(insertFields)) {
            fields = insertFields;
        } else if (Type.object.isNotEmpty(insertData)) {
            fields = Object.keys(insertData);
        } else if (Type.array.isNotEmpty(insertDataArr)) {
            fields = Object.keys(insertDataArr[0]);
        }

        if (!Type.array.isNotEmpty(fields)) {
            throw new Error("Illegal Insert Fields");
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
                .map(field => this.safeValue(data[field]))
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
        } else if (Type.object.isNotEmpty(insertData)) {
            result = valuesStrFormat(insertData);
        } else if (Type.array.isNotEmpty(insertDataArr)) {
            result = valuesArrStrFormat(insertDataArr);
        }

        if (!Type.string.isNotEmpty(result)) {
            throw new Error("Illegal Insert Values");
        }
        return `VALUES ${result}`;
    }

    build(): string {
        this.checkQuery();
        const type: string = this.queryType;
        const table: string = this.getQueryTable();

        const fields: string[] = this.formatFields();
        const valuesStr: string = this.formatValues(fields);
        const fieldsStr = fields.map(field => this.safeKey(field)).join(", ");
        let query: string = `${type} INTO ${table} ( ${fieldsStr} )  ${valuesStr}`;
        return query;
    }

    protected checkQuery(): void {
        this._checkQuery();
        const valuesSql: string | Function = this.valuesSql;
        const insertData: FieldData = this.insertData;
        const insertFields: string[] = this.insertFields;
        const insertDataArr: FieldData[] = this.insertDataArr;

        if (
            Type.string.isNotEmpty(valuesSql) ||
            Type.function.is(valuesSql) ||
            Type.object.is(valuesSql)
        ) {
            if (!Type.array.isNotEmpty(insertFields)) {
                throw new Error("Illegal Insert Fields");
            }
            return;
        }

        if (
            !Type.object.isNotEmpty(insertData) &&
            !Type.array.isNotEmpty(insertDataArr)
        ) {
            throw new Error("Illegal Insert Data");
        }

        if (!Type.array.isNotEmpty(insertFields)) {
            return;
        }

        const checkInsertData = data => {
            for (const field of insertFields) {
                if (Type.undefinedNull.is(data[field])) {
                    throw new Error("Illegal Insert Data");
                }
            }
        };

        if (Type.object.isNotEmpty(insertData)) {
            return checkInsertData(insertData);
        }

        if (Type.array.isNotEmpty(insertDataArr)) {
            for (const data of insertDataArr) {
                checkInsertData(data);
            }
        }
    }
}

export default Insert;
