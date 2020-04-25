'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isobject = _interopDefault(require('isobject'));
var _isFinite = _interopDefault(require('is-finite'));

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var toString = {}.toString;

var isarray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger

var isInteger = Number.isInteger || function (val) {
  return typeof val === "number" && _isFinite(val) && Math.floor(val) === val;
};

var schemaVerify_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopDefault(ex) {
    return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
  }

  var isarray$1 = _interopDefault(isarray);

  var isobject$1 = _interopDefault(isobject);

  var isinteger = _interopDefault(isInteger);

  const isstring = function (v) {
    return typeof v === "string";
  };

  const isnumber = function (v) {
    return typeof v === "number" && !isNaN(v);
  };

  const isfunction = function (v) {
    return typeof v === "function";
  };

  const isnull = function (v) {
    return v === null;
  };

  const isundefined = function (v) {
    return v === undefined;
  };

  const isundefinednull = function (v) {
    return v === undefined || v === null;
  };

  const Type = {
    string: {
      is(v) {
        return isstring(v);
      },

      isNot(v) {
        return !isstring(v);
      },

      isEmpty(v) {
        return isstring(v) && v.length === 0;
      },

      isNotEmpty(v) {
        return isstring(v) && v.length >= 1;
      },

      safe(v) {
        return isstring(v) ? v : isundefinednull(v) ? "" : v + "";
      }

    },
    number: {
      is(v) {
        return isnumber(v);
      },

      isNot(v) {
        return !isnumber(v);
      },

      isInteger(v) {
        return isnumber(v) && isinteger(v);
      },

      isNatural(v) {
        return isnumber(v) && isinteger(v) && v >= 0;
      },

      safe(v) {
        if (isnumber(v)) {
          return v;
        } else if (isundefinednull(v)) {
          return 0;
        } else {
          v = new Number(v).valueOf();

          if (isnumber(v)) {
            return v;
          }
        }

        return 0;
      }

    },
    boolean: {
      is(v) {
        return v === true || v === false;
      },

      isNot(v) {
        return v !== true && v !== false;
      }

    },
    array: {
      is(v) {
        return isarray$1(v);
      },

      isNot(v) {
        return !isarray$1(v);
      },

      isEmpty(v) {
        return isarray$1(v) && v.length === 0;
      },

      isNotEmpty(v) {
        return isarray$1(v) && v.length >= 1;
      },

      safe(v) {
        return isarray$1(v) ? v : [];
      },

      pure(v) {
        if (!isarray$1(v)) {
          return [];
        }

        const t = [];
        v.forEach(item => {
          if (!isundefinednull(item)) {
            t.push(item);
          }
        });
        return t;
      }

    },
    object: {
      is(v) {
        return isobject$1(v);
      },

      isNot(v) {
        return !isobject$1(v);
      },

      isEmpty(v) {
        return isobject$1(v) && Object.keys(v).length === 0;
      },

      isNotEmpty(v) {
        return isobject$1(v) && Object.keys(v).length >= 1;
      },

      safe(v) {
        return isobject$1(v) ? v : {};
      },

      pure(v) {
        if (!isobject$1(v)) {
          return {};
        }

        const t = Object.assign({}, v);
        Object.keys(t).forEach(k => {
          if (isundefinednull(t[k])) {
            delete t[k];
          }
        });
        return t;
      }

    },
    func: {
      is(v) {
        return isfunction(v);
      },

      isNot(v) {
        return !isfunction(v);
      },

      safe(v, context) {
        return function () {
          if (isfunction(v)) {
            context = context || isnull(context) ? context : this;
            return v.apply(context, Array.prototype.slice.apply(arguments));
          }
        };
      }

    },
    undefinedNull: {
      is(v) {
        return isundefinednull(v);
      },

      isNot(v) {
        return !isundefinednull(v);
      }

    },
    nul: {
      is(v) {
        return isnull(v);
      },

      isNot(v) {
        return !isnull(v);
      }

    },
    undefined: {
      is(v) {
        return isundefined(v);
      },

      isNot(v) {
        return !isundefined(v);
      }

    }
  };
  const phoneReg = new RegExp(/^1\d{10}$/);
  const emailReg = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
  const colorReg = new RegExp(/(^#\w{3}$)|(^#\w{6}$)|(^rgb\s*\((\s*\d{1,3}\s*,){2}\s*\d{1,3}\s*\)$)|(^rgba\s*\((\s*\d{1,3}\s*,){3},[01]{1}\.?\d*\s*\)$)/);
  const versionReg = new RegExp(/(^[vV]\d+$)|(^[vV]((\d+\.)+)(\d+)$)/);
  const signReg = new RegExp(/^[a-zA-Z_][a-zA-Z_\d]*$/);
  const numStrReg = new RegExp(/^\d+$/);
  const commonTimeReg = new RegExp(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?/);
  const Pattern = {
    phone: {
      is(v) {
        return Type.string.isNotEmpty(v) && phoneReg.test(v);
      }

    },
    uri: {
      is(v) {
        try {
          return Type.string.isNotEmpty(v) && Type.object.is(new URL(v));
        } catch (e) {
          return false;
        }
      }

    },
    email: {
      is(v) {
        return Type.string.isNotEmpty(v) && emailReg.test(v);
      }

    },
    color: {
      is(v) {
        return Type.string.isNotEmpty(v) && colorReg.test(v);
      }

    },
    version: {
      is(v) {
        return Type.string.isNotEmpty(v) && versionReg.test(v);
      }

    },
    sign: {
      is(v) {
        return Type.string.isNotEmpty(v) && signReg.test(v);
      }

    },
    numStr: {
      is(v) {
        return Type.string.isNotEmpty(v) && numStrReg.test(v);
      }

    },
    jsonStr: {
      is(v) {
        try {
          return Type.string.isNotEmpty(v) && JSON.parse(v);
        } catch (e) {
          return false;
        }
      }

    },
    time: {
      is(v) {
        const timeInfo = new Date(v);
        return Type.object.is(timeInfo) && timeInfo.toString() !== "Invalid Date";
      },

      isCommon(v) {
        return Type.string.isNotEmpty(v) && commonTimeReg.test(v);
      }

    }
  };

  class ErrorHint {
    safeErrorHint(e) {
      return typeof e === "string" ? e : e && e.message ? e.message : "未知";
    }

  }

  class VerifyErrorHint extends ErrorHint {
    constructor() {
      super();
      this.propEmptyHint = "对象缺少属性";
      this.elementEmptyHint = "数组缺少元素";
      this.propErrorHint = this.propErrorHint.bind(this);
      this.elementErrorHint = this.elementErrorHint.bind(this);
    }

    minValueHint(min) {
      return `小于最小值 ${min}`;
    }

    maxValueHint(max) {
      return `大于最大值 ${max}`;
    }

    minLenHint(min) {
      return `小于最小长度 ${min}`;
    }

    maxLenHint(max) {
      return `大于最大长度 ${max}`;
    }

    typeNeedHint(type) {
      return `需要 ${type} 类型`;
    }

    enumHint(value) {
      return `${value} 不是有效值之一`;
    }

    integerHint(value) {
      return `${value} 不是整数`;
    }

    naturalHint(value) {
      return `${value} 不是自然数`;
    }

    matchHint(value) {
      return `${value} 未通过正则规则`;
    }

    patternNeedHint(pattern) {
      return `需要 ${pattern} 格式`;
    }

    propNeedHint(key) {
      return `属性 ${key}: 缺少数据`;
    }

    propRestrictHint(key) {
      return `属性 ${key} 不允许`;
    }

    propErrorHint(key, e) {
      return `属性 ${key}: ${this.safeErrorHint(e)}`;
    }

    elementNeedHint(index) {
      return `第 ${index} 项: 缺少数据`;
    }

    elementErrorHint(index, e) {
      return `第 ${index} 项: ${this.safeErrorHint(e)}`;
    }

    verifyErrorHint(type, customHint, originHint) {
      return `${type ? type + " " : ""}校验不通过, 错误信息：${customHint || originHint || "未知"}`;
    }

  }

  var ErrorMsg = new VerifyErrorHint();
  const TYPES = {
    string: "string",
    number: "number",
    object: "object",
    array: "array",
    function: "function",
    boolean: "boolean",
    null: "null"
  };
  const METHODS = {
    index: "index",
    required: "required",
    type: "type",
    schema: "schema",
    custom: "custom",
    hint: "hint",
    pattern: "pattern",
    length: "length",
    minLength: "minLength",
    maxLength: "maxLength",
    min: "min",
    max: "max",
    enum: "enum",
    match: "match",
    range: "range",
    integer: "integer",
    natural: "natural",
    restrict: "restrict",
    props: "props",
    elements: "elements"
  };
  const COMMON_METHODS = [METHODS.index, METHODS.required, METHODS.type, METHODS.schema, METHODS.custom, METHODS.hint];
  const TYPE_METHODS = {
    string: [METHODS.pattern, METHODS.length, METHODS.enum, METHODS.match, METHODS.minLength, METHODS.maxLength],
    number: [METHODS.range, METHODS.integer, METHODS.natural, METHODS.enum, METHODS.min, METHODS.max],
    object: [METHODS.restrict, METHODS.props],
    array: [METHODS.elements, METHODS.length, METHODS.minLength, METHODS.maxLength],
    function: [],
    boolean: [],
    null: []
  };
  const CHECK_METHODS = COMMON_METHODS.slice(0, COMMON_METHODS.length - 2);

  const typeVerify = (data, claim, hint) => {
    let isPass = false;

    switch (claim) {
      case TYPES.string:
        isPass = Type.string.is(data);
        break;

      case TYPES.number:
        isPass = Type.number.is(data);
        break;

      case TYPES.object:
        isPass = Type.object.is(data);
        break;

      case TYPES.array:
        isPass = Type.array.is(data);
        break;

      case TYPES.function:
        isPass = Type.func.is(data);
        break;

      case TYPES.boolean:
        isPass = Type.boolean.is(data);
        break;

      case TYPES.null:
        isPass = Type.nul.is(data);
        break;
    }

    if (!isPass) {
      throw new Error(ErrorMsg.verifyErrorHint(METHODS.type, hint, ErrorMsg.typeNeedHint(claim)));
    }

    return true;
  };

  const restrictVerify = (data, claim, propsClaims, hint) => {
    if (!claim) {
      return true;
    }

    const dataKeys = Object.keys(data);
    let restrictKeys = [];

    for (const item of propsClaims) {
      if (Type.object.is(item)) {
        restrictKeys.push(item.index);
        continue;
      }

      if (Type.array.is(item)) {
        restrictKeys.push(item[0].index);
        continue;
      }
    }

    restrictKeys = restrictKeys.filter(s => s);

    for (const key of dataKeys) {
      if (!restrictKeys.includes(key)) {
        throw new Error(ErrorMsg.verifyErrorHint(METHODS.restrict, hint, ErrorMsg.propRestrictHint(key)));
      }
    }

    return true;
  };

  const requiredVerify = (data, index, claim, hint) => {
    if (Type.object.is(data) && !data.hasOwnProperty(index) || Type.array.is(data) && Type.undefined.is(data[index])) {
      if (claim) {
        throw new Error(hint);
      } else {
        return true;
      }
    }

    return false;
  };

  const patternVerify = (data, claim, hint) => {
    const isFn = (Pattern[claim] || {}).is;
    const isPass = typeof isFn === "function" && isFn.call(Pattern[claim], data);

    if (!isPass) {
      throw new Error(ErrorMsg.verifyErrorHint(METHODS.pattern, hint, ErrorMsg.patternNeedHint(claim)));
    }

    return true;
  };

  const lengthVerify = (data, claim, hint) => {
    const min = claim.min;
    const max = claim.max;
    const length = data.length;

    if (Type.number.is(min) && length < min) {
      throw new Error(ErrorMsg.verifyErrorHint(METHODS.length, hint, ErrorMsg.minLenHint(min)));
    }

    if (Type.number.is(max) && length > max) {
      throw new Error(ErrorMsg.verifyErrorHint(METHODS.length, hint, ErrorMsg.maxLenHint(max)));
    }

    return true;
  };

  const enumVerify = (data, claim, hint) => {
    if (!claim.includes(data)) {
      throw new Error(ErrorMsg.verifyErrorHint(METHODS.enum, hint, ErrorMsg.enumHint(data)));
    }

    return true;
  };

  const integerVerify = (data, claim, hint) => {
    if (claim && !Type.number.isInteger(data)) {
      throw new Error(ErrorMsg.verifyErrorHint(METHODS.integer, hint, ErrorMsg.integerHint(data)));
    }

    return true;
  };

  const naturalVerify = (data, claim, hint) => {
    if (claim && !Type.number.isNatural(data)) {
      throw new Error(ErrorMsg.verifyErrorHint(METHODS.natural, hint, ErrorMsg.naturalHint(data)));
    }

    return true;
  };

  const matchVerify = (data, claim, hint) => {
    if (Type.string.is(claim)) {
      claim = new RegExp(claim);
    }

    if (!claim.test(data)) {
      throw new Error(ErrorMsg.verifyErrorHint(METHODS.match, hint, ErrorMsg.matchHint(data)));
    }

    return true;
  };

  const rangeVerify = (data, claim, hint) => {
    const min = claim.min;
    const max = claim.max;

    if (Type.number.is(min) && data < min) {
      throw new Error(ErrorMsg.verifyErrorHint(METHODS.range, hint, ErrorMsg.minValueHint(min)));
    }

    if (Type.number.is(max) && data > max) {
      throw new Error(ErrorMsg.verifyErrorHint(METHODS.range, hint, ErrorMsg.maxValueHint(max)));
    }

    return true;
  };

  const elePropVerify = (data, claims, type) => {
    const verifyItem = (itemData, itemClaim, index) => {
      let required;
      let hint;

      if (Type.array.isNotEmpty(itemClaim)) {
        const itemItemClaim = itemClaim[0];
        required = itemItemClaim.required;
        hint = Type.object.safe(itemItemClaim.hint);
      } else {
        required = itemClaim.required;
        hint = Type.object.safe(itemClaim.hint);
      }

      const getHint = type === TYPES.object ? ErrorMsg.propNeedHint : ErrorMsg.elementNeedHint;
      const requiredHint = hint[METHODS.required] || getHint(index);
      const isRequiredPass = requiredVerify(data, index, required, requiredHint);

      if (isRequiredPass) {
        return;
      }

      try {
        verify(itemData, itemClaim, data);
      } catch (e) {
        const getHint = type === TYPES.object ? ErrorMsg.propErrorHint : ErrorMsg.elementErrorHint;
        throw new Error(getHint(index, e));
      }
    };

    const verifyArr = (itemClaim, checkedMap) => {
      let required;
      let hint;

      if (Type.array.isNotEmpty(itemClaim)) {
        const itemItemClaim = itemClaim[0];
        required = itemItemClaim.required;
        hint = Type.object.safe(itemItemClaim.hint);
      } else {
        required = itemClaim.required;
        hint = Type.object.safe(itemClaim.hint);
      }

      const indexArr = type === TYPES.object ? Object.keys(data) : Array.from("a".repeat(data.length)).map((s, i) => i);
      const emptyHint = type === TYPES.object ? ErrorMsg.propEmptyHint : ErrorMsg.elementEmptyHint;

      if (required && indexArr.length <= 0) {
        throw new Error(hint[METHODS.required] || emptyHint);
      }

      for (let index of indexArr) {
        if (!checkedMap[index]) {
          const itemData = data[index];
          verifyItem(itemData, itemClaim, index);
          checkedMap[index] = true;
        }
      }
    };

    const fn = claims => {
      const checkedMap = {};

      for (const itemClaim of claims) {
        let index;

        if (Type.array.isNotEmpty(itemClaim)) {
          const itemItemClaim = itemClaim[0];
          index = itemItemClaim.index;
        } else {
          index = itemClaim.index;
        }

        if (Type.number.isNatural(index) || Type.string.isNotEmpty(index)) {
          const itemData = data[index];
          verifyItem(itemData, itemClaim, index);
          checkedMap[index] = true;
        } else {
          verifyArr(itemClaim, checkedMap);
        }
      }
    };

    try {
      fn(claims);
    } catch (e) {
      throw e;
    }
  };

  const schemaVerify = (data, claim, hint, parent) => {
    try {
      claim.verify(data, true, parent);
    } catch (e) {
      throw new Error(ErrorMsg.verifyErrorHint(METHODS.schema, hint || `${ErrorMsg.safeErrorHint(e)}`));
    }

    return true;
  };

  const customVerify = (data, claim, hint, parent) => {
    try {
      const isPass = Type.func.safe(claim)(data, parent);

      if (!isPass) {
        throw new Error(hint || "未知");
      }
    } catch (e) {
      throw new Error(ErrorMsg.verifyErrorHint(METHODS.custom, `${ErrorMsg.safeErrorHint(e)}`));
    }

    return true;
  };

  const claimsVerify = (data, claims, parent) => {
    const fn = () => {
      const hint = Type.object.safe(claims.hint);
      const type = claims.type;
      const claimMethods = [].concat(CHECK_METHODS, TYPE_METHODS[type]);
      claimMethods.push(METHODS.custom);

      for (const claimKey of claimMethods) {
        if (!claims.hasOwnProperty(claimKey)) {
          continue;
        }

        const claimValue = claims[claimKey];
        const propsClaims = claims.props;
        const claimHint = hint[claimKey];

        switch (claimKey) {
          case METHODS.type:
            typeVerify(data, claimValue, claimHint);
            break;

          case METHODS.restrict:
            restrictVerify(data, claimValue, propsClaims, claimHint);
            break;

          case METHODS.pattern:
            patternVerify(data, claimValue, claimHint);
            break;

          case METHODS.length:
            lengthVerify(data, claimValue, claimHint);
            break;

          case METHODS.enum:
            enumVerify(data, claimValue, claimHint);
            break;

          case METHODS.match:
            matchVerify(data, claimValue, claimHint);
            break;

          case METHODS.range:
            rangeVerify(data, claimValue, claimHint);
            break;

          case METHODS.integer:
            integerVerify(data, claimValue, claimHint);
            break;

          case METHODS.natural:
            naturalVerify(data, claimValue, claimHint);
            break;

          case METHODS.elements:
            elePropVerify(data, claimValue, type);
            break;

          case METHODS.props:
            elePropVerify(data, claimValue, type);
            break;

          case METHODS.schema:
            schemaVerify(data, claimValue, claimHint, parent);
            break;

          case METHODS.custom:
            customVerify(data, claimValue, claimHint, parent);
            break;
        }
      }
    };

    try {
      fn();
    } catch (e) {
      throw e;
    }
  };

  const verify = (data, info, parent) => {
    const fn = claimsInfo => {
      try {
        claimsVerify(data, claimsInfo, parent);
      } catch (e) {
        throw e;
      }
    };

    if (Type.object.is(info)) {
      fn(info);
    }

    if (Type.array.is(info)) {
      const errorMsgs = [];

      for (let i = 0; i < info.length; i++) {
        try {
          fn(info[i]);
          break;
        } catch (e) {
          errorMsgs.push(`schema-${i}: ${ErrorMsg.safeErrorHint(e)}`);
        }
      }

      if (info.length === errorMsgs.length) {
        throw new Error(errorMsgs.join(";"));
      }
    }

    return true;
  };

  class SchemaErrorHint extends ErrorHint {
    constructor() {
      super();
      this.propsInfoEmpty = "属性信息不能为空";
      this.emptyLengthInfo = "空的长度信息";
      this.emptyEnumInfo = "空的枚举信息";
      this.errorEnumInfo = "错误的枚举信息";
      this.emptyHintInfo = "空的提示信息";
      this.emptyRangeInfo = "空的范围信息";
    }

    unIdentifyType(v) {
      return `不可识别的属性类型：${v}`;
    }

    illegalHintInfo(v) {
      return `非法的提示信息属性：${v}`;
    }

    illegalVerifyProps(v) {
      return `非法的校验属性：${v}`;
    }

    illegalPatternType(v) {
      return `非法的格式类型：${v}`;
    }

  }

  var ErrorMsg$1 = new SchemaErrorHint();
  const PATTERNS = Object.keys(Pattern);

  const schemaCheck = function (info) {
    if (Type.object.isNot(info) && !Type.array.isNotEmpty(info)) {
      throw new Error(ErrorMsg$1.propsInfoEmpty);
    }

    if (Type.array.isNotEmpty(info)) {
      const result = [];

      for (let i = 0; i < info.length; i++) {
        result[i] = schemaCheck(info[i]);
      }

      return result;
    }

    if (info instanceof Schema) {
      info = {
        schema: info
      };
    }

    if (info.hasOwnProperty(METHODS.schema)) {
      const schema = info[METHODS.schema];

      if (Type.object.isNot(schema) || !(schema instanceof Schema)) {
        throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.schema));
      }

      const schemaRuleInfo = schema.info;

      for (const method of [METHODS.type, METHODS.required, METHODS.index]) {
        if (!info.hasOwnProperty(method) && schemaRuleInfo.hasOwnProperty(method)) {
          info[method] = schemaRuleInfo[method];
        }
      }
    }

    const result = Object.assign({}, info);
    return typeCheck(result);
  };

  const typeCheck = function (info) {
    const type = info.type;

    switch (type) {
      case TYPES.string:
      case String:
        info = stringCheck(info);
        info.type = TYPES.string;
        break;

      case TYPES.number:
      case Number:
        info = numberCheck(info);
        info.type = TYPES.number;
        break;

      case TYPES.object:
      case Object:
        info = objectCheck(info);
        info.type = TYPES.object;
        break;

      case TYPES.array:
      case Array:
        info = arrayCheck(info);
        info.type = TYPES.array;
        break;

      case TYPES.function:
      case Function:
        info.type = TYPES.function;
        break;

      case TYPES.boolean:
      case Boolean:
        info.type = TYPES.boolean;
        break;

      case TYPES.null:
      case null:
        info.type = TYPES.null;
        break;
    }

    return typeCommonCheck(info);
  };

  const typeCommonCheck = info => {
    const methods = TYPE_METHODS[info.type];

    if (Type.array.isNot(methods)) {
      throw new Error(ErrorMsg$1.unIdentifyType(methods));
    }

    for (const key in info) {
      if (COMMON_METHODS.includes(key) || methods.includes(key)) {
        continue;
      } else {
        throw new Error(ErrorMsg$1.illegalVerifyProps(key));
      }
    }

    if (info.hasOwnProperty(METHODS.hint)) {
      const hint = info[METHODS.hint];

      if (!Type.object.is(hint)) {
        throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.hint));
      }

      for (const key in hint) {
        if (COMMON_METHODS.includes(key) || methods.includes(key)) {
          continue;
        } else {
          throw new Error(ErrorMsg$1.illegalHintInfo(key));
        }
      }
    }

    if (info.hasOwnProperty(METHODS.custom)) {
      const custom = info[METHODS.custom];

      if (Type.func.isNot(custom)) {
        throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.custom));
      }
    }

    if (info.hasOwnProperty(METHODS.index)) {
      const index = info[METHODS.index];

      if (Type.string.isNot(index) && Type.number.isNot(index)) {
        throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.index));
      }
    }

    return info;
  };

  const stringCheck = function (info) {
    if (info.hasOwnProperty(METHODS.pattern)) {
      const pattern = info[METHODS.pattern];

      if (!PATTERNS.includes(pattern)) {
        throw new Error(ErrorMsg$1.illegalPatternType(pattern));
      }
    }

    if (info.hasOwnProperty(METHODS.minLength)) {
      const minLength = info[METHODS.minLength];

      if (Type.number.isNatural(minLength)) {
        let length = info[METHODS.length];
        const minInfo = {
          min: minLength
        };
        info[METHODS.length] = Type.object.is(length) ? Object.assign({}, length, minInfo) : minInfo;
        delete info[METHODS.minLength];
      }
    }

    if (info.hasOwnProperty(METHODS.maxLength)) {
      const maxLength = info[METHODS.maxLength];

      if (Type.number.isNatural(maxLength)) {
        let length = info[METHODS.length];
        const maxInfo = {
          max: maxLength
        };
        info[METHODS.length] = Type.object.is(length) ? Object.assign({}, length, maxInfo) : maxInfo;
        delete info[METHODS.maxLength];
      }
    }

    if (info.hasOwnProperty(METHODS.length)) {
      let length = info[METHODS.length];

      if (!Type.object.isNotEmpty(length) && !Type.number.isNatural(length)) {
        throw new Error(ErrorMsg$1.emptyLengthInfo);
      }

      if (Type.number.isNatural(length)) {
        info[METHODS.length] = {
          min: length,
          max: length
        };
      } else if (Type.object.isNotEmpty(length)) {
        if (!Type.number.isNatural(length.min) && !Type.number.isNatural(length.max)) {
          throw new Error(ErrorMsg$1.emptyLengthInfo);
        }

        Type.number.isNatural(length.min) && (length.min = +length.min);
        Type.number.isNatural(length.max) && (length.max = +length.max);
      }
    }

    if (info.hasOwnProperty(METHODS.enum)) {
      const enumData = info[METHODS.enum];
      let arr;

      if (Type.object.isNotEmpty(enumData)) {
        arr = Object.keys(enumData).map(key => enumData[key]);
      }

      if (Type.array.isNotEmpty(enumData)) {
        arr = enumData;
      }

      if (!Type.array.isNotEmpty(arr)) {
        throw new Error(ErrorMsg$1.emptyEnumInfo);
      }

      const isAllStr = arr.every(s => Type.string.is(s));

      if (!isAllStr) {
        throw new Error(ErrorMsg$1.errorEnumInfo);
      }

      info[METHODS.enum] = arr;
    }

    if (info.hasOwnProperty(METHODS.match)) {
      const match = info[METHODS.match];

      if (!Type.string.isNotEmpty(match) && !(match instanceof RegExp)) {
        throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.match));
      }
    }

    return info;
  };

  const numberCheck = function (info) {
    if (info.hasOwnProperty(METHODS.min)) {
      const min = info[METHODS.min];

      if (Type.number.isNatural(min)) {
        let range = info[METHODS.range];
        const minInfo = {
          min
        };
        info[METHODS.range] = Type.object.is(range) ? Object.assign({}, range, minInfo) : minInfo;
        delete info[METHODS.min];
      }
    }

    if (info.hasOwnProperty(METHODS.max)) {
      const max = info[METHODS.max];

      if (Type.number.isNatural(max)) {
        let range = info[METHODS.range];
        const maxInfo = {
          max
        };
        info[METHODS.range] = Type.object.is(range) ? Object.assign({}, range, maxInfo) : maxInfo;
        delete info[METHODS.max];
      }
    }

    if (info.hasOwnProperty(METHODS.range)) {
      const range = info[METHODS.range];

      if (Type.object.isEmpty(range)) {
        throw new Error(ErrorMsg$1.emptyRangeInfo);
      }

      if (Type.number.isNot(range.min) && Type.number.isNot(range.max)) {
        throw new Error(ErrorMsg$1.emptyRangeInfo);
      }

      range.min = +range.min;
      range.max = +range.max;
    }

    if (info.hasOwnProperty(METHODS.integer)) {
      const integer = info[METHODS.integer];

      if (Type.boolean.isNot(integer)) {
        throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.integer));
      }
    }

    if (info.hasOwnProperty(METHODS.natural)) {
      const natural = info[METHODS.natural];

      if (Type.boolean.isNot(natural)) {
        throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.natural));
      }
    }

    if (info.hasOwnProperty(METHODS.enum)) {
      const enumData = info[METHODS.enum];
      let arr;

      if (Type.object.isNotEmpty(enumData)) {
        arr = Object.keys(enumData).map(key => enumData[key]);
      }

      if (Type.array.isNotEmpty(enumData)) {
        arr = enumData;
      }

      if (!Type.array.isNotEmpty(arr)) {
        throw new Error(ErrorMsg$1.emptyEnumInfo);
      }

      const isAllNum = arr.every(s => Type.number.is(s));

      if (!isAllNum) {
        throw new Error(ErrorMsg$1.errorEnumInfo);
      }

      info[METHODS.enum] = arr;
    }

    return info;
  };

  const objectCheck = function (info) {
    if (info.hasOwnProperty(METHODS.props)) {
      const props = info[METHODS.props];

      if (!Type.object.isNotEmpty(props) && !Type.array.is(props)) {
        throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.props));
      }

      const formatObjProps = (props, info) => {
        if (Type.func.isNot(props[METHODS.type]) && Type.nul.isNot(props[METHODS.type]) && Type.string.isNot(TYPES[props[METHODS.type]]) && !props.hasOwnProperty(METHODS.schema) && !(props instanceof Schema)) {
          props = Object.keys(props).map(key => {
            const item = props[key];

            if (key === "$_PROPS_DEFAULT_INFO") {
              return item;
            }

            if (Type.object.is(item)) {
              item[METHODS.index] = key;
            }

            if (Type.array.is(item) && Type.object.is(item[0])) {
              item[0][METHODS.index] = key;
            }

            return item;
          });
          formatArrProps(props, info);
        } else {
          delete props[METHODS.index];
          info.props = [schemaCheck(props)];
        }
      };

      const formatArrProps = (props, info) => {
        const propMap = props.reduce((map, item) => {
          let index;

          if (Type.object.is(item) && item.hasOwnProperty(METHODS.index)) {
            index = item[METHODS.index];

            if (!Type.string.isNotEmpty(index) && !Type.number.is(index)) {
              throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.index));
            }
          }

          if (Type.array.is(item) && Type.object.is(item[0])) {
            index = item[0][METHODS.index];

            if (!Type.string.isNotEmpty(index)) {
              delete item[0][METHODS.index];
            }
          }

          if (!Type.string.isNotEmpty(index)) {
            index = "$_PROPS_ELEMENTS_DEFAULT_SCHEME_INFO";
          }

          map[index] = schemaCheck(item);
          return map;
        }, {});
        info[METHODS.props] = Object.keys(propMap).map(key => propMap[key]);
      };

      if (Type.object.isNotEmpty(props)) {
        formatObjProps(props, info);
      } else {
        formatArrProps(props, info);
      }
    }

    if (info.hasOwnProperty(METHODS.restrict)) {
      const restrict = info[METHODS.restrict];
      const props = info[METHODS.props];

      if (Type.boolean.isNot(restrict)) {
        throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.restrict));
      }

      if (restrict && Type.array.isNot(props)) {
        throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.props));
      }
    }

    return info;
  };

  const arrayCheck = function (info) {
    if (info.hasOwnProperty(METHODS.elements)) {
      const elements = info[METHODS.elements];

      if (!Type.object.isNotEmpty(elements) && !Type.array.is(elements)) {
        throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.elements));
      }

      if (Type.object.isNotEmpty(elements)) {
        delete elements["index"];
        info.elements = [schemaCheck(elements)];
      } else {
        const elementMap = elements.reduce((map, item) => {
          let index;

          if (Type.object.is(item)) {
            if (item.hasOwnProperty(METHODS.index) && Type.number.isNot(item.index)) {
              throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.index));
            } else {
              index = item.index;
            }
          }

          if (Type.array.is(item) && Type.object.is(item[0])) {
            if (item[0].hasOwnProperty(METHODS.index) && Type.number.isNot(item[0].index)) {
              throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.index));
            } else {
              index = item[0].index;
            }
          }

          if (Type.number.isNot(index)) {
            index = "$_PROPS_ELEMENTS_DEFAULT_SCHEME_INFO";
          }

          map[index] = schemaCheck(item);
          return map;
        }, {});
        info[METHODS.elements] = Object.keys(elementMap).map(key => elementMap[key]);
      }
    }

    if (info.hasOwnProperty(METHODS.minLength)) {
      const minLength = info[METHODS.minLength];

      if (Type.number.isNatural(minLength)) {
        let length = info[METHODS.length];
        const minInfo = {
          min: minLength
        };
        info[METHODS.length] = Type.object.is(length) ? Object.assign({}, length, minInfo) : minInfo;
        delete info[METHODS.minLength];
      }
    }

    if (info.hasOwnProperty(METHODS.maxLength)) {
      const maxLength = info[METHODS.maxLength];

      if (Type.number.isNatural(maxLength)) {
        let length = info[METHODS.length];
        const maxInfo = {
          max: maxLength
        };
        info[METHODS.length] = Type.object.is(length) ? Object.assign({}, length, maxInfo) : maxInfo;
        delete info[METHODS.maxLength];
      }
    }

    if (info.hasOwnProperty(METHODS.length)) {
      let length = info[METHODS.length];

      if (!Type.object.isNotEmpty(length) && !Type.number.isNatural(length)) {
        throw new Error(ErrorMsg$1.emptyLengthInfo);
      }

      if (Type.number.isNatural(length)) {
        info[METHODS.length] = {
          min: length,
          max: length
        };
      } else if (Type.object.isNotEmpty(length)) {
        if (!Type.number.isNatural(length.min) && !Type.number.isNatural(length.max)) {
          throw new Error(ErrorMsg$1.emptyLengthInfo);
        }

        Type.number.isNatural(length.min) && (length.min = +length.min);
        Type.number.isNatural(length.max) && (length.max = +length.max);
      }
    }

    return info;
  };

  class Schema {
    constructor(info) {
      this.info = schemaCheck(info);
      this.verify = this.verify.bind(this);
    }

    verify(data, throwError, parent) {
      try {
        verify(data, this.info, parent);
        return true;
      } catch (e) {
        if (throwError) {
          throw e;
        }

        return false;
      }
    }

  }

  exports.Pattern = Pattern;
  exports.Schema = Schema;
  exports.Type = Type;
  exports.default = Schema;
});
var Schema = unwrapExports(schemaVerify_1);
var schemaVerify_2 = schemaVerify_1.Pattern;
var schemaVerify_3 = schemaVerify_1.Schema;
var schemaVerify_4 = schemaVerify_1.Type;

function analyTmpl(tmpl, opts) {
  return tmpl.replace(/\{\{([a-zA-Z_0-9]+)\}\}/g, function (match, key) {
    if (opts.hasOwnProperty(key) && schemaVerify_4.string.isNotEmpty(opts[key])) {
      return opts[key] + " ";
    } else {
      return "";
    }
  }).trim();
}
function argStrArrTrans(arg, otherArgs) {
  let args = [];

  if (schemaVerify_4.array.is(arg)) {
    args = arg;
  } else {
    otherArgs = schemaVerify_4.array.safe(otherArgs);
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

const ErrMsg$b = {
  tableFieldsError: "错误的表字段名",
  tableFieldsAsMapError: "错误的表字段映射名",
  joinTableInfoError: "错误的联查信息"
};

const ErrMsg$c = Object.assign({}, ErrMsg, ErrMsg$1, ErrMsg$2, ErrMsg$3, ErrMsg$4, ErrMsg$5, ErrMsg$6, ErrMsg$7, ErrMsg$8, ErrMsg$9, ErrMsg$a, ErrMsg$b, {
  errorTableName: "错误的表名，需要非空字符串",
  errorField: "错误的表名，需要非空字符串",
  errorFields: "错误的字段，需要非空字符串或非空字符串数组",
  errorFieldData: "错误的字段数据",
  needStr: "需要字符串",
  needNumStr: "需要数字或者字符串",
  notSupportDialect: "无法支持当前类型数据库",
  errorTermStatus: "未设置条件类型"
});

const DialectsObj = {
  mysql: {
    safeValue(value) {
      let result;

      if (typeof value === "string") {
        value = value.replace(/\'/g, () => "''").replace(/\\/g, () => "\\\\");
        result = `'${value}'`;
      }

      if (schemaVerify_4.number.is(value)) {
        result = `'${value}'`;
      }

      if (!result) {
        throw new Error(ErrMsg$c.needNumStr);
      }

      return result;
    },

    safeKey(key) {
      let result;

      if (!schemaVerify_4.string.isNotEmpty(key)) {
        throw new Error(ErrMsg$c.needStr);
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

      if (schemaVerify_4.number.is(value)) {
        result = `'${value}'`;
      }

      if (!result) {
        throw new Error(ErrMsg$c.needNumStr);
      }

      return result;
    },

    safeKey(key) {
      if (!schemaVerify_4.string.isNotEmpty(key)) {
        throw new Error(ErrMsg$c.needStr);
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

      if (schemaVerify_4.number.is(value)) {
        result = `'${value}'`;
      }

      if (!result) {
        throw new Error(ErrMsg$c.needNumStr);
      }

      return result;
    },

    safeKey(key) {
      let result;

      if (!schemaVerify_4.string.isNotEmpty(key)) {
        throw new Error(ErrMsg$c.needStr);
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

      if (schemaVerify_4.number.is(value)) {
        result = `'${value}'`;
      }

      if (!result) {
        throw new Error(ErrMsg$c.needNumStr);
      }

      return result;
    },

    safeKey(key) {
      let result;

      if (!schemaVerify_4.string.isNotEmpty(key)) {
        throw new Error(ErrMsg$c.needStr);
      }

      result = key.replace(/`/g, "``");
      return "`" + result + "`";
    }

  }
};

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

var JoinTypes;

(function (JoinTypes) {
  JoinTypes["inner"] = "INNER";
  JoinTypes["left"] = "LEFT";
  JoinTypes["right"] = "RIGHT";
})(JoinTypes || (JoinTypes = {}));

var TermTypes;

(function (TermTypes) {
  TermTypes["where"] = "whereTerm";
  TermTypes["having"] = "havingTerm";
})(TermTypes || (TermTypes = {}));

var DialectModules;

(function (DialectModules) {
  DialectModules["mysql"] = "mysql";
  DialectModules["mssql"] = "mssql";
})(DialectModules || (DialectModules = {}));

const fieldDataArrSchema = new Schema({
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

const funcInfoSchema = new Schema({
  type: Object,
  restrict: true,
  props: [{
    index: "funcFeild",
    required: true,
    type: String
  }]
});
const funcInputSchema = new Schema({
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

const dialectSchema = new Schema({
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
const manualSqlSchema = new Schema([{
  type: String,
  minLength: 1
}, {
  type: Function
}, {
  type: Object
}]);
const dialectVerify = dialectSchema.verify;
const manualSqlVerify = manualSqlSchema.verify;

const pageSchema = new Schema({
  type: Number,
  integer: true,
  min: 1
});
const limitInfoSchema = new Schema({
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

const orderInfoSchema = new Schema({
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
const valueListSchema = new Schema({
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

const termDataSchema = new Schema({
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
const termSignSchema = new Schema({
  type: String,
  enum: TermSign
});
const termLogicSchema = new Schema({
  type: String,
  enum: TermLogic
});
const termValueSchema = new Schema([{
  required: true,
  type: String
}, {
  type: Number
}]);
const termInSchema = new Schema({
  type: Array,
  minLength: 1,
  elements: [[{
    type: String,
    required: true
  }, {
    type: Number
  }]]
});
const termBetweenSchema = new Schema({
  type: Array,
  length: 2,
  elements: [[{
    type: String,
    required: true
  }, {
    type: Number
  }]]
});
const termBracketSchema = new Schema({
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
const termInfoSchema = new Schema({
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

const updateInfoSchema = new Schema({
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

const tableFieldSchema = new Schema({
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
const combineKeySchema = new Schema({
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
const tableInfoSchema = new Schema({
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

const alterFieldSchema = new Schema({
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
const alterInfosSchema = new Schema({
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

const fieldsMapSchema = new Schema({
  type: Object,
  props: {
    type: Array,
    elements: {
      type: String,
      required: true,
      minLength: 1
    }
  }
});
const fieldsAsMapSchema = new Schema({
  type: Object,
  props: {
    type: Object,
    props: {
      type: String,
      required: true,
      minLength: 1
    }
  }
});
const joinInfoSchema = new Schema({
  type: Object,
  props: {
    tableName: {
      type: String,
      required: true,
      minLength: 1
    },
    termInfos: {
      type: Array,
      required: true,
      elements: {
        type: Object,
        props: {
          symbol: {
            type: String,
            required: true,
            minLength: 1,
            enum: TermSign
          },
          tableFields: {
            type: Object,
            props: {
              type: String,
              required: true,
              minLength: 1
            }
          }
        }
      }
    }
  }
});
const fieldsMapVerify = fieldsMapSchema.verify;
const fieldsAsMapVerify = fieldsAsMapSchema.verify;
const joinInfoVerify = joinInfoSchema.verify;

const strArrVerify = new Schema({
  type: Array,
  elements: {
    type: String,
    required: true,
    minLength: 1
  }
}).verify;
const strObjVerify = new Schema({
  type: Object,
  props: {
    type: String,
    required: true,
    minLength: 1
  }
}).verify;
const naturalVerify = new Schema({
  type: Number,
  natural: true
}).verify;
const integerVerify = new Schema({
  type: Number,
  integer: true
}).verify;
const fieldDataVerify = new Schema({
  type: Object,
  props: [[{
    required: true,
    type: String
  }, {
    type: Number
  }]]
}).verify;

let QUERY_LIST = [];

class Store {
  getStore() {
    return QUERY_LIST.slice();
  }

  storeSql(query) {
    if (schemaVerify_4.string.isNotEmpty(query)) {
      QUERY_LIST.push(query);
    }
  }

  isStoreEmpty() {
    return !(QUERY_LIST.length > 0);
  }

  cleanStoreSql() {
    QUERY_LIST = [];
  }

}

var Store$1 = new Store();

class Base {
  constructor() {
    this._safeValue = function () {
      return "";
    };

    this._safeKey = function () {
      return "";
    };

    this.safeValue = function (value) {
      const _dialectType = this._dialectType;
      let dbModule;

      switch (_dialectType) {
        case DialectTypes.mysql:
          dbModule = this.loadModule(DialectModules.mysql);
          value = dbModule.escape(value);
          break;

        default:
          value = this._safeValue(value);
          break;
      }

      return value;
    };

    this.safeKey = function (key) {
      return this._safeKey(key);
    };
  }

  get dialectType() {
    const dialectType = this._dialectType;

    if (!dialectVerify(DialectsObj[dialectType])) {
      throw new Error(ErrMsg$c.errorDialect);
    }

    return dialectType;
  }

  set dialectType(dialectType) {
    this.setDialect(dialectType);
  }

  setDialect(dialectType) {
    if (!dialectVerify(DialectsObj[dialectType])) {
      throw new Error(ErrMsg$c.errorDialect);
    }

    const dialect = DialectsObj[dialectType];
    this._dialect = dialect;
    this._dialectType = dialectType;
    this._safeValue = dialect.safeValue;
    this._safeKey = dialect.safeKey;
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

  manualSql(sql, key) {
    if (!manualSqlVerify(sql) && !(sql instanceof Base)) {
      throw new Error(ErrMsg$c.errorManualSql);
    }

    this[key] = sql;
  }

  formatManualSql(key) {
    let sql = this[key];

    if (schemaVerify_4.string.is(sql)) {
      return sql;
    }

    if (schemaVerify_4.func.is(sql)) {
      sql = sql();

      if (schemaVerify_4.string.is(sql)) {
        return sql;
      }
    }

    if (schemaVerify_4.object.isNotEmpty(sql) && sql instanceof Base) {
      sql = sql.query;

      if (schemaVerify_4.string.is(sql)) {
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
    if (!schemaVerify_4.string.isNotEmpty(queryTable)) {
      throw new Error(ErrMsg$c.errorTableName);
    }

    this._queryTable = queryTable;
    return this;
  }

  getQueryTable() {
    const queryTable = this._queryTable;

    if (!schemaVerify_4.string.isNotEmpty(queryTable)) {
      throw new Error(ErrMsg$c.errorTableName);
    }

    return this.safeKey(queryTable);
  }

  storeSql() {
    let sqlStr;

    try {
      sqlStr = this.build();
    } catch (e) {}

    if (schemaVerify_4.string.isNotEmpty(sqlStr)) {
      Store$1.storeSql(sqlStr);
    }

    return this;
  }

  setExecute(execute) {
    this._execute = execute;
  }

  exec(sqlStr) {
    const execute = this._execute;
    const query = schemaVerify_4.string.isNotEmpty(sqlStr) ? sqlStr : this.build();

    if (!schemaVerify_4.string.isNotEmpty(query)) {
      throw new Error(ErrMsg$c.emptySqlQuery);
    }

    if (schemaVerify_4.object.isNot(execute) || schemaVerify_4.func.isNot(execute.exec)) {
      throw new Error(ErrMsg$c.errorExecute);
    }

    return execute.exec(query);
  }

  execAll(queryList) {
    const execute = this._execute;
    queryList = schemaVerify_4.array.isNotEmpty(queryList) ? queryList : Store$1.getStore();

    if (schemaVerify_4.object.isNot(execute) || schemaVerify_4.func.isNot(execute.exec)) {
      throw new Error(ErrMsg$c.errorExecute);
    }

    const promiseArr = [];

    for (let query of queryList) {
      if (!schemaVerify_4.string.isNotEmpty(query)) {
        continue;
      }

      promiseArr.push(execute.exec(query));
    }

    return Promise.all(promiseArr);
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
      throw new Error(ErrMsg$c.errorOffset);
    }

    if (schemaVerify_4.undefined.isNot(step) && !integerVerify(step)) {
      throw new Error(ErrMsg$c.errorStep);
    }

    let limitInfo;

    if (schemaVerify_4.number.is(offset) && schemaVerify_4.number.is(step)) {
      limitInfo = {
        offset,
        step
      };
    }

    if (schemaVerify_4.number.is(offset) && !schemaVerify_4.number.is(step)) {
      limitInfo = {
        offset: 0,
        step: offset
      };
    }

    this.limitInfo = limitInfo;
  }

  offset(offset) {
    if (!integerVerify(offset)) {
      throw new Error(ErrMsg$c.errorOffset);
    }

    this.limitInfo = {
      offset: offset,
      step: -1
    };
  }

  step(step) {
    if (!integerVerify(step)) {
      throw new Error(ErrMsg$c.errorStep);
    }

    this.limitInfo = {
      offset: 0,
      step
    };
  }

  paging(page, size) {
    if (!pageVerify(page)) {
      throw new Error(ErrMsg$c.errorPage);
    }

    if (!naturalVerify(size)) {
      throw new Error(ErrMsg$c.errorSize);
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

    if (schemaVerify_4.string.isNotEmpty(orderSql)) {
      return orderSql;
    }

    const orderInfos = schemaVerify_4.array.safe(this.orderInfos);

    if (!schemaVerify_4.array.isNotEmpty(orderInfos)) {
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

    if (!schemaVerify_4.array.isNotEmpty(ordersArr)) {
      return "";
    }

    ordersArr = Array.from(new Set(ordersArr));
    const ordersStr = ordersArr.join(", ");
    return ordersStr;
  }

  orderBuild(query) {
    const ordersStr = this.build();

    if (schemaVerify_4.string.isNotEmpty(ordersStr)) {
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
    data = schemaVerify_4.object.safe(data);
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
      throw new Error(ErrMsg$c.errorFields);
    }

    fieldOrder = schemaVerify_4.object.safe(fieldOrder);
    const orderInfos = schemaVerify_4.array.safe(this.orderInfos);

    for (const field of fields) {
      const info = {
        field,
        type
      };

      if (type === OrderTypes.field) {
        const list = fieldOrder[field];

        if (!valueListVerify(list)) {
          throw new Error(ErrMsg$c.errorValueList);
        }

        info["list"] = list;
      }

      if (!orderInfoVerify(info)) {
        throw new Error(ErrMsg$c.errorOrderInfo);
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
      throw new Error(ErrMsg$c.errorFieldData);
    }

    const insertData = schemaVerify_4.object.safe(this.insertData);
    this.insertData = Object.assign({}, insertData, data);
    return this;
  }

  fields(arg, ...otherArgs) {
    const args = argStrArrTrans(arg, otherArgs);
    const insertFields = schemaVerify_4.array.safe(this.insertFields);
    const result = [].concat(insertFields, args);
    this.insertFields = Array.from(new Set(result));
    return this;
  }

  multiData(dataArr) {
    if (!fieldDataArrVerify(dataArr)) {
      throw new Error(ErrMsg$c.errorFieldDataArr);
    }

    const insertDataArr = schemaVerify_4.array.safe(this.insertDataArr);
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
      throw new Error(ErrMsg$c.errorFields);
    }

    return fields;
  }

  formatValues(fields) {
    fields = schemaVerify_4.array.safe(fields);
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
        if (schemaVerify_4.object.isNotEmpty(data)) {
          valuesArr.push(valuesStrFormat(data));
        }
      }

      return valuesArr.join(", ");
    };

    if (schemaVerify_4.string.isNotEmpty(valuesSql)) {
      result = valuesSql;
    } else if (fieldDataVerify(insertData)) {
      result = valuesStrFormat(insertData);
    } else if (fieldDataArrVerify(insertDataArr)) {
      result = valuesArrStrFormat(insertDataArr);
    }

    if (!schemaVerify_4.string.isNotEmpty(result)) {
      throw new Error(ErrMsg$c.errorInsertValues);
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

    if (schemaVerify_4.string.isNotEmpty(termSql)) {
      return termSql;
    }

    const termInfos = this.termInfos;
    const termBrackets = this.termBrackets;

    if (!schemaVerify_4.array.isNotEmpty(termInfos)) {
      return "";
    }

    const allTermStr = !schemaVerify_4.array.isNotEmpty(termBrackets) ? this.formatTerms(termInfos) : this.formatTermBrackets(termBrackets, termInfos);
    return allTermStr;
  }

  formatTermSql() {
    return this.formatManualSql(SQL_NAME$2);
  }

  formatTermBrackets(brackets, terms) {
    let allTermStr = "";
    brackets = schemaVerify_4.array.safe(brackets);
    terms = schemaVerify_4.array.safe(terms);
    const bracketsLen = brackets.length;
    const termsLen = terms.length;

    for (let i = 0; i < bracketsLen; i++) {
      const curBracket = brackets[i];
      const perBracket = brackets[i - 1];
      const nextBracket = brackets[i + 1];

      if (!termBracketVerify(curBracket)) {
        throw new Error(ErrMsg$c.errorTermBracket);
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

      if (!schemaVerify_4.string.isNotEmpty(termStr)) {
        continue;
      }

      allTermStr = schemaVerify_4.string.isNotEmpty(allTermStr) ? `${allTermStr} ${termStr}` : termStr;
    }

    return allTermStr;
  }

  formatBracketTerm(needFullBracket, logic, preTerms, nextTerms) {
    preTerms = schemaVerify_4.array.safe(preTerms);
    nextTerms = schemaVerify_4.array.safe(nextTerms);
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
    terms = schemaVerify_4.array.safe(terms);
    let allTermStr = "";

    for (const term of terms) {
      if (!termInfoVerify(term)) {
        throw new Error(ErrMsg$c.errorTermInfo);
      }

      const field = this.safeKey(term.field);
      const value = term.value;
      const sign = term.sign;
      const logic = term.logic;
      const termValue = this.formatTermValue(value, sign);
      const termStr = `${field} ${sign} ${termValue}`;

      if (!schemaVerify_4.string.isNotEmpty(allTermStr)) {
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
        throw new Error(ErrMsg$c.errorTermValue);
      }

      termValue = value.map(item => this.safeValue(item)).join(", ");
      return `( ${termValue} )`;
    }

    if (sign === TermSign.between || sign === TermSign.notBetween) {
      if (!termBetweenVerify(value)) {
        throw new Error(ErrMsg$c.errorTermValue);
      }

      const lower = this.safeValue(value[0]);
      const upper = this.safeValue(value[1]);
      return `${lower} AND ${upper}`;
    }

    if (!termValueVerify(value)) {
      throw new Error(ErrMsg$c.errorTermValue);
    }

    if (sign === TermSign.like || sign === TermSign.notlike) {
      value = `%${value}%`;
    }

    termValue = this.safeValue(value);
    return termValue;
  }

  termCache(data, sign, logic) {
    if (!termDataVerify(data)) {
      throw new Error(ErrMsg$c.errorTermdata);
    }

    if (!termSignVerify(sign)) {
      throw new Error(ErrMsg$c.errorTermSign);
    }

    if (!termLogicVerify(logic)) {
      throw new Error(ErrMsg$c.errorTermLogic);
    }

    const termInfos = schemaVerify_4.array.safe(this.termInfos);
    const termsArr = [];

    for (const field in data) {
      const value = data[field];

      switch (sign) {
        case TermSign.in:
        case TermSign.notIn:
          if (!termInVerify(value)) {
            throw new Error(ErrMsg$c.errorTermValue);
          }

          break;

        case TermSign.between:
        case TermSign.notBetween:
          if (!termBetweenVerify(value)) {
            throw new Error(ErrMsg$c.errorTermValue);
          }

          break;

        default:
          if (!termValueVerify(value)) {
            throw new Error(ErrMsg$c.errorTermValue);
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
    const termInfos = schemaVerify_4.array.safe(this.termInfos);
    const termBrackets = schemaVerify_4.array.safe(this.termBrackets);
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

const TABLE_OPT_VALUES = ["CURRENT_TIMESTAMP"];
const FEILD_TEMPLATE = `{{field}}{{type}}{{unsigned}}{{notNull}}{{default}}{{autoIncrement}}{{onUpdate}}{{comment}}`;
const WHERE_TERM_API = {
  equal: "whereEqual",
  notEqual: "whereNotEqual",
  in: "whereIn",
  notIn: "whereNotIn",
  more: "whereMore",
  less: "whereLess",
  moreEqual: "whereMoreEqual",
  lessEqual: "whereLessEqual",
  like: "whereLike",
  notLike: "whereNotLike",
  between: "whereBetween",
  notBetween: "whereNotBetween",
  orEqual: "whereOrEqual",
  orNotEqual: "whereOrNotEqual",
  orIn: "whereOrIn",
  orNotIn: "whereOrNotIn",
  orMore: "whereOrMore",
  orLess: "whereOrLess",
  orMoreEqual: "whereOrMoreEqual",
  orLessEqual: "whereOrLessEqual",
  orLike: "whereOrLike",
  orNotLike: "whereOrNotLike",
  orBetween: "whereOrBetween",
  orNotBetween: "whereOrNotBetween"
};
const HAVING_TERM_API = {
  equal: "havingEqual",
  notEqual: "havingNotEqual",
  in: "havingIn",
  notIn: "havingNotIn",
  more: "havingMore",
  less: "havingLess",
  moreEqual: "havingMoreEqual",
  lessEqual: "havingLessEqual",
  like: "havingLike",
  notLike: "havingNotLike",
  between: "havingBetween",
  notBetween: "havingNotBetween",
  orEqual: "havingOrEqual",
  orNotEqual: "havingOrNotEqual",
  orIn: "havingOrIn",
  orNotIn: "havingOrNotIn",
  orMore: "havingOrMore",
  orLess: "havingOrLess",
  orMoreEqual: "havingOrMoreEqual",
  orLessEqual: "havingOrLessEqual",
  orLike: "havingOrLike",
  orNotLike: "havingOrNotLike",
  orBetween: "havingOrBetween",
  orNotBetween: "havingOrNotBetween"
};

const TERM_TYPES = Object.values(TermTypes);

class TermApi extends Query {
  constructor() {
    super();

    for (const termApi in WHERE_TERM_API) {
      this[termApi] = function (data) {
        return this.termApiFn(termApi, data);
      };
    }
  }

  termApiFn(termApi, data) {
    const termStatus = this.termStatus;

    if (!TERM_TYPES.includes(termStatus)) {
      throw new Error(ErrMsg$c.errorTermStatus);
    }

    this.getTermCase(termStatus)[termApi](data);
    return this;
  }

  bracket() {
    const termStatus = this.termStatus;

    if (!TERM_TYPES.includes(termStatus)) {
      throw new Error(ErrMsg$c.errorTermStatus);
    }

    this.getTermCase(termStatus).bracket();
    return this;
  }

  orBracket() {
    const termStatus = this.termStatus;

    if (!TERM_TYPES.includes(termStatus)) {
      throw new Error(ErrMsg$c.errorTermStatus);
    }

    this.getTermCase(termStatus).orBracket();
    return this;
  }

  getTermCase(type) {
    let term = this[type];

    if (!term || !(term instanceof Term)) {
      term = new Term();
      term.setDialect(this.dialectType);
      this[type] = term;
    }

    return term;
  }

}

class Where extends TermApi {
  constructor() {
    super();

    for (const termApi in WHERE_TERM_API) {
      const whereTermApi = WHERE_TERM_API[termApi];

      this[whereTermApi] = function (data) {
        return this.whereTermApiFn(termApi, data);
      };
    }
  }

  whereTermApiFn(termApi, data) {
    this.getWhereTermCase()[termApi](data);
    return this;
  }

  whereBracket() {
    this.getWhereTermCase().bracket();
    return this;
  }

  whereOrBracket() {
    this.getWhereTermCase().orBracket();
    return this;
  }

  where(sql) {
    if (schemaVerify_4.undefined.isNot(sql)) {
      const term = this.getWhereTermCase();

      if (schemaVerify_4.func.is(sql)) {
        sql = sql.bind(this, term);
      }

      term.sqlTerm(sql);
    } else {
      this.termStatus = TermTypes.where;
    }

    return this;
  }

  getWhereTermCase() {
    return this.getTermCase(TermTypes.where);
  }

  whereBuild(query) {
    const whereTerm = this.getWhereTermCase();
    const whereSql = whereTerm.termsBuild();

    if (schemaVerify_4.string.isNotEmpty(whereSql)) {
      query = `${query} WHERE ${whereSql}`;
    }

    return query;
  }

}

class Having extends Where {
  constructor() {
    super();

    for (const termApi in HAVING_TERM_API) {
      const havingTermApi = HAVING_TERM_API[termApi];

      this[havingTermApi] = function (data) {
        return this.havingTermApiFn(termApi, data);
      };
    }
  }

  havingTermApiFn(termApi, data) {
    this.getHavingTermCase()[termApi](data);
    return this;
  }

  havingBracket() {
    this.getHavingTermCase().bracket();
    return this;
  }

  havingOrBracket() {
    this.getHavingTermCase().orBracket();
    return this;
  }

  having(sql) {
    if (schemaVerify_4.undefined.isNot(sql)) {
      const term = this.getHavingTermCase();

      if (schemaVerify_4.func.is(sql)) {
        sql = sql.bind(this, term);
      }

      term.sqlTerm(sql);
    } else {
      this.termStatus = TermTypes.having;
    }

    return this;
  }

  getHavingTermCase() {
    return this.getTermCase(TermTypes.having);
  }

  havingBuild(query) {
    const termInstance = this.getHavingTermCase();
    const havingSql = termInstance.termsBuild();

    if (schemaVerify_4.string.isNotEmpty(havingSql)) {
      query = `${query} HAVING ${havingSql}`;
    }

    return query;
  }

}

class Func extends Base {
  funcField(func, field) {
    const needSafeTrans = schemaVerify_4.string.isNotEmpty(field) && field !== "*";
    const fieldStr = needSafeTrans ? field : schemaVerify_4.number.is(field) ? field + "" : "*";
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

    if (!schemaVerify_4.array.isNotEmpty(fields)) {
      return query;
    }

    const fieldsStr = fields.map(field => this.safeKey(field)).join(", ");
    query = `${query} GROUP BY ${fieldsStr}`;
    return query;
  }

  groupBy(...fields) {
    let groupByFields = schemaVerify_4.array.safe(this.groupByFields);

    if (!strArrVerify(fields)) {
      throw new Error(ErrMsg$c.errorFields);
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
    const combineFuncs = schemaVerify_4.array.safe(this.combineFuncs);
    let funcs = [];

    for (const info of combineFuncs) {
      if (!funcInfoVerify(info)) {
        throw new Error(ErrMsg$c.errorFuncInfo);
      }

      const funcFeild = info.funcFeild;
      funcs.push(funcFeild);
    }

    funcs = Array.from(new Set(funcs));
    return funcs;
  }

  funcsCache(funcInfo) {
    const combineFuncs = schemaVerify_4.array.safe(this.combineFuncs);

    if (funcInfoVerify(funcInfo)) {
      combineFuncs.push(funcInfo);
    }

    this.combineFuncs = combineFuncs;
    return this;
  }

  funcFeilds(...funcInfos) {
    for (let info of funcInfos) {
      info = schemaVerify_4.object.safe(info);

      if (funcInfoVerify(info)) {
        this.funcsCache(info);
        continue;
      }

      const funcCase = this.getFuncCase();

      if (funcInputVerify(info)) {
        const func = info.func;
        const field = info.field;

        if (schemaVerify_4.object.is(funcCase) && schemaVerify_4.func.is(funcCase[func])) {
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

class Join extends Combine {
  constructor() {
    super();
  }

  getQueryTables() {
    const queryTables = schemaVerify_4.array.safe(this.queryTables).map(table => {
      return this.safeKey(table);
    }).join(", ");
    return queryTables;
  }

  formatJoinFields() {
    const tableFieldsMap = schemaVerify_4.object.safe(this.tableFieldsMap);
    const tableFieldsAsMap = schemaVerify_4.object.safe(this.tableFieldsAsMap);
    const result = [];

    for (const table in tableFieldsMap) {
      const fields = schemaVerify_4.array.safe(tableFieldsMap[table]);
      const asMap = schemaVerify_4.object.safe(tableFieldsAsMap[table]);
      const safeTable = this.safeKey(table);

      for (const field of fields) {
        if (!schemaVerify_4.string.isNotEmpty(field)) {
          continue;
        }

        const safeField = this.safeKey(field);
        const tableField = `${safeTable}.${safeField}`;

        if (schemaVerify_4.string.isNotEmpty(asMap[field])) {
          const safeAsField = this.safeKey(asMap[field]);
          result.push(`${tableField} AS ${safeAsField}`);
        } else {
          result.push(tableField);
        }
      }
    }

    return result;
  }

  joinBuild(query) {
    const joinTypeInfos = schemaVerify_4.array.safe(this.joinTypeInfos);

    if (!schemaVerify_4.array.isNotEmpty(joinTypeInfos)) {
      return query;
    }

    const joinStrs = [];

    for (const typeInfo of joinTypeInfos) {
      const type = typeInfo.type;
      const info = schemaVerify_4.object.safe(typeInfo.info);
      const tableName = info.tableName;
      const termInfos = schemaVerify_4.array.safe(info.termInfos);
      const termStrs = this.joinTermBuild(termInfos);
      const safeTableName = this.safeKey(tableName);
      let joinInfoStr = `${type} JOIN ${safeTableName}`;

      if (schemaVerify_4.array.isNotEmpty(termStrs)) {
        const allTermStr = termStrs.join(" AND ");
        joinInfoStr += ` ON ${allTermStr}`;
      }

      joinStrs.push(joinInfoStr);
    }

    if (!schemaVerify_4.array.isNotEmpty(joinStrs)) {
      return query;
    }

    const allJoinStr = joinStrs.join(" ");
    query = `${query} ${allJoinStr}`;
    return query;
  }

  joinTermBuild(termInfos) {
    const result = [];

    for (const termInfo of termInfos) {
      const symbol = termInfo.symbol;
      const tableFields = termInfo.tableFields;
      let termStr = "";

      for (const table in tableFields) {
        const field = tableFields[table];
        const safeTable = this.safeKey(table);
        const safeField = this.safeKey(field);

        if (schemaVerify_4.string.isNotEmpty(termStr)) {
          termStr += ` ${symbol} `;
        }

        termStr += `${safeTable}.${safeField}`;
      }

      result.push(`(${termStr})`);
    }

    return result;
  }

  multiTables(arg, ...otherArgs) {
    const queryTables = schemaVerify_4.array.safe(this.queryTables);
    const args = argStrArrTrans(arg, otherArgs);
    const tables = [];

    for (const item of args) {
      if (schemaVerify_4.string.isNotEmpty(item)) {
        tables.push(item);
      }
    }

    this.queryTables = Array.from(new Set(queryTables.concat(tables)));
    return this;
  }

  tableFields(fieldsMap) {
    const tableFieldsMap = schemaVerify_4.object.safe(this.tableFieldsMap);

    if (!fieldsMapVerify(fieldsMap)) {
      throw new Error(ErrMsg$c.tableFieldsError);
    }

    this.tableFieldsMap = Object.assign({}, tableFieldsMap, fieldsMap);
    return this;
  }

  tableAsMap(asMap) {
    const tableFieldsAsMap = schemaVerify_4.object.safe(this.tableFieldsAsMap);

    if (!fieldsAsMapVerify(asMap)) {
      throw new Error(ErrMsg$c.tableFieldsAsMapError);
    }

    this.tableFieldsAsMap = Object.assign({}, tableFieldsAsMap, asMap);
    return this;
  }

  join(joinInfo, type) {
    const joinTypeInfos = schemaVerify_4.array.safe(this.joinTypeInfos);

    if (!joinInfoVerify(joinInfo)) {
      throw new Error(ErrMsg$c.joinTableInfoError);
    }

    const typeInfo = {
      type: type,
      info: joinInfo
    };
    joinTypeInfos.push(typeInfo);
    this.joinTypeInfos = joinTypeInfos;
    return this;
  }

  innerJoin(joinInfo) {
    this.join(joinInfo, JoinTypes.inner);
    return this;
  }

  leftJoin(joinInfo) {
    this.join(joinInfo, JoinTypes.left);
    return this;
  }

  rightJoin(joinInfo) {
    this.join(joinInfo, JoinTypes.right);
    return this;
  }

}

class Select extends Join {
  constructor() {
    super();
    this.selectFields = [];
    this.fieldsAsMap = {};
  }

  formatFields() {
    const fields = schemaVerify_4.array.safe(this.selectFields);
    const asMap = schemaVerify_4.object.safe(this.fieldsAsMap);
    const result = [];

    for (const field of fields) {
      if (!schemaVerify_4.string.isNotEmpty(field)) {
        continue;
      }

      const safeField = field !== "*" ? this.safeKey(field) : "*";

      if (schemaVerify_4.string.isNotEmpty(asMap[field])) {
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
    let joinFields = this.formatJoinFields();
    let funcs = this.formatFuncs();
    let result;

    if (strArrVerify(fields) || strArrVerify(funcs) || strArrVerify(joinFields)) {
      fields = schemaVerify_4.array.safe(fields);
      joinFields = schemaVerify_4.array.safe(joinFields);
      funcs = schemaVerify_4.array.safe(funcs);
      result = [].concat(fields, joinFields, funcs).join(", ");
    } else {
      result = "*";
    }

    return result;
  }

  formatTableStr() {
    const tablesStr = this.getQueryTables();

    if (schemaVerify_4.string.isNotEmpty(tablesStr)) {
      return tablesStr;
    }

    const table = this.getQueryTable();
    return table;
  }

  build() {
    const table = this.formatTableStr();
    const fieldsStr = this.formatFieldStr();
    let query = `${QueryTypes.select} ${fieldsStr} FROM ${table}`;
    query = this.whereBuild(query);
    query = this.groupBuild(query);
    query = this.havingBuild(query);
    query = this.orderBuild(query);
    query = this.limitBuild(query);
    query = this.joinBuild(query);
    return query;
  }

  fields(arg, ...otherArgs) {
    const selectFields = schemaVerify_4.array.safe(this.selectFields);
    const args = argStrArrTrans(arg, otherArgs);
    const fields = [];

    for (const item of args) {
      if (schemaVerify_4.object.isNotEmpty(item)) {
        this.funcFeilds(item);
        continue;
      }

      if (schemaVerify_4.string.isNotEmpty(item)) {
        fields.push(item);
      }
    }

    this.selectFields = Array.from(new Set(selectFields.concat(fields)));

    if (this.selectFields.includes("*")) {
      this.selectFields = ["*"];
    }

    return this;
  }

  asMap(map) {
    const asMap = schemaVerify_4.object.safe(this.fieldsAsMap);

    if (!strObjVerify(map)) {
      throw new Error(ErrMsg$c.errorFieldMap);
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

    if (!schemaVerify_4.object.isNotEmpty(updateInfos)) {
      throw new Error(ErrMsg$c.emptyUpdateInfo);
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

      if (schemaVerify_4.string.isNotEmpty(infoStr)) {
        result.push(infoStr);
      }
    }

    if (!strArrVerify(result)) {
      throw new Error(ErrMsg$c.emptyUpdateInfo);
    }

    return result;
  }

  updateCache(data, type) {
    if (!fieldDataVerify(data)) {
      throw new Error(ErrMsg$c.errorFieldData);
    }

    const updateInfos = schemaVerify_4.object.safe(this.updateInfos);

    for (const field in data) {
      const value = data[field];
      const updateInfo = {
        value,
        type
      };

      if (!updateInfoVerify(updateInfo)) {
        throw new Error(ErrMsg$c.errorUpdateInfo);
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

const TABLE_TEMPLATE = `CREATE TABLE IF NOT EXISTS {{tableName}}( {{feildsStr}}) {{tableOptionsStr}}`;
const TABLE_OPTIONS_TEMPLATE = `{{engine}}{{autoIncrement}}{{defaultCharset}}{{comment}}`;
const DATABASE_TEMPLATE = `CREATE DATABASE {{dbName}}`;

class Create extends Base {
  constructor() {
    super();
  }

  checkDialect() {
    const dialectType = this._dialectType;

    if (dialectType !== DialectTypes.mysql) {
      throw new Error(ErrMsg$c.notSupportDialect);
    }
  }

  info(tableInfo) {
    if (schemaVerify_4.string.isNotEmpty(tableInfo)) {
      this.createTableSqlStr = tableInfo;
    } else if (tableInfoVerify(tableInfo, true)) {
      this.createTableInfo = tableInfo;
    }

    return this;
  }

  dataBase(dbName) {
    if (!schemaVerify_4.string.isNotEmpty(dbName)) {
      throw new Error(ErrMsg$c.errorCreateDbName);
    }

    this.createDbName = dbName;
    return this;
  }

  build() {
    const createDbName = this.createDbName;

    if (schemaVerify_4.string.isNotEmpty(createDbName)) {
      const tmplOpts = {
        dbName: createDbName
      };
      const query = analyTmpl(DATABASE_TEMPLATE, tmplOpts);
      return query;
    }

    const tableSqlStr = this.createTableSqlStr;

    if (schemaVerify_4.string.isNotEmpty(tableSqlStr)) {
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

    if (schemaVerify_4.string.isNotEmpty(primaryKeyStr)) {
      feildTmplArr.push(primaryKeyStr);
    }

    if (schemaVerify_4.string.isNotEmpty(uniqueKeyStr)) {
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

    if (schemaVerify_4.string.is(defaultValue) || schemaVerify_4.number.is(defaultValue)) {
      let needSafe = true;
      let upperValue;

      if (schemaVerify_4.string.is(defaultValue)) {
        upperValue = defaultValue.toUpperCase();
        needSafe = !TABLE_OPT_VALUES.includes(upperValue);
      }

      defaultValue = needSafe ? this.safeValue(defaultValue) : upperValue;
      tmplOpts["default"] = `${TableOptions.default} ${defaultValue}`;
    }

    if (autoIncrement === true) {
      tmplOpts["autoIncrement"] = TableOptions.autoIncrement;
    }

    if (schemaVerify_4.string.isNotEmpty(onUpdate)) {
      tmplOpts["onUpdate"] = `${TableOptions.onUpdate} ${onUpdate}`;
    }

    if (schemaVerify_4.string.isNotEmpty(comment)) {
      comment = this.safeValue(comment);
      tmplOpts["comment"] = `${TableOptions.comment} ${comment}`;
    }

    const feildStr = analyTmpl(FEILD_TEMPLATE, tmplOpts);
    return feildStr;
  }

  primaryKeyStr(keyInfo) {
    let result;
    const primaryKey = TableOptions.primaryKey;

    if (schemaVerify_4.string.isNotEmpty(keyInfo)) {
      const value = this.safeKey(keyInfo);
      result = `${value} ${primaryKey} (${value})`;
    }

    if (schemaVerify_4.object.is(keyInfo)) {
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

    if (schemaVerify_4.string.isNotEmpty(keyInfo)) {
      const value = this.safeKey(keyInfo);
      result = `${value} ${uniqueKey} (${value})`;
    }

    if (schemaVerify_4.object.is(keyInfo)) {
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

    if (schemaVerify_4.string.isNotEmpty(engine)) {
      const key = TableOptions.engine;
      const value = engine;
      tmplOpts["engine"] = `${key}=${value}`;
    }

    if (schemaVerify_4.number.is(autoIncrement)) {
      const key = TableOptions.autoIncrement;
      const value = autoIncrement;
      tmplOpts["autoIncrement"] = `${key}=${value}`;
    }

    if (schemaVerify_4.string.isNotEmpty(defaultCharset)) {
      const key = TableOptions.defaultCharset;
      const value = defaultCharset;
      tmplOpts["defaultCharset"] = `${key}=${value}`;
    }

    if (schemaVerify_4.string.isNotEmpty(comment)) {
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
  constructor() {
    super();
  }

  checkDialect() {
    const dialectType = this._dialectType;

    if (dialectType !== DialectTypes.mysql) {
      throw new Error(ErrMsg$c.notSupportDialect);
    }
  }

  add(field, alterField) {
    if (schemaVerify_4.object.is(field)) {
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
    if (AlterMethods.drop !== method && !schemaVerify_4.object.isNotEmpty(alterField)) {
      throw new Error(ErrMsg$c.errorAlterField);
    }

    const alterInfo = {
      method,
      field,
      alterField
    };

    if (!alterInfosVerify(alterInfo)) {
      throw new Error(ErrMsg$c.errorAlterField);
    }

    const alterInfos = schemaVerify_4.array.safe(this.alterInfos);
    alterInfos.push(alterInfo);
    this.alterInfos = alterInfos;
    return this;
  }

  build() {
    const alterInfos = schemaVerify_4.array.safe(this.alterInfos);
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

    if (!schemaVerify_4.array.isNotEmpty(infosStrArr)) {
      throw new Error(ErrMsg$c.emptyAlterInfos);
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

    if (schemaVerify_4.string.isNotEmpty(field)) {
      tmplOpts["field"] = this.safeKey(field);
    }

    if (schemaVerify_4.string.isNotEmpty(type)) {
      tmplOpts["type"] = type.toUpperCase();
    }

    if (unsigned === true) {
      tmplOpts["unsigned"] = TableOptions.unsigned;
    }

    if (notNull === true) {
      tmplOpts["notNull"] = TableOptions.notNull;
    }

    if (schemaVerify_4.string.is(defaultValue) || schemaVerify_4.number.is(defaultValue)) {
      let needSafe = true;
      let upperValue;

      if (schemaVerify_4.string.is(defaultValue)) {
        upperValue = defaultValue.toUpperCase();
        needSafe = !TABLE_OPT_VALUES.includes(upperValue);
      }

      defaultValue = needSafe ? this.safeValue(defaultValue) : upperValue;
      tmplOpts["default"] = `${TableOptions.default} ${defaultValue}`;
    }

    if (autoIncrement === true) {
      tmplOpts["autoIncrement"] = TableOptions.autoIncrement;
    }

    if (schemaVerify_4.string.isNotEmpty(onUpdate)) {
      tmplOpts["onUpdate"] = `${TableOptions.onUpdate} ${onUpdate}`;
    }

    if (schemaVerify_4.string.isNotEmpty(comment)) {
      comment = this.safeValue(comment);
      tmplOpts["comment"] = `${TableOptions.comment} ${comment}`;
    }

    const feildStr = analyTmpl(FEILD_TEMPLATE, tmplOpts);
    return feildStr;
  }

}

const ErrMsg$d = {
  errorConnectConfig: "错误的连接配置",
  emptyConnectPool: "未连接数据库",
  errorDialectType: "错误的数据库类型",
  errorConnect: "错误的连接"
};

const ErrMsg$e = Object.assign({}, ErrMsg$d);

const conConfigSchema = new Schema({
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
  }, {
    index: "connectTimeout",
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
      throw new Error(ErrMsg$e.errorConnectConfig);
    }

    const host = config.host;
    const user = config.user;
    const password = config.password;
    const port = config.port;
    const database = config.database;
    const connectTimeout = config.connectTimeout;
    let connectionLimit = config.connectionLimit;
    connectionLimit = schemaVerify_4.number.isNatural(connectionLimit) ? connectionLimit : 1;
    let dbConfig = {
      host,
      user,
      password,
      port,
      database,
      connectTimeout,
      connectionLimit
    };
    this.dbConfig = schemaVerify_4.object.pure(dbConfig);
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

    if (schemaVerify_4.object.is(pool) && schemaVerify_4.func.is(pool.getConnection)) {
      return pool;
    }

    const MysqlModule = this.loadModule(DialectModules.mysql);
    pool = MysqlModule.createPool(dbConfig);
    return pool;
  }

  getDbConnect() {
    const pool = this.getPool() || {};

    if (schemaVerify_4.func.isNot(pool.getConnection)) {
      throw new Error(ErrMsg$e.emptyConnectPool);
    }

    return new Promise((relsove, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }

        if (!connection || schemaVerify_4.func.isNot(connection.query) || schemaVerify_4.func.isNot(connection.release)) {
          reject(new Error(ErrMsg$e.errorConnect));
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
  }

  getPool() {
    let pool = this.pool;
    const dbConfig = this.dbConfig;

    if (schemaVerify_4.object.is(pool) && schemaVerify_4.func.is(pool.acquire)) {
      return pool;
    }

    const config = {
      server: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      connectionTimeout: dbConfig.connectTimeout,
      pool: {
        min: 1,
        max: dbConfig.connectionLimit || 1
      }
    };
    const MssqlModule = this.loadModule(DialectModules.mssql);
    pool = new MssqlModule.ConnectionPool(config).connect();
    return pool;
  }

  getDbConnect() {
    let pool = this.getPool() || {};
    return new Promise(async (relsove, reject) => {
      pool = await pool;
      this.pool = pool;
      const request = pool.request();
      const conn = {
        query: function (query, cb) {
          request.query(query, (err, result) => {
            if (err) {
              reject(err);
            }

            cb(err, result);
          });
        },
        release: () => {}
      };
      relsove(conn);
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

    if (schemaVerify_4.undefinedNull.is(connect)) {
      throw new Error(ErrMsg$e.errorDialectType);
    }

    return connect;
  }

  async exec(query) {
    const connect = this.connect || {};

    if (schemaVerify_4.func.isNot(connect.getDbConnect)) {
      throw new Error(ErrMsg$e.emptyConnectPool);
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
    instance = schemaVerify_4.object.safe(instance);
    const dialectType = this.dialectType;
    const execute = this.execute;
    const queryTable = this.queryTable;

    if (schemaVerify_4.string.isNotEmpty(queryTable) && schemaVerify_4.func.is(instance.table)) {
      if (TABLE_QUERY_TYPE.includes(type)) {
        instance.table(queryTable);
      }
    }

    if (schemaVerify_4.func.is(instance.setDialect)) {
      instance.setDialect(dialectType);
    }

    if (schemaVerify_4.func.is(instance.checkDialect)) {
      instance.checkDialect();
    }

    if (schemaVerify_4.func.is(instance.setExecute)) {
      instance.setExecute(execute);
    }

    return instance;
  }

  table(tableName) {
    if (!schemaVerify_4.string.isNotEmpty(tableName)) {
      throw new Error(ErrMsg$c.errorTableName);
    }

    this.queryTable = tableName;
    return this;
  }

  build() {
    throw new Error(ErrMsg$c.emptyQueryType);
  }

  setConnect(config) {
    if (schemaVerify_4.object.isNot(config)) {
      return this;
    }

    config = schemaVerify_4.object.safe(config);
    const execute = new Execute(config);
    this.dialectType = config.dialect || DialectTypes.mysql;
    this.execute = execute;
    return this;
  }

  get query() {
    return this.build();
  }

  getStore() {
    return Store$1.getStore();
  }

  storeSql(query) {
    return Store$1.storeSql(query);
  }

  isStoreEmpty() {
    return Store$1.isStoreEmpty();
  }

  cleanStoreSql() {
    return Store$1.cleanStoreSql();
  }

}

function SqlQuery(config) {
  let dialect;

  if (schemaVerify_4.object.isNot(config)) {
    dialect = DialectTypes.mysql;

    if (schemaVerify_4.string.isNotEmpty(config) && DialectTypes[config]) {
      dialect = config;
    }

    return new Builder(dialect);
  }

  dialect = config.dialect || DialectTypes.mysql;
  config = schemaVerify_4.object.safe(config);
  const execute = new Execute(config);
  const builder = new Builder(dialect, execute);
  return builder;
}

SqlQuery.Builder = Builder;
SqlQuery.Execute = Execute;

module.exports = SqlQuery;
