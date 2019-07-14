import CombineError from "./combine.error";
import InsertError from "./insert.error";
import SafeError from "./safe.error";
import LimitError from "./limit.error";
import OrderError from "./order.error";
import SelectError from "./select.error";
import TermError from "./term.error";
import UpdateError from "./update.error";

const ErrMsg = {
    ...CombineError,
    ...InsertError,
    ...SafeError,
    ...LimitError,
    ...OrderError,
    ...SelectError,
    ...TermError,
    ...UpdateError,
    errorTableName: "错误的表名，需要非空字符串",
    errorFields: "错误的字段，需要非空字符串或非空字符串数组",
    errorFieldData: "错误的字段数据",
    needStr: "需要字符串",
    needNumStr: "需要数字或者字符串"
};

export default ErrMsg;
