import Combine from "./combine";
import { TableFieldsMap, TableFieldsAsMap, JoinTableInfo, JoinTypeInfo, JoinTermInfo } from "../constant/interface";
import { JoinTypes } from "../constant/enum";
declare class Join extends Combine {
    protected queryTables: string[];
    protected tableFieldsMap: TableFieldsMap;
    protected tableFieldsAsMap: TableFieldsAsMap;
    protected joinTypeInfos: JoinTypeInfo[];
    constructor();
    protected getQueryTables(): string;
    protected formatJoinFields(): string[];
    protected joinBuild(query: string): string;
    protected joinTermBuild(termInfos: JoinTermInfo[]): string[];
    multiTables(arg: any, ...otherArgs: any[]): this;
    tableFields(fieldsMap: TableFieldsMap): this;
    tableAsMap(asMap: TableFieldsAsMap): this;
    protected join(joinInfo: JoinTableInfo, type: JoinTypes): this;
    innerJoin(joinInfo: JoinTableInfo): this;
    leftJoin(joinInfo: JoinTableInfo): this;
    rightJoin(joinInfo: JoinTableInfo): this;
}
export default Join;
