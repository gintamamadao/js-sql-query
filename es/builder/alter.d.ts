import Base from "./base";
import { AlterMethods } from "../constant/enum";
export interface AlterField {
    field?: string;
    type?: string;
    unsigned?: boolean;
    autoIncrement?: boolean;
    notNull?: boolean;
    default?: string | number;
    onUpdate?: string;
    comment?: string;
}
interface AlterInfo {
    method: AlterMethods;
    field: string;
    alterField: AlterField;
}
declare class Alter extends Base {
    protected alterInfos: AlterInfo[];
    constructor();
    checkDialect(): void;
    add(field: string | AlterField, alterField?: AlterField): this;
    drop(field: string): this;
    modify(field: string, alterField: AlterField): this;
    change(field: string, alterField: AlterField): this;
    protected alterCache(method: AlterMethods, field: string, alterField: AlterField): this;
    build(): string;
    protected feildTmpl(fieldInfo: AlterField): string;
}
export default Alter;
