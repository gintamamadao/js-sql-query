import * as Util from "../util/util";
import Query from "./query";
import { QueryTypes, DialectTypes } from "../constant/enum";
import { FieldData } from "../constant/interface";

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
        if (!Util.isNotEmptyObj(data)) {
            throw new Error("Illegal Field Data");
        }
        const insertData: FieldData = Util.safeToObj(this.insertData);
        this.insertData = Object.assign({}, insertData, data);
        return this;
    }

    fields(fields: string[]) {
        fields = Util.safeToArr(fields);
        const insertFields: string[] = Util.safeToArr(this.insertFields);
        const result = [].concat(insertFields, fields);
        this.insertFields = Array.from(new Set(result));
        return this;
    }

    multiData(dataArr: FieldData[]) {
        if (!Util.isNotEmptyArr(dataArr)) {
            throw new Error("Illegal Field Data Array");
        }
        const insertDataArr: FieldData[] = Util.safeToArr(this.insertDataArr);
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

        if (Util.isNotEmptyArr(insertFields)) {
            fields = insertFields;
        } else if (Util.isNotEmptyObj(insertData)) {
            fields = Object.keys(insertData);
        } else if (Util.isNotEmptyArr(insertDataArr)) {
            fields = Object.keys(insertDataArr[0]);
        }

        if (!Util.isNotEmptyArr(fields)) {
            throw new Error("Illegal Insert Fields");
        }

        return fields;
    }

    protected formatValues(fields: string[]): string {
        fields = Util.safeToArr(fields);
        let result = "";
        const valuesSql: string = this.formatValuesSql();
        const insertData: FieldData = this.insertData;
        const insertDataArr: FieldData[] = this.insertDataArr;
        const valuesArr: string[] = [];

        if (Util.isNotEmptyStr(valuesSql)) {
            result = valuesSql;
        } else if (Util.isNotEmptyObj(insertData)) {
            const valuesStr: string = fields
                .map(field => this.safeValue(insertData[field]))
                .join(", ");
            result = `( ${valuesStr} )`;
        } else if (Util.isNotEmptyArr(insertDataArr)) {
            for (const data of insertDataArr) {
                const valuesStr: string = fields
                    .map(field => this.safeValue(data[field]))
                    .join(", ");
                valuesArr.push(`( ${valuesStr} )`);
            }
            result = valuesArr.join(", ");
        }

        if (!Util.isNotEmptyStr(result)) {
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

        if (Util.isNotEmptyStr(valuesSql) || Util.isFunction(valuesSql)) {
            if (!Util.isNotEmptyArr(insertFields)) {
                throw new Error("Illegal Insert Fields");
            }
            return;
        }

        if (
            !Util.isNotEmptyObj(insertData) &&
            !Util.isNotEmptyArr(insertDataArr)
        ) {
            throw new Error("Illegal Insert Data");
        }

        if (!Util.isNotEmptyArr(insertFields)) {
            return;
        }

        if (Util.isNotEmptyObj(insertData)) {
            for (const field of insertFields) {
                if (Util.isUndefinedNull(insertData[field])) {
                    throw new Error("Illegal Insert Data");
                }
            }
            return;
        }

        if (Util.isNotEmptyArr(insertDataArr)) {
            for (const data of insertDataArr) {
                for (const field of insertFields) {
                    if (Util.isUndefinedNull(data[field])) {
                        throw new Error("Illegal Insert Data");
                    }
                }
            }
        }
    }
}

export default Insert;
