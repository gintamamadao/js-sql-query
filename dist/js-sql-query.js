'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var schemaVerify = _interopDefault(require('schema-verify'));
var mysql = _interopDefault(require('mysql'));

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var util = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function analyTmpl(tmpl, opts) {
    return tmpl.replace(/\{\{([a-zA-Z_0-9]+)\}\}/g, function (match, key) {
      if (opts.hasOwnProperty(key) && schemaVerify.Type.string.isNotEmpty(opts[key])) {
        return opts[key] + " ";
      } else {
        return "";
      }
    }).trim();
  }

  exports.analyTmpl = analyTmpl;

  function argStrArrTrans(arg, otherArgs) {
    let args = [];

    if (schemaVerify.Type.array.is(arg)) {
      args = arg;
    } else {
      otherArgs = schemaVerify.Type.array.safe(otherArgs);
      otherArgs.unshift(arg);
      args = otherArgs;
    }

    return args;
  }

  exports.argStrArrTrans = argStrArrTrans;
});
unwrapExports(util);
var util_1 = util.analyTmpl;
var util_2 = util.argStrArrTrans;

var combine_error = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorFuncInfo: "错误的组合函数信息"
  };
  exports.default = ErrMsg;
});
unwrapExports(combine_error);

var insert_error = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorFieldDataArr: "错误的字段数据组",
    errorInsertValues: "错误的插入值"
  };
  exports.default = ErrMsg;
});
unwrapExports(insert_error);

var base_error = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorDialect: "错误的数据库类型",
    errorManualSql: "错误的自定义sql",
    errorExecute: "错误的数据库连接",
    emptySqlQuery: "缺少sql语句"
  };
  exports.default = ErrMsg;
});
unwrapExports(base_error);

var limit_error = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorPage: "错误的页码",
    errorSize: "错误的页码",
    errorStep: "错误的步长",
    errorOffset: "错误的偏移"
  };
  exports.default = ErrMsg;
});
unwrapExports(limit_error);

var order_error = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorOrderInfo: "错误的排序信息",
    errorValueList: "需要非空数组"
  };
  exports.default = ErrMsg;
});
unwrapExports(order_error);

var select_error = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorFieldMap: "错误的字段映射"
  };
  exports.default = ErrMsg;
});
unwrapExports(select_error);

var term_error = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorTermdata: "错误的条件数据",
    errorTermSign: "错误的条件类型",
    errorTermValue: "错误的条件值",
    errorTermInfo: "错误的条件信息",
    errorTermBracket: "错误的条件括号信息",
    errorTermLogic: "错误的条件逻辑"
  };
  exports.default = ErrMsg;
});
unwrapExports(term_error);

var update_error = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    emptyUpdateInfo: "缺少更新信息",
    errorUpdateInfo: "错误的更新信息"
  };
  exports.default = ErrMsg;
});
unwrapExports(update_error);

var builder_error = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    emptyQueryType: "未选择sql类型"
  };
  exports.default = ErrMsg;
});
unwrapExports(builder_error);

var create_error = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorTableInfo: "错误的表信息"
  };
  exports.default = ErrMsg;
});
unwrapExports(create_error);

var alter_error = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorAlterField: "错误的修改配置",
    emptyAlterInfos: "空的修改配置"
  };
  exports.default = ErrMsg;
});
unwrapExports(alter_error);

var combine_error$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorFuncInfo: "错误的组合函数信息"
  };
  exports.default = ErrMsg;
});
unwrapExports(combine_error$1);

var insert_error$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorFieldDataArr: "错误的字段数据组",
    errorInsertValues: "错误的插入值"
  };
  exports.default = ErrMsg;
});
unwrapExports(insert_error$1);

var base_error$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorDialect: "错误的数据库类型",
    errorManualSql: "错误的自定义sql",
    errorExecute: "错误的数据库连接",
    emptySqlQuery: "缺少sql语句"
  };
  exports.default = ErrMsg;
});
unwrapExports(base_error$1);

var limit_error$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorPage: "错误的页码",
    errorSize: "错误的页码",
    errorStep: "错误的步长",
    errorOffset: "错误的偏移"
  };
  exports.default = ErrMsg;
});
unwrapExports(limit_error$1);

var order_error$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorOrderInfo: "错误的排序信息",
    errorValueList: "需要非空数组"
  };
  exports.default = ErrMsg;
});
unwrapExports(order_error$1);

var select_error$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorFieldMap: "错误的字段映射"
  };
  exports.default = ErrMsg;
});
unwrapExports(select_error$1);

var term_error$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorTermdata: "错误的条件数据",
    errorTermSign: "错误的条件类型",
    errorTermValue: "错误的条件值",
    errorTermInfo: "错误的条件信息",
    errorTermBracket: "错误的条件括号信息",
    errorTermLogic: "错误的条件逻辑"
  };
  exports.default = ErrMsg;
});
unwrapExports(term_error$1);

var update_error$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    emptyUpdateInfo: "缺少更新信息",
    errorUpdateInfo: "错误的更新信息"
  };
  exports.default = ErrMsg;
});
unwrapExports(update_error$1);

var builder_error$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    emptyQueryType: "未选择sql类型"
  };
  exports.default = ErrMsg;
});
unwrapExports(builder_error$1);

var create_error$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorTableInfo: "错误的表信息"
  };
  exports.default = ErrMsg;
});
unwrapExports(create_error$1);

var alter_error$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorAlterField: "错误的修改配置",
    emptyAlterInfos: "空的修改配置"
  };
  exports.default = ErrMsg;
});
unwrapExports(alter_error$1);

var D__vmproject_jsSqlQuery_src_error_builder = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = { ...combine_error$1.default,
    ...insert_error$1.default,
    ...base_error$1.default,
    ...limit_error$1.default,
    ...order_error$1.default,
    ...select_error$1.default,
    ...term_error$1.default,
    ...update_error$1.default,
    ...builder_error$1.default,
    ...create_error$1.default,
    ...alter_error$1.default,
    errorTableName: "错误的表名，需要非空字符串",
    errorField: "错误的表名，需要非空字符串",
    errorFields: "错误的字段，需要非空字符串或非空字符串数组",
    errorFieldData: "错误的字段数据",
    needStr: "需要字符串",
    needNumStr: "需要数字或者字符串"
  };
  exports.default = ErrMsg;
});
unwrapExports(D__vmproject_jsSqlQuery_src_error_builder);

var builder = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = { ...combine_error$1.default,
    ...insert_error$1.default,
    ...base_error$1.default,
    ...limit_error$1.default,
    ...order_error$1.default,
    ...select_error$1.default,
    ...term_error$1.default,
    ...update_error$1.default,
    ...builder_error$1.default,
    ...create_error$1.default,
    ...alter_error$1.default,
    errorTableName: "错误的表名，需要非空字符串",
    errorField: "错误的表名，需要非空字符串",
    errorFields: "错误的字段，需要非空字符串或非空字符串数组",
    errorFieldData: "错误的字段数据",
    needStr: "需要字符串",
    needNumStr: "需要数字或者字符串"
  };
  exports.default = ErrMsg;
});
unwrapExports(builder);

var dialects = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const DialectsObj = {
    mysql: {
      safeValue(value) {
        let result;

        if (typeof value === "string") {
          value = value.replace(/\'/g, () => "''").replace(/\\/g, () => "\\\\");
          result = `'${value}'`;
        }

        if (schemaVerify.Type.number.is(value)) {
          result = `'${value}'`;
        }

        if (!result) {
          throw new Error(builder.default.needNumStr);
        }

        return result;
      },

      safeKey(key) {
        let result;

        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error(builder.default.needStr);
        }

        result = key.replace(/`/g, "``");
        return "`" + result + "`";
      }

    },
    mssql: {
      safeValue(value) {
        let result;

        if (typeof value === "string") {
          value = value.replace(/\'/g, () => "''");
          result = `'${value}'`;
        }

        if (schemaVerify.Type.number.is(value)) {
          result = `'${value}'`;
        }

        if (!result) {
          throw new Error(builder.default.needNumStr);
        }

        return result;
      },

      safeKey(key) {
        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error(builder.default.needStr);
        }

        return `[${key}]`;
      }

    },
    postgresql: {
      safeValue(value) {
        let result;

        if (typeof value === "string") {
          value = value.replace(/\'/g, () => "''");
          result = `'${value}'`;
        }

        if (schemaVerify.Type.number.is(value)) {
          result = `'${value}'`;
        }

        if (!result) {
          throw new Error(builder.default.needNumStr);
        }

        return result;
      },

      safeKey(key) {
        let result;

        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error(builder.default.needStr);
        }

        result = key.replace(/\"/g, '""');
        return `"${result}"`;
      }

    },
    sqlite: {
      safeValue(value) {
        let result;

        if (typeof value === "string") {
          value = value.replace(/\'/g, () => "''");
          result = `'${value}'`;
        }

        if (schemaVerify.Type.number.is(value)) {
          result = `'${value}'`;
        }

        if (!result) {
          throw new Error(builder.default.needNumStr);
        }

        return result;
      },

      safeKey(key) {
        let result;

        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error(builder.default.needStr);
        }

        result = key.replace(/`/g, "``");
        return "`" + result + "`";
      }

    }
  };
  exports.default = DialectsObj;
});
unwrapExports(dialects);

var insert_verify = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const fieldDataArrSchema = new schemaVerify.Schema({
    type: Array,
    elements: {
      type: Object,
      required: true,
      props: [[{
        type: String
      }, {
        type: Number
      }]]
    }
  });
  exports.fieldDataArrVerify = fieldDataArrSchema.verify;
});
unwrapExports(insert_verify);
var insert_verify_1 = insert_verify.fieldDataArrVerify;

var _enum = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var DialectTypes;

  (function (DialectTypes) {
    DialectTypes["mysql"] = "mysql";
    DialectTypes["mssql"] = "mssql";
    DialectTypes["postgresql"] = "postgresql";
    DialectTypes["sqlite"] = "sqlite";
  })(DialectTypes = exports.DialectTypes || (exports.DialectTypes = {}));

  var QueryTypes;

  (function (QueryTypes) {
    QueryTypes["insert"] = "INSERT";
    QueryTypes["replace"] = "REPLACE";
    QueryTypes["select"] = "SELECT";
    QueryTypes["update"] = "UPDATE";
    QueryTypes["delete"] = "DELETE";
    QueryTypes["create"] = "CREATE";
    QueryTypes["alter"] = "ALTER";
  })(QueryTypes = exports.QueryTypes || (exports.QueryTypes = {}));

  var FuncTypes;

  (function (FuncTypes) {
    FuncTypes["count"] = "COUNT";
    FuncTypes["sum"] = "SUM";
    FuncTypes["max"] = "MAX";
    FuncTypes["min"] = "MIN";
    FuncTypes["avg"] = "AVG";
    FuncTypes["abs"] = "ABS";
    FuncTypes["ceil"] = "CEIL";
    FuncTypes["floor"] = "FLOOR";
    FuncTypes["round"] = "ROUND";
    FuncTypes["log"] = "LOG";
    FuncTypes["log2"] = "LOG2";
    FuncTypes["exp"] = "EXP";
    FuncTypes["power"] = "POWER";
    FuncTypes["acos"] = "ACOS";
    FuncTypes["asin"] = "ASIN";
    FuncTypes["atan"] = "ATAN";
    FuncTypes["cos"] = "COS";
    FuncTypes["sin"] = "SIN";
    FuncTypes["tan"] = "TAN";
    FuncTypes["conv"] = "CONV";
    FuncTypes["random"] = "RANDOM";
    FuncTypes["rand"] = "RAND";
    FuncTypes["radians"] = "RADIANS";
    FuncTypes["degrees"] = "DEGREES";
    FuncTypes["distinct"] = "DISTINCT";
  })(FuncTypes = exports.FuncTypes || (exports.FuncTypes = {}));

  var TermLogic;

  (function (TermLogic) {
    TermLogic["and"] = "AND";
    TermLogic["or"] = "OR";
  })(TermLogic = exports.TermLogic || (exports.TermLogic = {}));

  var TermSign;

  (function (TermSign) {
    TermSign["equal"] = "=";
    TermSign["notEqual"] = "<>";
    TermSign["more"] = ">";
    TermSign["less"] = "<";
    TermSign["moreEqual"] = ">=";
    TermSign["lessEqual"] = "<=";
    TermSign["like"] = "LIKE";
    TermSign["notlike"] = "NOT LIKE";
    TermSign["isNot"] = "IS NOT";
    TermSign["in"] = "IN";
    TermSign["notIn"] = "NOT IN";
    TermSign["between"] = "BETWEEN";
    TermSign["notBetween"] = "NOT BETWEEN";
  })(TermSign = exports.TermSign || (exports.TermSign = {}));

  var OrderTypes;

  (function (OrderTypes) {
    OrderTypes["desc"] = "DESC";
    OrderTypes["asc"] = "ASC";
    OrderTypes["field"] = "FIELD";
  })(OrderTypes = exports.OrderTypes || (exports.OrderTypes = {}));

  var UpdateTypes;

  (function (UpdateTypes) {
    UpdateTypes["set"] = "SET";
    UpdateTypes["add"] = "ADD";
    UpdateTypes["minus"] = "MINUS";
  })(UpdateTypes = exports.UpdateTypes || (exports.UpdateTypes = {}));

  var WidgetTypes;

  (function (WidgetTypes) {
    WidgetTypes["func"] = "FUNC";
    WidgetTypes["term"] = "TERM";
    WidgetTypes["order"] = "ORDER";
  })(WidgetTypes = exports.WidgetTypes || (exports.WidgetTypes = {}));

  var SqlDataTypes;

  (function (SqlDataTypes) {
    SqlDataTypes["tinyint"] = "TINYINT";
    SqlDataTypes["smallint"] = "SMALLINT";
    SqlDataTypes["mediumint"] = "MEDIUMINT";
    SqlDataTypes["int"] = "INT";
    SqlDataTypes["bigint"] = "BIGINT";
    SqlDataTypes["float"] = "FLOAT";
    SqlDataTypes["double"] = "DOUBLE";
    SqlDataTypes["decimal"] = "DECIMAL";
    SqlDataTypes["date"] = "DATE";
    SqlDataTypes["time"] = "TIME";
    SqlDataTypes["year"] = "YEAR";
    SqlDataTypes["datetime"] = "DATETIME";
    SqlDataTypes["timestamp"] = "TIMESTAMP";
    SqlDataTypes["char"] = "CHAR";
    SqlDataTypes["varchar"] = "VARCHAR";
    SqlDataTypes["tinyblob"] = "TINYBLOB";
    SqlDataTypes["tinytest"] = "TINYTEXT";
    SqlDataTypes["blob"] = "BLOB";
    SqlDataTypes["test"] = "TEXT";
    SqlDataTypes["mediumblob"] = "MEDIUMBLOB";
    SqlDataTypes["mediumtext"] = "MEDIUMTEXT";
    SqlDataTypes["longblob"] = "LONGBLOB";
    SqlDataTypes["longtext"] = "LONGTEXT";
  })(SqlDataTypes = exports.SqlDataTypes || (exports.SqlDataTypes = {}));

  var TableOptions;

  (function (TableOptions) {
    TableOptions["primaryKey"] = "PRIMARY KEY";
    TableOptions["uniqueKey"] = "UNIQUE KEY";
    TableOptions["engine"] = "ENGINE";
    TableOptions["autoIncrement"] = "AUTO_INCREMENT";
    TableOptions["defaultCharset"] = "DEFAULT CHARSET";
    TableOptions["comment"] = "COMMENT";
    TableOptions["unsigned"] = "UNSIGNED";
    TableOptions["notNull"] = "NOT NULL";
    TableOptions["default"] = "DEFAULT";
    TableOptions["onUpdate"] = "ON UPDATE";
    TableOptions["constraint"] = "CONSTRAINT";
  })(TableOptions = exports.TableOptions || (exports.TableOptions = {}));

  var AlterMethods;

  (function (AlterMethods) {
    AlterMethods["add"] = "ADD";
    AlterMethods["drop"] = "DROP";
    AlterMethods["modify"] = "MODIFY";
    AlterMethods["change"] = "CHANGE";
  })(AlterMethods = exports.AlterMethods || (exports.AlterMethods = {}));
});

unwrapExports(_enum);
var _enum_1 = _enum.DialectTypes;
var _enum_2 = _enum.QueryTypes;
var _enum_3 = _enum.FuncTypes;
var _enum_4 = _enum.TermLogic;
var _enum_5 = _enum.TermSign;
var _enum_6 = _enum.OrderTypes;
var _enum_7 = _enum.UpdateTypes;
var _enum_8 = _enum.WidgetTypes;
var _enum_9 = _enum.SqlDataTypes;
var _enum_10 = _enum.TableOptions;
var _enum_11 = _enum.AlterMethods;

var _enum$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var DialectTypes;

  (function (DialectTypes) {
    DialectTypes["mysql"] = "mysql";
    DialectTypes["mssql"] = "mssql";
    DialectTypes["postgresql"] = "postgresql";
    DialectTypes["sqlite"] = "sqlite";
  })(DialectTypes = exports.DialectTypes || (exports.DialectTypes = {}));

  var QueryTypes;

  (function (QueryTypes) {
    QueryTypes["insert"] = "INSERT";
    QueryTypes["replace"] = "REPLACE";
    QueryTypes["select"] = "SELECT";
    QueryTypes["update"] = "UPDATE";
    QueryTypes["delete"] = "DELETE";
    QueryTypes["create"] = "CREATE";
    QueryTypes["alter"] = "ALTER";
  })(QueryTypes = exports.QueryTypes || (exports.QueryTypes = {}));

  var FuncTypes;

  (function (FuncTypes) {
    FuncTypes["count"] = "COUNT";
    FuncTypes["sum"] = "SUM";
    FuncTypes["max"] = "MAX";
    FuncTypes["min"] = "MIN";
    FuncTypes["avg"] = "AVG";
    FuncTypes["abs"] = "ABS";
    FuncTypes["ceil"] = "CEIL";
    FuncTypes["floor"] = "FLOOR";
    FuncTypes["round"] = "ROUND";
    FuncTypes["log"] = "LOG";
    FuncTypes["log2"] = "LOG2";
    FuncTypes["exp"] = "EXP";
    FuncTypes["power"] = "POWER";
    FuncTypes["acos"] = "ACOS";
    FuncTypes["asin"] = "ASIN";
    FuncTypes["atan"] = "ATAN";
    FuncTypes["cos"] = "COS";
    FuncTypes["sin"] = "SIN";
    FuncTypes["tan"] = "TAN";
    FuncTypes["conv"] = "CONV";
    FuncTypes["random"] = "RANDOM";
    FuncTypes["rand"] = "RAND";
    FuncTypes["radians"] = "RADIANS";
    FuncTypes["degrees"] = "DEGREES";
    FuncTypes["distinct"] = "DISTINCT";
  })(FuncTypes = exports.FuncTypes || (exports.FuncTypes = {}));

  var TermLogic;

  (function (TermLogic) {
    TermLogic["and"] = "AND";
    TermLogic["or"] = "OR";
  })(TermLogic = exports.TermLogic || (exports.TermLogic = {}));

  var TermSign;

  (function (TermSign) {
    TermSign["equal"] = "=";
    TermSign["notEqual"] = "<>";
    TermSign["more"] = ">";
    TermSign["less"] = "<";
    TermSign["moreEqual"] = ">=";
    TermSign["lessEqual"] = "<=";
    TermSign["like"] = "LIKE";
    TermSign["notlike"] = "NOT LIKE";
    TermSign["isNot"] = "IS NOT";
    TermSign["in"] = "IN";
    TermSign["notIn"] = "NOT IN";
    TermSign["between"] = "BETWEEN";
    TermSign["notBetween"] = "NOT BETWEEN";
  })(TermSign = exports.TermSign || (exports.TermSign = {}));

  var OrderTypes;

  (function (OrderTypes) {
    OrderTypes["desc"] = "DESC";
    OrderTypes["asc"] = "ASC";
    OrderTypes["field"] = "FIELD";
  })(OrderTypes = exports.OrderTypes || (exports.OrderTypes = {}));

  var UpdateTypes;

  (function (UpdateTypes) {
    UpdateTypes["set"] = "SET";
    UpdateTypes["add"] = "ADD";
    UpdateTypes["minus"] = "MINUS";
  })(UpdateTypes = exports.UpdateTypes || (exports.UpdateTypes = {}));

  var WidgetTypes;

  (function (WidgetTypes) {
    WidgetTypes["func"] = "FUNC";
    WidgetTypes["term"] = "TERM";
    WidgetTypes["order"] = "ORDER";
  })(WidgetTypes = exports.WidgetTypes || (exports.WidgetTypes = {}));

  var SqlDataTypes;

  (function (SqlDataTypes) {
    SqlDataTypes["tinyint"] = "TINYINT";
    SqlDataTypes["smallint"] = "SMALLINT";
    SqlDataTypes["mediumint"] = "MEDIUMINT";
    SqlDataTypes["int"] = "INT";
    SqlDataTypes["bigint"] = "BIGINT";
    SqlDataTypes["float"] = "FLOAT";
    SqlDataTypes["double"] = "DOUBLE";
    SqlDataTypes["decimal"] = "DECIMAL";
    SqlDataTypes["date"] = "DATE";
    SqlDataTypes["time"] = "TIME";
    SqlDataTypes["year"] = "YEAR";
    SqlDataTypes["datetime"] = "DATETIME";
    SqlDataTypes["timestamp"] = "TIMESTAMP";
    SqlDataTypes["char"] = "CHAR";
    SqlDataTypes["varchar"] = "VARCHAR";
    SqlDataTypes["tinyblob"] = "TINYBLOB";
    SqlDataTypes["tinytest"] = "TINYTEXT";
    SqlDataTypes["blob"] = "BLOB";
    SqlDataTypes["test"] = "TEXT";
    SqlDataTypes["mediumblob"] = "MEDIUMBLOB";
    SqlDataTypes["mediumtext"] = "MEDIUMTEXT";
    SqlDataTypes["longblob"] = "LONGBLOB";
    SqlDataTypes["longtext"] = "LONGTEXT";
  })(SqlDataTypes = exports.SqlDataTypes || (exports.SqlDataTypes = {}));

  var TableOptions;

  (function (TableOptions) {
    TableOptions["primaryKey"] = "PRIMARY KEY";
    TableOptions["uniqueKey"] = "UNIQUE KEY";
    TableOptions["engine"] = "ENGINE";
    TableOptions["autoIncrement"] = "AUTO_INCREMENT";
    TableOptions["defaultCharset"] = "DEFAULT CHARSET";
    TableOptions["comment"] = "COMMENT";
    TableOptions["unsigned"] = "UNSIGNED";
    TableOptions["notNull"] = "NOT NULL";
    TableOptions["default"] = "DEFAULT";
    TableOptions["onUpdate"] = "ON UPDATE";
    TableOptions["constraint"] = "CONSTRAINT";
  })(TableOptions = exports.TableOptions || (exports.TableOptions = {}));

  var AlterMethods;

  (function (AlterMethods) {
    AlterMethods["add"] = "ADD";
    AlterMethods["drop"] = "DROP";
    AlterMethods["modify"] = "MODIFY";
    AlterMethods["change"] = "CHANGE";
  })(AlterMethods = exports.AlterMethods || (exports.AlterMethods = {}));
});

unwrapExports(_enum$1);
var _enum_1$1 = _enum$1.DialectTypes;
var _enum_2$1 = _enum$1.QueryTypes;
var _enum_3$1 = _enum$1.FuncTypes;
var _enum_4$1 = _enum$1.TermLogic;
var _enum_5$1 = _enum$1.TermSign;
var _enum_6$1 = _enum$1.OrderTypes;
var _enum_7$1 = _enum$1.UpdateTypes;
var _enum_8$1 = _enum$1.WidgetTypes;
var _enum_9$1 = _enum$1.SqlDataTypes;
var _enum_10$1 = _enum$1.TableOptions;
var _enum_11$1 = _enum$1.AlterMethods;

var combine_verify = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const funcInfoSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      index: "funcFeild",
      required: true,
      type: String
    }]
  });
  const funcInputSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      type: String,
      index: "func",
      required: true,
      custom: value => {
        return !!_enum$1.FuncTypes[value];
      }
    }, [{
      index: "field",
      required: true,
      type: String
    }, {
      type: Number
    }]]
  });
  exports.funcInfoVerify = funcInfoSchema.verify;
  exports.funcInputVerify = funcInputSchema.verify;
});
unwrapExports(combine_verify);
var combine_verify_1 = combine_verify.funcInfoVerify;
var combine_verify_2 = combine_verify.funcInputVerify;

var safe_verify = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.dialectSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      index: "safeKey",
      required: true,
      type: Function
    }, {
      index: "safeValue",
      required: true,
      type: Function
    }]
  });
  exports.manualSqlSchema = new schemaVerify.Schema([{
    type: String,
    minLength: 1
  }, {
    type: Function
  }, {
    type: Object
  }]);
  exports.dialectVerify = exports.dialectSchema.verify;
  exports.manualSqlVerify = exports.manualSqlSchema.verify;
});
unwrapExports(safe_verify);
var safe_verify_1 = safe_verify.dialectSchema;
var safe_verify_2 = safe_verify.manualSqlSchema;
var safe_verify_3 = safe_verify.dialectVerify;
var safe_verify_4 = safe_verify.manualSqlVerify;

var limit_verify = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pageSchema = new schemaVerify.Schema({
    type: Number,
    integer: true,
    min: 1
  });
  exports.limitInfoSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      type: Number,
      index: "offset",
      integer: true,
      required: true
    }, {
      type: Number,
      index: "step",
      integer: true,
      required: true
    }]
  });
  exports.pageVerify = exports.pageSchema.verify;
  exports.limitInfoVerify = exports.limitInfoSchema.verify;
});
unwrapExports(limit_verify);
var limit_verify_1 = limit_verify.pageSchema;
var limit_verify_2 = limit_verify.limitInfoSchema;
var limit_verify_3 = limit_verify.pageVerify;
var limit_verify_4 = limit_verify.limitInfoVerify;

var order_verify = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.orderInfoSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      index: "field",
      required: true,
      type: String
    }, {
      index: "type",
      required: true,
      type: String,
      enum: _enum$1.OrderTypes
    }, {
      index: "list",
      type: Array,
      elements: [[{
        type: String,
        required: true,
        minLength: 1
      }, {
        type: Number
      }]]
    }]
  });
  exports.valueListSchema = new schemaVerify.Schema({
    type: Array,
    elements: [[{
      type: String,
      required: true,
      minLength: 1
    }, {
      type: Number
    }]]
  });
  exports.orderInfoVerify = exports.orderInfoSchema.verify;
  exports.valueListVerify = exports.valueListSchema.verify;
});
unwrapExports(order_verify);
var order_verify_1 = order_verify.orderInfoSchema;
var order_verify_2 = order_verify.valueListSchema;
var order_verify_3 = order_verify.orderInfoVerify;
var order_verify_4 = order_verify.valueListVerify;

var term_verify = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const termDataSchema = new schemaVerify.Schema({
    type: Object,
    props: [[{
      required: true,
      type: String
    }, {
      type: Number
    }, {
      type: Array,
      minLength: 1,
      elements: [[{
        type: String,
        required: true
      }, {
        type: Number
      }]]
    }]]
  });
  const termSignSchema = new schemaVerify.Schema({
    type: String,
    enum: _enum$1.TermSign
  });
  const termLogicSchema = new schemaVerify.Schema({
    type: String,
    enum: _enum$1.TermLogic
  });
  const termValueSchema = new schemaVerify.Schema([{
    required: true,
    type: String
  }, {
    type: Number
  }]);
  const termInSchema = new schemaVerify.Schema({
    type: Array,
    minLength: 1,
    elements: [[{
      type: String,
      required: true
    }, {
      type: Number
    }]]
  });
  const termBetweenSchema = new schemaVerify.Schema({
    type: Array,
    length: 2,
    elements: [[{
      type: String,
      required: true
    }, {
      type: Number
    }]]
  });
  const termBracketSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      index: "position",
      required: true,
      type: Number,
      min: 1
    }, {
      index: "logic",
      required: true,
      type: String,
      enum: _enum$1.TermLogic
    }]
  });
  const termInfoSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      index: "field",
      required: true,
      type: String,
      minLength: 1
    }, [{
      index: "value",
      required: true,
      type: String
    }, {
      type: Number
    }, {
      type: Array,
      minLength: 1,
      elements: [[{
        type: String,
        required: true
      }, {
        type: Number
      }]]
    }], {
      index: "sign",
      required: true,
      type: String,
      enum: _enum$1.TermSign
    }, {
      index: "logic",
      required: true,
      type: String,
      enum: _enum$1.TermLogic
    }]
  });
  exports.termDataVerify = termDataSchema.verify;
  exports.termSignVerify = termSignSchema.verify;
  exports.termLogicVerify = termLogicSchema.verify;
  exports.termValueVerify = termValueSchema.verify;
  exports.termInVerify = termInSchema.verify;
  exports.termBetweenVerify = termBetweenSchema.verify;
  exports.termBracketVerify = termBracketSchema.verify;
  exports.termInfoVerify = termInfoSchema.verify;
});
unwrapExports(term_verify);
var term_verify_1 = term_verify.termDataVerify;
var term_verify_2 = term_verify.termSignVerify;
var term_verify_3 = term_verify.termLogicVerify;
var term_verify_4 = term_verify.termValueVerify;
var term_verify_5 = term_verify.termInVerify;
var term_verify_6 = term_verify.termBetweenVerify;
var term_verify_7 = term_verify.termBracketVerify;
var term_verify_8 = term_verify.termInfoVerify;

var update_verify = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const updateInfoSchema = new schemaVerify.Schema({
    type: Object,
    props: [[{
      index: "value",
      required: true,
      type: String
    }, {
      type: Number
    }], {
      index: "type",
      required: true,
      type: String,
      enum: _enum$1.UpdateTypes
    }]
  });
  exports.updateInfoVerify = updateInfoSchema.verify;
});
unwrapExports(update_verify);
var update_verify_1 = update_verify.updateInfoVerify;

var create_verify = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const tableFieldSchema = new schemaVerify.Schema({
    type: Object,
    props: [{
      index: "field",
      required: true,
      type: String,
      minLength: 1
    }, {
      index: "type",
      required: true,
      type: String,
      minLength: 1
    }, {
      index: "unsigned",
      type: Boolean
    }, {
      index: "autoIncrement",
      type: Boolean
    }, {
      index: "notNull",
      type: Boolean
    }, [{
      index: "default",
      type: String
    }, {
      type: Number
    }], {
      index: "onUpdate",
      type: String
    }, {
      index: "comment",
      type: String
    }]
  });
  const combineKeySchema = new schemaVerify.Schema({
    type: Object,
    props: [{
      index: "keyName",
      required: true,
      type: String,
      minLength: 1
    }, {
      index: "combineFields",
      required: true,
      type: Array,
      minLength: 1,
      elements: {
        type: String,
        minLength: 1
      }
    }]
  });
  const tableInfoSchema = new schemaVerify.Schema({
    type: Object,
    props: [{
      index: "tableName",
      required: true,
      type: String,
      minLength: 1
    }, [{
      index: "primaryKey",
      required: true,
      type: String,
      minLength: 1
    }, combineKeySchema], [{
      index: "uniqueKey",
      type: String,
      minLength: 1
    }, combineKeySchema], {
      index: "engine",
      type: String
    }, {
      index: "defaultCharset",
      type: String
    }, {
      index: "comment",
      type: String
    }, {
      index: "autoIncrement",
      type: Number
    }, {
      index: "fields",
      type: Array,
      minLength: 1,
      elements: tableFieldSchema
    }]
  });
  exports.tableFieldVerify = tableFieldSchema.verify;
  exports.uniqueKeyVerify = combineKeySchema.verify;
  exports.tableInfoVerify = tableInfoSchema.verify;
});
unwrapExports(create_verify);
var create_verify_1 = create_verify.tableFieldVerify;
var create_verify_2 = create_verify.uniqueKeyVerify;
var create_verify_3 = create_verify.tableInfoVerify;

var alter_verify = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const alterFieldSchema = new schemaVerify.Schema({
    type: Object,
    props: [{
      index: "field",
      type: String,
      minLength: 1
    }, {
      index: "type",
      type: String,
      minLength: 1
    }, {
      index: "unsigned",
      type: Boolean
    }, {
      index: "autoIncrement",
      type: Boolean
    }, {
      index: "notNull",
      type: Boolean
    }, [{
      index: "default",
      type: String
    }, {
      type: Number
    }], {
      index: "onUpdate",
      type: String
    }, {
      index: "comment",
      type: String
    }]
  });
  const alterInfosSchema = new schemaVerify.Schema({
    type: Object,
    props: [{
      index: "method",
      required: true,
      type: String,
      enum: _enum$1.AlterMethods
    }, {
      index: "field",
      required: true,
      type: String,
      minLength: 1
    }, {
      index: "alterField",
      required: true,
      schema: alterFieldSchema
    }]
  });
  exports.alterFieldVerify = alterFieldSchema.verify;
  exports.alterInfosVerify = alterInfosSchema.verify;
});
unwrapExports(alter_verify);
var alter_verify_1 = alter_verify.alterFieldVerify;
var alter_verify_2 = alter_verify.alterInfosVerify;

var insert_verify$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const fieldDataArrSchema = new schemaVerify.Schema({
    type: Array,
    elements: {
      type: Object,
      required: true,
      props: [[{
        type: String
      }, {
        type: Number
      }]]
    }
  });
  exports.fieldDataArrVerify = fieldDataArrSchema.verify;
});
unwrapExports(insert_verify$1);
var insert_verify_1$1 = insert_verify$1.fieldDataArrVerify;

var combine_verify$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const funcInfoSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      index: "funcFeild",
      required: true,
      type: String
    }]
  });
  const funcInputSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      type: String,
      index: "func",
      required: true,
      custom: value => {
        return !!_enum$1.FuncTypes[value];
      }
    }, [{
      index: "field",
      required: true,
      type: String
    }, {
      type: Number
    }]]
  });
  exports.funcInfoVerify = funcInfoSchema.verify;
  exports.funcInputVerify = funcInputSchema.verify;
});
unwrapExports(combine_verify$1);
var combine_verify_1$1 = combine_verify$1.funcInfoVerify;
var combine_verify_2$1 = combine_verify$1.funcInputVerify;

var safe_verify$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.dialectSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      index: "safeKey",
      required: true,
      type: Function
    }, {
      index: "safeValue",
      required: true,
      type: Function
    }]
  });
  exports.manualSqlSchema = new schemaVerify.Schema([{
    type: String,
    minLength: 1
  }, {
    type: Function
  }, {
    type: Object
  }]);
  exports.dialectVerify = exports.dialectSchema.verify;
  exports.manualSqlVerify = exports.manualSqlSchema.verify;
});
unwrapExports(safe_verify$1);
var safe_verify_1$1 = safe_verify$1.dialectSchema;
var safe_verify_2$1 = safe_verify$1.manualSqlSchema;
var safe_verify_3$1 = safe_verify$1.dialectVerify;
var safe_verify_4$1 = safe_verify$1.manualSqlVerify;

var limit_verify$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pageSchema = new schemaVerify.Schema({
    type: Number,
    integer: true,
    min: 1
  });
  exports.limitInfoSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      type: Number,
      index: "offset",
      integer: true,
      required: true
    }, {
      type: Number,
      index: "step",
      integer: true,
      required: true
    }]
  });
  exports.pageVerify = exports.pageSchema.verify;
  exports.limitInfoVerify = exports.limitInfoSchema.verify;
});
unwrapExports(limit_verify$1);
var limit_verify_1$1 = limit_verify$1.pageSchema;
var limit_verify_2$1 = limit_verify$1.limitInfoSchema;
var limit_verify_3$1 = limit_verify$1.pageVerify;
var limit_verify_4$1 = limit_verify$1.limitInfoVerify;

var order_verify$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.orderInfoSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      index: "field",
      required: true,
      type: String
    }, {
      index: "type",
      required: true,
      type: String,
      enum: _enum$1.OrderTypes
    }, {
      index: "list",
      type: Array,
      elements: [[{
        type: String,
        required: true,
        minLength: 1
      }, {
        type: Number
      }]]
    }]
  });
  exports.valueListSchema = new schemaVerify.Schema({
    type: Array,
    elements: [[{
      type: String,
      required: true,
      minLength: 1
    }, {
      type: Number
    }]]
  });
  exports.orderInfoVerify = exports.orderInfoSchema.verify;
  exports.valueListVerify = exports.valueListSchema.verify;
});
unwrapExports(order_verify$1);
var order_verify_1$1 = order_verify$1.orderInfoSchema;
var order_verify_2$1 = order_verify$1.valueListSchema;
var order_verify_3$1 = order_verify$1.orderInfoVerify;
var order_verify_4$1 = order_verify$1.valueListVerify;

var term_verify$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const termDataSchema = new schemaVerify.Schema({
    type: Object,
    props: [[{
      required: true,
      type: String
    }, {
      type: Number
    }, {
      type: Array,
      minLength: 1,
      elements: [[{
        type: String,
        required: true
      }, {
        type: Number
      }]]
    }]]
  });
  const termSignSchema = new schemaVerify.Schema({
    type: String,
    enum: _enum$1.TermSign
  });
  const termLogicSchema = new schemaVerify.Schema({
    type: String,
    enum: _enum$1.TermLogic
  });
  const termValueSchema = new schemaVerify.Schema([{
    required: true,
    type: String
  }, {
    type: Number
  }]);
  const termInSchema = new schemaVerify.Schema({
    type: Array,
    minLength: 1,
    elements: [[{
      type: String,
      required: true
    }, {
      type: Number
    }]]
  });
  const termBetweenSchema = new schemaVerify.Schema({
    type: Array,
    length: 2,
    elements: [[{
      type: String,
      required: true
    }, {
      type: Number
    }]]
  });
  const termBracketSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      index: "position",
      required: true,
      type: Number,
      min: 1
    }, {
      index: "logic",
      required: true,
      type: String,
      enum: _enum$1.TermLogic
    }]
  });
  const termInfoSchema = new schemaVerify.Schema({
    type: Object,
    restrict: true,
    props: [{
      index: "field",
      required: true,
      type: String,
      minLength: 1
    }, [{
      index: "value",
      required: true,
      type: String
    }, {
      type: Number
    }, {
      type: Array,
      minLength: 1,
      elements: [[{
        type: String,
        required: true
      }, {
        type: Number
      }]]
    }], {
      index: "sign",
      required: true,
      type: String,
      enum: _enum$1.TermSign
    }, {
      index: "logic",
      required: true,
      type: String,
      enum: _enum$1.TermLogic
    }]
  });
  exports.termDataVerify = termDataSchema.verify;
  exports.termSignVerify = termSignSchema.verify;
  exports.termLogicVerify = termLogicSchema.verify;
  exports.termValueVerify = termValueSchema.verify;
  exports.termInVerify = termInSchema.verify;
  exports.termBetweenVerify = termBetweenSchema.verify;
  exports.termBracketVerify = termBracketSchema.verify;
  exports.termInfoVerify = termInfoSchema.verify;
});
unwrapExports(term_verify$1);
var term_verify_1$1 = term_verify$1.termDataVerify;
var term_verify_2$1 = term_verify$1.termSignVerify;
var term_verify_3$1 = term_verify$1.termLogicVerify;
var term_verify_4$1 = term_verify$1.termValueVerify;
var term_verify_5$1 = term_verify$1.termInVerify;
var term_verify_6$1 = term_verify$1.termBetweenVerify;
var term_verify_7$1 = term_verify$1.termBracketVerify;
var term_verify_8$1 = term_verify$1.termInfoVerify;

var update_verify$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const updateInfoSchema = new schemaVerify.Schema({
    type: Object,
    props: [[{
      index: "value",
      required: true,
      type: String
    }, {
      type: Number
    }], {
      index: "type",
      required: true,
      type: String,
      enum: _enum$1.UpdateTypes
    }]
  });
  exports.updateInfoVerify = updateInfoSchema.verify;
});
unwrapExports(update_verify$1);
var update_verify_1$1 = update_verify$1.updateInfoVerify;

var create_verify$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const tableFieldSchema = new schemaVerify.Schema({
    type: Object,
    props: [{
      index: "field",
      required: true,
      type: String,
      minLength: 1
    }, {
      index: "type",
      required: true,
      type: String,
      minLength: 1
    }, {
      index: "unsigned",
      type: Boolean
    }, {
      index: "autoIncrement",
      type: Boolean
    }, {
      index: "notNull",
      type: Boolean
    }, [{
      index: "default",
      type: String
    }, {
      type: Number
    }], {
      index: "onUpdate",
      type: String
    }, {
      index: "comment",
      type: String
    }]
  });
  const combineKeySchema = new schemaVerify.Schema({
    type: Object,
    props: [{
      index: "keyName",
      required: true,
      type: String,
      minLength: 1
    }, {
      index: "combineFields",
      required: true,
      type: Array,
      minLength: 1,
      elements: {
        type: String,
        minLength: 1
      }
    }]
  });
  const tableInfoSchema = new schemaVerify.Schema({
    type: Object,
    props: [{
      index: "tableName",
      required: true,
      type: String,
      minLength: 1
    }, [{
      index: "primaryKey",
      required: true,
      type: String,
      minLength: 1
    }, combineKeySchema], [{
      index: "uniqueKey",
      type: String,
      minLength: 1
    }, combineKeySchema], {
      index: "engine",
      type: String
    }, {
      index: "defaultCharset",
      type: String
    }, {
      index: "comment",
      type: String
    }, {
      index: "autoIncrement",
      type: Number
    }, {
      index: "fields",
      type: Array,
      minLength: 1,
      elements: tableFieldSchema
    }]
  });
  exports.tableFieldVerify = tableFieldSchema.verify;
  exports.uniqueKeyVerify = combineKeySchema.verify;
  exports.tableInfoVerify = tableInfoSchema.verify;
});
unwrapExports(create_verify$1);
var create_verify_1$1 = create_verify$1.tableFieldVerify;
var create_verify_2$1 = create_verify$1.uniqueKeyVerify;
var create_verify_3$1 = create_verify$1.tableInfoVerify;

var alter_verify$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const alterFieldSchema = new schemaVerify.Schema({
    type: Object,
    props: [{
      index: "field",
      type: String,
      minLength: 1
    }, {
      index: "type",
      type: String,
      minLength: 1
    }, {
      index: "unsigned",
      type: Boolean
    }, {
      index: "autoIncrement",
      type: Boolean
    }, {
      index: "notNull",
      type: Boolean
    }, [{
      index: "default",
      type: String
    }, {
      type: Number
    }], {
      index: "onUpdate",
      type: String
    }, {
      index: "comment",
      type: String
    }]
  });
  const alterInfosSchema = new schemaVerify.Schema({
    type: Object,
    props: [{
      index: "method",
      required: true,
      type: String,
      enum: _enum$1.AlterMethods
    }, {
      index: "field",
      required: true,
      type: String,
      minLength: 1
    }, {
      index: "alterField",
      required: true,
      schema: alterFieldSchema
    }]
  });
  exports.alterFieldVerify = alterFieldSchema.verify;
  exports.alterInfosVerify = alterInfosSchema.verify;
});
unwrapExports(alter_verify$1);
var alter_verify_1$1 = alter_verify$1.alterFieldVerify;
var alter_verify_2$1 = alter_verify$1.alterInfosVerify;

var D__vmproject_jsSqlQuery_src_verify_builder = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fieldDataArrVerify = insert_verify$1.fieldDataArrVerify;
  exports.funcInfoVerify = combine_verify$1.funcInfoVerify;
  exports.funcInputVerify = combine_verify$1.funcInputVerify;
  exports.dialectVerify = safe_verify$1.dialectVerify;
  exports.manualSqlVerify = safe_verify$1.manualSqlVerify;
  exports.pageVerify = limit_verify$1.pageVerify;
  exports.limitInfoVerify = limit_verify$1.limitInfoVerify;
  exports.orderInfoVerify = order_verify$1.orderInfoVerify;
  exports.valueListVerify = order_verify$1.valueListVerify;
  exports.termDataVerify = term_verify$1.termDataVerify;
  exports.termBracketVerify = term_verify$1.termBracketVerify;
  exports.termSignVerify = term_verify$1.termSignVerify;
  exports.termLogicVerify = term_verify$1.termLogicVerify;
  exports.termValueVerify = term_verify$1.termValueVerify;
  exports.termInVerify = term_verify$1.termInVerify;
  exports.termBetweenVerify = term_verify$1.termBetweenVerify;
  exports.termInfoVerify = term_verify$1.termInfoVerify;
  exports.updateInfoVerify = update_verify$1.updateInfoVerify;
  exports.tableFieldVerify = create_verify$1.tableFieldVerify;
  exports.uniqueKeyVerify = create_verify$1.uniqueKeyVerify;
  exports.tableInfoVerify = create_verify$1.tableInfoVerify;
  exports.alterFieldVerify = alter_verify$1.alterFieldVerify;
  exports.alterInfosVerify = alter_verify$1.alterInfosVerify;
  const strArrVerify = new schemaVerify.Schema({
    type: Array,
    elements: {
      type: String,
      required: true,
      minLength: 1
    }
  }).verify;
  exports.strArrVerify = strArrVerify;
  const strObjVerify = new schemaVerify.Schema({
    type: Object,
    props: {
      type: String,
      required: true,
      minLength: 1
    }
  }).verify;
  exports.strObjVerify = strObjVerify;
  const naturalVerify = new schemaVerify.Schema({
    type: Number,
    natural: true
  }).verify;
  exports.naturalVerify = naturalVerify;
  const integerVerify = new schemaVerify.Schema({
    type: Number,
    integer: true
  }).verify;
  exports.integerVerify = integerVerify;
  const fieldDataVerify = new schemaVerify.Schema({
    type: Object,
    props: [[{
      required: true,
      type: String
    }, {
      type: Number
    }]]
  }).verify;
  exports.fieldDataVerify = fieldDataVerify;
});
unwrapExports(D__vmproject_jsSqlQuery_src_verify_builder);
var D__vmproject_jsSqlQuery_src_verify_builder_1 = D__vmproject_jsSqlQuery_src_verify_builder.fieldDataArrVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_2 = D__vmproject_jsSqlQuery_src_verify_builder.funcInfoVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_3 = D__vmproject_jsSqlQuery_src_verify_builder.funcInputVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_4 = D__vmproject_jsSqlQuery_src_verify_builder.dialectVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_5 = D__vmproject_jsSqlQuery_src_verify_builder.manualSqlVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_6 = D__vmproject_jsSqlQuery_src_verify_builder.pageVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_7 = D__vmproject_jsSqlQuery_src_verify_builder.limitInfoVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_8 = D__vmproject_jsSqlQuery_src_verify_builder.orderInfoVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_9 = D__vmproject_jsSqlQuery_src_verify_builder.valueListVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_10 = D__vmproject_jsSqlQuery_src_verify_builder.termDataVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_11 = D__vmproject_jsSqlQuery_src_verify_builder.termBracketVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_12 = D__vmproject_jsSqlQuery_src_verify_builder.termSignVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_13 = D__vmproject_jsSqlQuery_src_verify_builder.termLogicVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_14 = D__vmproject_jsSqlQuery_src_verify_builder.termValueVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_15 = D__vmproject_jsSqlQuery_src_verify_builder.termInVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_16 = D__vmproject_jsSqlQuery_src_verify_builder.termBetweenVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_17 = D__vmproject_jsSqlQuery_src_verify_builder.termInfoVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_18 = D__vmproject_jsSqlQuery_src_verify_builder.updateInfoVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_19 = D__vmproject_jsSqlQuery_src_verify_builder.tableFieldVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_20 = D__vmproject_jsSqlQuery_src_verify_builder.uniqueKeyVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_21 = D__vmproject_jsSqlQuery_src_verify_builder.tableInfoVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_22 = D__vmproject_jsSqlQuery_src_verify_builder.alterFieldVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_23 = D__vmproject_jsSqlQuery_src_verify_builder.alterInfosVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_24 = D__vmproject_jsSqlQuery_src_verify_builder.strArrVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_25 = D__vmproject_jsSqlQuery_src_verify_builder.strObjVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_26 = D__vmproject_jsSqlQuery_src_verify_builder.naturalVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_27 = D__vmproject_jsSqlQuery_src_verify_builder.integerVerify;
var D__vmproject_jsSqlQuery_src_verify_builder_28 = D__vmproject_jsSqlQuery_src_verify_builder.fieldDataVerify;

var dialects$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const DialectsObj = {
    mysql: {
      safeValue(value) {
        let result;

        if (typeof value === "string") {
          value = value.replace(/\'/g, () => "''").replace(/\\/g, () => "\\\\");
          result = `'${value}'`;
        }

        if (schemaVerify.Type.number.is(value)) {
          result = `'${value}'`;
        }

        if (!result) {
          throw new Error(builder.default.needNumStr);
        }

        return result;
      },

      safeKey(key) {
        let result;

        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error(builder.default.needStr);
        }

        result = key.replace(/`/g, "``");
        return "`" + result + "`";
      }

    },
    mssql: {
      safeValue(value) {
        let result;

        if (typeof value === "string") {
          value = value.replace(/\'/g, () => "''");
          result = `'${value}'`;
        }

        if (schemaVerify.Type.number.is(value)) {
          result = `'${value}'`;
        }

        if (!result) {
          throw new Error(builder.default.needNumStr);
        }

        return result;
      },

      safeKey(key) {
        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error(builder.default.needStr);
        }

        return `[${key}]`;
      }

    },
    postgresql: {
      safeValue(value) {
        let result;

        if (typeof value === "string") {
          value = value.replace(/\'/g, () => "''");
          result = `'${value}'`;
        }

        if (schemaVerify.Type.number.is(value)) {
          result = `'${value}'`;
        }

        if (!result) {
          throw new Error(builder.default.needNumStr);
        }

        return result;
      },

      safeKey(key) {
        let result;

        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error(builder.default.needStr);
        }

        result = key.replace(/\"/g, '""');
        return `"${result}"`;
      }

    },
    sqlite: {
      safeValue(value) {
        let result;

        if (typeof value === "string") {
          value = value.replace(/\'/g, () => "''");
          result = `'${value}'`;
        }

        if (schemaVerify.Type.number.is(value)) {
          result = `'${value}'`;
        }

        if (!result) {
          throw new Error(builder.default.needNumStr);
        }

        return result;
      },

      safeKey(key) {
        let result;

        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error(builder.default.needStr);
        }

        result = key.replace(/`/g, "``");
        return "`" + result + "`";
      }

    }
  };
  exports.default = DialectsObj;
});
unwrapExports(dialects$1);

var builder$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fieldDataArrVerify = insert_verify$1.fieldDataArrVerify;
  exports.funcInfoVerify = combine_verify$1.funcInfoVerify;
  exports.funcInputVerify = combine_verify$1.funcInputVerify;
  exports.dialectVerify = safe_verify$1.dialectVerify;
  exports.manualSqlVerify = safe_verify$1.manualSqlVerify;
  exports.pageVerify = limit_verify$1.pageVerify;
  exports.limitInfoVerify = limit_verify$1.limitInfoVerify;
  exports.orderInfoVerify = order_verify$1.orderInfoVerify;
  exports.valueListVerify = order_verify$1.valueListVerify;
  exports.termDataVerify = term_verify$1.termDataVerify;
  exports.termBracketVerify = term_verify$1.termBracketVerify;
  exports.termSignVerify = term_verify$1.termSignVerify;
  exports.termLogicVerify = term_verify$1.termLogicVerify;
  exports.termValueVerify = term_verify$1.termValueVerify;
  exports.termInVerify = term_verify$1.termInVerify;
  exports.termBetweenVerify = term_verify$1.termBetweenVerify;
  exports.termInfoVerify = term_verify$1.termInfoVerify;
  exports.updateInfoVerify = update_verify$1.updateInfoVerify;
  exports.tableFieldVerify = create_verify$1.tableFieldVerify;
  exports.uniqueKeyVerify = create_verify$1.uniqueKeyVerify;
  exports.tableInfoVerify = create_verify$1.tableInfoVerify;
  exports.alterFieldVerify = alter_verify$1.alterFieldVerify;
  exports.alterInfosVerify = alter_verify$1.alterInfosVerify;
  const strArrVerify = new schemaVerify.Schema({
    type: Array,
    elements: {
      type: String,
      required: true,
      minLength: 1
    }
  }).verify;
  exports.strArrVerify = strArrVerify;
  const strObjVerify = new schemaVerify.Schema({
    type: Object,
    props: {
      type: String,
      required: true,
      minLength: 1
    }
  }).verify;
  exports.strObjVerify = strObjVerify;
  const naturalVerify = new schemaVerify.Schema({
    type: Number,
    natural: true
  }).verify;
  exports.naturalVerify = naturalVerify;
  const integerVerify = new schemaVerify.Schema({
    type: Number,
    integer: true
  }).verify;
  exports.integerVerify = integerVerify;
  const fieldDataVerify = new schemaVerify.Schema({
    type: Object,
    props: [[{
      required: true,
      type: String
    }, {
      type: Number
    }]]
  }).verify;
  exports.fieldDataVerify = fieldDataVerify;
});
unwrapExports(builder$1);
var builder_1 = builder$1.fieldDataArrVerify;
var builder_2 = builder$1.funcInfoVerify;
var builder_3 = builder$1.funcInputVerify;
var builder_4 = builder$1.dialectVerify;
var builder_5 = builder$1.manualSqlVerify;
var builder_6 = builder$1.pageVerify;
var builder_7 = builder$1.limitInfoVerify;
var builder_8 = builder$1.orderInfoVerify;
var builder_9 = builder$1.valueListVerify;
var builder_10 = builder$1.termDataVerify;
var builder_11 = builder$1.termBracketVerify;
var builder_12 = builder$1.termSignVerify;
var builder_13 = builder$1.termLogicVerify;
var builder_14 = builder$1.termValueVerify;
var builder_15 = builder$1.termInVerify;
var builder_16 = builder$1.termBetweenVerify;
var builder_17 = builder$1.termInfoVerify;
var builder_18 = builder$1.updateInfoVerify;
var builder_19 = builder$1.tableFieldVerify;
var builder_20 = builder$1.uniqueKeyVerify;
var builder_21 = builder$1.tableInfoVerify;
var builder_22 = builder$1.alterFieldVerify;
var builder_23 = builder$1.alterInfosVerify;
var builder_24 = builder$1.strArrVerify;
var builder_25 = builder$1.strObjVerify;
var builder_26 = builder$1.naturalVerify;
var builder_27 = builder$1.integerVerify;
var builder_28 = builder$1.fieldDataVerify;

var base = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Base {
    constructor() {
      this.safeValue = function () {
        return "";
      };

      this.safeKey = function () {
        return "";
      };
    }

    get dialectType() {
      const dialectType = this._dialectType;

      if (!builder$1.dialectVerify(dialects$1.default[dialectType])) {
        throw new Error(builder.default.errorDialect);
      }

      return dialectType;
    }

    set dialectType(dialectType) {
      this.setDialect(dialectType);
    }

    setDialect(dialectType) {
      if (!builder$1.dialectVerify(dialects$1.default[dialectType])) {
        throw new Error(builder.default.errorDialect);
      }

      const dialect = dialects$1.default[dialectType];
      this._dialect = dialect;
      this._dialectType = dialectType;
      this.safeValue = dialect.safeValue;
      this.safeKey = dialect.safeKey;
    }

    manualSql(sql, key) {
      if (!builder$1.manualSqlVerify(sql) && !(sql instanceof Base)) {
        throw new Error(builder.default.errorManualSql);
      }

      this[key] = sql;
    }

    formatManualSql(key) {
      let sql = this[key];

      if (schemaVerify.Type.string.isNotEmpty(sql)) {
        return sql;
      }

      if (schemaVerify.Type.function.is(sql)) {
        sql = sql();

        if (schemaVerify.Type.string.isNotEmpty(sql)) {
          return sql;
        }
      }

      if (schemaVerify.Type.object.isNotEmpty(sql) && sql instanceof Base) {
        sql = sql.query;

        if (schemaVerify.Type.string.isNotEmpty(sql)) {
          return sql;
        }
      }

      return "";
    }

    build() {
      return "";
    }

    get query() {
      return this.build();
    }

    table(queryTable) {
      if (!schemaVerify.Type.string.isNotEmpty(queryTable)) {
        throw new Error(builder.default.errorTableName);
      }

      this._queryTable = queryTable;
      return this;
    }

    getQueryTable() {
      const queryTable = this._queryTable;

      if (!schemaVerify.Type.string.isNotEmpty(queryTable)) {
        throw new Error(builder.default.errorTableName);
      }

      return this.safeKey(queryTable);
    }

    execute() {
      const execute = this._execute;
      const query = this.build();

      if (!schemaVerify.Type.string.isNotEmpty(query)) {
        throw new Error(builder.default.emptySqlQuery);
      }

      if (schemaVerify.Type.object.isNot(execute) || schemaVerify.Type.function.isNot(execute.run)) {
        throw new Error(builder.default.errorExecute);
      }

      return execute.run(query);
    }

    setExecute(execute) {
      this._execute = execute;
    }

  }

  exports.default = Base;
});
unwrapExports(base);

var limit = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Limit {
    limitBuild(query) {
      const limitInfo = this.limitInfo;

      if (!builder$1.limitInfoVerify(limitInfo)) {
        return query;
      }

      const offset = limitInfo.offset;
      const step = limitInfo.step;

      if (offset === 0) {
        return `${query} LIMIT ${step}`;
      }

      if (step === -1) {
        return `${query} OFFSET ${offset}`;
      }

      return `${query} LIMIT ${step} OFFSET ${offset}`;
    }

    limit(offset, step) {
      if (!builder$1.integerVerify(offset)) {
        throw new Error(builder.default.errorOffset);
      }

      if (schemaVerify.Type.undefined.isNot(step) && !builder$1.integerVerify(step)) {
        throw new Error(builder.default.errorStep);
      }

      let limitInfo;

      if (schemaVerify.Type.number.is(offset) && schemaVerify.Type.number.is(step)) {
        limitInfo = {
          offset,
          step
        };
      }

      if (schemaVerify.Type.number.is(offset) && !schemaVerify.Type.number.is(step)) {
        limitInfo = {
          offset: 0,
          step: offset
        };
      }

      this.limitInfo = limitInfo;
    }

    offset(offset) {
      if (!builder$1.integerVerify(offset)) {
        throw new Error(builder.default.errorOffset);
      }

      this.limitInfo = {
        offset: offset,
        step: -1
      };
    }

    step(step) {
      if (!builder$1.integerVerify(step)) {
        throw new Error(builder.default.errorStep);
      }

      this.limitInfo = {
        offset: 0,
        step
      };
    }

    paging(page, size) {
      if (!builder$1.pageVerify(page)) {
        throw new Error(builder.default.errorPage);
      }

      if (!builder$1.naturalVerify(size)) {
        throw new Error(builder.default.errorSize);
      }

      const offset = (page - 1) * size;
      this.limitInfo = {
        offset,
        step: size
      };
    }

  }

  exports.default = Limit;
});
unwrapExports(limit);

var util$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function analyTmpl(tmpl, opts) {
    return tmpl.replace(/\{\{([a-zA-Z_0-9]+)\}\}/g, function (match, key) {
      if (opts.hasOwnProperty(key) && schemaVerify.Type.string.isNotEmpty(opts[key])) {
        return opts[key] + " ";
      } else {
        return "";
      }
    }).trim();
  }

  exports.analyTmpl = analyTmpl;

  function argStrArrTrans(arg, otherArgs) {
    let args = [];

    if (schemaVerify.Type.array.is(arg)) {
      args = arg;
    } else {
      otherArgs = schemaVerify.Type.array.safe(otherArgs);
      otherArgs.unshift(arg);
      args = otherArgs;
    }

    return args;
  }

  exports.argStrArrTrans = argStrArrTrans;
});
unwrapExports(util$1);
var util_1$1 = util$1.analyTmpl;
var util_2$1 = util$1.argStrArrTrans;

var base$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Base {
    constructor() {
      this.safeValue = function () {
        return "";
      };

      this.safeKey = function () {
        return "";
      };
    }

    get dialectType() {
      const dialectType = this._dialectType;

      if (!builder$1.dialectVerify(dialects$1.default[dialectType])) {
        throw new Error(builder.default.errorDialect);
      }

      return dialectType;
    }

    set dialectType(dialectType) {
      this.setDialect(dialectType);
    }

    setDialect(dialectType) {
      if (!builder$1.dialectVerify(dialects$1.default[dialectType])) {
        throw new Error(builder.default.errorDialect);
      }

      const dialect = dialects$1.default[dialectType];
      this._dialect = dialect;
      this._dialectType = dialectType;
      this.safeValue = dialect.safeValue;
      this.safeKey = dialect.safeKey;
    }

    manualSql(sql, key) {
      if (!builder$1.manualSqlVerify(sql) && !(sql instanceof Base)) {
        throw new Error(builder.default.errorManualSql);
      }

      this[key] = sql;
    }

    formatManualSql(key) {
      let sql = this[key];

      if (schemaVerify.Type.string.isNotEmpty(sql)) {
        return sql;
      }

      if (schemaVerify.Type.function.is(sql)) {
        sql = sql();

        if (schemaVerify.Type.string.isNotEmpty(sql)) {
          return sql;
        }
      }

      if (schemaVerify.Type.object.isNotEmpty(sql) && sql instanceof Base) {
        sql = sql.query;

        if (schemaVerify.Type.string.isNotEmpty(sql)) {
          return sql;
        }
      }

      return "";
    }

    build() {
      return "";
    }

    get query() {
      return this.build();
    }

    table(queryTable) {
      if (!schemaVerify.Type.string.isNotEmpty(queryTable)) {
        throw new Error(builder.default.errorTableName);
      }

      this._queryTable = queryTable;
      return this;
    }

    getQueryTable() {
      const queryTable = this._queryTable;

      if (!schemaVerify.Type.string.isNotEmpty(queryTable)) {
        throw new Error(builder.default.errorTableName);
      }

      return this.safeKey(queryTable);
    }

    execute() {
      const execute = this._execute;
      const query = this.build();

      if (!schemaVerify.Type.string.isNotEmpty(query)) {
        throw new Error(builder.default.emptySqlQuery);
      }

      if (schemaVerify.Type.object.isNot(execute) || schemaVerify.Type.function.isNot(execute.run)) {
        throw new Error(builder.default.errorExecute);
      }

      return execute.run(query);
    }

    setExecute(execute) {
      this._execute = execute;
    }

  }

  exports.default = Base;
});
unwrapExports(base$1);

var order = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const SQL_NAME = "orderSql";

  class Order extends base$1.default {
    constructor() {
      super();
      this.orderInfos = [];
    }

    build() {
      const orderSql = this.formatOrderSql();

      if (schemaVerify.Type.string.isNotEmpty(orderSql)) {
        return orderSql;
      }

      const orderInfos = schemaVerify.Type.array.safe(this.orderInfos);

      if (!schemaVerify.Type.array.isNotEmpty(orderInfos)) {
        return "";
      }

      let ordersArr = [];

      for (const info of orderInfos) {
        if (!builder$1.orderInfoVerify(info)) {
          continue;
        }

        const field = info.field;
        const type = info.type;
        const list = info.list;
        const safeField = this.safeKey(field);

        if (type === _enum$1.OrderTypes.field) {
          const listStr = list.map(value => this.safeValue(value)).join(", ");
          ordersArr.push(`${type}(${safeField}, ${listStr})`);
          continue;
        }

        ordersArr.push(`${safeField} ${type}`);
      }

      if (!schemaVerify.Type.array.isNotEmpty(ordersArr)) {
        return "";
      }

      ordersArr = Array.from(new Set(ordersArr));
      const ordersStr = ordersArr.join(", ");
      return ordersStr;
    }

    orderBuild(query) {
      const ordersStr = this.build();

      if (schemaVerify.Type.string.isNotEmpty(ordersStr)) {
        query = `${query} ORDER BY ${ordersStr}`;
      }

      return query;
    }

    descBy(firstField, otherFields) {
      const argFields = util$1.argStrArrTrans(firstField, otherFields);
      return this.orderCache(argFields, _enum$1.OrderTypes.desc);
    }

    ascBy(firstField, otherFields) {
      const argFields = util$1.argStrArrTrans(firstField, otherFields);
      return this.orderCache(argFields, _enum$1.OrderTypes.asc);
    }

    orderField(data) {
      data = schemaVerify.Type.object.safe(data);
      const fields = Object.keys(data);
      return this.orderCache(fields, _enum$1.OrderTypes.field, data);
    }

    order(sql) {
      this.manualSql(sql, SQL_NAME);
    }

    formatOrderSql() {
      return this.formatManualSql(SQL_NAME);
    }

    orderCache(fields, type, fieldOrder) {
      if (!builder$1.strArrVerify(fields)) {
        throw new Error(builder.default.errorFields);
      }

      fieldOrder = schemaVerify.Type.object.safe(fieldOrder);
      const orderInfos = schemaVerify.Type.array.safe(this.orderInfos);

      for (const field of fields) {
        const info = {
          field,
          type
        };

        if (type === _enum$1.OrderTypes.field) {
          const list = fieldOrder[field];

          if (!builder$1.valueListVerify(list)) {
            throw new Error(builder.default.errorValueList);
          }

          info["list"] = list;
        }

        if (!builder$1.orderInfoVerify(info)) {
          throw new Error(builder.default.errorOrderInfo);
        }

        orderInfos.push(info);
      }

      this.orderInfos = orderInfos;
      return this;
    }

  }

  exports.default = Order;
});
unwrapExports(order);

var limit$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Limit {
    limitBuild(query) {
      const limitInfo = this.limitInfo;

      if (!builder$1.limitInfoVerify(limitInfo)) {
        return query;
      }

      const offset = limitInfo.offset;
      const step = limitInfo.step;

      if (offset === 0) {
        return `${query} LIMIT ${step}`;
      }

      if (step === -1) {
        return `${query} OFFSET ${offset}`;
      }

      return `${query} LIMIT ${step} OFFSET ${offset}`;
    }

    limit(offset, step) {
      if (!builder$1.integerVerify(offset)) {
        throw new Error(builder.default.errorOffset);
      }

      if (schemaVerify.Type.undefined.isNot(step) && !builder$1.integerVerify(step)) {
        throw new Error(builder.default.errorStep);
      }

      let limitInfo;

      if (schemaVerify.Type.number.is(offset) && schemaVerify.Type.number.is(step)) {
        limitInfo = {
          offset,
          step
        };
      }

      if (schemaVerify.Type.number.is(offset) && !schemaVerify.Type.number.is(step)) {
        limitInfo = {
          offset: 0,
          step: offset
        };
      }

      this.limitInfo = limitInfo;
    }

    offset(offset) {
      if (!builder$1.integerVerify(offset)) {
        throw new Error(builder.default.errorOffset);
      }

      this.limitInfo = {
        offset: offset,
        step: -1
      };
    }

    step(step) {
      if (!builder$1.integerVerify(step)) {
        throw new Error(builder.default.errorStep);
      }

      this.limitInfo = {
        offset: 0,
        step
      };
    }

    paging(page, size) {
      if (!builder$1.pageVerify(page)) {
        throw new Error(builder.default.errorPage);
      }

      if (!builder$1.naturalVerify(size)) {
        throw new Error(builder.default.errorSize);
      }

      const offset = (page - 1) * size;
      this.limitInfo = {
        offset,
        step: size
      };
    }

  }

  exports.default = Limit;
});
unwrapExports(limit$1);

var order$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const SQL_NAME = "orderSql";

  class Order extends base$1.default {
    constructor() {
      super();
      this.orderInfos = [];
    }

    build() {
      const orderSql = this.formatOrderSql();

      if (schemaVerify.Type.string.isNotEmpty(orderSql)) {
        return orderSql;
      }

      const orderInfos = schemaVerify.Type.array.safe(this.orderInfos);

      if (!schemaVerify.Type.array.isNotEmpty(orderInfos)) {
        return "";
      }

      let ordersArr = [];

      for (const info of orderInfos) {
        if (!builder$1.orderInfoVerify(info)) {
          continue;
        }

        const field = info.field;
        const type = info.type;
        const list = info.list;
        const safeField = this.safeKey(field);

        if (type === _enum$1.OrderTypes.field) {
          const listStr = list.map(value => this.safeValue(value)).join(", ");
          ordersArr.push(`${type}(${safeField}, ${listStr})`);
          continue;
        }

        ordersArr.push(`${safeField} ${type}`);
      }

      if (!schemaVerify.Type.array.isNotEmpty(ordersArr)) {
        return "";
      }

      ordersArr = Array.from(new Set(ordersArr));
      const ordersStr = ordersArr.join(", ");
      return ordersStr;
    }

    orderBuild(query) {
      const ordersStr = this.build();

      if (schemaVerify.Type.string.isNotEmpty(ordersStr)) {
        query = `${query} ORDER BY ${ordersStr}`;
      }

      return query;
    }

    descBy(firstField, otherFields) {
      const argFields = util$1.argStrArrTrans(firstField, otherFields);
      return this.orderCache(argFields, _enum$1.OrderTypes.desc);
    }

    ascBy(firstField, otherFields) {
      const argFields = util$1.argStrArrTrans(firstField, otherFields);
      return this.orderCache(argFields, _enum$1.OrderTypes.asc);
    }

    orderField(data) {
      data = schemaVerify.Type.object.safe(data);
      const fields = Object.keys(data);
      return this.orderCache(fields, _enum$1.OrderTypes.field, data);
    }

    order(sql) {
      this.manualSql(sql, SQL_NAME);
    }

    formatOrderSql() {
      return this.formatManualSql(SQL_NAME);
    }

    orderCache(fields, type, fieldOrder) {
      if (!builder$1.strArrVerify(fields)) {
        throw new Error(builder.default.errorFields);
      }

      fieldOrder = schemaVerify.Type.object.safe(fieldOrder);
      const orderInfos = schemaVerify.Type.array.safe(this.orderInfos);

      for (const field of fields) {
        const info = {
          field,
          type
        };

        if (type === _enum$1.OrderTypes.field) {
          const list = fieldOrder[field];

          if (!builder$1.valueListVerify(list)) {
            throw new Error(builder.default.errorValueList);
          }

          info["list"] = list;
        }

        if (!builder$1.orderInfoVerify(info)) {
          throw new Error(builder.default.errorOrderInfo);
        }

        orderInfos.push(info);
      }

      this.orderInfos = orderInfos;
      return this;
    }

  }

  exports.default = Order;
});
unwrapExports(order$1);

var query = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Query extends base$1.default {
    getLimitCase() {
      let queryLimit = this.queryLimit;

      if (!queryLimit || !(queryLimit instanceof limit$1.default)) {
        queryLimit = new limit$1.default();
        this.queryLimit = queryLimit;
      }

      return queryLimit;
    }

    limitBuild(query) {
      return this.getLimitCase().limitBuild(query);
    }

    offset(offset) {
      this.getLimitCase().offset(offset);
      return this;
    }

    step(step) {
      this.getLimitCase().step(step);
      return this;
    }

    getOrderCase() {
      let queryOrder = this.queryOrder;

      if (!queryOrder || !(queryOrder instanceof order$1.default)) {
        queryOrder = new order$1.default();
        queryOrder.setDialect(this.dialectType);
        this.queryOrder = queryOrder;
      }

      return queryOrder;
    }

    orderBuild(query) {
      return this.getOrderCase().orderBuild(query);
    }

    descBy(firstField, ...otherFields) {
      this.getOrderCase().descBy(firstField, otherFields);
      return this;
    }

    ascBy(firstField, ...otherFields) {
      this.getOrderCase().ascBy(firstField, otherFields);
      return this;
    }

    orderField(data) {
      this.getOrderCase().orderField(data);
      return this;
    }

    order(sql) {
      this.getOrderCase().order(sql);
      return this;
    }

  }

  exports.default = Query;
});
unwrapExports(query);

var query$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Query extends base$1.default {
    getLimitCase() {
      let queryLimit = this.queryLimit;

      if (!queryLimit || !(queryLimit instanceof limit$1.default)) {
        queryLimit = new limit$1.default();
        this.queryLimit = queryLimit;
      }

      return queryLimit;
    }

    limitBuild(query) {
      return this.getLimitCase().limitBuild(query);
    }

    offset(offset) {
      this.getLimitCase().offset(offset);
      return this;
    }

    step(step) {
      this.getLimitCase().step(step);
      return this;
    }

    getOrderCase() {
      let queryOrder = this.queryOrder;

      if (!queryOrder || !(queryOrder instanceof order$1.default)) {
        queryOrder = new order$1.default();
        queryOrder.setDialect(this.dialectType);
        this.queryOrder = queryOrder;
      }

      return queryOrder;
    }

    orderBuild(query) {
      return this.getOrderCase().orderBuild(query);
    }

    descBy(firstField, ...otherFields) {
      this.getOrderCase().descBy(firstField, otherFields);
      return this;
    }

    ascBy(firstField, ...otherFields) {
      this.getOrderCase().ascBy(firstField, otherFields);
      return this;
    }

    orderField(data) {
      this.getOrderCase().orderField(data);
      return this;
    }

    order(sql) {
      this.getOrderCase().order(sql);
      return this;
    }

  }

  exports.default = Query;
});
unwrapExports(query$1);

var insert = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const SQL_NAME = "valuesSql";

  class Insert extends query$1.default {
    constructor() {
      super();
      this.queryType = _enum$1.QueryTypes.insert;
      this.insertData = {};
      this.insertFields = [];
      this.insertDataArr = [];
    }

    data(data) {
      if (!builder$1.fieldDataVerify(data)) {
        throw new Error(builder.default.errorFieldData);
      }

      const insertData = schemaVerify.Type.object.safe(this.insertData);
      this.insertData = Object.assign({}, insertData, data);
      return this;
    }

    fields(arg, ...otherArgs) {
      const args = util$1.argStrArrTrans(arg, otherArgs);
      const insertFields = schemaVerify.Type.array.safe(this.insertFields);
      const result = [].concat(insertFields, args);
      this.insertFields = Array.from(new Set(result));
      return this;
    }

    multiData(dataArr) {
      if (!builder$1.fieldDataArrVerify(dataArr)) {
        throw new Error(builder.default.errorFieldDataArr);
      }

      const insertDataArr = schemaVerify.Type.array.safe(this.insertDataArr);
      this.insertDataArr = [].concat(insertDataArr, dataArr);
      return this;
    }

    values(sql) {
      this.manualSql(sql, SQL_NAME);
      return this;
    }

    formatValuesSql() {
      return this.formatManualSql(SQL_NAME);
    }

    formatFields() {
      const insertData = this.insertData;
      const insertFields = this.insertFields;
      const insertDataArr = this.insertDataArr;
      let fields;

      if (builder$1.strArrVerify(insertFields)) {
        fields = insertFields;
      } else if (builder$1.fieldDataVerify(insertData)) {
        fields = Object.keys(insertData);
      } else if (builder$1.fieldDataArrVerify(insertDataArr)) {
        fields = Object.keys(insertDataArr[0]);
      }

      if (!builder$1.strArrVerify(fields)) {
        throw new Error(builder.default.errorFields);
      }

      return fields;
    }

    formatValues(fields) {
      fields = schemaVerify.Type.array.safe(fields);
      let result = "";
      const valuesSql = this.formatValuesSql();
      const insertData = this.insertData;
      const insertDataArr = this.insertDataArr;
      const valuesArr = [];

      const valuesStrFormat = data => {
        const valuesStr = fields.map(field => this.safeValue(data[field])).join(", ");
        return `( ${valuesStr} )`;
      };

      const valuesArrStrFormat = arr => {
        for (const data of arr) {
          if (schemaVerify.Type.object.isNotEmpty(data)) {
            valuesArr.push(valuesStrFormat(data));
          }
        }

        return valuesArr.join(", ");
      };

      if (schemaVerify.Type.string.isNotEmpty(valuesSql)) {
        result = valuesSql;
      } else if (builder$1.fieldDataVerify(insertData)) {
        result = valuesStrFormat(insertData);
      } else if (builder$1.fieldDataArrVerify(insertDataArr)) {
        result = valuesArrStrFormat(insertDataArr);
      }

      if (!schemaVerify.Type.string.isNotEmpty(result)) {
        throw new Error(builder.default.errorInsertValues);
      }

      return `VALUES ${result}`;
    }

    build() {
      const type = this.queryType;
      const table = this.getQueryTable();
      const fields = this.formatFields();
      const valuesStr = this.formatValues(fields);
      const fieldsStr = fields.map(field => this.safeKey(field)).join(", ");
      let query = `${type} INTO ${table} ( ${fieldsStr} )  ${valuesStr}`;
      return query;
    }

  }

  exports.default = Insert;
});
unwrapExports(insert);

var term = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const SQL_NAME = "termSql";

  class Term extends base$1.default {
    constructor() {
      super();
      this.termInfos = [];
      this.termBrackets = [];
    }

    build() {
      return this.termsBuild();
    }

    termsBuild() {
      const termSql = this.formatTermSql();

      if (schemaVerify.Type.string.isNotEmpty(termSql)) {
        return termSql;
      }

      const termInfos = this.termInfos;
      const termBrackets = this.termBrackets;

      if (!schemaVerify.Type.array.isNotEmpty(termInfos)) {
        return "";
      }

      const allTermStr = !schemaVerify.Type.array.isNotEmpty(termBrackets) ? this.formatTerms(termInfos) : this.formatTermBrackets(termBrackets, termInfos);
      return allTermStr;
    }

    formatTermSql() {
      return this.formatManualSql(SQL_NAME);
    }

    formatTermBrackets(brackets, terms) {
      let allTermStr = "";
      brackets = schemaVerify.Type.array.safe(brackets);
      terms = schemaVerify.Type.array.safe(terms);
      const bracketsLen = brackets.length;
      const termsLen = terms.length;

      for (let i = 0; i < bracketsLen; i++) {
        const curBracket = brackets[i];
        const perBracket = brackets[i - 1];
        const nextBracket = brackets[i + 1];

        if (!builder$1.termBracketVerify(curBracket)) {
          throw new Error(builder.default.errorTermBracket);
        }

        const curPos = curBracket.position;
        const curLogic = curBracket.logic;
        let prePos = 0;
        let nextPos = termsLen;

        if (builder$1.termBracketVerify(perBracket)) {
          prePos = perBracket.position;
        }

        if (builder$1.termBracketVerify(nextBracket)) {
          nextPos = nextBracket.position;
        }

        const preTerms = terms.slice(prePos, curPos);
        const nextTerms = terms.slice(curPos, nextPos);
        const needFullBracket = bracketsLen === 1 || i + 1 === bracketsLen || nextPos === termsLen;
        const termStr = this.formatBracketTerm(needFullBracket, curLogic, preTerms, nextTerms);

        if (!schemaVerify.Type.string.isNotEmpty(termStr)) {
          continue;
        }

        allTermStr = schemaVerify.Type.string.isNotEmpty(allTermStr) ? `${allTermStr} ${termStr}` : termStr;
      }

      return allTermStr;
    }

    formatBracketTerm(needFullBracket, logic, preTerms, nextTerms) {
      preTerms = schemaVerify.Type.array.safe(preTerms);
      nextTerms = schemaVerify.Type.array.safe(nextTerms);
      const preTermsStr = this.formatTerms(preTerms);

      if (preTerms.length <= 0 || nextTerms.length <= 0) {
        return "";
      }

      if (needFullBracket) {
        const nextTermsStr = this.formatTerms(nextTerms);
        return `( ${preTermsStr} ) ${logic} ( ${nextTermsStr} )`;
      }

      return `( ${preTermsStr} ) ${logic}`;
    }

    formatTerms(terms) {
      terms = schemaVerify.Type.array.safe(terms);
      let allTermStr = "";

      for (const term of terms) {
        if (!builder$1.termInfoVerify(term)) {
          throw new Error(builder.default.errorTermInfo);
        }

        const field = this.safeKey(term.field);
        const value = term.value;
        const sign = term.sign;
        const logic = term.logic;
        const termValue = this.formatTermValue(value, sign);
        const termStr = `${field} ${sign} ${termValue}`;

        if (!schemaVerify.Type.string.isNotEmpty(allTermStr)) {
          allTermStr = termStr;
          continue;
        }

        allTermStr = `${allTermStr} ${logic} ${termStr}`;
      }

      return allTermStr;
    }

    formatTermValue(value, sign) {
      let termValue;

      if (sign === _enum$1.TermSign.in || sign === _enum$1.TermSign.notIn) {
        if (!builder$1.termInVerify(value)) {
          throw new Error(builder.default.errorTermValue);
        }

        termValue = value.map(item => this.safeValue(item)).join(", ");
        return `( ${termValue} )`;
      }

      if (sign === _enum$1.TermSign.between || sign === _enum$1.TermSign.notBetween) {
        if (!builder$1.termBetweenVerify(value)) {
          throw new Error(builder.default.errorTermValue);
        }

        const lower = this.safeValue(value[0]);
        const upper = this.safeValue(value[1]);
        return `${lower} AND ${upper}`;
      }

      if (!builder$1.termValueVerify(value)) {
        throw new Error(builder.default.errorTermValue);
      }

      if (sign === _enum$1.TermSign.like || sign === _enum$1.TermSign.notlike) {
        value = `%${value}%`;
      }

      termValue = this.safeValue(value);
      return termValue;
    }

    termCache(data, sign, logic) {
      if (!builder$1.termDataVerify(data)) {
        throw new Error(builder.default.errorTermdata);
      }

      if (!builder$1.termSignVerify(sign)) {
        throw new Error(builder.default.errorTermSign);
      }

      if (!builder$1.termLogicVerify(logic)) {
        throw new Error(builder.default.errorTermLogic);
      }

      const termInfos = schemaVerify.Type.array.safe(this.termInfos);
      const termsArr = [];

      for (const field in data) {
        const value = data[field];

        switch (sign) {
          case _enum$1.TermSign.in:
          case _enum$1.TermSign.notIn:
            if (!builder$1.termInVerify(value)) {
              throw new Error(builder.default.errorTermValue);
            }

            break;

          case _enum$1.TermSign.between:
          case _enum$1.TermSign.notBetween:
            if (!builder$1.termBetweenVerify(value)) {
              throw new Error(builder.default.errorTermValue);
            }

            break;

          default:
            if (!builder$1.termValueVerify(value)) {
              throw new Error(builder.default.errorTermValue);
            }

            break;
        }

        const term = {
          field,
          value,
          sign,
          logic
        };
        termsArr.push(term);
      }

      this.termInfos = [].concat(termInfos, termsArr);
      return this;
    }

    bracketTerm(logic) {
      const termInfos = schemaVerify.Type.array.safe(this.termInfos);
      const termBrackets = schemaVerify.Type.array.safe(this.termBrackets);
      const termsLen = termInfos.length;

      if (termsLen <= 0) {
        return;
      }

      for (const bracket of termBrackets) {
        if (!builder$1.termBracketVerify(bracket)) {
          continue;
        }

        const position = bracket.position;

        if (position === termsLen) {
          return;
        }
      }

      const bracket = {
        position: termsLen,
        logic
      };

      if (builder$1.termBracketVerify(bracket)) {
        termBrackets.push(bracket);
      }

      this.termBrackets = termBrackets;
      return this;
    }

    sqlTerm(sql) {
      this.manualSql(sql, SQL_NAME);
    }

    equal(data) {
      return this.and(data, _enum$1.TermSign.equal);
    }

    notEqual(data) {
      return this.and(data, _enum$1.TermSign.notEqual);
    }

    in(data) {
      return this.and(data, _enum$1.TermSign.in);
    }

    notIn(data) {
      return this.and(data, _enum$1.TermSign.notIn);
    }

    more(data) {
      return this.and(data, _enum$1.TermSign.more);
    }

    less(data) {
      return this.and(data, _enum$1.TermSign.less);
    }

    moreEqual(data) {
      return this.and(data, _enum$1.TermSign.moreEqual);
    }

    lessEqual(data) {
      return this.and(data, _enum$1.TermSign.lessEqual);
    }

    like(data) {
      return this.and(data, _enum$1.TermSign.like);
    }

    notLike(data) {
      return this.and(data, _enum$1.TermSign.notlike);
    }

    between(data) {
      return this.and(data, _enum$1.TermSign.between);
    }

    notBetween(data) {
      return this.and(data, _enum$1.TermSign.notBetween);
    }

    orEqual(data) {
      return this.or(data, _enum$1.TermSign.equal);
    }

    orNotEqual(data) {
      return this.or(data, _enum$1.TermSign.notEqual);
    }

    orIn(data) {
      return this.or(data, _enum$1.TermSign.in);
    }

    orNotIn(data) {
      return this.or(data, _enum$1.TermSign.notIn);
    }

    orMore(data) {
      return this.or(data, _enum$1.TermSign.more);
    }

    orLess(data) {
      return this.or(data, _enum$1.TermSign.less);
    }

    orMoreEqual(data) {
      return this.or(data, _enum$1.TermSign.moreEqual);
    }

    orLessEqual(data) {
      return this.or(data, _enum$1.TermSign.lessEqual);
    }

    orLike(data) {
      return this.or(data, _enum$1.TermSign.like);
    }

    orBetween(data) {
      return this.or(data, _enum$1.TermSign.between);
    }

    orNotBetween(data) {
      return this.or(data, _enum$1.TermSign.notBetween);
    }

    orNotLike(data) {
      return this.or(data, _enum$1.TermSign.notlike);
    }

    bracket() {
      return this.bracketTerm(_enum$1.TermLogic.and);
    }

    orBracket() {
      return this.bracketTerm(_enum$1.TermLogic.or);
    }

    and(data, sign) {
      return this.termCache(data, sign, _enum$1.TermLogic.and);
    }

    or(data, sign) {
      return this.termCache(data, sign, _enum$1.TermLogic.or);
    }

  }

  exports.default = Term;
});
unwrapExports(term);

var term$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const SQL_NAME = "termSql";

  class Term extends base$1.default {
    constructor() {
      super();
      this.termInfos = [];
      this.termBrackets = [];
    }

    build() {
      return this.termsBuild();
    }

    termsBuild() {
      const termSql = this.formatTermSql();

      if (schemaVerify.Type.string.isNotEmpty(termSql)) {
        return termSql;
      }

      const termInfos = this.termInfos;
      const termBrackets = this.termBrackets;

      if (!schemaVerify.Type.array.isNotEmpty(termInfos)) {
        return "";
      }

      const allTermStr = !schemaVerify.Type.array.isNotEmpty(termBrackets) ? this.formatTerms(termInfos) : this.formatTermBrackets(termBrackets, termInfos);
      return allTermStr;
    }

    formatTermSql() {
      return this.formatManualSql(SQL_NAME);
    }

    formatTermBrackets(brackets, terms) {
      let allTermStr = "";
      brackets = schemaVerify.Type.array.safe(brackets);
      terms = schemaVerify.Type.array.safe(terms);
      const bracketsLen = brackets.length;
      const termsLen = terms.length;

      for (let i = 0; i < bracketsLen; i++) {
        const curBracket = brackets[i];
        const perBracket = brackets[i - 1];
        const nextBracket = brackets[i + 1];

        if (!builder$1.termBracketVerify(curBracket)) {
          throw new Error(builder.default.errorTermBracket);
        }

        const curPos = curBracket.position;
        const curLogic = curBracket.logic;
        let prePos = 0;
        let nextPos = termsLen;

        if (builder$1.termBracketVerify(perBracket)) {
          prePos = perBracket.position;
        }

        if (builder$1.termBracketVerify(nextBracket)) {
          nextPos = nextBracket.position;
        }

        const preTerms = terms.slice(prePos, curPos);
        const nextTerms = terms.slice(curPos, nextPos);
        const needFullBracket = bracketsLen === 1 || i + 1 === bracketsLen || nextPos === termsLen;
        const termStr = this.formatBracketTerm(needFullBracket, curLogic, preTerms, nextTerms);

        if (!schemaVerify.Type.string.isNotEmpty(termStr)) {
          continue;
        }

        allTermStr = schemaVerify.Type.string.isNotEmpty(allTermStr) ? `${allTermStr} ${termStr}` : termStr;
      }

      return allTermStr;
    }

    formatBracketTerm(needFullBracket, logic, preTerms, nextTerms) {
      preTerms = schemaVerify.Type.array.safe(preTerms);
      nextTerms = schemaVerify.Type.array.safe(nextTerms);
      const preTermsStr = this.formatTerms(preTerms);

      if (preTerms.length <= 0 || nextTerms.length <= 0) {
        return "";
      }

      if (needFullBracket) {
        const nextTermsStr = this.formatTerms(nextTerms);
        return `( ${preTermsStr} ) ${logic} ( ${nextTermsStr} )`;
      }

      return `( ${preTermsStr} ) ${logic}`;
    }

    formatTerms(terms) {
      terms = schemaVerify.Type.array.safe(terms);
      let allTermStr = "";

      for (const term of terms) {
        if (!builder$1.termInfoVerify(term)) {
          throw new Error(builder.default.errorTermInfo);
        }

        const field = this.safeKey(term.field);
        const value = term.value;
        const sign = term.sign;
        const logic = term.logic;
        const termValue = this.formatTermValue(value, sign);
        const termStr = `${field} ${sign} ${termValue}`;

        if (!schemaVerify.Type.string.isNotEmpty(allTermStr)) {
          allTermStr = termStr;
          continue;
        }

        allTermStr = `${allTermStr} ${logic} ${termStr}`;
      }

      return allTermStr;
    }

    formatTermValue(value, sign) {
      let termValue;

      if (sign === _enum$1.TermSign.in || sign === _enum$1.TermSign.notIn) {
        if (!builder$1.termInVerify(value)) {
          throw new Error(builder.default.errorTermValue);
        }

        termValue = value.map(item => this.safeValue(item)).join(", ");
        return `( ${termValue} )`;
      }

      if (sign === _enum$1.TermSign.between || sign === _enum$1.TermSign.notBetween) {
        if (!builder$1.termBetweenVerify(value)) {
          throw new Error(builder.default.errorTermValue);
        }

        const lower = this.safeValue(value[0]);
        const upper = this.safeValue(value[1]);
        return `${lower} AND ${upper}`;
      }

      if (!builder$1.termValueVerify(value)) {
        throw new Error(builder.default.errorTermValue);
      }

      if (sign === _enum$1.TermSign.like || sign === _enum$1.TermSign.notlike) {
        value = `%${value}%`;
      }

      termValue = this.safeValue(value);
      return termValue;
    }

    termCache(data, sign, logic) {
      if (!builder$1.termDataVerify(data)) {
        throw new Error(builder.default.errorTermdata);
      }

      if (!builder$1.termSignVerify(sign)) {
        throw new Error(builder.default.errorTermSign);
      }

      if (!builder$1.termLogicVerify(logic)) {
        throw new Error(builder.default.errorTermLogic);
      }

      const termInfos = schemaVerify.Type.array.safe(this.termInfos);
      const termsArr = [];

      for (const field in data) {
        const value = data[field];

        switch (sign) {
          case _enum$1.TermSign.in:
          case _enum$1.TermSign.notIn:
            if (!builder$1.termInVerify(value)) {
              throw new Error(builder.default.errorTermValue);
            }

            break;

          case _enum$1.TermSign.between:
          case _enum$1.TermSign.notBetween:
            if (!builder$1.termBetweenVerify(value)) {
              throw new Error(builder.default.errorTermValue);
            }

            break;

          default:
            if (!builder$1.termValueVerify(value)) {
              throw new Error(builder.default.errorTermValue);
            }

            break;
        }

        const term = {
          field,
          value,
          sign,
          logic
        };
        termsArr.push(term);
      }

      this.termInfos = [].concat(termInfos, termsArr);
      return this;
    }

    bracketTerm(logic) {
      const termInfos = schemaVerify.Type.array.safe(this.termInfos);
      const termBrackets = schemaVerify.Type.array.safe(this.termBrackets);
      const termsLen = termInfos.length;

      if (termsLen <= 0) {
        return;
      }

      for (const bracket of termBrackets) {
        if (!builder$1.termBracketVerify(bracket)) {
          continue;
        }

        const position = bracket.position;

        if (position === termsLen) {
          return;
        }
      }

      const bracket = {
        position: termsLen,
        logic
      };

      if (builder$1.termBracketVerify(bracket)) {
        termBrackets.push(bracket);
      }

      this.termBrackets = termBrackets;
      return this;
    }

    sqlTerm(sql) {
      this.manualSql(sql, SQL_NAME);
    }

    equal(data) {
      return this.and(data, _enum$1.TermSign.equal);
    }

    notEqual(data) {
      return this.and(data, _enum$1.TermSign.notEqual);
    }

    in(data) {
      return this.and(data, _enum$1.TermSign.in);
    }

    notIn(data) {
      return this.and(data, _enum$1.TermSign.notIn);
    }

    more(data) {
      return this.and(data, _enum$1.TermSign.more);
    }

    less(data) {
      return this.and(data, _enum$1.TermSign.less);
    }

    moreEqual(data) {
      return this.and(data, _enum$1.TermSign.moreEqual);
    }

    lessEqual(data) {
      return this.and(data, _enum$1.TermSign.lessEqual);
    }

    like(data) {
      return this.and(data, _enum$1.TermSign.like);
    }

    notLike(data) {
      return this.and(data, _enum$1.TermSign.notlike);
    }

    between(data) {
      return this.and(data, _enum$1.TermSign.between);
    }

    notBetween(data) {
      return this.and(data, _enum$1.TermSign.notBetween);
    }

    orEqual(data) {
      return this.or(data, _enum$1.TermSign.equal);
    }

    orNotEqual(data) {
      return this.or(data, _enum$1.TermSign.notEqual);
    }

    orIn(data) {
      return this.or(data, _enum$1.TermSign.in);
    }

    orNotIn(data) {
      return this.or(data, _enum$1.TermSign.notIn);
    }

    orMore(data) {
      return this.or(data, _enum$1.TermSign.more);
    }

    orLess(data) {
      return this.or(data, _enum$1.TermSign.less);
    }

    orMoreEqual(data) {
      return this.or(data, _enum$1.TermSign.moreEqual);
    }

    orLessEqual(data) {
      return this.or(data, _enum$1.TermSign.lessEqual);
    }

    orLike(data) {
      return this.or(data, _enum$1.TermSign.like);
    }

    orBetween(data) {
      return this.or(data, _enum$1.TermSign.between);
    }

    orNotBetween(data) {
      return this.or(data, _enum$1.TermSign.notBetween);
    }

    orNotLike(data) {
      return this.or(data, _enum$1.TermSign.notlike);
    }

    bracket() {
      return this.bracketTerm(_enum$1.TermLogic.and);
    }

    orBracket() {
      return this.bracketTerm(_enum$1.TermLogic.or);
    }

    and(data, sign) {
      return this.termCache(data, sign, _enum$1.TermLogic.and);
    }

    or(data, sign) {
      return this.termCache(data, sign, _enum$1.TermLogic.or);
    }

  }

  exports.default = Term;
});
unwrapExports(term$1);

var where = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const TERM_NAME = "whereTerm";

  class Where extends query$1.default {
    whereEqual(data) {
      this.getTermCase(TERM_NAME).equal(data);
      return this;
    }

    whereNotEqual(data) {
      this.getTermCase(TERM_NAME).notEqual(data);
      return this;
    }

    whereIn(data) {
      this.getTermCase(TERM_NAME).in(data);
      return this;
    }

    whereNotIn(data) {
      this.getTermCase(TERM_NAME).notIn(data);
      return this;
    }

    whereMore(data) {
      this.getTermCase(TERM_NAME).more(data);
      return this;
    }

    whereLess(data) {
      this.getTermCase(TERM_NAME).less(data);
      return this;
    }

    whereMoreEqual(data) {
      this.getTermCase(TERM_NAME).moreEqual(data);
      return this;
    }

    whereLessEqual(data) {
      this.getTermCase(TERM_NAME).lessEqual(data);
      return this;
    }

    whereLike(data) {
      this.getTermCase(TERM_NAME).like(data);
      return this;
    }

    whereNotLike(data) {
      this.getTermCase(TERM_NAME).notLike(data);
      return this;
    }

    whereBetween(data) {
      this.getTermCase(TERM_NAME).between(data);
      return this;
    }

    whereNotBetween(data) {
      this.getTermCase(TERM_NAME).notBetween(data);
      return this;
    }

    whereOrEqual(data) {
      this.getTermCase(TERM_NAME).orEqual(data);
      return this;
    }

    whereOrNotEqual(data) {
      this.getTermCase(TERM_NAME).orNotEqual(data);
      return this;
    }

    whereOrIn(data) {
      this.getTermCase(TERM_NAME).orIn(data);
      return this;
    }

    whereOrNotIn(data) {
      this.getTermCase(TERM_NAME).orNotIn(data);
      return this;
    }

    whereOrMore(data) {
      this.getTermCase(TERM_NAME).orMore(data);
      return this;
    }

    whereOrLess(data) {
      this.getTermCase(TERM_NAME).orLess(data);
      return this;
    }

    whereOrMoreEqual(data) {
      this.getTermCase(TERM_NAME).orMoreEqual(data);
      return this;
    }

    whereOrLessEqual(data) {
      this.getTermCase(TERM_NAME).orLessEqual(data);
      return this;
    }

    whereOrLike(data) {
      this.getTermCase(TERM_NAME).orLike(data);
      return this;
    }

    whereOrNotLike(data) {
      this.getTermCase(TERM_NAME).orNotLike(data);
      return this;
    }

    whereOrBetween(data) {
      this.getTermCase(TERM_NAME).orBetween(data);
      return this;
    }

    whereOrNotBetween(data) {
      this.getTermCase(TERM_NAME).orNotBetween(data);
      return this;
    }

    whereBracket() {
      this.getTermCase(TERM_NAME).bracket();
      return this;
    }

    whereOrBracket() {
      this.getTermCase(TERM_NAME).orBracket();
      return this;
    }

    where(sql) {
      this.getTermCase(TERM_NAME).sqlTerm(sql);
      return this;
    }

    getTermCase(key) {
      let term = this[key];

      if (!term || !(term instanceof term$1.default)) {
        term = new term$1.default();
        term.setDialect(this.dialectType);
        this[key] = term;
      }

      return term;
    }

    whereBuild(query) {
      const whereTerm = this.getTermCase(TERM_NAME);
      const whereSql = whereTerm.termsBuild();

      if (schemaVerify.Type.string.isNotEmpty(whereSql)) {
        query = `${query} WHERE ${whereSql}`;
      }

      return query;
    }

  }

  exports.default = Where;
});
unwrapExports(where);

var where$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const TERM_NAME = "whereTerm";

  class Where extends query$1.default {
    whereEqual(data) {
      this.getTermCase(TERM_NAME).equal(data);
      return this;
    }

    whereNotEqual(data) {
      this.getTermCase(TERM_NAME).notEqual(data);
      return this;
    }

    whereIn(data) {
      this.getTermCase(TERM_NAME).in(data);
      return this;
    }

    whereNotIn(data) {
      this.getTermCase(TERM_NAME).notIn(data);
      return this;
    }

    whereMore(data) {
      this.getTermCase(TERM_NAME).more(data);
      return this;
    }

    whereLess(data) {
      this.getTermCase(TERM_NAME).less(data);
      return this;
    }

    whereMoreEqual(data) {
      this.getTermCase(TERM_NAME).moreEqual(data);
      return this;
    }

    whereLessEqual(data) {
      this.getTermCase(TERM_NAME).lessEqual(data);
      return this;
    }

    whereLike(data) {
      this.getTermCase(TERM_NAME).like(data);
      return this;
    }

    whereNotLike(data) {
      this.getTermCase(TERM_NAME).notLike(data);
      return this;
    }

    whereBetween(data) {
      this.getTermCase(TERM_NAME).between(data);
      return this;
    }

    whereNotBetween(data) {
      this.getTermCase(TERM_NAME).notBetween(data);
      return this;
    }

    whereOrEqual(data) {
      this.getTermCase(TERM_NAME).orEqual(data);
      return this;
    }

    whereOrNotEqual(data) {
      this.getTermCase(TERM_NAME).orNotEqual(data);
      return this;
    }

    whereOrIn(data) {
      this.getTermCase(TERM_NAME).orIn(data);
      return this;
    }

    whereOrNotIn(data) {
      this.getTermCase(TERM_NAME).orNotIn(data);
      return this;
    }

    whereOrMore(data) {
      this.getTermCase(TERM_NAME).orMore(data);
      return this;
    }

    whereOrLess(data) {
      this.getTermCase(TERM_NAME).orLess(data);
      return this;
    }

    whereOrMoreEqual(data) {
      this.getTermCase(TERM_NAME).orMoreEqual(data);
      return this;
    }

    whereOrLessEqual(data) {
      this.getTermCase(TERM_NAME).orLessEqual(data);
      return this;
    }

    whereOrLike(data) {
      this.getTermCase(TERM_NAME).orLike(data);
      return this;
    }

    whereOrNotLike(data) {
      this.getTermCase(TERM_NAME).orNotLike(data);
      return this;
    }

    whereOrBetween(data) {
      this.getTermCase(TERM_NAME).orBetween(data);
      return this;
    }

    whereOrNotBetween(data) {
      this.getTermCase(TERM_NAME).orNotBetween(data);
      return this;
    }

    whereBracket() {
      this.getTermCase(TERM_NAME).bracket();
      return this;
    }

    whereOrBracket() {
      this.getTermCase(TERM_NAME).orBracket();
      return this;
    }

    where(sql) {
      this.getTermCase(TERM_NAME).sqlTerm(sql);
      return this;
    }

    getTermCase(key) {
      let term = this[key];

      if (!term || !(term instanceof term$1.default)) {
        term = new term$1.default();
        term.setDialect(this.dialectType);
        this[key] = term;
      }

      return term;
    }

    whereBuild(query) {
      const whereTerm = this.getTermCase(TERM_NAME);
      const whereSql = whereTerm.termsBuild();

      if (schemaVerify.Type.string.isNotEmpty(whereSql)) {
        query = `${query} WHERE ${whereSql}`;
      }

      return query;
    }

  }

  exports.default = Where;
});
unwrapExports(where$1);

var having = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const TERM_NAME = "havingTerm";

  class Having extends where$1.default {
    havingEqual(data) {
      this.getTermCase(TERM_NAME).equal(data);
      return this;
    }

    havingNotEqual(data) {
      this.getTermCase(TERM_NAME).notEqual(data);
      return this;
    }

    havingIn(data) {
      this.getTermCase(TERM_NAME).in(data);
      return this;
    }

    havingNotIn(data) {
      this.getTermCase(TERM_NAME).notIn(data);
      return this;
    }

    havingMore(data) {
      this.getTermCase(TERM_NAME).more(data);
      return this;
    }

    havingLess(data) {
      this.getTermCase(TERM_NAME).less(data);
      return this;
    }

    havingMoreEqual(data) {
      this.getTermCase(TERM_NAME).moreEqual(data);
      return this;
    }

    havingLessEqual(data) {
      this.getTermCase(TERM_NAME).lessEqual(data);
      return this;
    }

    havingLike(data) {
      this.getTermCase(TERM_NAME).like(data);
      return this;
    }

    havingNotLike(data) {
      this.getTermCase(TERM_NAME).notLike(data);
      return this;
    }

    havingBetween(data) {
      this.getTermCase(TERM_NAME).between(data);
      return this;
    }

    havingNotBetween(data) {
      this.getTermCase(TERM_NAME).notBetween(data);
      return this;
    }

    havingOrEqual(data) {
      this.getTermCase(TERM_NAME).orEqual(data);
      return this;
    }

    havingOrNotEqual(data) {
      this.getTermCase(TERM_NAME).orNotEqual(data);
      return this;
    }

    havingOrIn(data) {
      this.getTermCase(TERM_NAME).orIn(data);
      return this;
    }

    havingOrNotIn(data) {
      this.getTermCase(TERM_NAME).orNotIn(data);
      return this;
    }

    havingOrMore(data) {
      this.getTermCase(TERM_NAME).orMore(data);
      return this;
    }

    havingOrLess(data) {
      this.getTermCase(TERM_NAME).orLess(data);
      return this;
    }

    havingOrMoreEqual(data) {
      this.getTermCase(TERM_NAME).orMoreEqual(data);
      return this;
    }

    havingOrLessEqual(data) {
      this.getTermCase(TERM_NAME).orLessEqual(data);
      return this;
    }

    havingOrLike(data) {
      this.getTermCase(TERM_NAME).orLike(data);
      return this;
    }

    havingOrNotLike(data) {
      this.getTermCase(TERM_NAME).orNotLike(data);
      return this;
    }

    havingOrBetween(data) {
      this.getTermCase(TERM_NAME).orBetween(data);
      return this;
    }

    havingOrNotBetween(data) {
      this.getTermCase(TERM_NAME).orNotBetween(data);
      return this;
    }

    havingBracket() {
      this.getTermCase(TERM_NAME).bracket();
      return this;
    }

    havingOrBracket() {
      this.getTermCase(TERM_NAME).orBracket();
      return this;
    }

    having(sql) {
      this.getTermCase(TERM_NAME).sqlTerm(sql);
      return this;
    }

    havingBuild(query) {
      const termInstance = this.getTermCase(TERM_NAME);
      const havingSql = termInstance.termsBuild();

      if (schemaVerify.Type.string.isNotEmpty(havingSql)) {
        query = `${query} HAVING ${havingSql}`;
      }

      return query;
    }

  }

  exports.default = Having;
});
unwrapExports(having);

var func = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Func extends base$1.default {
    funcField(func, field) {
      const needSafeTrans = schemaVerify.Type.string.isNotEmpty(field) && field !== "*";
      const fieldStr = needSafeTrans ? field : schemaVerify.Type.number.is(field) ? field + "" : "*";
      const safeField = needSafeTrans ? this.safeKey(fieldStr) : fieldStr;
      const funcInfo = {
        funcFeild: `${func}(${safeField})`
      };
      return funcInfo;
    }

    count(field) {
      return this.funcField(_enum$1.FuncTypes.count, field);
    }

    sum(field) {
      return this.funcField(_enum$1.FuncTypes.sum, field);
    }

    max(field) {
      return this.funcField(_enum$1.FuncTypes.max, field);
    }

    min(field) {
      return this.funcField(_enum$1.FuncTypes.min, field);
    }

    avg(field) {
      return this.funcField(_enum$1.FuncTypes.avg, field);
    }

    abs(field) {
      return this.funcField(_enum$1.FuncTypes.abs, field);
    }

    ceil(field) {
      return this.funcField(_enum$1.FuncTypes.ceil, field);
    }

    floor(field) {
      return this.funcField(_enum$1.FuncTypes.floor, field);
    }

    round(field) {
      return this.funcField(_enum$1.FuncTypes.round, field);
    }

    log(field) {
      return this.funcField(_enum$1.FuncTypes.log, field);
    }

    log2(field) {
      return this.funcField(_enum$1.FuncTypes.log2, field);
    }

    exp(field) {
      return this.funcField(_enum$1.FuncTypes.exp, field);
    }

    power(field) {
      return this.funcField(_enum$1.FuncTypes.power, field);
    }

    acos(field) {
      return this.funcField(_enum$1.FuncTypes.acos, field);
    }

    asin(field) {
      return this.funcField(_enum$1.FuncTypes.asin, field);
    }

    atan(field) {
      return this.funcField(_enum$1.FuncTypes.atan, field);
    }

    cos(field) {
      return this.funcField(_enum$1.FuncTypes.cos, field);
    }

    sin(field) {
      return this.funcField(_enum$1.FuncTypes.sin, field);
    }

    tan(field) {
      return this.funcField(_enum$1.FuncTypes.tan, field);
    }

    conv(field) {
      return this.funcField(_enum$1.FuncTypes.conv, field);
    }

    random(field) {
      return this.funcField(_enum$1.FuncTypes.random, field);
    }

    rand(field) {
      return this.funcField(_enum$1.FuncTypes.rand, field);
    }

    radians(field) {
      return this.funcField(_enum$1.FuncTypes.radians, field);
    }

    degrees(field) {
      return this.funcField(_enum$1.FuncTypes.degrees, field);
    }

    distinct(field) {
      return this.funcField(_enum$1.FuncTypes.distinct, field);
    }

  }

  exports.default = Func;
});
unwrapExports(func);

var having$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const TERM_NAME = "havingTerm";

  class Having extends where$1.default {
    havingEqual(data) {
      this.getTermCase(TERM_NAME).equal(data);
      return this;
    }

    havingNotEqual(data) {
      this.getTermCase(TERM_NAME).notEqual(data);
      return this;
    }

    havingIn(data) {
      this.getTermCase(TERM_NAME).in(data);
      return this;
    }

    havingNotIn(data) {
      this.getTermCase(TERM_NAME).notIn(data);
      return this;
    }

    havingMore(data) {
      this.getTermCase(TERM_NAME).more(data);
      return this;
    }

    havingLess(data) {
      this.getTermCase(TERM_NAME).less(data);
      return this;
    }

    havingMoreEqual(data) {
      this.getTermCase(TERM_NAME).moreEqual(data);
      return this;
    }

    havingLessEqual(data) {
      this.getTermCase(TERM_NAME).lessEqual(data);
      return this;
    }

    havingLike(data) {
      this.getTermCase(TERM_NAME).like(data);
      return this;
    }

    havingNotLike(data) {
      this.getTermCase(TERM_NAME).notLike(data);
      return this;
    }

    havingBetween(data) {
      this.getTermCase(TERM_NAME).between(data);
      return this;
    }

    havingNotBetween(data) {
      this.getTermCase(TERM_NAME).notBetween(data);
      return this;
    }

    havingOrEqual(data) {
      this.getTermCase(TERM_NAME).orEqual(data);
      return this;
    }

    havingOrNotEqual(data) {
      this.getTermCase(TERM_NAME).orNotEqual(data);
      return this;
    }

    havingOrIn(data) {
      this.getTermCase(TERM_NAME).orIn(data);
      return this;
    }

    havingOrNotIn(data) {
      this.getTermCase(TERM_NAME).orNotIn(data);
      return this;
    }

    havingOrMore(data) {
      this.getTermCase(TERM_NAME).orMore(data);
      return this;
    }

    havingOrLess(data) {
      this.getTermCase(TERM_NAME).orLess(data);
      return this;
    }

    havingOrMoreEqual(data) {
      this.getTermCase(TERM_NAME).orMoreEqual(data);
      return this;
    }

    havingOrLessEqual(data) {
      this.getTermCase(TERM_NAME).orLessEqual(data);
      return this;
    }

    havingOrLike(data) {
      this.getTermCase(TERM_NAME).orLike(data);
      return this;
    }

    havingOrNotLike(data) {
      this.getTermCase(TERM_NAME).orNotLike(data);
      return this;
    }

    havingOrBetween(data) {
      this.getTermCase(TERM_NAME).orBetween(data);
      return this;
    }

    havingOrNotBetween(data) {
      this.getTermCase(TERM_NAME).orNotBetween(data);
      return this;
    }

    havingBracket() {
      this.getTermCase(TERM_NAME).bracket();
      return this;
    }

    havingOrBracket() {
      this.getTermCase(TERM_NAME).orBracket();
      return this;
    }

    having(sql) {
      this.getTermCase(TERM_NAME).sqlTerm(sql);
      return this;
    }

    havingBuild(query) {
      const termInstance = this.getTermCase(TERM_NAME);
      const havingSql = termInstance.termsBuild();

      if (schemaVerify.Type.string.isNotEmpty(havingSql)) {
        query = `${query} HAVING ${havingSql}`;
      }

      return query;
    }

  }

  exports.default = Having;
});
unwrapExports(having$1);

var func$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Func extends base$1.default {
    funcField(func, field) {
      const needSafeTrans = schemaVerify.Type.string.isNotEmpty(field) && field !== "*";
      const fieldStr = needSafeTrans ? field : schemaVerify.Type.number.is(field) ? field + "" : "*";
      const safeField = needSafeTrans ? this.safeKey(fieldStr) : fieldStr;
      const funcInfo = {
        funcFeild: `${func}(${safeField})`
      };
      return funcInfo;
    }

    count(field) {
      return this.funcField(_enum$1.FuncTypes.count, field);
    }

    sum(field) {
      return this.funcField(_enum$1.FuncTypes.sum, field);
    }

    max(field) {
      return this.funcField(_enum$1.FuncTypes.max, field);
    }

    min(field) {
      return this.funcField(_enum$1.FuncTypes.min, field);
    }

    avg(field) {
      return this.funcField(_enum$1.FuncTypes.avg, field);
    }

    abs(field) {
      return this.funcField(_enum$1.FuncTypes.abs, field);
    }

    ceil(field) {
      return this.funcField(_enum$1.FuncTypes.ceil, field);
    }

    floor(field) {
      return this.funcField(_enum$1.FuncTypes.floor, field);
    }

    round(field) {
      return this.funcField(_enum$1.FuncTypes.round, field);
    }

    log(field) {
      return this.funcField(_enum$1.FuncTypes.log, field);
    }

    log2(field) {
      return this.funcField(_enum$1.FuncTypes.log2, field);
    }

    exp(field) {
      return this.funcField(_enum$1.FuncTypes.exp, field);
    }

    power(field) {
      return this.funcField(_enum$1.FuncTypes.power, field);
    }

    acos(field) {
      return this.funcField(_enum$1.FuncTypes.acos, field);
    }

    asin(field) {
      return this.funcField(_enum$1.FuncTypes.asin, field);
    }

    atan(field) {
      return this.funcField(_enum$1.FuncTypes.atan, field);
    }

    cos(field) {
      return this.funcField(_enum$1.FuncTypes.cos, field);
    }

    sin(field) {
      return this.funcField(_enum$1.FuncTypes.sin, field);
    }

    tan(field) {
      return this.funcField(_enum$1.FuncTypes.tan, field);
    }

    conv(field) {
      return this.funcField(_enum$1.FuncTypes.conv, field);
    }

    random(field) {
      return this.funcField(_enum$1.FuncTypes.random, field);
    }

    rand(field) {
      return this.funcField(_enum$1.FuncTypes.rand, field);
    }

    radians(field) {
      return this.funcField(_enum$1.FuncTypes.radians, field);
    }

    degrees(field) {
      return this.funcField(_enum$1.FuncTypes.degrees, field);
    }

    distinct(field) {
      return this.funcField(_enum$1.FuncTypes.distinct, field);
    }

  }

  exports.default = Func;
});
unwrapExports(func$1);

var combine = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Combine extends having$1.default {
    constructor() {
      super();
      this.combineFuncs = [];
    }

    groupBuild(query) {
      const fields = this.groupByFields;

      if (!schemaVerify.Type.array.isNotEmpty(fields)) {
        return query;
      }

      const fieldsStr = fields.map(field => this.safeKey(field)).join(", ");
      query = `${query} GROUP BY ${fieldsStr}`;
      return query;
    }

    groupBy(...fields) {
      let groupByFields = schemaVerify.Type.array.safe(this.groupByFields);

      if (!builder$1.strArrVerify(fields)) {
        throw new Error(builder.default.errorFields);
      }

      groupByFields = groupByFields.concat(fields);
      this.groupByFields = Array.from(new Set(groupByFields));
      return this;
    }

    getFuncCase() {
      let func = this.funcInstance;

      if (!func || !(func instanceof func$1.default)) {
        func = new func$1.default();
        func.setDialect(this.dialectType);
        this.funcInstance = func;
      }

      return func;
    }

    formatFuncs() {
      const combineFuncs = schemaVerify.Type.array.safe(this.combineFuncs);
      let funcs = [];

      for (const info of combineFuncs) {
        if (!builder$1.funcInfoVerify(info)) {
          throw new Error(builder.default.errorFuncInfo);
        }

        const funcFeild = info.funcFeild;
        funcs.push(funcFeild);
      }

      funcs = Array.from(new Set(funcs));
      return funcs;
    }

    funcsCache(funcInfo) {
      const combineFuncs = schemaVerify.Type.array.safe(this.combineFuncs);

      if (builder$1.funcInfoVerify(funcInfo)) {
        combineFuncs.push(funcInfo);
      }

      this.combineFuncs = combineFuncs;
      return this;
    }

    funcFeilds(...funcInfos) {
      for (let info of funcInfos) {
        info = schemaVerify.Type.object.safe(info);

        if (builder$1.funcInfoVerify(info)) {
          this.funcsCache(info);
          continue;
        }

        const funcCase = this.getFuncCase();

        if (builder$1.funcInputVerify(info)) {
          const func = info.func;
          const field = info.field;

          if (schemaVerify.Type.object.is(funcCase) && schemaVerify.Type.function.is(funcCase[func])) {
            const funcInfo = funcCase[func].call(funcCase, field);
            this.funcsCache(funcInfo);
          }

          continue;
        }
      }

      return this;
    }

    count(field) {
      const funcInfo = this.getFuncCase().count(field);
      return this.funcsCache(funcInfo);
    }

    sum(field) {
      const funcInfo = this.getFuncCase().sum(field);
      return this.funcsCache(funcInfo);
    }

    max(field) {
      const funcInfo = this.getFuncCase().max(field);
      return this.funcsCache(funcInfo);
    }

    min(field) {
      const funcInfo = this.getFuncCase().min(field);
      return this.funcsCache(funcInfo);
    }

    avg(field) {
      const funcInfo = this.getFuncCase().avg(field);
      return this.funcsCache(funcInfo);
    }

    abs(field) {
      const funcInfo = this.getFuncCase().abs(field);
      return this.funcsCache(funcInfo);
    }

    ceil(field) {
      const funcInfo = this.getFuncCase().ceil(field);
      return this.funcsCache(funcInfo);
    }

    floor(field) {
      const funcInfo = this.getFuncCase().floor(field);
      return this.funcsCache(funcInfo);
    }

    round(field) {
      const funcInfo = this.getFuncCase().round(field);
      return this.funcsCache(funcInfo);
    }

    log(field) {
      const funcInfo = this.getFuncCase().log(field);
      return this.funcsCache(funcInfo);
    }

    log2(field) {
      const funcInfo = this.getFuncCase().log2(field);
      return this.funcsCache(funcInfo);
    }

    exp(field) {
      const funcInfo = this.getFuncCase().exp(field);
      return this.funcsCache(funcInfo);
    }

    power(field) {
      const funcInfo = this.getFuncCase().power(field);
      return this.funcsCache(funcInfo);
    }

    acos(field) {
      const funcInfo = this.getFuncCase().acos(field);
      return this.funcsCache(funcInfo);
    }

    asin(field) {
      const funcInfo = this.getFuncCase().asin(field);
      return this.funcsCache(funcInfo);
    }

    atan(field) {
      const funcInfo = this.getFuncCase().atan(field);
      return this.funcsCache(funcInfo);
    }

    cos(field) {
      const funcInfo = this.getFuncCase().cos(field);
      return this.funcsCache(funcInfo);
    }

    sin(field) {
      const funcInfo = this.getFuncCase().sin(field);
      return this.funcsCache(funcInfo);
    }

    tan(field) {
      const funcInfo = this.getFuncCase().tan(field);
      return this.funcsCache(funcInfo);
    }

    conv(field) {
      const funcInfo = this.getFuncCase().conv(field);
      return this.funcsCache(funcInfo);
    }

    random(field) {
      const funcInfo = this.getFuncCase().random(field);
      return this.funcsCache(funcInfo);
    }

    rand(field) {
      const funcInfo = this.getFuncCase().rand(field);
      return this.funcsCache(funcInfo);
    }

    radians(field) {
      const funcInfo = this.getFuncCase().radians(field);
      return this.funcsCache(funcInfo);
    }

    degrees(field) {
      const funcInfo = this.getFuncCase().degrees(field);
      return this.funcsCache(funcInfo);
    }

    distinct(field) {
      const funcInfo = this.getFuncCase().distinct(field);
      return this.funcsCache(funcInfo);
    }

  }

  exports.default = Combine;
});
unwrapExports(combine);

var combine$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Combine extends having$1.default {
    constructor() {
      super();
      this.combineFuncs = [];
    }

    groupBuild(query) {
      const fields = this.groupByFields;

      if (!schemaVerify.Type.array.isNotEmpty(fields)) {
        return query;
      }

      const fieldsStr = fields.map(field => this.safeKey(field)).join(", ");
      query = `${query} GROUP BY ${fieldsStr}`;
      return query;
    }

    groupBy(...fields) {
      let groupByFields = schemaVerify.Type.array.safe(this.groupByFields);

      if (!builder$1.strArrVerify(fields)) {
        throw new Error(builder.default.errorFields);
      }

      groupByFields = groupByFields.concat(fields);
      this.groupByFields = Array.from(new Set(groupByFields));
      return this;
    }

    getFuncCase() {
      let func = this.funcInstance;

      if (!func || !(func instanceof func$1.default)) {
        func = new func$1.default();
        func.setDialect(this.dialectType);
        this.funcInstance = func;
      }

      return func;
    }

    formatFuncs() {
      const combineFuncs = schemaVerify.Type.array.safe(this.combineFuncs);
      let funcs = [];

      for (const info of combineFuncs) {
        if (!builder$1.funcInfoVerify(info)) {
          throw new Error(builder.default.errorFuncInfo);
        }

        const funcFeild = info.funcFeild;
        funcs.push(funcFeild);
      }

      funcs = Array.from(new Set(funcs));
      return funcs;
    }

    funcsCache(funcInfo) {
      const combineFuncs = schemaVerify.Type.array.safe(this.combineFuncs);

      if (builder$1.funcInfoVerify(funcInfo)) {
        combineFuncs.push(funcInfo);
      }

      this.combineFuncs = combineFuncs;
      return this;
    }

    funcFeilds(...funcInfos) {
      for (let info of funcInfos) {
        info = schemaVerify.Type.object.safe(info);

        if (builder$1.funcInfoVerify(info)) {
          this.funcsCache(info);
          continue;
        }

        const funcCase = this.getFuncCase();

        if (builder$1.funcInputVerify(info)) {
          const func = info.func;
          const field = info.field;

          if (schemaVerify.Type.object.is(funcCase) && schemaVerify.Type.function.is(funcCase[func])) {
            const funcInfo = funcCase[func].call(funcCase, field);
            this.funcsCache(funcInfo);
          }

          continue;
        }
      }

      return this;
    }

    count(field) {
      const funcInfo = this.getFuncCase().count(field);
      return this.funcsCache(funcInfo);
    }

    sum(field) {
      const funcInfo = this.getFuncCase().sum(field);
      return this.funcsCache(funcInfo);
    }

    max(field) {
      const funcInfo = this.getFuncCase().max(field);
      return this.funcsCache(funcInfo);
    }

    min(field) {
      const funcInfo = this.getFuncCase().min(field);
      return this.funcsCache(funcInfo);
    }

    avg(field) {
      const funcInfo = this.getFuncCase().avg(field);
      return this.funcsCache(funcInfo);
    }

    abs(field) {
      const funcInfo = this.getFuncCase().abs(field);
      return this.funcsCache(funcInfo);
    }

    ceil(field) {
      const funcInfo = this.getFuncCase().ceil(field);
      return this.funcsCache(funcInfo);
    }

    floor(field) {
      const funcInfo = this.getFuncCase().floor(field);
      return this.funcsCache(funcInfo);
    }

    round(field) {
      const funcInfo = this.getFuncCase().round(field);
      return this.funcsCache(funcInfo);
    }

    log(field) {
      const funcInfo = this.getFuncCase().log(field);
      return this.funcsCache(funcInfo);
    }

    log2(field) {
      const funcInfo = this.getFuncCase().log2(field);
      return this.funcsCache(funcInfo);
    }

    exp(field) {
      const funcInfo = this.getFuncCase().exp(field);
      return this.funcsCache(funcInfo);
    }

    power(field) {
      const funcInfo = this.getFuncCase().power(field);
      return this.funcsCache(funcInfo);
    }

    acos(field) {
      const funcInfo = this.getFuncCase().acos(field);
      return this.funcsCache(funcInfo);
    }

    asin(field) {
      const funcInfo = this.getFuncCase().asin(field);
      return this.funcsCache(funcInfo);
    }

    atan(field) {
      const funcInfo = this.getFuncCase().atan(field);
      return this.funcsCache(funcInfo);
    }

    cos(field) {
      const funcInfo = this.getFuncCase().cos(field);
      return this.funcsCache(funcInfo);
    }

    sin(field) {
      const funcInfo = this.getFuncCase().sin(field);
      return this.funcsCache(funcInfo);
    }

    tan(field) {
      const funcInfo = this.getFuncCase().tan(field);
      return this.funcsCache(funcInfo);
    }

    conv(field) {
      const funcInfo = this.getFuncCase().conv(field);
      return this.funcsCache(funcInfo);
    }

    random(field) {
      const funcInfo = this.getFuncCase().random(field);
      return this.funcsCache(funcInfo);
    }

    rand(field) {
      const funcInfo = this.getFuncCase().rand(field);
      return this.funcsCache(funcInfo);
    }

    radians(field) {
      const funcInfo = this.getFuncCase().radians(field);
      return this.funcsCache(funcInfo);
    }

    degrees(field) {
      const funcInfo = this.getFuncCase().degrees(field);
      return this.funcsCache(funcInfo);
    }

    distinct(field) {
      const funcInfo = this.getFuncCase().distinct(field);
      return this.funcsCache(funcInfo);
    }

  }

  exports.default = Combine;
});
unwrapExports(combine$1);

var select = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Select extends combine$1.default {
    constructor() {
      super();
      this.selectFields = [];
      this.fieldsAsMap = {};
    }

    formatFields() {
      const fields = schemaVerify.Type.array.safe(this.selectFields);
      const asMap = schemaVerify.Type.object.safe(this.fieldsAsMap);
      const result = [];

      for (const field of fields) {
        if (!schemaVerify.Type.string.isNotEmpty(field)) {
          continue;
        }

        const safeField = field !== "*" ? this.safeKey(field) : "*";

        if (schemaVerify.Type.string.isNotEmpty(asMap[field])) {
          const safeAsField = this.safeKey(asMap[field]);
          result.push(`${safeField} AS ${safeAsField}`);
        } else {
          result.push(safeField);
        }
      }

      return result;
    }

    formatFieldStr() {
      let fields = this.formatFields();
      let funcs = this.formatFuncs();
      let result;

      if (builder$1.strArrVerify(fields) || builder$1.strArrVerify(funcs)) {
        fields = schemaVerify.Type.array.safe(fields);
        funcs = schemaVerify.Type.array.safe(funcs);
        result = [].concat(fields, funcs).join(", ");
      } else {
        result = "*";
      }

      return result;
    }

    build() {
      const table = this.getQueryTable();
      const fieldsStr = this.formatFieldStr();
      let query = `${_enum$1.QueryTypes.select} ${fieldsStr} FROM ${table}`;
      query = this.whereBuild(query);
      query = this.groupBuild(query);
      query = this.havingBuild(query);
      query = this.orderBuild(query);
      query = this.limitBuild(query);
      return query;
    }

    fields(arg, ...otherArgs) {
      const selectFields = schemaVerify.Type.array.safe(this.selectFields);
      const args = util$1.argStrArrTrans(arg, otherArgs);
      const fields = [];

      for (const item of args) {
        if (schemaVerify.Type.object.isNotEmpty(item)) {
          this.funcFeilds(item);
          continue;
        }

        if (schemaVerify.Type.string.isNotEmpty(item)) {
          fields.push(item);
        }
      }

      this.selectFields = Array.from(new Set(selectFields.concat(fields)));

      if (this.selectFields.includes("*")) {
        this.selectFields = ["*"];
      }

      return this;
    }

    asFieldMap(map) {
      const asMap = schemaVerify.Type.object.safe(this.fieldsAsMap);

      if (!builder$1.strObjVerify(map)) {
        throw new Error(builder.default.errorFieldMap);
      }

      this.fieldsAsMap = Object.assign({}, asMap, map);
      return this;
    }

    limit(offset, step) {
      this.getLimitCase().limit(offset, step);
      return this;
    }

    paging(page, size) {
      this.getLimitCase().paging(page, size);
      return this;
    }

    findOne() {
      this.getLimitCase().step(1);
      return this;
    }

  }

  exports.default = Select;
});
unwrapExports(select);

var update = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Update extends where$1.default {
    constructor() {
      super();
      this.updateInfos = {};
    }

    build() {
      const table = this.getQueryTable();
      const data = this.formatData();
      const dataStr = data.join(", ");
      let query = `${_enum$1.QueryTypes.update} ${table} SET ${dataStr}`;
      query = this.whereBuild(query);
      query = this.orderBuild(query);
      query = this.limitBuild(query);
      return query;
    }

    formatData() {
      const updateInfos = this.updateInfos;

      if (!schemaVerify.Type.object.isNotEmpty(updateInfos)) {
        throw new Error(builder.default.emptyUpdateInfo);
      }

      const result = [];

      for (const field in updateInfos) {
        const info = updateInfos[field];

        if (!builder$1.updateInfoVerify(info)) {
          continue;
        }

        const type = info.type;
        const value = info.value;
        const safeValue = this.safeValue(value);
        const safeField = this.safeKey(field);
        let infoStr = "";

        switch (type) {
          case _enum$1.UpdateTypes.set:
            infoStr = `${safeField} = ${safeValue}`;
            break;

          case _enum$1.UpdateTypes.add:
            infoStr = `${safeField} = ${safeField} + ${safeValue}`;
            break;

          case _enum$1.UpdateTypes.minus:
            infoStr = `${safeField} = ${safeField} - ${safeValue}`;
            break;
        }

        if (schemaVerify.Type.string.isNotEmpty(infoStr)) {
          result.push(infoStr);
        }
      }

      if (!builder$1.strArrVerify(result)) {
        throw new Error(builder.default.emptyUpdateInfo);
      }

      return result;
    }

    updateCache(data, type) {
      if (!builder$1.fieldDataVerify(data)) {
        throw new Error(builder.default.errorFieldData);
      }

      const updateInfos = schemaVerify.Type.object.safe(this.updateInfos);

      for (const field in data) {
        const value = data[field];
        const updateInfo = {
          value,
          type
        };

        if (!builder$1.updateInfoVerify(updateInfo)) {
          throw new Error(builder.default.errorUpdateInfo);
        }

        updateInfos[field] = updateInfo;
      }

      this.updateInfos = updateInfos;
      return this;
    }

    set(data) {
      return this.updateCache(data, _enum$1.UpdateTypes.set);
    }

    add(data) {
      return this.updateCache(data, _enum$1.UpdateTypes.add);
    }

    minus(data) {
      return this.updateCache(data, _enum$1.UpdateTypes.minus);
    }

  }

  exports.default = Update;
});
unwrapExports(update);

var _delete = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Delete extends where$1.default {
    build() {
      const table = this.getQueryTable();
      let query = `${_enum$1.QueryTypes.delete} FROM ${table}`;
      query = this.whereBuild(query);
      query = this.orderBuild(query);
      query = this.limitBuild(query);
      return query;
    }

  }

  exports.default = Delete;
});

unwrapExports(_delete);

var insert$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const SQL_NAME = "valuesSql";

  class Insert extends query$1.default {
    constructor() {
      super();
      this.queryType = _enum$1.QueryTypes.insert;
      this.insertData = {};
      this.insertFields = [];
      this.insertDataArr = [];
    }

    data(data) {
      if (!builder$1.fieldDataVerify(data)) {
        throw new Error(builder.default.errorFieldData);
      }

      const insertData = schemaVerify.Type.object.safe(this.insertData);
      this.insertData = Object.assign({}, insertData, data);
      return this;
    }

    fields(arg, ...otherArgs) {
      const args = util$1.argStrArrTrans(arg, otherArgs);
      const insertFields = schemaVerify.Type.array.safe(this.insertFields);
      const result = [].concat(insertFields, args);
      this.insertFields = Array.from(new Set(result));
      return this;
    }

    multiData(dataArr) {
      if (!builder$1.fieldDataArrVerify(dataArr)) {
        throw new Error(builder.default.errorFieldDataArr);
      }

      const insertDataArr = schemaVerify.Type.array.safe(this.insertDataArr);
      this.insertDataArr = [].concat(insertDataArr, dataArr);
      return this;
    }

    values(sql) {
      this.manualSql(sql, SQL_NAME);
      return this;
    }

    formatValuesSql() {
      return this.formatManualSql(SQL_NAME);
    }

    formatFields() {
      const insertData = this.insertData;
      const insertFields = this.insertFields;
      const insertDataArr = this.insertDataArr;
      let fields;

      if (builder$1.strArrVerify(insertFields)) {
        fields = insertFields;
      } else if (builder$1.fieldDataVerify(insertData)) {
        fields = Object.keys(insertData);
      } else if (builder$1.fieldDataArrVerify(insertDataArr)) {
        fields = Object.keys(insertDataArr[0]);
      }

      if (!builder$1.strArrVerify(fields)) {
        throw new Error(builder.default.errorFields);
      }

      return fields;
    }

    formatValues(fields) {
      fields = schemaVerify.Type.array.safe(fields);
      let result = "";
      const valuesSql = this.formatValuesSql();
      const insertData = this.insertData;
      const insertDataArr = this.insertDataArr;
      const valuesArr = [];

      const valuesStrFormat = data => {
        const valuesStr = fields.map(field => this.safeValue(data[field])).join(", ");
        return `( ${valuesStr} )`;
      };

      const valuesArrStrFormat = arr => {
        for (const data of arr) {
          if (schemaVerify.Type.object.isNotEmpty(data)) {
            valuesArr.push(valuesStrFormat(data));
          }
        }

        return valuesArr.join(", ");
      };

      if (schemaVerify.Type.string.isNotEmpty(valuesSql)) {
        result = valuesSql;
      } else if (builder$1.fieldDataVerify(insertData)) {
        result = valuesStrFormat(insertData);
      } else if (builder$1.fieldDataArrVerify(insertDataArr)) {
        result = valuesArrStrFormat(insertDataArr);
      }

      if (!schemaVerify.Type.string.isNotEmpty(result)) {
        throw new Error(builder.default.errorInsertValues);
      }

      return `VALUES ${result}`;
    }

    build() {
      const type = this.queryType;
      const table = this.getQueryTable();
      const fields = this.formatFields();
      const valuesStr = this.formatValues(fields);
      const fieldsStr = fields.map(field => this.safeKey(field)).join(", ");
      let query = `${type} INTO ${table} ( ${fieldsStr} )  ${valuesStr}`;
      return query;
    }

  }

  exports.default = Insert;
});
unwrapExports(insert$1);

var replace = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Replace extends insert$1.default {
    constructor() {
      super();
      this.queryType = _enum$1.QueryTypes.replace;
    }

  }

  exports.default = Replace;
});
unwrapExports(replace);

var constant = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TABLE_OPT_VALUES = ["CURRENT_TIMESTAMP"];
  exports.FEILD_TEMPLATE = `{{field}}{{type}}{{unsigned}}{{notNull}}{{default}}{{autoIncrement}}{{onUpdate}}{{comment}}`;
});
unwrapExports(constant);
var constant_1 = constant.TABLE_OPT_VALUES;
var constant_2 = constant.FEILD_TEMPLATE;

var constant$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TABLE_OPT_VALUES = ["CURRENT_TIMESTAMP"];
  exports.FEILD_TEMPLATE = `{{field}}{{type}}{{unsigned}}{{notNull}}{{default}}{{autoIncrement}}{{onUpdate}}{{comment}}`;
});
unwrapExports(constant$1);
var constant_1$1 = constant$1.TABLE_OPT_VALUES;
var constant_2$1 = constant$1.FEILD_TEMPLATE;

var create = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const TABLE_TEMPLATE = `CREATE TABLE IF NOT EXISTS {{tableName}}( {{feildsStr}}) {{tableOptionsStr}}`;
  const TABLE_OPTIONS_TEMPLATE = `{{engine}}{{autoIncrement}}{{defaultCharset}}{{comment}}`;

  class Create extends base$1.default {
    info(tableInfo) {
      if (schemaVerify.Type.string.isNotEmpty(tableInfo)) {
        this.createTableSqlStr = tableInfo;
      } else if (builder$1.tableInfoVerify(tableInfo, true)) {
        this.createTableInfo = tableInfo;
      }

      return this;
    }

    build() {
      const tableSqlStr = this.createTableSqlStr;

      if (schemaVerify.Type.string.isNotEmpty(tableSqlStr)) {
        return tableSqlStr;
      }

      const tableInfo = this.createTableInfo;
      builder$1.tableInfoVerify(tableInfo, true);
      const query = this.tableTmpl(tableInfo);
      return query;
    }

    tableTmpl(info) {
      const tableName = info.tableName;
      const feildsStr = this.feildsStr(info);
      const tableOptionsStr = this.tableOptsStr(info);
      const tmplOpts = {
        tableName,
        feildsStr,
        tableOptionsStr
      };
      const tableInfoStr = util$1.analyTmpl(TABLE_TEMPLATE, tmplOpts) + ";";
      return tableInfoStr;
    }

    feildsStr(info) {
      const primaryKey = info.primaryKey;
      const uniqueKey = info.uniqueKey;
      const fields = info.fields;
      const feildTmplArr = [];

      for (const fieldInfo of fields) {
        const feildStr = this.feildTmpl(fieldInfo);
        feildTmplArr.push(feildStr);
      }

      const primaryKeyStr = this.primaryKeyStr(primaryKey);
      const uniqueKeyStr = this.uniqueKeyStr(uniqueKey);

      if (schemaVerify.Type.string.isNotEmpty(primaryKeyStr)) {
        feildTmplArr.push(primaryKeyStr);
      }

      if (schemaVerify.Type.string.isNotEmpty(uniqueKeyStr)) {
        feildTmplArr.push(uniqueKeyStr);
      }

      return feildTmplArr.join(",");
    }

    feildTmpl(fieldInfo) {
      const field = this.safeKey(fieldInfo.field);
      const type = fieldInfo.type.toUpperCase();
      const unsigned = fieldInfo.unsigned;
      const notNull = fieldInfo.notNull;
      let defaultValue = fieldInfo.default;
      const autoIncrement = fieldInfo.autoIncrement;
      const onUpdate = fieldInfo.onUpdate;
      let comment = fieldInfo.comment;
      const tmplOpts = {
        field,
        type
      };

      if (unsigned === true) {
        tmplOpts["unsigned"] = _enum$1.TableOptions.unsigned;
      }

      if (notNull === true) {
        tmplOpts["notNull"] = _enum$1.TableOptions.notNull;
      }

      if (schemaVerify.Type.string.is(defaultValue) || schemaVerify.Type.number.is(defaultValue)) {
        let needSafe = true;
        let upperValue;

        if (schemaVerify.Type.string.is(defaultValue)) {
          upperValue = defaultValue.toUpperCase();
          needSafe = !constant$1.TABLE_OPT_VALUES.includes(upperValue);
        }

        defaultValue = needSafe ? this.safeValue(defaultValue) : upperValue;
        tmplOpts["default"] = `${_enum$1.TableOptions.default} ${defaultValue}`;
      }

      if (autoIncrement === true) {
        tmplOpts["autoIncrement"] = _enum$1.TableOptions.autoIncrement;
      }

      if (schemaVerify.Type.string.isNotEmpty(onUpdate)) {
        tmplOpts["onUpdate"] = `${_enum$1.TableOptions.onUpdate} ${onUpdate}`;
      }

      if (schemaVerify.Type.string.isNotEmpty(comment)) {
        comment = this.safeValue(comment);
        tmplOpts["comment"] = `${_enum$1.TableOptions.comment} ${comment}`;
      }

      const feildStr = util$1.analyTmpl(constant$1.FEILD_TEMPLATE, tmplOpts);
      return feildStr;
    }

    primaryKeyStr(keyInfo) {
      let result;
      const primaryKey = _enum$1.TableOptions.primaryKey;

      if (schemaVerify.Type.string.isNotEmpty(keyInfo)) {
        const value = this.safeKey(keyInfo);
        result = `${value} ${primaryKey} (${value})`;
      }

      if (schemaVerify.Type.object.is(keyInfo)) {
        const keyName = this.safeKey(keyInfo.keyName);
        const combineFields = keyInfo.combineFields;
        const combineFieldsStr = combineFields.map(field => this.safeKey(field)).join(",");
        result = `${keyName} ${primaryKey} (${combineFieldsStr})`;
      }

      return `${_enum$1.TableOptions.constraint} ${result}`;
    }

    uniqueKeyStr(keyInfo) {
      let result;
      const uniqueKey = _enum$1.TableOptions.uniqueKey;

      if (schemaVerify.Type.string.isNotEmpty(keyInfo)) {
        const value = this.safeKey(keyInfo);
        result = `${value} ${uniqueKey} (${value})`;
      }

      if (schemaVerify.Type.object.is(keyInfo)) {
        const keyName = this.safeKey(keyInfo.keyName);
        const combineFields = keyInfo.combineFields;
        const combineFieldsStr = combineFields.map(field => this.safeKey(field)).join(",");
        result = `${keyName} ${uniqueKey} (${combineFieldsStr})`;
      }

      return `${_enum$1.TableOptions.constraint} ${result}`;
    }

    tableOptsStr(info) {
      const engine = info.engine;
      const autoIncrement = info.autoIncrement;
      const defaultCharset = info.defaultCharset;
      const comment = info.comment;
      const tmplOpts = {};

      if (schemaVerify.Type.string.isNotEmpty(engine)) {
        const key = _enum$1.TableOptions.engine;
        const value = engine;
        tmplOpts["engine"] = `${key}=${value}`;
      }

      if (schemaVerify.Type.number.is(autoIncrement)) {
        const key = _enum$1.TableOptions.autoIncrement;
        const value = autoIncrement;
        tmplOpts["autoIncrement"] = `${key}=${value}`;
      }

      if (schemaVerify.Type.string.isNotEmpty(defaultCharset)) {
        const key = _enum$1.TableOptions.defaultCharset;
        const value = defaultCharset;
        tmplOpts["defaultCharset"] = `${key}=${value}`;
      }

      if (schemaVerify.Type.string.isNotEmpty(comment)) {
        const key = _enum$1.TableOptions.comment;
        const value = this.safeValue(comment);
        tmplOpts["comment"] = `${key}=${value}`;
      }

      const tableOptionsStr = util$1.analyTmpl(TABLE_OPTIONS_TEMPLATE, tmplOpts);
      return tableOptionsStr;
    }

  }

  exports.default = Create;
});
unwrapExports(create);

var alter = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ALTER_TEMPLATE = `ALTER TABLE {{queryTable}}{{alterInfosStr}}`;
  const ALTER_INFOS_TEMPLATE = `{{method}}COLUMN {{field}}{{alterFieldStr}}`;

  class Alter extends base$1.default {
    add(field, alterField) {
      if (schemaVerify.Type.object.is(field)) {
        alterField = field;
        field = alterField.field;
      }

      delete alterField["field"];
      return this.alterCache(_enum$1.AlterMethods.add, field, alterField);
    }

    drop(field) {
      return this.alterCache(_enum$1.AlterMethods.drop, field, {});
    }

    modify(field, alterField) {
      delete alterField["field"];
      return this.alterCache(_enum$1.AlterMethods.modify, field, alterField);
    }

    change(field, alterField) {
      return this.alterCache(_enum$1.AlterMethods.change, field, alterField);
    }

    alterCache(method, field, alterField) {
      if (_enum$1.AlterMethods.drop !== method && !schemaVerify.Type.object.isNotEmpty(alterField)) {
        throw new Error(builder.default.errorAlterField);
      }

      const alterInfo = {
        method,
        field,
        alterField
      };

      if (!builder$1.alterInfosVerify(alterInfo)) {
        throw new Error(builder.default.errorAlterField);
      }

      const alterInfos = schemaVerify.Type.array.safe(this.alterInfos);
      alterInfos.push(alterInfo);
      this.alterInfos = alterInfos;
      return this;
    }

    build() {
      const alterInfos = schemaVerify.Type.array.safe(this.alterInfos);
      const infosStrArr = [];

      for (const item of alterInfos) {
        if (!builder$1.alterInfosVerify(item)) {
          continue;
        }

        const method = item.method;
        const field = this.safeKey(item.field);
        const alterField = item.alterField;
        const alterFieldStr = this.feildTmpl(alterField);
        const tmplOpts = {
          method,
          field,
          alterFieldStr
        };
        const alterInfoStr = util$1.analyTmpl(ALTER_INFOS_TEMPLATE, tmplOpts);
        infosStrArr.push(alterInfoStr);
      }

      if (!schemaVerify.Type.array.isNotEmpty(infosStrArr)) {
        throw new Error(builder.default.emptyAlterInfos);
      }

      const alterInfosStr = infosStrArr.join(",");
      const queryTable = this.getQueryTable();
      const tmplOpts = {
        queryTable,
        alterInfosStr
      };
      const query = util$1.analyTmpl(ALTER_TEMPLATE, tmplOpts);
      return query;
    }

    feildTmpl(fieldInfo) {
      const field = fieldInfo.field;
      const type = fieldInfo.type;
      const unsigned = fieldInfo.unsigned;
      const notNull = fieldInfo.notNull;
      let defaultValue = fieldInfo.default;
      const autoIncrement = fieldInfo.autoIncrement;
      const onUpdate = fieldInfo.onUpdate;
      let comment = fieldInfo.comment;
      const tmplOpts = {};

      if (schemaVerify.Type.string.isNotEmpty(field)) {
        tmplOpts["field"] = this.safeKey(field);
      }

      if (schemaVerify.Type.string.isNotEmpty(type)) {
        tmplOpts["type"] = type.toUpperCase();
      }

      if (unsigned === true) {
        tmplOpts["unsigned"] = _enum$1.TableOptions.unsigned;
      }

      if (notNull === true) {
        tmplOpts["notNull"] = _enum$1.TableOptions.notNull;
      }

      if (schemaVerify.Type.string.is(defaultValue) || schemaVerify.Type.number.is(defaultValue)) {
        let needSafe = true;
        let upperValue;

        if (schemaVerify.Type.string.is(defaultValue)) {
          upperValue = defaultValue.toUpperCase();
          needSafe = !constant$1.TABLE_OPT_VALUES.includes(upperValue);
        }

        defaultValue = needSafe ? this.safeValue(defaultValue) : upperValue;
        tmplOpts["default"] = `${_enum$1.TableOptions.default} ${defaultValue}`;
      }

      if (autoIncrement === true) {
        tmplOpts["autoIncrement"] = _enum$1.TableOptions.autoIncrement;
      }

      if (schemaVerify.Type.string.isNotEmpty(onUpdate)) {
        tmplOpts["onUpdate"] = `${_enum$1.TableOptions.onUpdate} ${onUpdate}`;
      }

      if (schemaVerify.Type.string.isNotEmpty(comment)) {
        comment = this.safeValue(comment);
        tmplOpts["comment"] = `${_enum$1.TableOptions.comment} ${comment}`;
      }

      const feildStr = util$1.analyTmpl(constant$1.FEILD_TEMPLATE, tmplOpts);
      return feildStr;
    }

  }

  exports.default = Alter;
});
unwrapExports(alter);

var select$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Select extends combine$1.default {
    constructor() {
      super();
      this.selectFields = [];
      this.fieldsAsMap = {};
    }

    formatFields() {
      const fields = schemaVerify.Type.array.safe(this.selectFields);
      const asMap = schemaVerify.Type.object.safe(this.fieldsAsMap);
      const result = [];

      for (const field of fields) {
        if (!schemaVerify.Type.string.isNotEmpty(field)) {
          continue;
        }

        const safeField = field !== "*" ? this.safeKey(field) : "*";

        if (schemaVerify.Type.string.isNotEmpty(asMap[field])) {
          const safeAsField = this.safeKey(asMap[field]);
          result.push(`${safeField} AS ${safeAsField}`);
        } else {
          result.push(safeField);
        }
      }

      return result;
    }

    formatFieldStr() {
      let fields = this.formatFields();
      let funcs = this.formatFuncs();
      let result;

      if (builder$1.strArrVerify(fields) || builder$1.strArrVerify(funcs)) {
        fields = schemaVerify.Type.array.safe(fields);
        funcs = schemaVerify.Type.array.safe(funcs);
        result = [].concat(fields, funcs).join(", ");
      } else {
        result = "*";
      }

      return result;
    }

    build() {
      const table = this.getQueryTable();
      const fieldsStr = this.formatFieldStr();
      let query = `${_enum$1.QueryTypes.select} ${fieldsStr} FROM ${table}`;
      query = this.whereBuild(query);
      query = this.groupBuild(query);
      query = this.havingBuild(query);
      query = this.orderBuild(query);
      query = this.limitBuild(query);
      return query;
    }

    fields(arg, ...otherArgs) {
      const selectFields = schemaVerify.Type.array.safe(this.selectFields);
      const args = util$1.argStrArrTrans(arg, otherArgs);
      const fields = [];

      for (const item of args) {
        if (schemaVerify.Type.object.isNotEmpty(item)) {
          this.funcFeilds(item);
          continue;
        }

        if (schemaVerify.Type.string.isNotEmpty(item)) {
          fields.push(item);
        }
      }

      this.selectFields = Array.from(new Set(selectFields.concat(fields)));

      if (this.selectFields.includes("*")) {
        this.selectFields = ["*"];
      }

      return this;
    }

    asFieldMap(map) {
      const asMap = schemaVerify.Type.object.safe(this.fieldsAsMap);

      if (!builder$1.strObjVerify(map)) {
        throw new Error(builder.default.errorFieldMap);
      }

      this.fieldsAsMap = Object.assign({}, asMap, map);
      return this;
    }

    limit(offset, step) {
      this.getLimitCase().limit(offset, step);
      return this;
    }

    paging(page, size) {
      this.getLimitCase().paging(page, size);
      return this;
    }

    findOne() {
      this.getLimitCase().step(1);
      return this;
    }

  }

  exports.default = Select;
});
unwrapExports(select$1);

var update$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Update extends where$1.default {
    constructor() {
      super();
      this.updateInfos = {};
    }

    build() {
      const table = this.getQueryTable();
      const data = this.formatData();
      const dataStr = data.join(", ");
      let query = `${_enum$1.QueryTypes.update} ${table} SET ${dataStr}`;
      query = this.whereBuild(query);
      query = this.orderBuild(query);
      query = this.limitBuild(query);
      return query;
    }

    formatData() {
      const updateInfos = this.updateInfos;

      if (!schemaVerify.Type.object.isNotEmpty(updateInfos)) {
        throw new Error(builder.default.emptyUpdateInfo);
      }

      const result = [];

      for (const field in updateInfos) {
        const info = updateInfos[field];

        if (!builder$1.updateInfoVerify(info)) {
          continue;
        }

        const type = info.type;
        const value = info.value;
        const safeValue = this.safeValue(value);
        const safeField = this.safeKey(field);
        let infoStr = "";

        switch (type) {
          case _enum$1.UpdateTypes.set:
            infoStr = `${safeField} = ${safeValue}`;
            break;

          case _enum$1.UpdateTypes.add:
            infoStr = `${safeField} = ${safeField} + ${safeValue}`;
            break;

          case _enum$1.UpdateTypes.minus:
            infoStr = `${safeField} = ${safeField} - ${safeValue}`;
            break;
        }

        if (schemaVerify.Type.string.isNotEmpty(infoStr)) {
          result.push(infoStr);
        }
      }

      if (!builder$1.strArrVerify(result)) {
        throw new Error(builder.default.emptyUpdateInfo);
      }

      return result;
    }

    updateCache(data, type) {
      if (!builder$1.fieldDataVerify(data)) {
        throw new Error(builder.default.errorFieldData);
      }

      const updateInfos = schemaVerify.Type.object.safe(this.updateInfos);

      for (const field in data) {
        const value = data[field];
        const updateInfo = {
          value,
          type
        };

        if (!builder$1.updateInfoVerify(updateInfo)) {
          throw new Error(builder.default.errorUpdateInfo);
        }

        updateInfos[field] = updateInfo;
      }

      this.updateInfos = updateInfos;
      return this;
    }

    set(data) {
      return this.updateCache(data, _enum$1.UpdateTypes.set);
    }

    add(data) {
      return this.updateCache(data, _enum$1.UpdateTypes.add);
    }

    minus(data) {
      return this.updateCache(data, _enum$1.UpdateTypes.minus);
    }

  }

  exports.default = Update;
});
unwrapExports(update$1);

var _delete$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Delete extends where$1.default {
    build() {
      const table = this.getQueryTable();
      let query = `${_enum$1.QueryTypes.delete} FROM ${table}`;
      query = this.whereBuild(query);
      query = this.orderBuild(query);
      query = this.limitBuild(query);
      return query;
    }

  }

  exports.default = Delete;
});

unwrapExports(_delete$1);

var replace$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Replace extends insert$1.default {
    constructor() {
      super();
      this.queryType = _enum$1.QueryTypes.replace;
    }

  }

  exports.default = Replace;
});
unwrapExports(replace$1);

var create$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const TABLE_TEMPLATE = `CREATE TABLE IF NOT EXISTS {{tableName}}( {{feildsStr}}) {{tableOptionsStr}}`;
  const TABLE_OPTIONS_TEMPLATE = `{{engine}}{{autoIncrement}}{{defaultCharset}}{{comment}}`;

  class Create extends base$1.default {
    info(tableInfo) {
      if (schemaVerify.Type.string.isNotEmpty(tableInfo)) {
        this.createTableSqlStr = tableInfo;
      } else if (builder$1.tableInfoVerify(tableInfo, true)) {
        this.createTableInfo = tableInfo;
      }

      return this;
    }

    build() {
      const tableSqlStr = this.createTableSqlStr;

      if (schemaVerify.Type.string.isNotEmpty(tableSqlStr)) {
        return tableSqlStr;
      }

      const tableInfo = this.createTableInfo;
      builder$1.tableInfoVerify(tableInfo, true);
      const query = this.tableTmpl(tableInfo);
      return query;
    }

    tableTmpl(info) {
      const tableName = info.tableName;
      const feildsStr = this.feildsStr(info);
      const tableOptionsStr = this.tableOptsStr(info);
      const tmplOpts = {
        tableName,
        feildsStr,
        tableOptionsStr
      };
      const tableInfoStr = util$1.analyTmpl(TABLE_TEMPLATE, tmplOpts) + ";";
      return tableInfoStr;
    }

    feildsStr(info) {
      const primaryKey = info.primaryKey;
      const uniqueKey = info.uniqueKey;
      const fields = info.fields;
      const feildTmplArr = [];

      for (const fieldInfo of fields) {
        const feildStr = this.feildTmpl(fieldInfo);
        feildTmplArr.push(feildStr);
      }

      const primaryKeyStr = this.primaryKeyStr(primaryKey);
      const uniqueKeyStr = this.uniqueKeyStr(uniqueKey);

      if (schemaVerify.Type.string.isNotEmpty(primaryKeyStr)) {
        feildTmplArr.push(primaryKeyStr);
      }

      if (schemaVerify.Type.string.isNotEmpty(uniqueKeyStr)) {
        feildTmplArr.push(uniqueKeyStr);
      }

      return feildTmplArr.join(",");
    }

    feildTmpl(fieldInfo) {
      const field = this.safeKey(fieldInfo.field);
      const type = fieldInfo.type.toUpperCase();
      const unsigned = fieldInfo.unsigned;
      const notNull = fieldInfo.notNull;
      let defaultValue = fieldInfo.default;
      const autoIncrement = fieldInfo.autoIncrement;
      const onUpdate = fieldInfo.onUpdate;
      let comment = fieldInfo.comment;
      const tmplOpts = {
        field,
        type
      };

      if (unsigned === true) {
        tmplOpts["unsigned"] = _enum$1.TableOptions.unsigned;
      }

      if (notNull === true) {
        tmplOpts["notNull"] = _enum$1.TableOptions.notNull;
      }

      if (schemaVerify.Type.string.is(defaultValue) || schemaVerify.Type.number.is(defaultValue)) {
        let needSafe = true;
        let upperValue;

        if (schemaVerify.Type.string.is(defaultValue)) {
          upperValue = defaultValue.toUpperCase();
          needSafe = !constant$1.TABLE_OPT_VALUES.includes(upperValue);
        }

        defaultValue = needSafe ? this.safeValue(defaultValue) : upperValue;
        tmplOpts["default"] = `${_enum$1.TableOptions.default} ${defaultValue}`;
      }

      if (autoIncrement === true) {
        tmplOpts["autoIncrement"] = _enum$1.TableOptions.autoIncrement;
      }

      if (schemaVerify.Type.string.isNotEmpty(onUpdate)) {
        tmplOpts["onUpdate"] = `${_enum$1.TableOptions.onUpdate} ${onUpdate}`;
      }

      if (schemaVerify.Type.string.isNotEmpty(comment)) {
        comment = this.safeValue(comment);
        tmplOpts["comment"] = `${_enum$1.TableOptions.comment} ${comment}`;
      }

      const feildStr = util$1.analyTmpl(constant$1.FEILD_TEMPLATE, tmplOpts);
      return feildStr;
    }

    primaryKeyStr(keyInfo) {
      let result;
      const primaryKey = _enum$1.TableOptions.primaryKey;

      if (schemaVerify.Type.string.isNotEmpty(keyInfo)) {
        const value = this.safeKey(keyInfo);
        result = `${value} ${primaryKey} (${value})`;
      }

      if (schemaVerify.Type.object.is(keyInfo)) {
        const keyName = this.safeKey(keyInfo.keyName);
        const combineFields = keyInfo.combineFields;
        const combineFieldsStr = combineFields.map(field => this.safeKey(field)).join(",");
        result = `${keyName} ${primaryKey} (${combineFieldsStr})`;
      }

      return `${_enum$1.TableOptions.constraint} ${result}`;
    }

    uniqueKeyStr(keyInfo) {
      let result;
      const uniqueKey = _enum$1.TableOptions.uniqueKey;

      if (schemaVerify.Type.string.isNotEmpty(keyInfo)) {
        const value = this.safeKey(keyInfo);
        result = `${value} ${uniqueKey} (${value})`;
      }

      if (schemaVerify.Type.object.is(keyInfo)) {
        const keyName = this.safeKey(keyInfo.keyName);
        const combineFields = keyInfo.combineFields;
        const combineFieldsStr = combineFields.map(field => this.safeKey(field)).join(",");
        result = `${keyName} ${uniqueKey} (${combineFieldsStr})`;
      }

      return `${_enum$1.TableOptions.constraint} ${result}`;
    }

    tableOptsStr(info) {
      const engine = info.engine;
      const autoIncrement = info.autoIncrement;
      const defaultCharset = info.defaultCharset;
      const comment = info.comment;
      const tmplOpts = {};

      if (schemaVerify.Type.string.isNotEmpty(engine)) {
        const key = _enum$1.TableOptions.engine;
        const value = engine;
        tmplOpts["engine"] = `${key}=${value}`;
      }

      if (schemaVerify.Type.number.is(autoIncrement)) {
        const key = _enum$1.TableOptions.autoIncrement;
        const value = autoIncrement;
        tmplOpts["autoIncrement"] = `${key}=${value}`;
      }

      if (schemaVerify.Type.string.isNotEmpty(defaultCharset)) {
        const key = _enum$1.TableOptions.defaultCharset;
        const value = defaultCharset;
        tmplOpts["defaultCharset"] = `${key}=${value}`;
      }

      if (schemaVerify.Type.string.isNotEmpty(comment)) {
        const key = _enum$1.TableOptions.comment;
        const value = this.safeValue(comment);
        tmplOpts["comment"] = `${key}=${value}`;
      }

      const tableOptionsStr = util$1.analyTmpl(TABLE_OPTIONS_TEMPLATE, tmplOpts);
      return tableOptionsStr;
    }

  }

  exports.default = Create;
});
unwrapExports(create$1);

var alter$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ALTER_TEMPLATE = `ALTER TABLE {{queryTable}}{{alterInfosStr}}`;
  const ALTER_INFOS_TEMPLATE = `{{method}}COLUMN {{field}}{{alterFieldStr}}`;

  class Alter extends base$1.default {
    add(field, alterField) {
      if (schemaVerify.Type.object.is(field)) {
        alterField = field;
        field = alterField.field;
      }

      delete alterField["field"];
      return this.alterCache(_enum$1.AlterMethods.add, field, alterField);
    }

    drop(field) {
      return this.alterCache(_enum$1.AlterMethods.drop, field, {});
    }

    modify(field, alterField) {
      delete alterField["field"];
      return this.alterCache(_enum$1.AlterMethods.modify, field, alterField);
    }

    change(field, alterField) {
      return this.alterCache(_enum$1.AlterMethods.change, field, alterField);
    }

    alterCache(method, field, alterField) {
      if (_enum$1.AlterMethods.drop !== method && !schemaVerify.Type.object.isNotEmpty(alterField)) {
        throw new Error(builder.default.errorAlterField);
      }

      const alterInfo = {
        method,
        field,
        alterField
      };

      if (!builder$1.alterInfosVerify(alterInfo)) {
        throw new Error(builder.default.errorAlterField);
      }

      const alterInfos = schemaVerify.Type.array.safe(this.alterInfos);
      alterInfos.push(alterInfo);
      this.alterInfos = alterInfos;
      return this;
    }

    build() {
      const alterInfos = schemaVerify.Type.array.safe(this.alterInfos);
      const infosStrArr = [];

      for (const item of alterInfos) {
        if (!builder$1.alterInfosVerify(item)) {
          continue;
        }

        const method = item.method;
        const field = this.safeKey(item.field);
        const alterField = item.alterField;
        const alterFieldStr = this.feildTmpl(alterField);
        const tmplOpts = {
          method,
          field,
          alterFieldStr
        };
        const alterInfoStr = util$1.analyTmpl(ALTER_INFOS_TEMPLATE, tmplOpts);
        infosStrArr.push(alterInfoStr);
      }

      if (!schemaVerify.Type.array.isNotEmpty(infosStrArr)) {
        throw new Error(builder.default.emptyAlterInfos);
      }

      const alterInfosStr = infosStrArr.join(",");
      const queryTable = this.getQueryTable();
      const tmplOpts = {
        queryTable,
        alterInfosStr
      };
      const query = util$1.analyTmpl(ALTER_TEMPLATE, tmplOpts);
      return query;
    }

    feildTmpl(fieldInfo) {
      const field = fieldInfo.field;
      const type = fieldInfo.type;
      const unsigned = fieldInfo.unsigned;
      const notNull = fieldInfo.notNull;
      let defaultValue = fieldInfo.default;
      const autoIncrement = fieldInfo.autoIncrement;
      const onUpdate = fieldInfo.onUpdate;
      let comment = fieldInfo.comment;
      const tmplOpts = {};

      if (schemaVerify.Type.string.isNotEmpty(field)) {
        tmplOpts["field"] = this.safeKey(field);
      }

      if (schemaVerify.Type.string.isNotEmpty(type)) {
        tmplOpts["type"] = type.toUpperCase();
      }

      if (unsigned === true) {
        tmplOpts["unsigned"] = _enum$1.TableOptions.unsigned;
      }

      if (notNull === true) {
        tmplOpts["notNull"] = _enum$1.TableOptions.notNull;
      }

      if (schemaVerify.Type.string.is(defaultValue) || schemaVerify.Type.number.is(defaultValue)) {
        let needSafe = true;
        let upperValue;

        if (schemaVerify.Type.string.is(defaultValue)) {
          upperValue = defaultValue.toUpperCase();
          needSafe = !constant$1.TABLE_OPT_VALUES.includes(upperValue);
        }

        defaultValue = needSafe ? this.safeValue(defaultValue) : upperValue;
        tmplOpts["default"] = `${_enum$1.TableOptions.default} ${defaultValue}`;
      }

      if (autoIncrement === true) {
        tmplOpts["autoIncrement"] = _enum$1.TableOptions.autoIncrement;
      }

      if (schemaVerify.Type.string.isNotEmpty(onUpdate)) {
        tmplOpts["onUpdate"] = `${_enum$1.TableOptions.onUpdate} ${onUpdate}`;
      }

      if (schemaVerify.Type.string.isNotEmpty(comment)) {
        comment = this.safeValue(comment);
        tmplOpts["comment"] = `${_enum$1.TableOptions.comment} ${comment}`;
      }

      const feildStr = util$1.analyTmpl(constant$1.FEILD_TEMPLATE, tmplOpts);
      return feildStr;
    }

  }

  exports.default = Alter;
});
unwrapExports(alter$1);

var builder$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const TABLE_QUERY_TYPE = [_enum$1.QueryTypes.insert, _enum$1.QueryTypes.replace, _enum$1.QueryTypes.select, _enum$1.QueryTypes.update, _enum$1.QueryTypes.delete];

  class Builder {
    constructor(dialectType, execute) {
      this.dialectType = dialectType || _enum$1.DialectTypes.mysql;
      this.execute = execute;
      this.queryStore = [];
    }

    insert() {
      return this.queryInstance(_enum$1.QueryTypes.insert);
    }

    select() {
      return this.queryInstance(_enum$1.QueryTypes.select);
    }

    update() {
      return this.queryInstance(_enum$1.QueryTypes.update);
    }

    delete() {
      return this.queryInstance(_enum$1.QueryTypes.delete);
    }

    replace() {
      return this.queryInstance(_enum$1.QueryTypes.replace);
    }

    create() {
      return this.queryInstance(_enum$1.QueryTypes.create);
    }

    alter() {
      return this.queryInstance(_enum$1.QueryTypes.alter);
    }

    get func() {
      return this.widgetInstance(_enum$1.WidgetTypes.func);
    }

    get term() {
      return this.widgetInstance(_enum$1.WidgetTypes.term);
    }

    get order() {
      return this.widgetInstance(_enum$1.WidgetTypes.order);
    }

    queryInstance(type) {
      let instance;

      switch (type) {
        case _enum$1.QueryTypes.insert:
          instance = new insert$1.default();
          break;

        case _enum$1.QueryTypes.replace:
          instance = new replace$1.default();
          break;

        case _enum$1.QueryTypes.select:
          instance = new select$1.default();
          break;

        case _enum$1.QueryTypes.update:
          instance = new update$1.default();
          break;

        case _enum$1.QueryTypes.delete:
          instance = new _delete$1.default();
          break;

        case _enum$1.QueryTypes.create:
          instance = new create$1.default();
          break;

        case _enum$1.QueryTypes.alter:
          instance = new alter$1.default();
          break;
      }

      return this.initInstance(type, instance);
    }

    widgetInstance(type) {
      let instance;

      switch (type) {
        case _enum$1.WidgetTypes.func:
          instance = new func$1.default();
          break;

        case _enum$1.WidgetTypes.term:
          instance = new term$1.default();
          break;

        case _enum$1.WidgetTypes.order:
          instance = new order$1.default();
          break;
      }

      return this.initInstance(type, instance);
    }

    initInstance(type, instance) {
      instance = schemaVerify.Type.object.safe(instance);
      const dialectType = this.dialectType;
      const execute = this.execute;
      const queryTable = this.queryTable;

      if (schemaVerify.Type.string.isNotEmpty(queryTable) && schemaVerify.Type.function.is(instance.table)) {
        if (TABLE_QUERY_TYPE.includes(type)) {
          instance.table(queryTable);
        }
      }

      if (schemaVerify.Type.function.is(instance.setDialect)) {
        instance.setDialect(dialectType);
      }

      if (schemaVerify.Type.function.is(instance.setExecute)) {
        instance.setExecute(execute);
      }

      return instance;
    }

    table(tableName) {
      if (!schemaVerify.Type.string.isNotEmpty(tableName)) {
        throw new Error(builder.default.errorTableName);
      }

      this.queryTable = tableName;
      return this;
    }

    build() {
      throw new Error(builder.default.emptyQueryType);
    }

    get query() {
      return this.build();
    }

  }

  exports.default = Builder;
});
unwrapExports(builder$2);

var connect_verify = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const conConfigSchema = new schemaVerify.Schema({
    type: Object,
    props: [{
      index: "host",
      required: true,
      type: String,
      minLength: 1
    }, [{
      index: "port",
      type: String
    }, {
      type: Number
    }], {
      index: "user",
      required: true,
      type: String,
      minLength: 1
    }, {
      index: "password",
      type: String,
      minLength: 1
    }, {
      index: "database",
      required: true,
      type: String,
      minLength: 1
    }, {
      index: "dialect",
      type: String,
      enum: _enum$1.DialectTypes
    }, {
      index: "connectionLimit",
      type: Number,
      natural: true
    }]
  });
  exports.conConfigVerify = conConfigSchema.verify;
});
unwrapExports(connect_verify);
var connect_verify_1 = connect_verify.conConfigVerify;

var connect_verify$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const conConfigSchema = new schemaVerify.Schema({
    type: Object,
    props: [{
      index: "host",
      required: true,
      type: String,
      minLength: 1
    }, [{
      index: "port",
      type: String
    }, {
      type: Number
    }], {
      index: "user",
      required: true,
      type: String,
      minLength: 1
    }, {
      index: "password",
      type: String,
      minLength: 1
    }, {
      index: "database",
      required: true,
      type: String,
      minLength: 1
    }, {
      index: "dialect",
      type: String,
      enum: _enum$1.DialectTypes
    }, {
      index: "connectionLimit",
      type: Number,
      natural: true
    }]
  });
  exports.conConfigVerify = conConfigSchema.verify;
});
unwrapExports(connect_verify$1);
var connect_verify_1$1 = connect_verify$1.conConfigVerify;

var D__vmproject_jsSqlQuery_src_verify_execute = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.conConfigVerify = connect_verify$1.conConfigVerify;
});
unwrapExports(D__vmproject_jsSqlQuery_src_verify_execute);
var D__vmproject_jsSqlQuery_src_verify_execute_1 = D__vmproject_jsSqlQuery_src_verify_execute.conConfigVerify;

var connect_error = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorConnectConfig: "错误的连接配置",
    emptyConnectPool: "未连接数据库",
    errorConnect: "错误的连接"
  };
  exports.default = ErrMsg;
});
unwrapExports(connect_error);

var connect_error$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = {
    errorConnectConfig: "错误的连接配置",
    emptyConnectPool: "未连接数据库",
    errorConnect: "错误的连接"
  };
  exports.default = ErrMsg;
});
unwrapExports(connect_error$1);

var D__vmproject_jsSqlQuery_src_error_execute = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = { ...connect_error$1.default
  };
  exports.default = ErrMsg;
});
unwrapExports(D__vmproject_jsSqlQuery_src_error_execute);

var execute = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.conConfigVerify = connect_verify$1.conConfigVerify;
});
unwrapExports(execute);
var execute_1 = execute.conConfigVerify;

var execute$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const ErrMsg = { ...connect_error$1.default
  };
  exports.default = ErrMsg;
});
unwrapExports(execute$1);

var connect = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Connect {
    constructor(config) {
      this.setConfig(config);
    }

    setConfig(config) {
      if (!execute.conConfigVerify(config)) {
        throw new Error(execute$1.default.errorConnectConfig);
      }

      const host = config.host;
      const user = config.user;
      const password = config.password;
      const port = config.port;
      const database = config.database;
      const dialect = config.dialect;
      let connectionLimit = config.connectionLimit;
      connectionLimit = schemaVerify.Type.number.isNatural(connectionLimit) ? connectionLimit : 1;
      let dbConfig = {
        host,
        user,
        password,
        port,
        database,
        connectionLimit
      };
      dbConfig = schemaVerify.Type.object.pure(dbConfig);
      this.pool = mysql.createPool(dbConfig);
      this.dialectType = dialect;
    }

    async getDbConnect() {
      const pool = this.pool || {};

      if (schemaVerify.Type.function.isNot(pool.getConnection)) {
        throw new Error(execute$1.default.emptyConnectPool);
      }

      return new Promise((relsove, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            reject(err);
          }

          if (!connection || schemaVerify.Type.function.isNot(connection.query) || schemaVerify.Type.function.isNot(connection.release)) {
            reject(new Error(execute$1.default.errorConnect));
          }

          relsove(connection);
        });
      });
    }

  }

  exports.default = Connect;
});
unwrapExports(connect);

var connect$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Connect {
    constructor(config) {
      this.setConfig(config);
    }

    setConfig(config) {
      if (!execute.conConfigVerify(config)) {
        throw new Error(execute$1.default.errorConnectConfig);
      }

      const host = config.host;
      const user = config.user;
      const password = config.password;
      const port = config.port;
      const database = config.database;
      const dialect = config.dialect;
      let connectionLimit = config.connectionLimit;
      connectionLimit = schemaVerify.Type.number.isNatural(connectionLimit) ? connectionLimit : 1;
      let dbConfig = {
        host,
        user,
        password,
        port,
        database,
        connectionLimit
      };
      dbConfig = schemaVerify.Type.object.pure(dbConfig);
      this.pool = mysql.createPool(dbConfig);
      this.dialectType = dialect;
    }

    async getDbConnect() {
      const pool = this.pool || {};

      if (schemaVerify.Type.function.isNot(pool.getConnection)) {
        throw new Error(execute$1.default.emptyConnectPool);
      }

      return new Promise((relsove, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            reject(err);
          }

          if (!connection || schemaVerify.Type.function.isNot(connection.query) || schemaVerify.Type.function.isNot(connection.release)) {
            reject(new Error(execute$1.default.errorConnect));
          }

          relsove(connection);
        });
      });
    }

  }

  exports.default = Connect;
});
unwrapExports(connect$1);

var execute$2 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Execute extends connect$1.default {
    constructor(config) {
      super(config);
    }

    async run(query) {
      const dbConnection = await this.getDbConnect();
      return new Promise((relsove, reject) => {
        dbConnection.query(query, function (err, results) {
          dbConnection.release();

          if (err) {
            reject(err);
          }

          relsove(results);
        });
      });
    }

  }

  exports.default = Execute;
});
unwrapExports(execute$2);

var builder$3 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const TABLE_QUERY_TYPE = [_enum$1.QueryTypes.insert, _enum$1.QueryTypes.replace, _enum$1.QueryTypes.select, _enum$1.QueryTypes.update, _enum$1.QueryTypes.delete];

  class Builder {
    constructor(dialectType, execute) {
      this.dialectType = dialectType || _enum$1.DialectTypes.mysql;
      this.execute = execute;
      this.queryStore = [];
    }

    insert() {
      return this.queryInstance(_enum$1.QueryTypes.insert);
    }

    select() {
      return this.queryInstance(_enum$1.QueryTypes.select);
    }

    update() {
      return this.queryInstance(_enum$1.QueryTypes.update);
    }

    delete() {
      return this.queryInstance(_enum$1.QueryTypes.delete);
    }

    replace() {
      return this.queryInstance(_enum$1.QueryTypes.replace);
    }

    create() {
      return this.queryInstance(_enum$1.QueryTypes.create);
    }

    alter() {
      return this.queryInstance(_enum$1.QueryTypes.alter);
    }

    get func() {
      return this.widgetInstance(_enum$1.WidgetTypes.func);
    }

    get term() {
      return this.widgetInstance(_enum$1.WidgetTypes.term);
    }

    get order() {
      return this.widgetInstance(_enum$1.WidgetTypes.order);
    }

    queryInstance(type) {
      let instance;

      switch (type) {
        case _enum$1.QueryTypes.insert:
          instance = new insert$1.default();
          break;

        case _enum$1.QueryTypes.replace:
          instance = new replace$1.default();
          break;

        case _enum$1.QueryTypes.select:
          instance = new select$1.default();
          break;

        case _enum$1.QueryTypes.update:
          instance = new update$1.default();
          break;

        case _enum$1.QueryTypes.delete:
          instance = new _delete$1.default();
          break;

        case _enum$1.QueryTypes.create:
          instance = new create$1.default();
          break;

        case _enum$1.QueryTypes.alter:
          instance = new alter$1.default();
          break;
      }

      return this.initInstance(type, instance);
    }

    widgetInstance(type) {
      let instance;

      switch (type) {
        case _enum$1.WidgetTypes.func:
          instance = new func$1.default();
          break;

        case _enum$1.WidgetTypes.term:
          instance = new term$1.default();
          break;

        case _enum$1.WidgetTypes.order:
          instance = new order$1.default();
          break;
      }

      return this.initInstance(type, instance);
    }

    initInstance(type, instance) {
      instance = schemaVerify.Type.object.safe(instance);
      const dialectType = this.dialectType;
      const execute = this.execute;
      const queryTable = this.queryTable;

      if (schemaVerify.Type.string.isNotEmpty(queryTable) && schemaVerify.Type.function.is(instance.table)) {
        if (TABLE_QUERY_TYPE.includes(type)) {
          instance.table(queryTable);
        }
      }

      if (schemaVerify.Type.function.is(instance.setDialect)) {
        instance.setDialect(dialectType);
      }

      if (schemaVerify.Type.function.is(instance.setExecute)) {
        instance.setExecute(execute);
      }

      return instance;
    }

    table(tableName) {
      if (!schemaVerify.Type.string.isNotEmpty(tableName)) {
        throw new Error(builder.default.errorTableName);
      }

      this.queryTable = tableName;
      return this;
    }

    build() {
      throw new Error(builder.default.emptyQueryType);
    }

    get query() {
      return this.build();
    }

  }

  exports.default = Builder;
});
unwrapExports(builder$3);

var execute$3 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Execute extends connect$1.default {
    constructor(config) {
      super(config);
    }

    async run(query) {
      const dbConnection = await this.getDbConnect();
      return new Promise((relsove, reject) => {
        dbConnection.query(query, function (err, results) {
          dbConnection.release();

          if (err) {
            reject(err);
          }

          relsove(results);
        });
      });
    }

  }

  exports.default = Execute;
});
unwrapExports(execute$3);

var src = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function SqlQuery(config) {
    config = schemaVerify.Type.object.safe(config);
    const execute = new execute$3.default(config);
    const o = new builder$3.default(config.dialect, execute);
    return o;
  }

  SqlQuery.Builder = builder$3.default;
  exports.default = SqlQuery;
});
var index = unwrapExports(src);

module.exports = index;
