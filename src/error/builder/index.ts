import CombineError from "./combine.error";
import InsertError from "./insert.error";
import BaseError from "./base.error";
import LimitError from "./limit.error";
import OrderError from "./order.error";
import SelectError from "./select.error";
import TermError from "./term.error";
import UpdateError from "./update.error";
import BuilderError from "./builder.error";
import CreateError from "./create.error";
import AlterError from "./alter.error";
import JoinError from "./join.error";

const ErrMsg = {
    ...CombineError,
    ...InsertError,
    ...BaseError,
    ...LimitError,
    ...OrderError,
    ...SelectError,
    ...TermError,
    ...UpdateError,
    ...BuilderError,
    ...CreateError,
    ...AlterError,
    ...JoinError,
    errorTableName: "错误的表名，需要非空字符串",
    errorField: "错误的表名，需要非空字符串",
    errorFields: "错误的字段，需要非空字符串或非空字符串数组",
    errorFieldData: "错误的字段数据",
    needStr: "需要字符串",
    needNumStr: "需要数字或者字符串",
    notSupportDialect: "无法支持当前类型数据库",
    errorTermStatus: "未设置条件类型"
};

export default ErrMsg;
