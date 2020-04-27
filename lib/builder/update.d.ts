import { UpdateTypes } from "../constant/enum";
import { FieldData } from "../constant/interface";
import Where from "./where";
interface UpdateInfo {
    value: string | number;
    type: UpdateTypes;
}
interface UpdateInfos {
    [propName: string]: UpdateInfo;
}
declare class Update extends Where {
    protected updateInfos: UpdateInfos;
    constructor();
    build(): string;
    protected formatData(): string[];
    protected updateCache(data: FieldData, type: UpdateTypes): this;
    set(data: FieldData): this;
    add(data: FieldData): this;
    minus(data: FieldData): this;
}
export default Update;
