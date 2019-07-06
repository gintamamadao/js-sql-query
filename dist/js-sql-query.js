'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var schemaVerify = _interopDefault(require('schema-verify'));

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
var util_1 = util.argStrArrTrans;

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
          throw new Error("Illegal Value");
        }

        return result;
      },

      safeKey(key) {
        let result;

        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error("Illegal Key");
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
          throw new Error("Illegal Value");
        }

        return result;
      },

      safeKey(key) {
        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error("Illegal Key");
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
          throw new Error("Illegal Value");
        }

        return result;
      },

      safeKey(key) {
        let result;

        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error("Illegal Key");
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
          throw new Error("Illegal Value");
        }

        return result;
      },

      safeKey(key) {
        let result;

        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error("Illegal Key");
        }

        result = key.replace(/`/g, "``");
        return "`" + result + "`";
      }

    }
  };
  exports.default = DialectsObj;
});
unwrapExports(dialects);

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
          throw new Error("Illegal Value");
        }

        return result;
      },

      safeKey(key) {
        let result;

        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error("Illegal Key");
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
          throw new Error("Illegal Value");
        }

        return result;
      },

      safeKey(key) {
        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error("Illegal Key");
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
          throw new Error("Illegal Value");
        }

        return result;
      },

      safeKey(key) {
        let result;

        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error("Illegal Key");
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
          throw new Error("Illegal Value");
        }

        return result;
      },

      safeKey(key) {
        let result;

        if (!schemaVerify.Type.string.isNotEmpty(key)) {
          throw new Error("Illegal Key");
        }

        result = key.replace(/`/g, "``");
        return "`" + result + "`";
      }

    }
  };
  exports.default = DialectsObj;
});
unwrapExports(dialects$1);

var safe = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Safe {
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

      if (!dialects$1.default[dialectType]) {
        throw new Error("Illegal Dialect Type");
      }

      return dialectType;
    }

    set dialectType(dialectType) {
      const dialect = dialects$1.default[dialectType];

      if (!dialect || !(typeof dialect.safeKey === "function") || !(typeof dialect.safeValue === "function")) {
        throw new Error("Illegal Dialect Type");
      }

      this._dialect = dialect;
      this._dialectType = dialectType;
      this.safeValue = dialect.safeValue;
      this.safeKey = dialect.safeKey;
    }

    manualSql(sql, key) {
      if (!schemaVerify.Type.string.isNotEmpty(sql) && !schemaVerify.Type.function.is(sql) && !(sql instanceof Safe)) {
        throw new Error("Illegal Sql Type, Need String or Function");
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

      if (schemaVerify.Type.object.isNotEmpty(sql) && sql instanceof Safe) {
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

  }

  exports.default = Safe;
});
unwrapExports(safe);

var limit = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Limit {
    limitBuild(query) {
      const limitInfo = schemaVerify.Type.object.safe(this.limitInfo);
      const offset = limitInfo.offset;
      const step = limitInfo.step;

      if (!schemaVerify.Type.number.is(offset) || !schemaVerify.Type.number.is(step)) {
        return query;
      }

      if (offset === 0) {
        return `${query} LIMIT ${step}`;
      }

      if (step === -1) {
        return `${query} OFFSET ${offset}`;
      }

      return `${query} LIMIT ${step} OFFSET ${offset}`;
    }

    limit(offset, step) {
      if (!schemaVerify.Type.number.is(offset) || offset < 0) {
        throw new Error("Illegal Param Offset");
      }

      if (!schemaVerify.Type.undefinedNull.is(step) && (!schemaVerify.Type.number.is(step) || step < 0)) {
        throw new Error("Illegal Param Step");
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
      if (!schemaVerify.Type.number.is(offset) || offset < 0) {
        throw new Error("Illegal Param Offset");
      }

      this.limitInfo = {
        offset: offset,
        step: -1
      };
    }

    step(step) {
      if (!schemaVerify.Type.number.is(step) || step < 0) {
        throw new Error("Illegal Param Step");
      }

      this.limitInfo = {
        offset: 0,
        step
      };
    }

    paging(page, size) {
      if (!schemaVerify.Type.number.is(page) || page < 1) {
        throw new Error("Illegal Param Page");
      }

      if (!schemaVerify.Type.number.is(size) || size < 0) {
        throw new Error("Illegal Param Size");
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
    TermSign["noEqual"] = "<>";
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

  var DataTypes;

  (function (DataTypes) {
    DataTypes["tinyint"] = "TINYINT";
    DataTypes["smallint"] = "SMALLINT";
    DataTypes["mediumint"] = "MEDIUMINT";
    DataTypes["int"] = "INT";
    DataTypes["bigint"] = "BIGINT";
    DataTypes["float"] = "FLOAT";
    DataTypes["double"] = "DOUBLE";
    DataTypes["decimal"] = "DECIMAL";
  })(DataTypes = exports.DataTypes || (exports.DataTypes = {}));
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
var _enum_9 = _enum.DataTypes;

var util$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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
var util_1$1 = util$1.argStrArrTrans;

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
    TermSign["noEqual"] = "<>";
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

  var DataTypes;

  (function (DataTypes) {
    DataTypes["tinyint"] = "TINYINT";
    DataTypes["smallint"] = "SMALLINT";
    DataTypes["mediumint"] = "MEDIUMINT";
    DataTypes["int"] = "INT";
    DataTypes["bigint"] = "BIGINT";
    DataTypes["float"] = "FLOAT";
    DataTypes["double"] = "DOUBLE";
    DataTypes["decimal"] = "DECIMAL";
  })(DataTypes = exports.DataTypes || (exports.DataTypes = {}));
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
var _enum_9$1 = _enum$1.DataTypes;

var safe$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Safe {
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

      if (!dialects$1.default[dialectType]) {
        throw new Error("Illegal Dialect Type");
      }

      return dialectType;
    }

    set dialectType(dialectType) {
      const dialect = dialects$1.default[dialectType];

      if (!dialect || !(typeof dialect.safeKey === "function") || !(typeof dialect.safeValue === "function")) {
        throw new Error("Illegal Dialect Type");
      }

      this._dialect = dialect;
      this._dialectType = dialectType;
      this.safeValue = dialect.safeValue;
      this.safeKey = dialect.safeKey;
    }

    manualSql(sql, key) {
      if (!schemaVerify.Type.string.isNotEmpty(sql) && !schemaVerify.Type.function.is(sql) && !(sql instanceof Safe)) {
        throw new Error("Illegal Sql Type, Need String or Function");
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

      if (schemaVerify.Type.object.isNotEmpty(sql) && sql instanceof Safe) {
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

  }

  exports.default = Safe;
});
unwrapExports(safe$1);

var order = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const SQL_NAME = "orderSql";

  class Order extends safe$1.default {
    constructor(dialectType) {
      super();
      this.dialectType = dialectType;
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
        const field = info.field;
        const type = info.type;
        const list = info.list;
        const safeField = this.safeKey(field);

        if (type === _enum$1.OrderTypes.field) {
          if (!schemaVerify.Type.array.isNotEmpty(list)) {
            throw new Error("Illegal Value List");
          }

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
      fields = schemaVerify.Type.array.safe(fields);
      fieldOrder = schemaVerify.Type.object.safe(fieldOrder);
      const orderInfos = schemaVerify.Type.array.safe(this.orderInfos);

      for (const field of fields) {
        const info = {
          field,
          type
        };

        if (type === _enum$1.OrderTypes.field) {
          const list = fieldOrder[field];

          if (!schemaVerify.Type.array.isNotEmpty(list)) {
            throw new Error("Illegal Value List");
          }

          info["list"] = list;
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
      const limitInfo = schemaVerify.Type.object.safe(this.limitInfo);
      const offset = limitInfo.offset;
      const step = limitInfo.step;

      if (!schemaVerify.Type.number.is(offset) || !schemaVerify.Type.number.is(step)) {
        return query;
      }

      if (offset === 0) {
        return `${query} LIMIT ${step}`;
      }

      if (step === -1) {
        return `${query} OFFSET ${offset}`;
      }

      return `${query} LIMIT ${step} OFFSET ${offset}`;
    }

    limit(offset, step) {
      if (!schemaVerify.Type.number.is(offset) || offset < 0) {
        throw new Error("Illegal Param Offset");
      }

      if (!schemaVerify.Type.undefinedNull.is(step) && (!schemaVerify.Type.number.is(step) || step < 0)) {
        throw new Error("Illegal Param Step");
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
      if (!schemaVerify.Type.number.is(offset) || offset < 0) {
        throw new Error("Illegal Param Offset");
      }

      this.limitInfo = {
        offset: offset,
        step: -1
      };
    }

    step(step) {
      if (!schemaVerify.Type.number.is(step) || step < 0) {
        throw new Error("Illegal Param Step");
      }

      this.limitInfo = {
        offset: 0,
        step
      };
    }

    paging(page, size) {
      if (!schemaVerify.Type.number.is(page) || page < 1) {
        throw new Error("Illegal Param Page");
      }

      if (!schemaVerify.Type.number.is(size) || size < 0) {
        throw new Error("Illegal Param Size");
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

  class Order extends safe$1.default {
    constructor(dialectType) {
      super();
      this.dialectType = dialectType;
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
        const field = info.field;
        const type = info.type;
        const list = info.list;
        const safeField = this.safeKey(field);

        if (type === _enum$1.OrderTypes.field) {
          if (!schemaVerify.Type.array.isNotEmpty(list)) {
            throw new Error("Illegal Value List");
          }

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
      fields = schemaVerify.Type.array.safe(fields);
      fieldOrder = schemaVerify.Type.object.safe(fieldOrder);
      const orderInfos = schemaVerify.Type.array.safe(this.orderInfos);

      for (const field of fields) {
        const info = {
          field,
          type
        };

        if (type === _enum$1.OrderTypes.field) {
          const list = fieldOrder[field];

          if (!schemaVerify.Type.array.isNotEmpty(list)) {
            throw new Error("Illegal Value List");
          }

          info["list"] = list;
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

  class Query extends safe$1.default {
    constructor() {
      super();
      this.queryTable = "";
    }

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
        const type = this.dialectType;
        queryOrder = new order$1.default(type);
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

    _checkQuery() {
      const type = this.queryType;
      const table = this.queryTable;

      if (!schemaVerify.Type.string.isNotEmpty(type)) {
        throw new Error("Illegal Query Type");
      }

      if (!schemaVerify.Type.string.isNotEmpty(table)) {
        throw new Error("Illegal Table Name");
      }
    }

    table(tableName) {
      if (!schemaVerify.Type.string.isNotEmpty(tableName)) {
        throw new Error("Illegal Table Name");
      }

      this.queryTable = tableName;
      return this;
    }

    getQueryTable() {
      return this.safeKey(this.queryTable);
    }

  }

  exports.default = Query;
});
unwrapExports(query);

var query$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Query extends safe$1.default {
    constructor() {
      super();
      this.queryTable = "";
    }

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
        const type = this.dialectType;
        queryOrder = new order$1.default(type);
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

    _checkQuery() {
      const type = this.queryType;
      const table = this.queryTable;

      if (!schemaVerify.Type.string.isNotEmpty(type)) {
        throw new Error("Illegal Query Type");
      }

      if (!schemaVerify.Type.string.isNotEmpty(table)) {
        throw new Error("Illegal Table Name");
      }
    }

    table(tableName) {
      if (!schemaVerify.Type.string.isNotEmpty(tableName)) {
        throw new Error("Illegal Table Name");
      }

      this.queryTable = tableName;
      return this;
    }

    getQueryTable() {
      return this.safeKey(this.queryTable);
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
    constructor(dialectType) {
      super();
      this.queryType = _enum$1.QueryTypes.insert;
      this.dialectType = dialectType;
      this.insertData = {};
      this.insertFields = [];
      this.insertDataArr = [];
    }

    data(data) {
      if (!schemaVerify.Type.object.isNotEmpty(data)) {
        throw new Error("Illegal Field Data");
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
      if (!schemaVerify.Type.array.isNotEmpty(dataArr)) {
        throw new Error("Illegal Field Data Array");
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

      if (schemaVerify.Type.array.isNotEmpty(insertFields)) {
        fields = insertFields;
      } else if (schemaVerify.Type.object.isNotEmpty(insertData)) {
        fields = Object.keys(insertData);
      } else if (schemaVerify.Type.array.isNotEmpty(insertDataArr)) {
        fields = Object.keys(insertDataArr[0]);
      }

      if (!schemaVerify.Type.array.isNotEmpty(fields)) {
        throw new Error("Illegal Insert Fields");
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
      } else if (schemaVerify.Type.object.isNotEmpty(insertData)) {
        result = valuesStrFormat(insertData);
      } else if (schemaVerify.Type.array.isNotEmpty(insertDataArr)) {
        result = valuesArrStrFormat(insertDataArr);
      }

      if (!schemaVerify.Type.string.isNotEmpty(result)) {
        throw new Error("Illegal Insert Values");
      }

      return `VALUES ${result}`;
    }

    build() {
      this.checkQuery();
      const type = this.queryType;
      const table = this.getQueryTable();
      const fields = this.formatFields();
      const valuesStr = this.formatValues(fields);
      const fieldsStr = fields.map(field => this.safeKey(field)).join(", ");
      let query = `${type} INTO ${table} ( ${fieldsStr} )  ${valuesStr}`;
      return query;
    }

    checkQuery() {
      this._checkQuery();

      const valuesSql = this.valuesSql;
      const insertData = this.insertData;
      const insertFields = this.insertFields;
      const insertDataArr = this.insertDataArr;

      if (schemaVerify.Type.string.isNotEmpty(valuesSql) || schemaVerify.Type.function.is(valuesSql) || schemaVerify.Type.object.is(valuesSql)) {
        if (!schemaVerify.Type.array.isNotEmpty(insertFields)) {
          throw new Error("Illegal Insert Fields");
        }

        return;
      }

      if (!schemaVerify.Type.object.isNotEmpty(insertData) && !schemaVerify.Type.array.isNotEmpty(insertDataArr)) {
        throw new Error("Illegal Insert Data");
      }

      if (!schemaVerify.Type.array.isNotEmpty(insertFields)) {
        return;
      }

      const checkInsertData = data => {
        for (const field of insertFields) {
          if (schemaVerify.Type.undefinedNull.is(data[field])) {
            throw new Error("Illegal Insert Data");
          }
        }
      };

      if (schemaVerify.Type.object.isNotEmpty(insertData)) {
        return checkInsertData(insertData);
      }

      if (schemaVerify.Type.array.isNotEmpty(insertDataArr)) {
        for (const data of insertDataArr) {
          checkInsertData(data);
        }
      }
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

  class Term extends safe$1.default {
    constructor(dialectType) {
      super();
      this.termInfos = [];
      this.termBrackets = [];
      this.dialectType = dialectType;
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
        const curPos = curBracket.position;
        const curLogic = curBracket.logic;
        let prePos = 0;
        let nextPos = termsLen;

        if (schemaVerify.Type.object.isNotEmpty(perBracket)) {
          prePos = perBracket.position;
        }

        if (schemaVerify.Type.object.isNotEmpty(nextBracket)) {
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
        if (!schemaVerify.Type.object.isNotEmpty(term)) {
          continue;
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
        if (!schemaVerify.Type.array.isNotEmpty(value)) {
          throw new Error("Illegal Term Value (need Array)");
        }

        termValue = value.map(item => this.safeValue(item)).join(", ");
        return `( ${termValue} )`;
      }

      if (sign === _enum$1.TermSign.between || sign === _enum$1.TermSign.notBetween) {
        if (!schemaVerify.Type.array.isNotEmpty(value) || value.length !== 2) {
          throw new Error("Illegal Term Value (need Array[2])");
        }

        const lower = this.safeValue(value[0]);
        const upper = this.safeValue(value[1]);
        return `${lower} AND ${upper}`;
      }

      if (!schemaVerify.Type.string.isNotEmpty(value) && !schemaVerify.Type.number.is(value)) {
        throw new Error("Illegal Term Value");
      }

      if (sign === _enum$1.TermSign.like || sign === _enum$1.TermSign.notlike) {
        value = `%${value}%`;
      }

      termValue = this.safeValue(value);
      return termValue;
    }

    termCache(data, sign, logic) {
      if (!schemaVerify.Type.object.isNotEmpty(data)) {
        throw new Error("Illegal Term data");
      }

      if (!schemaVerify.Type.string.isNotEmpty(sign) || !schemaVerify.Type.string.isNotEmpty(logic)) {
        throw new Error("Illegal Param");
      }

      const termInfos = schemaVerify.Type.array.safe(this.termInfos);
      const termsArr = [];

      for (const field in data) {
        const value = data[field];

        switch (sign) {
          case _enum$1.TermSign.in:
          case _enum$1.TermSign.notIn:
            if (!schemaVerify.Type.array.isNotEmpty(value)) {
              throw new Error("Illegal Func Value");
            }

            break;

          case _enum$1.TermSign.between:
          case _enum$1.TermSign.notBetween:
            if (!schemaVerify.Type.array.isNotEmpty(value) || value.length !== 2) {
              throw new Error("Illegal Func Value");
            }

            break;

          default:
            if (!schemaVerify.Type.string.isNotEmpty(value) && !schemaVerify.Type.number.is(value)) {
              throw new Error("Illegal Func Value");
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
        const position = bracket.position;

        if (position === termsLen) {
          return;
        }
      }

      const bracket = {
        position: termsLen,
        logic
      };
      termBrackets.push(bracket);
      this.termBrackets = termBrackets;
      return this;
    }

    sqlTerm(sql) {
      this.manualSql(sql, SQL_NAME);
    }

    equal(data) {
      return this.and(data, _enum$1.TermSign.equal);
    }

    noEqual(data) {
      return this.and(data, _enum$1.TermSign.noEqual);
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

    orNoEqual(data) {
      return this.or(data, _enum$1.TermSign.noEqual);
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

  class Term extends safe$1.default {
    constructor(dialectType) {
      super();
      this.termInfos = [];
      this.termBrackets = [];
      this.dialectType = dialectType;
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
        const curPos = curBracket.position;
        const curLogic = curBracket.logic;
        let prePos = 0;
        let nextPos = termsLen;

        if (schemaVerify.Type.object.isNotEmpty(perBracket)) {
          prePos = perBracket.position;
        }

        if (schemaVerify.Type.object.isNotEmpty(nextBracket)) {
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
        if (!schemaVerify.Type.object.isNotEmpty(term)) {
          continue;
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
        if (!schemaVerify.Type.array.isNotEmpty(value)) {
          throw new Error("Illegal Term Value (need Array)");
        }

        termValue = value.map(item => this.safeValue(item)).join(", ");
        return `( ${termValue} )`;
      }

      if (sign === _enum$1.TermSign.between || sign === _enum$1.TermSign.notBetween) {
        if (!schemaVerify.Type.array.isNotEmpty(value) || value.length !== 2) {
          throw new Error("Illegal Term Value (need Array[2])");
        }

        const lower = this.safeValue(value[0]);
        const upper = this.safeValue(value[1]);
        return `${lower} AND ${upper}`;
      }

      if (!schemaVerify.Type.string.isNotEmpty(value) && !schemaVerify.Type.number.is(value)) {
        throw new Error("Illegal Term Value");
      }

      if (sign === _enum$1.TermSign.like || sign === _enum$1.TermSign.notlike) {
        value = `%${value}%`;
      }

      termValue = this.safeValue(value);
      return termValue;
    }

    termCache(data, sign, logic) {
      if (!schemaVerify.Type.object.isNotEmpty(data)) {
        throw new Error("Illegal Term data");
      }

      if (!schemaVerify.Type.string.isNotEmpty(sign) || !schemaVerify.Type.string.isNotEmpty(logic)) {
        throw new Error("Illegal Param");
      }

      const termInfos = schemaVerify.Type.array.safe(this.termInfos);
      const termsArr = [];

      for (const field in data) {
        const value = data[field];

        switch (sign) {
          case _enum$1.TermSign.in:
          case _enum$1.TermSign.notIn:
            if (!schemaVerify.Type.array.isNotEmpty(value)) {
              throw new Error("Illegal Func Value");
            }

            break;

          case _enum$1.TermSign.between:
          case _enum$1.TermSign.notBetween:
            if (!schemaVerify.Type.array.isNotEmpty(value) || value.length !== 2) {
              throw new Error("Illegal Func Value");
            }

            break;

          default:
            if (!schemaVerify.Type.string.isNotEmpty(value) && !schemaVerify.Type.number.is(value)) {
              throw new Error("Illegal Func Value");
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
        const position = bracket.position;

        if (position === termsLen) {
          return;
        }
      }

      const bracket = {
        position: termsLen,
        logic
      };
      termBrackets.push(bracket);
      this.termBrackets = termBrackets;
      return this;
    }

    sqlTerm(sql) {
      this.manualSql(sql, SQL_NAME);
    }

    equal(data) {
      return this.and(data, _enum$1.TermSign.equal);
    }

    noEqual(data) {
      return this.and(data, _enum$1.TermSign.noEqual);
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

    orNoEqual(data) {
      return this.or(data, _enum$1.TermSign.noEqual);
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
    constructor() {
      super();
    }

    where$Equal(data) {
      this.getTermCase(TERM_NAME).equal(data);
      return this;
    }

    where$NoEqual(data) {
      this.getTermCase(TERM_NAME).noEqual(data);
      return this;
    }

    where$In(data) {
      this.getTermCase(TERM_NAME).in(data);
      return this;
    }

    where$NotIn(data) {
      this.getTermCase(TERM_NAME).notIn(data);
      return this;
    }

    where$More(data) {
      this.getTermCase(TERM_NAME).more(data);
      return this;
    }

    where$Less(data) {
      this.getTermCase(TERM_NAME).less(data);
      return this;
    }

    where$MoreEqual(data) {
      this.getTermCase(TERM_NAME).moreEqual(data);
      return this;
    }

    where$LessEqual(data) {
      this.getTermCase(TERM_NAME).lessEqual(data);
      return this;
    }

    where$Like(data) {
      this.getTermCase(TERM_NAME).like(data);
      return this;
    }

    where$NotLike(data) {
      this.getTermCase(TERM_NAME).notLike(data);
      return this;
    }

    where$Between(data) {
      this.getTermCase(TERM_NAME).between(data);
      return this;
    }

    where$NotBetween(data) {
      this.getTermCase(TERM_NAME).notBetween(data);
      return this;
    }

    where$OrEqual(data) {
      this.getTermCase(TERM_NAME).orEqual(data);
      return this;
    }

    where$OrNoEqual(data) {
      this.getTermCase(TERM_NAME).orNoEqual(data);
      return this;
    }

    where$OrIn(data) {
      this.getTermCase(TERM_NAME).orIn(data);
      return this;
    }

    where$OrNotIn(data) {
      this.getTermCase(TERM_NAME).orNotIn(data);
      return this;
    }

    where$OrMore(data) {
      this.getTermCase(TERM_NAME).orMore(data);
      return this;
    }

    where$OrLess(data) {
      this.getTermCase(TERM_NAME).orLess(data);
      return this;
    }

    where$OrMoreEqual(data) {
      this.getTermCase(TERM_NAME).orMoreEqual(data);
      return this;
    }

    where$OrLessEqual(data) {
      this.getTermCase(TERM_NAME).orLessEqual(data);
      return this;
    }

    where$OrLike(data) {
      this.getTermCase(TERM_NAME).orLike(data);
      return this;
    }

    where$OrNotLike(data) {
      this.getTermCase(TERM_NAME).orNotLike(data);
      return this;
    }

    where$OrBetween(data) {
      this.getTermCase(TERM_NAME).orBetween(data);
      return this;
    }

    where$OrNotBetween(data) {
      this.getTermCase(TERM_NAME).orNotBetween(data);
      return this;
    }

    where$Bracket() {
      this.getTermCase(TERM_NAME).bracket();
      return this;
    }

    where$OrBracket() {
      this.getTermCase(TERM_NAME).orBracket();
      return this;
    }

    where(sql) {
      this.getTermCase(TERM_NAME).sqlTerm(sql);
      return this;
    }

    getTermCase(key) {
      let term = this[key];
      const type = this.dialectType;

      if (!term || !(term instanceof term$1.default)) {
        term = new term$1.default(type);
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
    constructor() {
      super();
    }

    where$Equal(data) {
      this.getTermCase(TERM_NAME).equal(data);
      return this;
    }

    where$NoEqual(data) {
      this.getTermCase(TERM_NAME).noEqual(data);
      return this;
    }

    where$In(data) {
      this.getTermCase(TERM_NAME).in(data);
      return this;
    }

    where$NotIn(data) {
      this.getTermCase(TERM_NAME).notIn(data);
      return this;
    }

    where$More(data) {
      this.getTermCase(TERM_NAME).more(data);
      return this;
    }

    where$Less(data) {
      this.getTermCase(TERM_NAME).less(data);
      return this;
    }

    where$MoreEqual(data) {
      this.getTermCase(TERM_NAME).moreEqual(data);
      return this;
    }

    where$LessEqual(data) {
      this.getTermCase(TERM_NAME).lessEqual(data);
      return this;
    }

    where$Like(data) {
      this.getTermCase(TERM_NAME).like(data);
      return this;
    }

    where$NotLike(data) {
      this.getTermCase(TERM_NAME).notLike(data);
      return this;
    }

    where$Between(data) {
      this.getTermCase(TERM_NAME).between(data);
      return this;
    }

    where$NotBetween(data) {
      this.getTermCase(TERM_NAME).notBetween(data);
      return this;
    }

    where$OrEqual(data) {
      this.getTermCase(TERM_NAME).orEqual(data);
      return this;
    }

    where$OrNoEqual(data) {
      this.getTermCase(TERM_NAME).orNoEqual(data);
      return this;
    }

    where$OrIn(data) {
      this.getTermCase(TERM_NAME).orIn(data);
      return this;
    }

    where$OrNotIn(data) {
      this.getTermCase(TERM_NAME).orNotIn(data);
      return this;
    }

    where$OrMore(data) {
      this.getTermCase(TERM_NAME).orMore(data);
      return this;
    }

    where$OrLess(data) {
      this.getTermCase(TERM_NAME).orLess(data);
      return this;
    }

    where$OrMoreEqual(data) {
      this.getTermCase(TERM_NAME).orMoreEqual(data);
      return this;
    }

    where$OrLessEqual(data) {
      this.getTermCase(TERM_NAME).orLessEqual(data);
      return this;
    }

    where$OrLike(data) {
      this.getTermCase(TERM_NAME).orLike(data);
      return this;
    }

    where$OrNotLike(data) {
      this.getTermCase(TERM_NAME).orNotLike(data);
      return this;
    }

    where$OrBetween(data) {
      this.getTermCase(TERM_NAME).orBetween(data);
      return this;
    }

    where$OrNotBetween(data) {
      this.getTermCase(TERM_NAME).orNotBetween(data);
      return this;
    }

    where$Bracket() {
      this.getTermCase(TERM_NAME).bracket();
      return this;
    }

    where$OrBracket() {
      this.getTermCase(TERM_NAME).orBracket();
      return this;
    }

    where(sql) {
      this.getTermCase(TERM_NAME).sqlTerm(sql);
      return this;
    }

    getTermCase(key) {
      let term = this[key];
      const type = this.dialectType;

      if (!term || !(term instanceof term$1.default)) {
        term = new term$1.default(type);
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
    constructor() {
      super();
    }

    having$Equal(data) {
      this.getTermCase(TERM_NAME).equal(data);
      return this;
    }

    having$NoEqual(data) {
      this.getTermCase(TERM_NAME).noEqual(data);
      return this;
    }

    having$In(data) {
      this.getTermCase(TERM_NAME).in(data);
      return this;
    }

    having$NotIn(data) {
      this.getTermCase(TERM_NAME).notIn(data);
      return this;
    }

    having$More(data) {
      this.getTermCase(TERM_NAME).more(data);
      return this;
    }

    having$Less(data) {
      this.getTermCase(TERM_NAME).less(data);
      return this;
    }

    having$MoreEqual(data) {
      this.getTermCase(TERM_NAME).moreEqual(data);
      return this;
    }

    having$LessEqual(data) {
      this.getTermCase(TERM_NAME).lessEqual(data);
      return this;
    }

    having$Like(data) {
      this.getTermCase(TERM_NAME).like(data);
      return this;
    }

    having$NotLike(data) {
      this.getTermCase(TERM_NAME).notLike(data);
      return this;
    }

    having$Between(data) {
      this.getTermCase(TERM_NAME).between(data);
      return this;
    }

    having$NotBetween(data) {
      this.getTermCase(TERM_NAME).notBetween(data);
      return this;
    }

    having$OrEqual(data) {
      this.getTermCase(TERM_NAME).orEqual(data);
      return this;
    }

    having$OrNoEqual(data) {
      this.getTermCase(TERM_NAME).orNoEqual(data);
      return this;
    }

    having$OrIn(data) {
      this.getTermCase(TERM_NAME).orIn(data);
      return this;
    }

    having$OrNotIn(data) {
      this.getTermCase(TERM_NAME).orNotIn(data);
      return this;
    }

    having$OrMore(data) {
      this.getTermCase(TERM_NAME).orMore(data);
      return this;
    }

    having$OrLess(data) {
      this.getTermCase(TERM_NAME).orLess(data);
      return this;
    }

    having$OrMoreEqual(data) {
      this.getTermCase(TERM_NAME).orMoreEqual(data);
      return this;
    }

    having$OrLessEqual(data) {
      this.getTermCase(TERM_NAME).orLessEqual(data);
      return this;
    }

    having$OrLike(data) {
      this.getTermCase(TERM_NAME).orLike(data);
      return this;
    }

    having$OrNotLike(data) {
      this.getTermCase(TERM_NAME).orNotLike(data);
      return this;
    }

    having$OrBetween(data) {
      this.getTermCase(TERM_NAME).orBetween(data);
      return this;
    }

    having$OrNotBetween(data) {
      this.getTermCase(TERM_NAME).orNotBetween(data);
      return this;
    }

    having$Bracket() {
      this.getTermCase(TERM_NAME).bracket();
      return this;
    }

    having$OrBracket() {
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

  class Func extends safe$1.default {
    constructor(dialectType) {
      super();
      this.dialectType = dialectType;
    }

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
    constructor() {
      super();
    }

    having$Equal(data) {
      this.getTermCase(TERM_NAME).equal(data);
      return this;
    }

    having$NoEqual(data) {
      this.getTermCase(TERM_NAME).noEqual(data);
      return this;
    }

    having$In(data) {
      this.getTermCase(TERM_NAME).in(data);
      return this;
    }

    having$NotIn(data) {
      this.getTermCase(TERM_NAME).notIn(data);
      return this;
    }

    having$More(data) {
      this.getTermCase(TERM_NAME).more(data);
      return this;
    }

    having$Less(data) {
      this.getTermCase(TERM_NAME).less(data);
      return this;
    }

    having$MoreEqual(data) {
      this.getTermCase(TERM_NAME).moreEqual(data);
      return this;
    }

    having$LessEqual(data) {
      this.getTermCase(TERM_NAME).lessEqual(data);
      return this;
    }

    having$Like(data) {
      this.getTermCase(TERM_NAME).like(data);
      return this;
    }

    having$NotLike(data) {
      this.getTermCase(TERM_NAME).notLike(data);
      return this;
    }

    having$Between(data) {
      this.getTermCase(TERM_NAME).between(data);
      return this;
    }

    having$NotBetween(data) {
      this.getTermCase(TERM_NAME).notBetween(data);
      return this;
    }

    having$OrEqual(data) {
      this.getTermCase(TERM_NAME).orEqual(data);
      return this;
    }

    having$OrNoEqual(data) {
      this.getTermCase(TERM_NAME).orNoEqual(data);
      return this;
    }

    having$OrIn(data) {
      this.getTermCase(TERM_NAME).orIn(data);
      return this;
    }

    having$OrNotIn(data) {
      this.getTermCase(TERM_NAME).orNotIn(data);
      return this;
    }

    having$OrMore(data) {
      this.getTermCase(TERM_NAME).orMore(data);
      return this;
    }

    having$OrLess(data) {
      this.getTermCase(TERM_NAME).orLess(data);
      return this;
    }

    having$OrMoreEqual(data) {
      this.getTermCase(TERM_NAME).orMoreEqual(data);
      return this;
    }

    having$OrLessEqual(data) {
      this.getTermCase(TERM_NAME).orLessEqual(data);
      return this;
    }

    having$OrLike(data) {
      this.getTermCase(TERM_NAME).orLike(data);
      return this;
    }

    having$OrNotLike(data) {
      this.getTermCase(TERM_NAME).orNotLike(data);
      return this;
    }

    having$OrBetween(data) {
      this.getTermCase(TERM_NAME).orBetween(data);
      return this;
    }

    having$OrNotBetween(data) {
      this.getTermCase(TERM_NAME).orNotBetween(data);
      return this;
    }

    having$Bracket() {
      this.getTermCase(TERM_NAME).bracket();
      return this;
    }

    having$OrBracket() {
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

  class Func extends safe$1.default {
    constructor(dialectType) {
      super();
      this.dialectType = dialectType;
    }

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

      if (!schemaVerify.Type.array.isNotEmpty(fields)) {
        throw new Error("Illegal Field");
      }

      groupByFields = groupByFields.concat(fields);
      this.groupByFields = Array.from(new Set(groupByFields));
      return this;
    }

    getFuncCase() {
      let func = this.funcInstance;
      const dialectType = this.dialectType;

      if (!func || !(func instanceof func$1.default)) {
        func = new func$1.default(dialectType);
        this.funcInstance = func;
      }

      return func;
    }

    formatFuncs() {
      const combineFuncs = schemaVerify.Type.array.safe(this.combineFuncs);
      let funcs = [];

      for (const info of combineFuncs) {
        if (!schemaVerify.Type.object.isNotEmpty(info) || !schemaVerify.Type.string.isNotEmpty(info.funcFeild)) {
          throw new Error("Illegal Func Feild");
        }

        const funcFeild = info.funcFeild;
        funcs.push(funcFeild);
      }

      funcs = Array.from(new Set(funcs));
      return funcs;
    }

    funcsCache(funcInfo) {
      const combineFuncs = schemaVerify.Type.array.safe(this.combineFuncs);

      if (schemaVerify.Type.object.isNotEmpty(funcInfo) && schemaVerify.Type.string.isNotEmpty(funcInfo.funcFeild)) {
        combineFuncs.push(funcInfo);
      }

      this.combineFuncs = combineFuncs;
      return this;
    }

    funcFeilds(...funcInfos) {
      for (let info of funcInfos) {
        info = schemaVerify.Type.object.safe(info);
        let saveInfo = info;
        const func = info.func;
        const field = info.field;
        const funcCase = this.getFuncCase();

        if (schemaVerify.Type.string.isNotEmpty(func) && schemaVerify.Type.function.is(funcCase[func]) && schemaVerify.Type.undefinedNull.isNot(field)) {
          saveInfo = funcCase[func].call(funcCase, field);
        }

        this.funcsCache(saveInfo);
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

      if (!schemaVerify.Type.array.isNotEmpty(fields)) {
        throw new Error("Illegal Field");
      }

      groupByFields = groupByFields.concat(fields);
      this.groupByFields = Array.from(new Set(groupByFields));
      return this;
    }

    getFuncCase() {
      let func = this.funcInstance;
      const dialectType = this.dialectType;

      if (!func || !(func instanceof func$1.default)) {
        func = new func$1.default(dialectType);
        this.funcInstance = func;
      }

      return func;
    }

    formatFuncs() {
      const combineFuncs = schemaVerify.Type.array.safe(this.combineFuncs);
      let funcs = [];

      for (const info of combineFuncs) {
        if (!schemaVerify.Type.object.isNotEmpty(info) || !schemaVerify.Type.string.isNotEmpty(info.funcFeild)) {
          throw new Error("Illegal Func Feild");
        }

        const funcFeild = info.funcFeild;
        funcs.push(funcFeild);
      }

      funcs = Array.from(new Set(funcs));
      return funcs;
    }

    funcsCache(funcInfo) {
      const combineFuncs = schemaVerify.Type.array.safe(this.combineFuncs);

      if (schemaVerify.Type.object.isNotEmpty(funcInfo) && schemaVerify.Type.string.isNotEmpty(funcInfo.funcFeild)) {
        combineFuncs.push(funcInfo);
      }

      this.combineFuncs = combineFuncs;
      return this;
    }

    funcFeilds(...funcInfos) {
      for (let info of funcInfos) {
        info = schemaVerify.Type.object.safe(info);
        let saveInfo = info;
        const func = info.func;
        const field = info.field;
        const funcCase = this.getFuncCase();

        if (schemaVerify.Type.string.isNotEmpty(func) && schemaVerify.Type.function.is(funcCase[func]) && schemaVerify.Type.undefinedNull.isNot(field)) {
          saveInfo = funcCase[func].call(funcCase, field);
        }

        this.funcsCache(saveInfo);
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
    constructor(dialectType) {
      super();
      this.queryType = _enum$1.QueryTypes.select;
      this.selectFields = [];
      this.fieldsAsMap = {};
      this.dialectType = dialectType;
    }

    formatFields() {
      const fields = schemaVerify.Type.array.safe(this.selectFields);
      const asMap = schemaVerify.Type.object.safe(this.fieldsAsMap);
      const result = [];

      for (const field of fields) {
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
      const fields = this.formatFields();
      const funcs = this.formatFuncs();
      let result;

      if (fields.length > 0 || funcs.length > 0) {
        result = [].concat(fields, funcs).join(", ");
      } else {
        result = "*";
      }

      return result;
    }

    build() {
      this.checkQuery();
      const type = this.queryType;
      const table = this.getQueryTable();
      const fieldsStr = this.formatFieldStr();
      let query = `${type} ${fieldsStr} FROM ${table}`;
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

        fields.push(item);
      }

      this.selectFields = Array.from(new Set(selectFields.concat(fields)));

      if (this.selectFields.includes("*")) {
        this.selectFields = ["*"];
      }

      return this;
    }

    asFieldMap(map) {
      let asMap = schemaVerify.Type.object.safe(this.fieldsAsMap);

      if (schemaVerify.Type.object.isNotEmpty(map)) {
        asMap = Object.assign({}, asMap, map);
      }

      this.fieldsAsMap = asMap;
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

    checkQuery() {
      this._checkQuery();
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
    constructor(dialectType) {
      super();
      this.queryType = _enum$1.QueryTypes.update;
      this.dialectType = dialectType;
      this.updateInfos = {};
    }

    build() {
      this.checkQuery();
      const type = this.queryType;
      const table = this.getQueryTable();
      const data = this.formatData();
      const dataStr = data.join(", ");
      let query = `${type} ${table} SET ${dataStr}`;
      query = this.whereBuild(query);
      query = this.orderBuild(query);
      query = this.limitBuild(query);
      return query;
    }

    formatData() {
      const updateInfos = this.updateInfos;

      if (!schemaVerify.Type.object.isNotEmpty(updateInfos)) {
        throw new Error("Illegal Update Infos");
      }

      const result = [];

      for (const field in updateInfos) {
        const info = updateInfos[field];

        if (!schemaVerify.Type.object.isNotEmpty(info)) {
          throw new Error("Illegal Update Info");
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

        if (!schemaVerify.Type.string.isNotEmpty(infoStr)) {
          throw new Error("Illegal Update Type");
        }

        result.push(infoStr);
      }

      return result;
    }

    updateCache(data, type) {
      if (!schemaVerify.Type.object.isNotEmpty(data)) {
        throw new Error("Illegal Update Data");
      }

      const updateInfos = schemaVerify.Type.object.safe(this.updateInfos);

      for (const field in data) {
        const value = data[field];

        if (!schemaVerify.Type.string.isNotEmpty(value) && !schemaVerify.Type.number.is(value)) {
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

    set(data) {
      return this.updateCache(data, _enum$1.UpdateTypes.set);
    }

    add(data) {
      return this.updateCache(data, _enum$1.UpdateTypes.add);
    }

    minus(data) {
      return this.updateCache(data, _enum$1.UpdateTypes.minus);
    }

    checkQuery() {
      this._checkQuery();

      const updateInfos = this.updateInfos;

      if (!schemaVerify.Type.object.isNotEmpty(updateInfos)) {
        throw "Illegal Update Infos";
      }
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
    constructor(dialectType) {
      super();
      this.queryType = _enum$1.QueryTypes.delete;
      this.dialectType = dialectType;
    }

    build() {
      this.checkQuery();
      const type = this.queryType;
      const table = this.getQueryTable();
      let query = `${type} FROM ${table}`;
      query = this.whereBuild(query);
      query = this.orderBuild(query);
      query = this.limitBuild(query);
      return query;
    }

    checkQuery() {
      this._checkQuery();
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
    constructor(dialectType) {
      super();
      this.queryType = _enum$1.QueryTypes.insert;
      this.dialectType = dialectType;
      this.insertData = {};
      this.insertFields = [];
      this.insertDataArr = [];
    }

    data(data) {
      if (!schemaVerify.Type.object.isNotEmpty(data)) {
        throw new Error("Illegal Field Data");
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
      if (!schemaVerify.Type.array.isNotEmpty(dataArr)) {
        throw new Error("Illegal Field Data Array");
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

      if (schemaVerify.Type.array.isNotEmpty(insertFields)) {
        fields = insertFields;
      } else if (schemaVerify.Type.object.isNotEmpty(insertData)) {
        fields = Object.keys(insertData);
      } else if (schemaVerify.Type.array.isNotEmpty(insertDataArr)) {
        fields = Object.keys(insertDataArr[0]);
      }

      if (!schemaVerify.Type.array.isNotEmpty(fields)) {
        throw new Error("Illegal Insert Fields");
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
      } else if (schemaVerify.Type.object.isNotEmpty(insertData)) {
        result = valuesStrFormat(insertData);
      } else if (schemaVerify.Type.array.isNotEmpty(insertDataArr)) {
        result = valuesArrStrFormat(insertDataArr);
      }

      if (!schemaVerify.Type.string.isNotEmpty(result)) {
        throw new Error("Illegal Insert Values");
      }

      return `VALUES ${result}`;
    }

    build() {
      this.checkQuery();
      const type = this.queryType;
      const table = this.getQueryTable();
      const fields = this.formatFields();
      const valuesStr = this.formatValues(fields);
      const fieldsStr = fields.map(field => this.safeKey(field)).join(", ");
      let query = `${type} INTO ${table} ( ${fieldsStr} )  ${valuesStr}`;
      return query;
    }

    checkQuery() {
      this._checkQuery();

      const valuesSql = this.valuesSql;
      const insertData = this.insertData;
      const insertFields = this.insertFields;
      const insertDataArr = this.insertDataArr;

      if (schemaVerify.Type.string.isNotEmpty(valuesSql) || schemaVerify.Type.function.is(valuesSql) || schemaVerify.Type.object.is(valuesSql)) {
        if (!schemaVerify.Type.array.isNotEmpty(insertFields)) {
          throw new Error("Illegal Insert Fields");
        }

        return;
      }

      if (!schemaVerify.Type.object.isNotEmpty(insertData) && !schemaVerify.Type.array.isNotEmpty(insertDataArr)) {
        throw new Error("Illegal Insert Data");
      }

      if (!schemaVerify.Type.array.isNotEmpty(insertFields)) {
        return;
      }

      const checkInsertData = data => {
        for (const field of insertFields) {
          if (schemaVerify.Type.undefinedNull.is(data[field])) {
            throw new Error("Illegal Insert Data");
          }
        }
      };

      if (schemaVerify.Type.object.isNotEmpty(insertData)) {
        return checkInsertData(insertData);
      }

      if (schemaVerify.Type.array.isNotEmpty(insertDataArr)) {
        for (const data of insertDataArr) {
          checkInsertData(data);
        }
      }
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
    constructor(dialectType) {
      super(dialectType);
      this.queryType = _enum$1.QueryTypes.replace;
    }

  }

  exports.default = Replace;
});
unwrapExports(replace);

var select$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Select extends combine$1.default {
    constructor(dialectType) {
      super();
      this.queryType = _enum$1.QueryTypes.select;
      this.selectFields = [];
      this.fieldsAsMap = {};
      this.dialectType = dialectType;
    }

    formatFields() {
      const fields = schemaVerify.Type.array.safe(this.selectFields);
      const asMap = schemaVerify.Type.object.safe(this.fieldsAsMap);
      const result = [];

      for (const field of fields) {
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
      const fields = this.formatFields();
      const funcs = this.formatFuncs();
      let result;

      if (fields.length > 0 || funcs.length > 0) {
        result = [].concat(fields, funcs).join(", ");
      } else {
        result = "*";
      }

      return result;
    }

    build() {
      this.checkQuery();
      const type = this.queryType;
      const table = this.getQueryTable();
      const fieldsStr = this.formatFieldStr();
      let query = `${type} ${fieldsStr} FROM ${table}`;
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

        fields.push(item);
      }

      this.selectFields = Array.from(new Set(selectFields.concat(fields)));

      if (this.selectFields.includes("*")) {
        this.selectFields = ["*"];
      }

      return this;
    }

    asFieldMap(map) {
      let asMap = schemaVerify.Type.object.safe(this.fieldsAsMap);

      if (schemaVerify.Type.object.isNotEmpty(map)) {
        asMap = Object.assign({}, asMap, map);
      }

      this.fieldsAsMap = asMap;
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

    checkQuery() {
      this._checkQuery();
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
    constructor(dialectType) {
      super();
      this.queryType = _enum$1.QueryTypes.update;
      this.dialectType = dialectType;
      this.updateInfos = {};
    }

    build() {
      this.checkQuery();
      const type = this.queryType;
      const table = this.getQueryTable();
      const data = this.formatData();
      const dataStr = data.join(", ");
      let query = `${type} ${table} SET ${dataStr}`;
      query = this.whereBuild(query);
      query = this.orderBuild(query);
      query = this.limitBuild(query);
      return query;
    }

    formatData() {
      const updateInfos = this.updateInfos;

      if (!schemaVerify.Type.object.isNotEmpty(updateInfos)) {
        throw new Error("Illegal Update Infos");
      }

      const result = [];

      for (const field in updateInfos) {
        const info = updateInfos[field];

        if (!schemaVerify.Type.object.isNotEmpty(info)) {
          throw new Error("Illegal Update Info");
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

        if (!schemaVerify.Type.string.isNotEmpty(infoStr)) {
          throw new Error("Illegal Update Type");
        }

        result.push(infoStr);
      }

      return result;
    }

    updateCache(data, type) {
      if (!schemaVerify.Type.object.isNotEmpty(data)) {
        throw new Error("Illegal Update Data");
      }

      const updateInfos = schemaVerify.Type.object.safe(this.updateInfos);

      for (const field in data) {
        const value = data[field];

        if (!schemaVerify.Type.string.isNotEmpty(value) && !schemaVerify.Type.number.is(value)) {
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

    set(data) {
      return this.updateCache(data, _enum$1.UpdateTypes.set);
    }

    add(data) {
      return this.updateCache(data, _enum$1.UpdateTypes.add);
    }

    minus(data) {
      return this.updateCache(data, _enum$1.UpdateTypes.minus);
    }

    checkQuery() {
      this._checkQuery();

      const updateInfos = this.updateInfos;

      if (!schemaVerify.Type.object.isNotEmpty(updateInfos)) {
        throw "Illegal Update Infos";
      }
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
    constructor(dialectType) {
      super();
      this.queryType = _enum$1.QueryTypes.delete;
      this.dialectType = dialectType;
    }

    build() {
      this.checkQuery();
      const type = this.queryType;
      const table = this.getQueryTable();
      let query = `${type} FROM ${table}`;
      query = this.whereBuild(query);
      query = this.orderBuild(query);
      query = this.limitBuild(query);
      return query;
    }

    checkQuery() {
      this._checkQuery();
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
    constructor(dialectType) {
      super(dialectType);
      this.queryType = _enum$1.QueryTypes.replace;
    }

  }

  exports.default = Replace;
});
unwrapExports(replace$1);

var builder = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Builder {
    constructor(dialectType) {
      this.dialectType = dialectType || _enum$1.DialectTypes.mysql;
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
      const dialectType = this.dialectType;
      const queryTable = this.queryTable;
      let instance = {};

      switch (type) {
        case _enum$1.QueryTypes.insert:
          instance = new insert$1.default(dialectType);
          break;

        case _enum$1.QueryTypes.replace:
          instance = new replace$1.default(dialectType);
          break;

        case _enum$1.QueryTypes.select:
          instance = new select$1.default(dialectType);
          break;

        case _enum$1.QueryTypes.update:
          instance = new update$1.default(dialectType);
          break;

        case _enum$1.QueryTypes.delete:
          instance = new _delete$1.default(dialectType);
          break;
      }

      if (schemaVerify.Type.string.isNotEmpty(queryTable)) {
        typeof instance.table === "function" && instance.table(queryTable);
      }

      return instance;
    }

    widgetInstance(type) {
      const dialectType = this.dialectType;
      let instance = {};

      switch (type) {
        case _enum$1.WidgetTypes.func:
          instance = new func$1.default(dialectType);
          break;

        case _enum$1.WidgetTypes.term:
          instance = new term$1.default(dialectType);
          break;

        case _enum$1.WidgetTypes.order:
          instance = new order$1.default(dialectType);
          break;
      }

      return instance;
    }

    table(tableName) {
      if (!schemaVerify.Type.string.isNotEmpty(tableName)) {
        throw new Error("Illegal Table Name");
      }

      this.queryTable = tableName;
      return this;
    }

  }

  exports.default = Builder;
});
unwrapExports(builder);

var builder$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  class Builder {
    constructor(dialectType) {
      this.dialectType = dialectType || _enum$1.DialectTypes.mysql;
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
      const dialectType = this.dialectType;
      const queryTable = this.queryTable;
      let instance = {};

      switch (type) {
        case _enum$1.QueryTypes.insert:
          instance = new insert$1.default(dialectType);
          break;

        case _enum$1.QueryTypes.replace:
          instance = new replace$1.default(dialectType);
          break;

        case _enum$1.QueryTypes.select:
          instance = new select$1.default(dialectType);
          break;

        case _enum$1.QueryTypes.update:
          instance = new update$1.default(dialectType);
          break;

        case _enum$1.QueryTypes.delete:
          instance = new _delete$1.default(dialectType);
          break;
      }

      if (schemaVerify.Type.string.isNotEmpty(queryTable)) {
        typeof instance.table === "function" && instance.table(queryTable);
      }

      return instance;
    }

    widgetInstance(type) {
      const dialectType = this.dialectType;
      let instance = {};

      switch (type) {
        case _enum$1.WidgetTypes.func:
          instance = new func$1.default(dialectType);
          break;

        case _enum$1.WidgetTypes.term:
          instance = new term$1.default(dialectType);
          break;

        case _enum$1.WidgetTypes.order:
          instance = new order$1.default(dialectType);
          break;
      }

      return instance;
    }

    table(tableName) {
      if (!schemaVerify.Type.string.isNotEmpty(tableName)) {
        throw new Error("Illegal Table Name");
      }

      this.queryTable = tableName;
      return this;
    }

  }

  exports.default = Builder;
});
unwrapExports(builder$1);

var src = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    Builder: builder$1.default
  };
});
var index = unwrapExports(src);

module.exports = index;
