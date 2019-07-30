import { QueryTypes, UpdateTypes } from "../constant/builder/enum";
import { FieldData } from "../constant/builder/interface";
import Where from "./where";
import { Type } from "schema-verify";
import {
    strArrVerify,
    fieldDataVerify,
    updateInfoVerify
} from "../verify/builder/index";
import ErrMsg from "../error/builder/index";

interface UpdateInfo {
    value: string | number;
    type: UpdateTypes;
}
interface UpdateInfos {
    [propName: string]: UpdateInfo;
}

class Update extends Where {
    protected updateInfos: UpdateInfos;
    constructor() {
        super();
        this.updateInfos = {};
    }

    build(): string {
        const table: string = this.getQueryTable();
        const data: string[] = this.formatData();
        const dataStr: string = data.join(", ");
        let query: string = `${QueryTypes.update} ${table} SET ${dataStr}`;
        query = this.whereBuild(query);
        query = this.orderBuild(query);
        query = this.limitBuild(query);
        return query;
    }

    protected formatData(): string[] {
        const updateInfos: UpdateInfos = this.updateInfos;
        if (!Type.object.isNotEmpty(updateInfos)) {
            throw new Error(ErrMsg.emptyUpdateInfo);
        }
        const result: string[] = [];
        for (const field in updateInfos) {
            const info: UpdateInfo = updateInfos[field];
            if (!updateInfoVerify(info)) {
                continue;
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
            if (Type.string.isNotEmpty(infoStr)) {
                result.push(infoStr);
            }
        }
        if (!strArrVerify(result)) {
            throw new Error(ErrMsg.emptyUpdateInfo);
        }
        return result;
    }

    protected updateCache(data: FieldData, type: UpdateTypes) {
        if (!fieldDataVerify(data)) {
            throw new Error(ErrMsg.errorFieldData);
        }
        const updateInfos: UpdateInfos = Type.object.safe(this.updateInfos);
        for (const field in data) {
            const value = data[field];
            const updateInfo = {
                value,
                type
            };
            if (!updateInfoVerify(updateInfo)) {
                throw new Error(ErrMsg.errorUpdateInfo);
            }
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
}

export default Update;
