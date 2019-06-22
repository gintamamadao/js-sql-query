import * as Util from "../util/util";
import { QueryTypes, DialectTypes, UpdateTypes } from "../constant/enum";
import { FieldData } from "../constant/interface";
import Where from "./where";

interface UpdateInfo {
    value: string | number;
    type: UpdateTypes;
}
interface UpdateInfos {
    [propName: string]: UpdateInfo;
}

class Update extends Where {
    protected updateInfos: UpdateInfos;
    readonly queryType: QueryTypes = QueryTypes.update;
    constructor(dialectType: DialectTypes) {
        super();
        this.dialectType = dialectType;
        this.updateInfos = {};
    }

    build(): string {
        this.checkQuery();
        const type: string = this.queryType;
        const table: string = this.getQueryTable();
        const data: string[] = this.formatData();
        const dataStr: string = data.join(", ");
        let query: string = `${type} ${table} SET ${dataStr}`;
        query = this.whereBuild(query);
        query = this.orderBuild(query);
        query = this.limitBuild(query);
        return query;
    }

    protected formatData(): string[] {
        const updateInfos: UpdateInfos = this.updateInfos;
        if (!Util.isNotEmptyObj(updateInfos)) {
            throw new Error("Illegal Update Infos");
        }
        const result: string[] = [];
        for (const field in updateInfos) {
            const info: UpdateInfo = updateInfos[field];
            if (!Util.isNotEmptyObj(info)) {
                throw new Error("Illegal Update Info");
            }
            const type: string = info.type;
            const value: string | number = info.value;
            const safeValue: string = this.safeValue(value);
            const safeField: string = this.safeKey(field);
            let infoStr: string = "";
            switch (type) {
                case UpdateTypes.set:
                    infoStr = `${safeField} = ${safeValue}`;
                    break;
                case UpdateTypes.add:
                    infoStr = `${safeField} = ${safeField} + ${safeValue}`;
                    break;
                case UpdateTypes.minus:
                    infoStr = `${safeField} = ${safeField} - ${safeValue}`;
                    break;
            }
            if (!Util.isNotEmptyStr(infoStr)) {
                throw new Error("Illegal Update Type");
            }
            result.push(infoStr);
        }
        return result;
    }

    protected updateCache(data: FieldData, type: UpdateTypes) {
        if (!Util.isNotEmptyObj(data)) {
            throw new Error("Illegal Update Data");
        }
        const updateInfos: UpdateInfos = Util.safeToObj(this.updateInfos);
        for (const field in data) {
            const value: string | number = data[field];
            if (!Util.isNotEmptyStr(value) && !Util.isLegalNum(value)) {
                throw new Error("Illegal Value Type");
            }
            const updateInfo = {
                value,
                type
            };
            updateInfos[field] = updateInfo;
        }
        this.updateInfos = updateInfos;
        return this;
    }

    set(data: FieldData) {
        return this.updateCache(data, UpdateTypes.set);
    }

    add(data: FieldData) {
        return this.updateCache(data, UpdateTypes.add);
    }

    minus(data: FieldData) {
        return this.updateCache(data, UpdateTypes.minus);
    }

    protected checkQuery(): void {
        this._checkQuery();
        const updateInfos: UpdateInfos = this.updateInfos;
        if (!Util.isNotEmptyObj(updateInfos)) {
            throw "Illegal Update Infos";
        }
    }
}

export default Update;
