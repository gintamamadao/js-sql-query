'use strict';

var schemaVerify = require('schema-verify');

function analyTmpl(tmpl, opts) {
  return tmpl.replace(/\{\{([a-zA-Z_0-9]+)\}\}/g, function (match, key) {
    if (opts.hasOwnProperty(key) && schemaVerify.Type.string.isNotEmpty(opts[key])) {
      return opts[key] + " ";
    } else {
      return "";
    }
  }).trim();
}
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

const ErrMsg = {
  errorFuncInfo: "错误的组合函数信息"
};

const ErrMsg$1 = {
  errorFieldDataArr: "错误的字段数据组",
  errorInsertValues: "错误的插入值"
};

const ErrMsg$2 = {
  errorDialect: "错误的数据库类型",
  errorManualSql: "错误的自定义sql",
  errorExecute: "缺少或错误的数据库连接",
  emptySqlQuery: "缺少sql语句"
};

const ErrMsg$3 = {
  errorPage: "错误的页码",
  errorSize: "错误的页码",
  errorStep: "错误的步长",
  errorOffset: "错误的偏移"
};

const ErrMsg$4 = {
  errorOrderInfo: "错误的排序信息",
  errorValueList: "需要非空数组"
};

const ErrMsg$5 = {
  errorFieldMap: "错误的字段映射"
};

const ErrMsg$6 = {
  errorTermdata: "错误的条件数据",
  errorTermSign: "错误的条件类型",
  errorTermValue: "错误的条件值",
  errorTermInfo: "错误的条件信息",
  errorTermBracket: "错误的条件括号信息",
  errorTermLogic: "错误的条件逻辑"
};

const ErrMsg$7 = {
  emptyUpdateInfo: "缺少更新信息",
  errorUpdateInfo: "错误的更新信息"
};

const ErrMsg$8 = {
  emptyQueryType: "未选择sql类型"
};

const ErrMsg$9 = {
  errorCreateDbName: "错误的数据库名"
};

const ErrMsg$a = {
  errorAlterField: "错误的修改配置",
  emptyAlterInfos: "空的修改配置"
};

const ErrMsg$b = { ...ErrMsg,
  ...ErrMsg$1,
  ...ErrMsg$2,
  ...ErrMsg$3,
  ...ErrMsg$4,
  ...ErrMsg$5,
  ...ErrMsg$6,
  ...ErrMsg$7,
  ...ErrMsg$8,
  ...ErrMsg$9,
  ...ErrMsg$a,
  errorTableName: "错误的表名，需要非空字符串",
  errorField: "错误的表名，需要非空字符串",
  errorFields: "错误的字段，需要非空字符串或非空字符串数组",
  errorFieldData: "错误的字段数据",
  needStr: "需要字符串",
  needNumStr: "需要数字或者字符串"
};

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
        throw new Error(ErrMsg$b.needNumStr);
      }

      return result;
    },

    safeKey(key) {
      let result;

      if (!schemaVerify.Type.string.isNotEmpty(key)) {
        throw new Error(ErrMsg$b.needStr);
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
        throw new Error(ErrMsg$b.needNumStr);
      }

      return result;
    },

    safeKey(key) {
      if (!schemaVerify.Type.string.isNotEmpty(key)) {
        throw new Error(ErrMsg$b.needStr);
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
        throw new Error(ErrMsg$b.needNumStr);
      }

      return result;
    },

    safeKey(key) {
      let result;

      if (!schemaVerify.Type.string.isNotEmpty(key)) {
        throw new Error(ErrMsg$b.needStr);
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
        throw new Error(ErrMsg$b.needNumStr);
      }

      return result;
    },

    safeKey(key) {
      let result;

      if (!schemaVerify.Type.string.isNotEmpty(key)) {
        throw new Error(ErrMsg$b.needStr);
      }

      result = key.replace(/`/g, "``");
      return "`" + result + "`";
    }

  }
};

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
const fieldDataArrVerify = fieldDataArrSchema.verify;

var DialectTypes;

(function (DialectTypes) {
  DialectTypes["mysql"] = "mysql";
  DialectTypes["mssql"] = "mssql";
  DialectTypes["postgresql"] = "postgresql";
  DialectTypes["sqlite"] = "sqlite";
})(DialectTypes || (DialectTypes = {}));

var QueryTypes;

(function (QueryTypes) {
  QueryTypes["insert"] = "INSERT";
  QueryTypes["replace"] = "REPLACE";
  QueryTypes["select"] = "SELECT";
  QueryTypes["update"] = "UPDATE";
  QueryTypes["delete"] = "DELETE";
  QueryTypes["create"] = "CREATE";
  QueryTypes["alter"] = "ALTER";
})(QueryTypes || (QueryTypes = {}));

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
})(FuncTypes || (FuncTypes = {}));

var TermLogic;

(function (TermLogic) {
  TermLogic["and"] = "AND";
  TermLogic["or"] = "OR";
})(TermLogic || (TermLogic = {}));

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
})(TermSign || (TermSign = {}));

var OrderTypes;

(function (OrderTypes) {
  OrderTypes["desc"] = "DESC";
  OrderTypes["asc"] = "ASC";
  OrderTypes["field"] = "FIELD";
})(OrderTypes || (OrderTypes = {}));

var UpdateTypes;

(function (UpdateTypes) {
  UpdateTypes["set"] = "SET";
  UpdateTypes["add"] = "ADD";
  UpdateTypes["minus"] = "MINUS";
})(UpdateTypes || (UpdateTypes = {}));

var WidgetTypes;

(function (WidgetTypes) {
  WidgetTypes["func"] = "FUNC";
  WidgetTypes["term"] = "TERM";
  WidgetTypes["order"] = "ORDER";
})(WidgetTypes || (WidgetTypes = {}));

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
})(SqlDataTypes || (SqlDataTypes = {}));

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
})(TableOptions || (TableOptions = {}));

var AlterMethods;

(function (AlterMethods) {
  AlterMethods["add"] = "ADD";
  AlterMethods["drop"] = "DROP";
  AlterMethods["modify"] = "MODIFY";
  AlterMethods["change"] = "CHANGE";
})(AlterMethods || (AlterMethods = {}));

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
      return !!FuncTypes[value];
    }
  }, [{
    index: "field",
    required: true,
    type: String
  }, {
    type: Number
  }]]
});
const funcInfoVerify = funcInfoSchema.verify;
const funcInputVerify = funcInputSchema.verify;

const dialectSchema = new schemaVerify.Schema({
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
const manualSqlSchema = new schemaVerify.Schema([{
  type: String,
  minLength: 1
}, {
  type: Function
}, {
  type: Object
}]);
const dialectVerify = dialectSchema.verify;
const manualSqlVerify = manualSqlSchema.verify;

const pageSchema = new schemaVerify.Schema({
  type: Number,
  integer: true,
  min: 1
});
const limitInfoSchema = new schemaVerify.Schema({
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
const pageVerify = pageSchema.verify;
const limitInfoVerify = limitInfoSchema.verify;

const orderInfoSchema = new schemaVerify.Schema({
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
    enum: OrderTypes
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
const valueListSchema = new schemaVerify.Schema({
  type: Array,
  elements: [[{
    type: String,
    required: true,
    minLength: 1
  }, {
    type: Number
  }]]
});
const orderInfoVerify = orderInfoSchema.verify;
const valueListVerify = valueListSchema.verify;

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
  enum: TermSign
});
const termLogicSchema = new schemaVerify.Schema({
  type: String,
  enum: TermLogic
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
    enum: TermLogic
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
    enum: TermSign
  }, {
    index: "logic",
    required: true,
    type: String,
    enum: TermLogic
  }]
});
const termDataVerify = termDataSchema.verify;
const termSignVerify = termSignSchema.verify;
const termLogicVerify = termLogicSchema.verify;
const termValueVerify = termValueSchema.verify;
const termInVerify = termInSchema.verify;
const termBetweenVerify = termBetweenSchema.verify;
const termBracketVerify = termBracketSchema.verify;
const termInfoVerify = termInfoSchema.verify;

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
    enum: UpdateTypes
  }]
});
const updateInfoVerify = updateInfoSchema.verify;

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
const tableInfoVerify = tableInfoSchema.verify;

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
    enum: AlterMethods
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
const alterInfosVerify = alterInfosSchema.verify;

const strArrVerify = new schemaVerify.Schema({
  type: Array,
  elements: {
    type: String,
    required: true,
    minLength: 1
  }
}).verify;
const strObjVerify = new schemaVerify.Schema({
  type: Object,
  props: {
    type: String,
    required: true,
    minLength: 1
  }
}).verify;
const naturalVerify = new schemaVerify.Schema({
  type: Number,
  natural: true
}).verify;
const integerVerify = new schemaVerify.Schema({
  type: Number,
  integer: true
}).verify;
const fieldDataVerify = new schemaVerify.Schema({
  type: Object,
  props: [[{
    required: true,
    type: String
  }, {
    type: Number
  }]]
}).verify;

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

    if (!dialectVerify(DialectsObj[dialectType])) {
      throw new Error(ErrMsg$b.errorDialect);
    }

    return dialectType;
  }

  set dialectType(dialectType) {
    this.setDialect(dialectType);
  }

  setDialect(dialectType) {
    if (!dialectVerify(DialectsObj[dialectType])) {
      throw new Error(ErrMsg$b.errorDialect);
    }

    const dialect = DialectsObj[dialectType];
    this._dialect = dialect;
    this._dialectType = dialectType;
    this.safeValue = dialect.safeValue;
    this.safeKey = dialect.safeKey;
  }

  manualSql(sql, key) {
    if (!manualSqlVerify(sql) && !(sql instanceof Base)) {
      throw new Error(ErrMsg$b.errorManualSql);
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
      throw new Error(ErrMsg$b.errorTableName);
    }

    this._queryTable = queryTable;
    return this;
  }

  getQueryTable() {
    const queryTable = this._queryTable;

    if (!schemaVerify.Type.string.isNotEmpty(queryTable)) {
      throw new Error(ErrMsg$b.errorTableName);
    }

    return this.safeKey(queryTable);
  }

  setExecute(execute) {
    this._execute = execute;
  }

  exec(sqlStr) {
    const execute = this._execute;
    const query = schemaVerify.Type.string.isNotEmpty(sqlStr) ? sqlStr : this.build();

    if (!schemaVerify.Type.string.isNotEmpty(query)) {
      throw new Error(ErrMsg$b.emptySqlQuery);
    }

    if (schemaVerify.Type.object.isNot(execute) || schemaVerify.Type.function.isNot(execute.exec)) {
      throw new Error(ErrMsg$b.errorExecute);
    }

    return execute.exec(query);
  }

}

class Limit {
  limitBuild(query) {
    const limitInfo = this.limitInfo;

    if (!limitInfoVerify(limitInfo)) {
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
    if (!integerVerify(offset)) {
      throw new Error(ErrMsg$b.errorOffset);
    }

    if (schemaVerify.Type.undefined.isNot(step) && !integerVerify(step)) {
      throw new Error(ErrMsg$b.errorStep);
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
    if (!integerVerify(offset)) {
      throw new Error(ErrMsg$b.errorOffset);
    }

    this.limitInfo = {
      offset: offset,
      step: -1
    };
  }

  step(step) {
    if (!integerVerify(step)) {
      throw new Error(ErrMsg$b.errorStep);
    }

    this.limitInfo = {
      offset: 0,
      step
    };
  }

  paging(page, size) {
    if (!pageVerify(page)) {
      throw new Error(ErrMsg$b.errorPage);
    }

    if (!naturalVerify(size)) {
      throw new Error(ErrMsg$b.errorSize);
    }

    const offset = (page - 1) * size;
    this.limitInfo = {
      offset,
      step: size
    };
  }

}

const SQL_NAME = "orderSql";

class Order extends Base {
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
      if (!orderInfoVerify(info)) {
        continue;
      }

      const field = info.field;
      const type = info.type;
      const list = info.list;
      const safeField = this.safeKey(field);

      if (type === OrderTypes.field) {
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
    const argFields = argStrArrTrans(firstField, otherFields);
    return this.orderCache(argFields, OrderTypes.desc);
  }

  ascBy(firstField, otherFields) {
    const argFields = argStrArrTrans(firstField, otherFields);
    return this.orderCache(argFields, OrderTypes.asc);
  }

  orderField(data) {
    data = schemaVerify.Type.object.safe(data);
    const fields = Object.keys(data);
    return this.orderCache(fields, OrderTypes.field, data);
  }

  order(sql) {
    this.manualSql(sql, SQL_NAME);
  }

  formatOrderSql() {
    return this.formatManualSql(SQL_NAME);
  }

  orderCache(fields, type, fieldOrder) {
    if (!strArrVerify(fields)) {
      throw new Error(ErrMsg$b.errorFields);
    }

    fieldOrder = schemaVerify.Type.object.safe(fieldOrder);
    const orderInfos = schemaVerify.Type.array.safe(this.orderInfos);

    for (const field of fields) {
      const info = {
        field,
        type
      };

      if (type === OrderTypes.field) {
        const list = fieldOrder[field];

        if (!valueListVerify(list)) {
          throw new Error(ErrMsg$b.errorValueList);
        }

        info["list"] = list;
      }

      if (!orderInfoVerify(info)) {
        throw new Error(ErrMsg$b.errorOrderInfo);
      }

      orderInfos.push(info);
    }

    this.orderInfos = orderInfos;
    return this;
  }

}

class Query extends Base {
  getLimitCase() {
    let queryLimit = this.queryLimit;

    if (!queryLimit || !(queryLimit instanceof Limit)) {
      queryLimit = new Limit();
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

    if (!queryOrder || !(queryOrder instanceof Order)) {
      queryOrder = new Order();
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

const SQL_NAME$1 = "valuesSql";

class Insert extends Query {
  constructor() {
    super();
    this.queryType = QueryTypes.insert;
    this.insertData = {};
    this.insertFields = [];
    this.insertDataArr = [];
  }

  data(data) {
    if (!fieldDataVerify(data)) {
      throw new Error(ErrMsg$b.errorFieldData);
    }

    const insertData = schemaVerify.Type.object.safe(this.insertData);
    this.insertData = Object.assign({}, insertData, data);
    return this;
  }

  fields(arg, ...otherArgs) {
    const args = argStrArrTrans(arg, otherArgs);
    const insertFields = schemaVerify.Type.array.safe(this.insertFields);
    const result = [].concat(insertFields, args);
    this.insertFields = Array.from(new Set(result));
    return this;
  }

  multiData(dataArr) {
    if (!fieldDataArrVerify(dataArr)) {
      throw new Error(ErrMsg$b.errorFieldDataArr);
    }

    const insertDataArr = schemaVerify.Type.array.safe(this.insertDataArr);
    this.insertDataArr = [].concat(insertDataArr, dataArr);
    return this;
  }

  values(sql) {
    this.manualSql(sql, SQL_NAME$1);
    return this;
  }

  formatValuesSql() {
    return this.formatManualSql(SQL_NAME$1);
  }

  formatFields() {
    const insertData = this.insertData;
    const insertFields = this.insertFields;
    const insertDataArr = this.insertDataArr;
    let fields;

    if (strArrVerify(insertFields)) {
      fields = insertFields;
    } else if (fieldDataVerify(insertData)) {
      fields = Object.keys(insertData);
    } else if (fieldDataArrVerify(insertDataArr)) {
      fields = Object.keys(insertDataArr[0]);
    }

    if (!strArrVerify(fields)) {
      throw new Error(ErrMsg$b.errorFields);
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
    } else if (fieldDataVerify(insertData)) {
      result = valuesStrFormat(insertData);
    } else if (fieldDataArrVerify(insertDataArr)) {
      result = valuesArrStrFormat(insertDataArr);
    }

    if (!schemaVerify.Type.string.isNotEmpty(result)) {
      throw new Error(ErrMsg$b.errorInsertValues);
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

const SQL_NAME$2 = "termSql";

class Term extends Base {
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
    return this.formatManualSql(SQL_NAME$2);
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

      if (!termBracketVerify(curBracket)) {
        throw new Error(ErrMsg$b.errorTermBracket);
      }

      const curPos = curBracket.position;
      const curLogic = curBracket.logic;
      let prePos = 0;
      let nextPos = termsLen;

      if (termBracketVerify(perBracket)) {
        prePos = perBracket.position;
      }

      if (termBracketVerify(nextBracket)) {
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
      if (!termInfoVerify(term)) {
        throw new Error(ErrMsg$b.errorTermInfo);
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

    if (sign === TermSign.in || sign === TermSign.notIn) {
      if (!termInVerify(value)) {
        throw new Error(ErrMsg$b.errorTermValue);
      }

      termValue = value.map(item => this.safeValue(item)).join(", ");
      return `( ${termValue} )`;
    }

    if (sign === TermSign.between || sign === TermSign.notBetween) {
      if (!termBetweenVerify(value)) {
        throw new Error(ErrMsg$b.errorTermValue);
      }

      const lower = this.safeValue(value[0]);
      const upper = this.safeValue(value[1]);
      return `${lower} AND ${upper}`;
    }

    if (!termValueVerify(value)) {
      throw new Error(ErrMsg$b.errorTermValue);
    }

    if (sign === TermSign.like || sign === TermSign.notlike) {
      value = `%${value}%`;
    }

    termValue = this.safeValue(value);
    return termValue;
  }

  termCache(data, sign, logic) {
    if (!termDataVerify(data)) {
      throw new Error(ErrMsg$b.errorTermdata);
    }

    if (!termSignVerify(sign)) {
      throw new Error(ErrMsg$b.errorTermSign);
    }

    if (!termLogicVerify(logic)) {
      throw new Error(ErrMsg$b.errorTermLogic);
    }

    const termInfos = schemaVerify.Type.array.safe(this.termInfos);
    const termsArr = [];

    for (const field in data) {
      const value = data[field];

      switch (sign) {
        case TermSign.in:
        case TermSign.notIn:
          if (!termInVerify(value)) {
            throw new Error(ErrMsg$b.errorTermValue);
          }

          break;

        case TermSign.between:
        case TermSign.notBetween:
          if (!termBetweenVerify(value)) {
            throw new Error(ErrMsg$b.errorTermValue);
          }

          break;

        default:
          if (!termValueVerify(value)) {
            throw new Error(ErrMsg$b.errorTermValue);
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
      if (!termBracketVerify(bracket)) {
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

    if (termBracketVerify(bracket)) {
      termBrackets.push(bracket);
    }

    this.termBrackets = termBrackets;
    return this;
  }

  sqlTerm(sql) {
    this.manualSql(sql, SQL_NAME$2);
  }

  equal(data) {
    return this.and(data, TermSign.equal);
  }

  notEqual(data) {
    return this.and(data, TermSign.notEqual);
  }

  in(data) {
    return this.and(data, TermSign.in);
  }

  notIn(data) {
    return this.and(data, TermSign.notIn);
  }

  more(data) {
    return this.and(data, TermSign.more);
  }

  less(data) {
    return this.and(data, TermSign.less);
  }

  moreEqual(data) {
    return this.and(data, TermSign.moreEqual);
  }

  lessEqual(data) {
    return this.and(data, TermSign.lessEqual);
  }

  like(data) {
    return this.and(data, TermSign.like);
  }

  notLike(data) {
    return this.and(data, TermSign.notlike);
  }

  between(data) {
    return this.and(data, TermSign.between);
  }

  notBetween(data) {
    return this.and(data, TermSign.notBetween);
  }

  orEqual(data) {
    return this.or(data, TermSign.equal);
  }

  orNotEqual(data) {
    return this.or(data, TermSign.notEqual);
  }

  orIn(data) {
    return this.or(data, TermSign.in);
  }

  orNotIn(data) {
    return this.or(data, TermSign.notIn);
  }

  orMore(data) {
    return this.or(data, TermSign.more);
  }

  orLess(data) {
    return this.or(data, TermSign.less);
  }

  orMoreEqual(data) {
    return this.or(data, TermSign.moreEqual);
  }

  orLessEqual(data) {
    return this.or(data, TermSign.lessEqual);
  }

  orLike(data) {
    return this.or(data, TermSign.like);
  }

  orBetween(data) {
    return this.or(data, TermSign.between);
  }

  orNotBetween(data) {
    return this.or(data, TermSign.notBetween);
  }

  orNotLike(data) {
    return this.or(data, TermSign.notlike);
  }

  bracket() {
    return this.bracketTerm(TermLogic.and);
  }

  orBracket() {
    return this.bracketTerm(TermLogic.or);
  }

  and(data, sign) {
    return this.termCache(data, sign, TermLogic.and);
  }

  or(data, sign) {
    return this.termCache(data, sign, TermLogic.or);
  }

}

const TERM_NAME = "whereTerm";

class Where extends Query {
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

    if (!term || !(term instanceof Term)) {
      term = new Term();
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

const TERM_NAME$1 = "havingTerm";

class Having extends Where {
  havingEqual(data) {
    this.getTermCase(TERM_NAME$1).equal(data);
    return this;
  }

  havingNotEqual(data) {
    this.getTermCase(TERM_NAME$1).notEqual(data);
    return this;
  }

  havingIn(data) {
    this.getTermCase(TERM_NAME$1).in(data);
    return this;
  }

  havingNotIn(data) {
    this.getTermCase(TERM_NAME$1).notIn(data);
    return this;
  }

  havingMore(data) {
    this.getTermCase(TERM_NAME$1).more(data);
    return this;
  }

  havingLess(data) {
    this.getTermCase(TERM_NAME$1).less(data);
    return this;
  }

  havingMoreEqual(data) {
    this.getTermCase(TERM_NAME$1).moreEqual(data);
    return this;
  }

  havingLessEqual(data) {
    this.getTermCase(TERM_NAME$1).lessEqual(data);
    return this;
  }

  havingLike(data) {
    this.getTermCase(TERM_NAME$1).like(data);
    return this;
  }

  havingNotLike(data) {
    this.getTermCase(TERM_NAME$1).notLike(data);
    return this;
  }

  havingBetween(data) {
    this.getTermCase(TERM_NAME$1).between(data);
    return this;
  }

  havingNotBetween(data) {
    this.getTermCase(TERM_NAME$1).notBetween(data);
    return this;
  }

  havingOrEqual(data) {
    this.getTermCase(TERM_NAME$1).orEqual(data);
    return this;
  }

  havingOrNotEqual(data) {
    this.getTermCase(TERM_NAME$1).orNotEqual(data);
    return this;
  }

  havingOrIn(data) {
    this.getTermCase(TERM_NAME$1).orIn(data);
    return this;
  }

  havingOrNotIn(data) {
    this.getTermCase(TERM_NAME$1).orNotIn(data);
    return this;
  }

  havingOrMore(data) {
    this.getTermCase(TERM_NAME$1).orMore(data);
    return this;
  }

  havingOrLess(data) {
    this.getTermCase(TERM_NAME$1).orLess(data);
    return this;
  }

  havingOrMoreEqual(data) {
    this.getTermCase(TERM_NAME$1).orMoreEqual(data);
    return this;
  }

  havingOrLessEqual(data) {
    this.getTermCase(TERM_NAME$1).orLessEqual(data);
    return this;
  }

  havingOrLike(data) {
    this.getTermCase(TERM_NAME$1).orLike(data);
    return this;
  }

  havingOrNotLike(data) {
    this.getTermCase(TERM_NAME$1).orNotLike(data);
    return this;
  }

  havingOrBetween(data) {
    this.getTermCase(TERM_NAME$1).orBetween(data);
    return this;
  }

  havingOrNotBetween(data) {
    this.getTermCase(TERM_NAME$1).orNotBetween(data);
    return this;
  }

  havingBracket() {
    this.getTermCase(TERM_NAME$1).bracket();
    return this;
  }

  havingOrBracket() {
    this.getTermCase(TERM_NAME$1).orBracket();
    return this;
  }

  having(sql) {
    this.getTermCase(TERM_NAME$1).sqlTerm(sql);
    return this;
  }

  havingBuild(query) {
    const termInstance = this.getTermCase(TERM_NAME$1);
    const havingSql = termInstance.termsBuild();

    if (schemaVerify.Type.string.isNotEmpty(havingSql)) {
      query = `${query} HAVING ${havingSql}`;
    }

    return query;
  }

}

class Func extends Base {
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
    return this.funcField(FuncTypes.count, field);
  }

  sum(field) {
    return this.funcField(FuncTypes.sum, field);
  }

  max(field) {
    return this.funcField(FuncTypes.max, field);
  }

  min(field) {
    return this.funcField(FuncTypes.min, field);
  }

  avg(field) {
    return this.funcField(FuncTypes.avg, field);
  }

  abs(field) {
    return this.funcField(FuncTypes.abs, field);
  }

  ceil(field) {
    return this.funcField(FuncTypes.ceil, field);
  }

  floor(field) {
    return this.funcField(FuncTypes.floor, field);
  }

  round(field) {
    return this.funcField(FuncTypes.round, field);
  }

  log(field) {
    return this.funcField(FuncTypes.log, field);
  }

  log2(field) {
    return this.funcField(FuncTypes.log2, field);
  }

  exp(field) {
    return this.funcField(FuncTypes.exp, field);
  }

  power(field) {
    return this.funcField(FuncTypes.power, field);
  }

  acos(field) {
    return this.funcField(FuncTypes.acos, field);
  }

  asin(field) {
    return this.funcField(FuncTypes.asin, field);
  }

  atan(field) {
    return this.funcField(FuncTypes.atan, field);
  }

  cos(field) {
    return this.funcField(FuncTypes.cos, field);
  }

  sin(field) {
    return this.funcField(FuncTypes.sin, field);
  }

  tan(field) {
    return this.funcField(FuncTypes.tan, field);
  }

  conv(field) {
    return this.funcField(FuncTypes.conv, field);
  }

  random(field) {
    return this.funcField(FuncTypes.random, field);
  }

  rand(field) {
    return this.funcField(FuncTypes.rand, field);
  }

  radians(field) {
    return this.funcField(FuncTypes.radians, field);
  }

  degrees(field) {
    return this.funcField(FuncTypes.degrees, field);
  }

  distinct(field) {
    return this.funcField(FuncTypes.distinct, field);
  }

}

class Combine extends Having {
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

    if (!strArrVerify(fields)) {
      throw new Error(ErrMsg$b.errorFields);
    }

    groupByFields = groupByFields.concat(fields);
    this.groupByFields = Array.from(new Set(groupByFields));
    return this;
  }

  getFuncCase() {
    let func = this.funcInstance;

    if (!func || !(func instanceof Func)) {
      func = new Func();
      func.setDialect(this.dialectType);
      this.funcInstance = func;
    }

    return func;
  }

  formatFuncs() {
    const combineFuncs = schemaVerify.Type.array.safe(this.combineFuncs);
    let funcs = [];

    for (const info of combineFuncs) {
      if (!funcInfoVerify(info)) {
        throw new Error(ErrMsg$b.errorFuncInfo);
      }

      const funcFeild = info.funcFeild;
      funcs.push(funcFeild);
    }

    funcs = Array.from(new Set(funcs));
    return funcs;
  }

  funcsCache(funcInfo) {
    const combineFuncs = schemaVerify.Type.array.safe(this.combineFuncs);

    if (funcInfoVerify(funcInfo)) {
      combineFuncs.push(funcInfo);
    }

    this.combineFuncs = combineFuncs;
    return this;
  }

  funcFeilds(...funcInfos) {
    for (let info of funcInfos) {
      info = schemaVerify.Type.object.safe(info);

      if (funcInfoVerify(info)) {
        this.funcsCache(info);
        continue;
      }

      const funcCase = this.getFuncCase();

      if (funcInputVerify(info)) {
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

class Select extends Combine {
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

    if (strArrVerify(fields) || strArrVerify(funcs)) {
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
    let query = `${QueryTypes.select} ${fieldsStr} FROM ${table}`;
    query = this.whereBuild(query);
    query = this.groupBuild(query);
    query = this.havingBuild(query);
    query = this.orderBuild(query);
    query = this.limitBuild(query);
    return query;
  }

  fields(arg, ...otherArgs) {
    const selectFields = schemaVerify.Type.array.safe(this.selectFields);
    const args = argStrArrTrans(arg, otherArgs);
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

    if (!strObjVerify(map)) {
      throw new Error(ErrMsg$b.errorFieldMap);
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

class Update extends Where {
  constructor() {
    super();
    this.updateInfos = {};
  }

  build() {
    const table = this.getQueryTable();
    const data = this.formatData();
    const dataStr = data.join(", ");
    let query = `${QueryTypes.update} ${table} SET ${dataStr}`;
    query = this.whereBuild(query);
    query = this.orderBuild(query);
    query = this.limitBuild(query);
    return query;
  }

  formatData() {
    const updateInfos = this.updateInfos;

    if (!schemaVerify.Type.object.isNotEmpty(updateInfos)) {
      throw new Error(ErrMsg$b.emptyUpdateInfo);
    }

    const result = [];

    for (const field in updateInfos) {
      const info = updateInfos[field];

      if (!updateInfoVerify(info)) {
        continue;
      }

      const type = info.type;
      const value = info.value;
      const safeValue = this.safeValue(value);
      const safeField = this.safeKey(field);
      let infoStr = "";

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

      if (schemaVerify.Type.string.isNotEmpty(infoStr)) {
        result.push(infoStr);
      }
    }

    if (!strArrVerify(result)) {
      throw new Error(ErrMsg$b.emptyUpdateInfo);
    }

    return result;
  }

  updateCache(data, type) {
    if (!fieldDataVerify(data)) {
      throw new Error(ErrMsg$b.errorFieldData);
    }

    const updateInfos = schemaVerify.Type.object.safe(this.updateInfos);

    for (const field in data) {
      const value = data[field];
      const updateInfo = {
        value,
        type
      };

      if (!updateInfoVerify(updateInfo)) {
        throw new Error(ErrMsg$b.errorUpdateInfo);
      }

      updateInfos[field] = updateInfo;
    }

    this.updateInfos = updateInfos;
    return this;
  }

  set(data) {
    return this.updateCache(data, UpdateTypes.set);
  }

  add(data) {
    return this.updateCache(data, UpdateTypes.add);
  }

  minus(data) {
    return this.updateCache(data, UpdateTypes.minus);
  }

}

class Delete extends Where {
  build() {
    const table = this.getQueryTable();
    let query = `${QueryTypes.delete} FROM ${table}`;
    query = this.whereBuild(query);
    query = this.orderBuild(query);
    query = this.limitBuild(query);
    return query;
  }

}

class Replace extends Insert {
  constructor() {
    super();
    this.queryType = QueryTypes.replace;
  }

}

const TABLE_OPT_VALUES = ["CURRENT_TIMESTAMP"];
const FEILD_TEMPLATE = `{{field}}{{type}}{{unsigned}}{{notNull}}{{default}}{{autoIncrement}}{{onUpdate}}{{comment}}`;

const TABLE_TEMPLATE = `CREATE TABLE IF NOT EXISTS {{tableName}}( {{feildsStr}}) {{tableOptionsStr}}`;
const TABLE_OPTIONS_TEMPLATE = `{{engine}}{{autoIncrement}}{{defaultCharset}}{{comment}}`;
const DATABASE_TEMPLATE = `CREATE DATABASE {{dbName}}`;

class Create extends Base {
  info(tableInfo) {
    if (schemaVerify.Type.string.isNotEmpty(tableInfo)) {
      this.createTableSqlStr = tableInfo;
    } else if (tableInfoVerify(tableInfo, true)) {
      this.createTableInfo = tableInfo;
    }

    return this;
  }

  dataBase(dbName) {
    if (!schemaVerify.Type.string.isNotEmpty(dbName)) {
      throw new Error(ErrMsg$b.errorCreateDbName);
    }

    this.createDbName = dbName;
    return this;
  }

  build() {
    const createDbName = this.createDbName;

    if (schemaVerify.Type.string.isNotEmpty(createDbName)) {
      const tmplOpts = {
        dbName: createDbName
      };
      const query = analyTmpl(DATABASE_TEMPLATE, tmplOpts);
      return query;
    }

    const tableSqlStr = this.createTableSqlStr;

    if (schemaVerify.Type.string.isNotEmpty(tableSqlStr)) {
      return tableSqlStr;
    }

    const tableInfo = this.createTableInfo;
    tableInfoVerify(tableInfo, true);
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
    const tableInfoStr = analyTmpl(TABLE_TEMPLATE, tmplOpts) + ";";
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
      tmplOpts["unsigned"] = TableOptions.unsigned;
    }

    if (notNull === true) {
      tmplOpts["notNull"] = TableOptions.notNull;
    }

    if (schemaVerify.Type.string.is(defaultValue) || schemaVerify.Type.number.is(defaultValue)) {
      let needSafe = true;
      let upperValue;

      if (schemaVerify.Type.string.is(defaultValue)) {
        upperValue = defaultValue.toUpperCase();
        needSafe = !TABLE_OPT_VALUES.includes(upperValue);
      }

      defaultValue = needSafe ? this.safeValue(defaultValue) : upperValue;
      tmplOpts["default"] = `${TableOptions.default} ${defaultValue}`;
    }

    if (autoIncrement === true) {
      tmplOpts["autoIncrement"] = TableOptions.autoIncrement;
    }

    if (schemaVerify.Type.string.isNotEmpty(onUpdate)) {
      tmplOpts["onUpdate"] = `${TableOptions.onUpdate} ${onUpdate}`;
    }

    if (schemaVerify.Type.string.isNotEmpty(comment)) {
      comment = this.safeValue(comment);
      tmplOpts["comment"] = `${TableOptions.comment} ${comment}`;
    }

    const feildStr = analyTmpl(FEILD_TEMPLATE, tmplOpts);
    return feildStr;
  }

  primaryKeyStr(keyInfo) {
    let result;
    const primaryKey = TableOptions.primaryKey;

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

    return `${TableOptions.constraint} ${result}`;
  }

  uniqueKeyStr(keyInfo) {
    let result;
    const uniqueKey = TableOptions.uniqueKey;

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

    return `${TableOptions.constraint} ${result}`;
  }

  tableOptsStr(info) {
    const engine = info.engine;
    const autoIncrement = info.autoIncrement;
    const defaultCharset = info.defaultCharset;
    const comment = info.comment;
    const tmplOpts = {};

    if (schemaVerify.Type.string.isNotEmpty(engine)) {
      const key = TableOptions.engine;
      const value = engine;
      tmplOpts["engine"] = `${key}=${value}`;
    }

    if (schemaVerify.Type.number.is(autoIncrement)) {
      const key = TableOptions.autoIncrement;
      const value = autoIncrement;
      tmplOpts["autoIncrement"] = `${key}=${value}`;
    }

    if (schemaVerify.Type.string.isNotEmpty(defaultCharset)) {
      const key = TableOptions.defaultCharset;
      const value = defaultCharset;
      tmplOpts["defaultCharset"] = `${key}=${value}`;
    }

    if (schemaVerify.Type.string.isNotEmpty(comment)) {
      const key = TableOptions.comment;
      const value = this.safeValue(comment);
      tmplOpts["comment"] = `${key}=${value}`;
    }

    const tableOptionsStr = analyTmpl(TABLE_OPTIONS_TEMPLATE, tmplOpts);
    return tableOptionsStr;
  }

}

const ALTER_TEMPLATE = `ALTER TABLE {{queryTable}}{{alterInfosStr}}`;
const ALTER_INFOS_TEMPLATE = `{{method}}COLUMN {{field}}{{alterFieldStr}}`;

class Alter extends Base {
  add(field, alterField) {
    if (schemaVerify.Type.object.is(field)) {
      alterField = field;
      field = alterField.field;
    }

    delete alterField["field"];
    return this.alterCache(AlterMethods.add, field, alterField);
  }

  drop(field) {
    return this.alterCache(AlterMethods.drop, field, {});
  }

  modify(field, alterField) {
    delete alterField["field"];
    return this.alterCache(AlterMethods.modify, field, alterField);
  }

  change(field, alterField) {
    return this.alterCache(AlterMethods.change, field, alterField);
  }

  alterCache(method, field, alterField) {
    if (AlterMethods.drop !== method && !schemaVerify.Type.object.isNotEmpty(alterField)) {
      throw new Error(ErrMsg$b.errorAlterField);
    }

    const alterInfo = {
      method,
      field,
      alterField
    };

    if (!alterInfosVerify(alterInfo)) {
      throw new Error(ErrMsg$b.errorAlterField);
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
      if (!alterInfosVerify(item)) {
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
      const alterInfoStr = analyTmpl(ALTER_INFOS_TEMPLATE, tmplOpts);
      infosStrArr.push(alterInfoStr);
    }

    if (!schemaVerify.Type.array.isNotEmpty(infosStrArr)) {
      throw new Error(ErrMsg$b.emptyAlterInfos);
    }

    const alterInfosStr = infosStrArr.join(",");
    const queryTable = this.getQueryTable();
    const tmplOpts = {
      queryTable,
      alterInfosStr
    };
    const query = analyTmpl(ALTER_TEMPLATE, tmplOpts);
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
      tmplOpts["unsigned"] = TableOptions.unsigned;
    }

    if (notNull === true) {
      tmplOpts["notNull"] = TableOptions.notNull;
    }

    if (schemaVerify.Type.string.is(defaultValue) || schemaVerify.Type.number.is(defaultValue)) {
      let needSafe = true;
      let upperValue;

      if (schemaVerify.Type.string.is(defaultValue)) {
        upperValue = defaultValue.toUpperCase();
        needSafe = !TABLE_OPT_VALUES.includes(upperValue);
      }

      defaultValue = needSafe ? this.safeValue(defaultValue) : upperValue;
      tmplOpts["default"] = `${TableOptions.default} ${defaultValue}`;
    }

    if (autoIncrement === true) {
      tmplOpts["autoIncrement"] = TableOptions.autoIncrement;
    }

    if (schemaVerify.Type.string.isNotEmpty(onUpdate)) {
      tmplOpts["onUpdate"] = `${TableOptions.onUpdate} ${onUpdate}`;
    }

    if (schemaVerify.Type.string.isNotEmpty(comment)) {
      comment = this.safeValue(comment);
      tmplOpts["comment"] = `${TableOptions.comment} ${comment}`;
    }

    const feildStr = analyTmpl(FEILD_TEMPLATE, tmplOpts);
    return feildStr;
  }

}

var DialectModules;

(function (DialectModules) {
  DialectModules["mysql"] = "mysql";
  DialectModules["mssql"] = "tedious";
  DialectModules["mssqlPool"] = "tedious-connection-pool";
})(DialectModules || (DialectModules = {}));

const ErrMsg$c = {
  errorConnectConfig: "错误的连接配置",
  emptyConnectPool: "未连接数据库",
  errorDialectType: "错误的数据库类型",
  errorConnect: "错误的连接"
};

const ErrMsg$d = { ...ErrMsg$c
};

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
    enum: DialectTypes
  }, {
    index: "connectionLimit",
    type: Number,
    natural: true
  }]
});
const conConfigVerify = conConfigSchema.verify;

class BaseConnect {
  constructor(config) {
    this.setConfig(config);
  }

  setConfig(config) {
    if (!conConfigVerify(config)) {
      throw new Error(ErrMsg$d.errorConnectConfig);
    }

    const host = config.host;
    const user = config.user;
    const password = config.password;
    const port = config.port;
    const database = config.database;
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
    this.dbConfig = schemaVerify.Type.object.pure(dbConfig);
  }

  loadModule(moduleName) {
    try {
      return require(moduleName);
    } catch (err) {
      if (err && err.code === "MODULE_NOT_FOUND") {
        throw new Error(`请先安装模块 ${moduleName}`);
      }

      throw err;
    }
  }

}

class MysqlConnect extends BaseConnect {
  constructor(config) {
    super(config);
    this.pool = this.getPool();
  }

  getPool() {
    let pool = this.pool;
    const dbConfig = this.dbConfig;

    if (schemaVerify.Type.object.is(pool) && schemaVerify.Type.function.is(pool.getConnection)) {
      return pool;
    }

    const MysqlModule = this.loadModule(DialectModules.mysql);
    pool = MysqlModule.createPool(dbConfig);
    return pool;
  }

  getDbConnect() {
    const pool = this.getPool() || {};

    if (schemaVerify.Type.function.isNot(pool.getConnection)) {
      throw new Error(ErrMsg$d.emptyConnectPool);
    }

    return new Promise((relsove, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }

        if (!connection || schemaVerify.Type.function.isNot(connection.query) || schemaVerify.Type.function.isNot(connection.release)) {
          reject(new Error(ErrMsg$d.errorConnect));
        }

        relsove(connection);
      });
    });
  }

}

class MyssqlConnect extends BaseConnect {
  constructor(config) {
    super(config);
    this.pool = this.getPool();
    this.mssqlRequest = this.loadModule(DialectModules.mssql).Request;
  }

  getPool() {
    let pool = this.pool;
    const dbConfig = this.dbConfig;

    if (schemaVerify.Type.object.is(pool) && schemaVerify.Type.function.is(pool.acquire)) {
      return pool;
    }

    const poolConfig = {
      min: 1,
      max: dbConfig.connectionLimit || 0
    };
    const connectionConfig = {
      userName: dbConfig.user,
      password: dbConfig.password,
      server: dbConfig.host,
      options: {
        port: dbConfig.port,
        database: dbConfig.database
      }
    };
    const MssqlPoolModule = this.loadModule(DialectModules.mssqlPool);
    pool = new MssqlPoolModule(poolConfig, connectionConfig);
    return pool;
  }

  getDbConnect() {
    const pool = this.getPool() || {};
    const mssqlRequest = this.mssqlRequest;

    if (schemaVerify.Type.function.isNot(pool.acquire)) {
      throw new Error(ErrMsg$d.emptyConnectPool);
    }

    return new Promise((relsove, reject) => {
      pool.acquire((err, connection) => {
        if (err) {
          reject(err);
        }

        if (!connection || schemaVerify.Type.function.isNot(connection.execSql) || schemaVerify.Type.function.isNot(connection.release)) {
          reject(new Error(ErrMsg$d.errorConnect));
        }

        const conn = {
          query: function (query, fn) {
            const request = new mssqlRequest(query, function (err, rowCount) {
              if (err) {
                fn(err);
                return;
              }

              fn(null, rowCount);
            });
            request.on("row", function (columns) {
              fn(null, columns);
            });
            connection.execSql(request);
          },
          release: function () {
            connection.release();
          }
        };
        relsove(conn);
      });
    });
  }

}

class Execute {
  constructor(config) {
    this.dialectType = config.dialect || DialectTypes.mysql;
    this.connect = this.getConnect(config);
  }

  getConnect(config) {
    const dialect = this.dialectType;
    let connect;

    switch (dialect) {
      case DialectTypes.mysql:
        connect = new MysqlConnect(config);
        break;

      case DialectTypes.mssql:
        connect = new MyssqlConnect(config);
        break;
    }

    if (schemaVerify.Type.undefinedNull.is(connect)) {
      throw new Error(ErrMsg$d.errorDialectType);
    }

    return connect;
  }

  async exec(query) {
    const connect = this.connect || {};

    if (schemaVerify.Type.function.isNot(connect.getDbConnect)) {
      throw new Error(ErrMsg$d.emptyConnectPool);
    }

    const dbConnection = await connect.getDbConnect();
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

const TABLE_QUERY_TYPE = [QueryTypes.insert, QueryTypes.replace, QueryTypes.select, QueryTypes.update, QueryTypes.delete];

class Builder {
  constructor(dialectType, execute) {
    this.dialectType = dialectType || DialectTypes.mysql;
    this.execute = execute;
    this.queryStore = [];
  }

  insert() {
    return this.queryInstance(QueryTypes.insert);
  }

  select() {
    return this.queryInstance(QueryTypes.select);
  }

  update() {
    return this.queryInstance(QueryTypes.update);
  }

  delete() {
    return this.queryInstance(QueryTypes.delete);
  }

  replace() {
    return this.queryInstance(QueryTypes.replace);
  }

  create() {
    return this.queryInstance(QueryTypes.create);
  }

  alter() {
    return this.queryInstance(QueryTypes.alter);
  }

  get func() {
    return this.widgetInstance(WidgetTypes.func);
  }

  get term() {
    return this.widgetInstance(WidgetTypes.term);
  }

  get order() {
    return this.widgetInstance(WidgetTypes.order);
  }

  queryInstance(type) {
    let instance;

    switch (type) {
      case QueryTypes.insert:
        instance = new Insert();
        break;

      case QueryTypes.replace:
        instance = new Replace();
        break;

      case QueryTypes.select:
        instance = new Select();
        break;

      case QueryTypes.update:
        instance = new Update();
        break;

      case QueryTypes.delete:
        instance = new Delete();
        break;

      case QueryTypes.create:
        instance = new Create();
        break;

      case QueryTypes.alter:
        instance = new Alter();
        break;
    }

    return this.initInstance(type, instance);
  }

  widgetInstance(type) {
    let instance;

    switch (type) {
      case WidgetTypes.func:
        instance = new Func();
        break;

      case WidgetTypes.term:
        instance = new Term();
        break;

      case WidgetTypes.order:
        instance = new Order();
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
      throw new Error(ErrMsg$b.errorTableName);
    }

    this.queryTable = tableName;
    return this;
  }

  build() {
    throw new Error(ErrMsg$b.emptyQueryType);
  }

  setConnect(config) {
    if (schemaVerify.Type.object.isNot(config)) {
      return this;
    }

    config = schemaVerify.Type.object.safe(config);
    const execute = new Execute(config);
    this.dialectType = config.dialect || DialectTypes.mysql;
    this.execute = execute;
    return this;
  }

  get query() {
    return this.build();
  }

}

function SqlQuery(config) {
  let dialect;

  if (schemaVerify.Type.object.isNot(config)) {
    dialect = DialectTypes.mysql;

    if (schemaVerify.Type.string.isNotEmpty(config)) {
      dialect = config;
    }

    return new Builder(dialect);
  }

  dialect = config.dialect || DialectTypes.mysql;
  config = schemaVerify.Type.object.safe(config);
  const execute = new Execute(config);
  const builder = new Builder(dialect, execute);
  return builder;
}

SqlQuery.Builder = Builder;
SqlQuery.Execute = Execute;

module.exports = SqlQuery;
