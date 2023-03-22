'use strict';

var mysql = require('mysql');

var BaseType;
(function (BaseType) {
    BaseType["STRING"] = "string";
    BaseType["NUMBER"] = "number";
    BaseType["BOOLEAN"] = "boolean";
    BaseType["OBJECT"] = "object";
    BaseType["NULL"] = "null";
    BaseType["UNDEFINED"] = "undefined";
    BaseType["ARRAY"] = "array";
    BaseType["UNKNOWN"] = "unknown";
})(BaseType || (BaseType = {}));
var ObjectExtendsType;
(function (ObjectExtendsType) {
    ObjectExtendsType["FUNCTION"] = "function";
    ObjectExtendsType["SET"] = "set";
    ObjectExtendsType["REGEX"] = "regex";
    ObjectExtendsType["MAP"] = "map";
})(ObjectExtendsType || (ObjectExtendsType = {}));
var StringExtendsType;
(function (StringExtendsType) {
    StringExtendsType["JSON"] = "json";
    StringExtendsType["PLAIN"] = "plain";
})(StringExtendsType || (StringExtendsType = {}));
var PlainExtendsType;
(function (PlainExtendsType) {
    PlainExtendsType["BLANK"] = "blank";
    PlainExtendsType["NUMBER"] = "number";
})(PlainExtendsType || (PlainExtendsType = {}));
var JSONExtendsType;
(function (JSONExtendsType) {
    JSONExtendsType["ARRAY"] = "array";
    JSONExtendsType["OBJECT"] = "object";
    JSONExtendsType["BOOLEAN"] = "boolean";
})(JSONExtendsType || (JSONExtendsType = {}));
class TypeOf {
    static getType(value) {
        if (TypeOf.isUndefined(value)) {
            return BaseType.UNDEFINED;
        }
        if (TypeOf.isNull(value)) {
            return BaseType.NULL;
        }
        if (TypeOf.isNumber(value)) {
            return BaseType.NUMBER;
        }
        if (TypeOf.isString(value)) {
            if (TypeOf.isStrNum(value)) {
                return `${BaseType.STRING}.${StringExtendsType.PLAIN}.${PlainExtendsType.NUMBER}`;
            }
            if (TypeOf.isBlankStr(value)) {
                return `${BaseType.STRING}.${StringExtendsType.PLAIN}.${PlainExtendsType.BLANK}`;
            }
            if (TypeOf.isJson(value)) {
                if (TypeOf.isJsonArr(value)) {
                    return `${BaseType.STRING}.${StringExtendsType.JSON}.${JSONExtendsType.ARRAY}`;
                }
                if (TypeOf.isJsonObj(value)) {
                    return `${BaseType.STRING}.${StringExtendsType.JSON}.${JSONExtendsType.OBJECT}`;
                }
                if (TypeOf.isJsonBool(value)) {
                    return `${BaseType.STRING}.${StringExtendsType.JSON}.${JSONExtendsType.BOOLEAN}`;
                }
                return `${BaseType.STRING}.${StringExtendsType.JSON}`;
            }
            return BaseType.STRING;
        }
        if (TypeOf.isBooloon(value)) {
            return BaseType.BOOLEAN;
        }
        if (TypeOf.isArray(value)) {
            return BaseType.ARRAY;
        }
        if (TypeOf.isObject(value)) {
            return BaseType.OBJECT;
        }
        if (TypeOf.isFunction(value)) {
            return `${BaseType.OBJECT}.${ObjectExtendsType.FUNCTION}`;
        }
        if (TypeOf.isSet(value)) {
            return `${BaseType.OBJECT}.${ObjectExtendsType.SET}`;
        }
        if (TypeOf.isMap(value)) {
            return `${BaseType.OBJECT}.${ObjectExtendsType.MAP}`;
        }
        if (TypeOf.isRegx(value)) {
            return `${BaseType.OBJECT}.${ObjectExtendsType.REGEX}`;
        }
        return BaseType.UNKNOWN;
    }
    static isObject(value) {
        return Boolean(value &&
            typeof value === 'object' &&
            Object.prototype.toString.call(value) === '[object Object]');
    }
    static isFunction(value) {
        return Boolean(value &&
            typeof value === 'function' &&
            Object.prototype.toString.call(value) === '[object Function]');
    }
    static isRegx(value) {
        return Boolean(value &&
            typeof value === 'object' &&
            Object.prototype.toString.call(value) === '[object RegExp]');
    }
    static isSet(value) {
        return Boolean(value &&
            typeof value === 'object' &&
            Object.prototype.toString.call(value) === '[object Set]');
    }
    static isMap(value) {
        return Boolean(value &&
            typeof value === 'object' &&
            Object.prototype.toString.call(value) === '[object Map]');
    }
    static isArray(value) {
        return Array.isArray(value);
    }
    static isNumber(value) {
        return typeof value === 'number';
    }
    static isInsOf(value, construct) {
        return Boolean(value instanceof construct);
    }
    static isString(value) {
        return typeof value === 'string';
    }
    static isBooloon(value) {
        return typeof value === 'boolean';
    }
    static isEmptyArr(value) {
        return Boolean(TypeOf.isArray(value) && !value.length);
    }
    static isNotEmptyArr(value, length) {
        if (TypeOf.isNumber(length)) {
            return Boolean(TypeOf.isArray(value) && value.length === length);
        }
        return Boolean(TypeOf.isArray(value) && value.length);
    }
    static isEmptyObj(value) {
        return Boolean(TypeOf.isObject(value) && !Object.keys(value).length);
    }
    static isNotEmptyObj(value) {
        return Boolean(TypeOf.isObject(value) && Object.keys(value).length);
    }
    static isBlankStr(value) {
        return Boolean(TypeOf.isString(value) && !value.length);
    }
    static isNotBlankStr(value) {
        return Boolean(TypeOf.isString(value) && value.length);
    }
    static isNull(value) {
        return value === null;
    }
    static isUndefined(value) {
        return value === undefined;
    }
    static isNotNullOrUndefined(value) {
        return !TypeOf.isNull(value) && !TypeOf.isUndefined(value);
    }
    static isNullOrUndefined(value) {
        return TypeOf.isNull(value) || TypeOf.isUndefined(value);
    }
    static isNotNull(value) {
        return !TypeOf.isNull(value);
    }
    static isNotUndefined(value) {
        return !TypeOf.isUndefined(value);
    }
    static isJson(value) {
        try {
            const res = JSON.parse(value);
            return res;
        }
        catch (error) {
            return false;
        }
    }
    static isJsonArr(value) {
        try {
            const res = JSON.parse(value);
            return TypeOf.isArray(res);
        }
        catch (error) {
            return false;
        }
    }
    static isJsonObj(value) {
        try {
            const res = JSON.parse(value);
            return TypeOf.isObject(res);
        }
        catch (error) {
            return false;
        }
    }
    static isJsonBool(value) {
        try {
            const res = JSON.parse(value);
            return TypeOf.isBooloon(res);
        }
        catch (error) {
            return false;
        }
    }
    static isStrNum(value) {
        return TypeOf.strMatch(value, /^\d+\.?\d*$/);
    }
    static strMatch(value, regexp) {
        const regx = new RegExp(regexp);
        return TypeOf.isString(value) && regx.test(value);
    }
    static objStructMatch(value, keys) {
        if (TypeOf.isNotEmptyObj(value) && TypeOf.isNotEmptyArr(keys)) {
            return keys.every((key) => {
                const regx = /^([a-zA-Z_$]+)\.([a-zA-Z_$.]+)$/;
                if (regx.test(key)) {
                    const left = key.match(regx)[1];
                    const right = key.match(regx)[2];
                    return TypeOf.objStructMatch(value[left], [
                        right,
                    ]);
                }
                return !TypeOf.isUndefined(value[key]);
            });
        }
        return false;
    }
    static objStructTypeMatch(value, template) {
        if (TypeOf.isNotEmptyObj(value) && TypeOf.isNotEmptyObj(template)) {
            // 普通匹配
            for (const key in template) {
                // 类型匹配
                const fnName = template[key];
                // 方法存在
                const matchFN = TypeOf.isFunction(TypeOf[fnName]);
                // 点表示法
                const subRegx = /^([a-zA-Z_$\[\]]+)\.([a-zA-Z_$.\[\]]+)$/;
                if (subRegx.test(key) && matchFN) {
                    const left = key.match(subRegx)[1];
                    const right = key.match(subRegx)[2];
                    // 递归判别
                    const res = TypeOf.objStructTypeMatch(value[left], {
                        [right]: fnName,
                    });
                    if (!res) {
                        return false;
                    }
                    continue;
                }
                // [key]表示法
                const templateRegx = /^\[key\]$/;
                if (templateRegx.test(key) && matchFN) {
                    for (const subKey in value) {
                        const res = TypeOf[fnName](value[subKey]);
                        if (!res) {
                            return false;
                        }
                    }
                    continue;
                }
                if (!TypeOf.isUndefined(value[key]) && matchFN) {
                    const res = TypeOf[fnName](value[key]);
                    if (!res) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }
}
const typeOf = TypeOf;

/**
 * @description 错误类型
 */
var MySQLErrorType;
(function (MySQLErrorType) {
    MySQLErrorType[MySQLErrorType["ARGUMENTS_TYPE_ERROR"] = 0] = "ARGUMENTS_TYPE_ERROR";
    MySQLErrorType[MySQLErrorType["ARGUMENTS_LENGTH_ERROR"] = 1] = "ARGUMENTS_LENGTH_ERROR";
    MySQLErrorType[MySQLErrorType["UNEXPECTED_TOKEN"] = 2] = "UNEXPECTED_TOKEN";
    MySQLErrorType[MySQLErrorType["DATABASE_INIT_ERROR"] = 3] = "DATABASE_INIT_ERROR";
    MySQLErrorType[MySQLErrorType["COLLECTION_INIT_ERROR"] = 4] = "COLLECTION_INIT_ERROR";
    MySQLErrorType[MySQLErrorType["COLLECTION_GET_ERROR"] = 5] = "COLLECTION_GET_ERROR";
    MySQLErrorType[MySQLErrorType["COLLECTION_ADD_ERROR"] = 6] = "COLLECTION_ADD_ERROR";
    MySQLErrorType[MySQLErrorType["COLLECTION_DELETE_ERROR"] = 7] = "COLLECTION_DELETE_ERROR";
    MySQLErrorType[MySQLErrorType["COLLECTION_UPDATE_ERROR"] = 8] = "COLLECTION_UPDATE_ERROR";
    MySQLErrorType[MySQLErrorType["COLLECTION_SET_ERROR"] = 9] = "COLLECTION_SET_ERROR";
    MySQLErrorType[MySQLErrorType["COLLECTION_REMOVE_ERROR"] = 10] = "COLLECTION_REMOVE_ERROR";
    MySQLErrorType[MySQLErrorType["COLLECTION_GETFIELDS_ERROR"] = 11] = "COLLECTION_GETFIELDS_ERROR";
    MySQLErrorType[MySQLErrorType["COLLECTION_PROPERTY_ERROR"] = 12] = "COLLECTION_PROPERTY_ERROR";
    MySQLErrorType[MySQLErrorType["SQLGENERATOR_PROPERTY_ERROR"] = 13] = "SQLGENERATOR_PROPERTY_ERROR";
    MySQLErrorType[MySQLErrorType["AGGREGATE_END_ERROR"] = 14] = "AGGREGATE_END_ERROR";
})(MySQLErrorType || (MySQLErrorType = {}));
class MySQLErrorHandler extends Error {
    static createError(err, cause) {
        if (typeOf.isNumber(err)) {
            if (typeOf.isString(cause)) {
                return new Error(`${MySQLErrorType[err]} [Caused By: ${cause}]`);
            }
            if (typeOf.isInsOf(cause, Error)) {
                return new Error(`${MySQLErrorType[err]} [Caused By: ${cause?.stack}]`);
            }
            return new Error(MySQLErrorType[err]);
        }
        if (typeOf.isString(err)) {
            if (typeOf.isString(cause)) {
                return new Error(`${err} [Caused By: ${cause}]`);
            }
            if (typeOf.isInsOf(cause, Error)) {
                return new Error(`${err} [Caused By: ${cause?.stack}]`);
            }
            return new Error(err);
        }
        return new Error(err, { cause });
    }
}
// 错误处理
const errHandler = MySQLErrorHandler;

/**
 * @description 生成数组
 * @param value
 * @param rest
 * @returns
 */
const valuesToArr = (value, rest, that) => {
    if (typeOf.isNotEmptyArr(value)) {
        // value 为数组
        value = value;
        if (typeOf.isArray(rest)) {
            // rest 为数组
            rest = rest;
            if (that !== undefined) {
                return [that, ...value, ...rest];
            }
            return [...value, ...rest];
        }
        if (typeOf.isNotUndefined(rest)) {
            rest = rest;
            if (that !== undefined) {
                return [that, ...value, rest];
            }
            return [...value, rest];
        }
    }
    if (typeOf.isNotUndefined(value)) {
        // value 为数组
        value = value;
        if (typeOf.isArray(rest)) {
            // rest 为数组
            rest = rest;
            if (that !== undefined) {
                return [that, value, ...rest];
            }
            return [value, ...rest];
        }
        if (typeOf.isNotUndefined(rest)) {
            rest = rest;
            if (that !== undefined) {
                return [that, value, rest];
            }
            return [value, rest];
        }
    }
    throw new Error(`An argument for 'value' was not provided`);
};
/**
 * @description 生成数组
 * @param value
 * @returns
 */
const valueToArr = (value, that) => {
    if (typeOf.isUndefined(value) &&
        typeOf.objStructMatch(that, ['$value', '$type'])) {
        return [that];
    }
    if (typeOf.isNotUndefined(value)) {
        return [value];
    }
    throw new Error(`An argument for 'value' was not provided`);
};
/**
 * @description 合并对象
 * @param target
 * @param source
 */
const objectMerge = (target, source1, source2) => {
    // 属性
    const keys = Object.keys(source1);
    keys.forEach((key) => {
        if (typeOf.isObject(source1[key])) {
            if (typeOf.isObject(target[key])) {
                objectMerge(target[key], source1[key]);
                return;
            }
            target[key] = objectMerge({}, source1[key]);
            return;
        }
        if (typeOf.isArray(source1[key])) {
            if (typeOf.isArray(target[key])) {
                target[key] = [
                    ...target[key],
                    ...source1[key].map((item) => typeOf.isObject(item) ? objectMerge({}, item) : item),
                ];
                return;
            }
            target[key] = [
                ...source1[key].map((item) => typeOf.isObject(item) ? objectMerge({}, item) : item),
            ];
            return;
        }
        target[key] = source1[key];
    });
    if (typeOf.isObject(source2)) {
        return objectMerge(target, source2);
    }
    return target;
};
/**
 * @description 判断键
 * @param value
 */
const isKey = (value) => {
    return typeOf.strMatch(value, /(?<=\$).*/);
};
/**
 * @description 判断键
 * @param value
 */
const isArrayKey = (value) => {
    return typeOf.strMatch(value, /.*\[\d+\]/);
};
/**
 * @description 获取所有键
 * @param value
 */
const getArrayKey = (value) => {
    const key = value.match(/(.*)\[(\d+)\]/);
    if (isArrayKey(key[1])) {
        const keys = getArrayKey(key[1]);
        return [...keys, key[2]];
    }
    return [key[1], key[2]];
};
/**
 * @description 获取所有键
 * @param value
 */
const getAllKey = (value) => {
    const key = value.match(/(?<=\$).*/)[0];
    const allKeys = key.split('.').map((k) => {
        if (isArrayKey(k)) {
            return getArrayKey(k);
        }
        return k;
    });
    return allKeys;
};
/**
 * @description JSON字符串结果转换为对象
 * @param fields
 * @param results
 */
const parseJson = (fields, results) => {
    fields
        .filter((field) => field.type === 245 /* Types.JSON */)
        .forEach((field) => {
        results.forEach((res) => {
            if (typeOf.isJson(res[field.name])) {
                res[field.name] = JSON.parse(res[field.name]);
            }
        });
    });
};
/**
 * @description 对象、数组转化JSON字符串
 * @param fields
 * @param results
 */
const stringfyJson = (data) => {
    for (const key in data) {
        if (data[key] instanceof Object) {
            data[key] = JSON.stringify(data[key]);
        }
    }
    return data;
};
/**
 * @description tinyint(1)结果转布尔
 * @param fields
 * @param results
 */
const tinyToBoolean = (fields, results) => {
    fields
        .filter((field) => field.type === 1 /* Types.TINY */ && field.length === 1)
        .forEach((field) => {
        results.forEach((res) => {
            if (typeOf.isNumber(res[field.name])) {
                res[field.name] = Boolean(res[field.name]);
            }
        });
    });
};

/**
 * @description 简单布尔操作符
 */
var AggregateBooleanSimpleType;
(function (AggregateBooleanSimpleType) {
    /**
     * @description 逻辑操作符 且
     * @param values
     */
    AggregateBooleanSimpleType["AND"] = "and";
    /**
     * @description 逻辑操作符 或
     * @param values
     */
    AggregateBooleanSimpleType["OR"] = "or";
})(AggregateBooleanSimpleType || (AggregateBooleanSimpleType = {}));
/**
 * @description 否定布尔操作符
 */
var AggregateBooleanNegativeType;
(function (AggregateBooleanNegativeType) {
    /**
     * @description 逻辑操作符 非
     * @param values
     */
    AggregateBooleanNegativeType["NOT"] = "!";
    /**
     * @description 逻辑操作符 都不
     * @param values
     */
    AggregateBooleanNegativeType["NOR"] = "!or";
    /**
     * @description 逻辑操作符 都不
     * @param values
     */
    AggregateBooleanNegativeType["NAND"] = "!and";
})(AggregateBooleanNegativeType || (AggregateBooleanNegativeType = {}));
/**
 * @description 简单比较操作
 */
var AggregateCompareSimpleType;
(function (AggregateCompareSimpleType) {
    AggregateCompareSimpleType["CMP"] = "cmp";
    /**
     * @description 比较操作符 等于
     * @param values
     */
    AggregateCompareSimpleType["EQ"] = "=";
    /**
     * @description 比较操作符 不等于
     * @param values
     */
    AggregateCompareSimpleType["NEQ"] = "!=";
    /**
     * @description 比较操作符 小于
     * @param values
     */
    AggregateCompareSimpleType["LT"] = "<";
    /**
     * @description 比较操作符 小于等于
     * @param values
     */
    AggregateCompareSimpleType["LTE"] = "<=";
    /**
     * @description 比较操作符 大于
     * @param values
     */
    AggregateCompareSimpleType["GT"] = ">";
    /**
     * @description 比较操作符 大于等于
     * @param values
     */
    AggregateCompareSimpleType["GTE"] = ">=";
})(AggregateCompareSimpleType || (AggregateCompareSimpleType = {}));
/**
 * @description 筛选比较操作
 */
var AggregateCompareFilterType;
(function (AggregateCompareFilterType) {
    /**
     * @description 比较操作符 在给定的数组内
     * @param values
     */
    AggregateCompareFilterType["IN"] = "in";
    /**
     * @description 比较操作符 不在给定的数组内
     * @param values
     */
    AggregateCompareFilterType["NIN"] = "not in";
})(AggregateCompareFilterType || (AggregateCompareFilterType = {}));
/**
 * @description 简单算数类型
 */
var AggregateCalculationSimpleType;
(function (AggregateCalculationSimpleType) {
    /**
     * @description  加法
     * @param values
     */
    AggregateCalculationSimpleType["ADD"] = "+";
    /**
     * @description 减法
     * @param values
     */
    AggregateCalculationSimpleType["SUBTRACT"] = "-";
    /**
     * @description 乘法
     * @param values
     */
    AggregateCalculationSimpleType["MULTIPLY"] = "*";
    /**
     * @description 除法
     * @param values
     */
    AggregateCalculationSimpleType["DIVIDE"] = "/";
})(AggregateCalculationSimpleType || (AggregateCalculationSimpleType = {}));
/**
 * @description 算数函数类型
 */
var AggregateCalculationFunctionType;
(function (AggregateCalculationFunctionType) {
    /**
     * @description 绝对值
     * @param values
     */
    AggregateCalculationFunctionType["ABS"] = "abs";
    /**
     * @description 向上取整
     * @param values
     */
    AggregateCalculationFunctionType["CEIL"] = "ceil";
    /**
     * @description 取 e（自然对数的底数，欧拉数） 的 n 次方
     * @param values
     */
    AggregateCalculationFunctionType["EXP"] = "exp";
    /**
     * @description 向下取整
     * @param values
     */
    AggregateCalculationFunctionType["FLOOR"] = "floor";
    /**\
     * @description 自然对数值
     */
    AggregateCalculationFunctionType["LN"] = "ln";
    /**
     * @description 对数底为 10 下的 log 值
     * @param values
     */
    AggregateCalculationFunctionType["LOG10"] = "log10";
    /**
     * @description 四舍五入
     * @param values
     */
    AggregateCalculationFunctionType["ROUND"] = "round";
    /**
     * @description 返回参数的符号
     * @param values
     */
    AggregateCalculationFunctionType["SIGN"] = "sign";
    /**
     * @description 正弦值
     * @param values
     */
    AggregateCalculationFunctionType["SIN"] = "sin";
    /**
     * @description 反正弦值
     * @param values
     */
    AggregateCalculationFunctionType["ASIN"] = "asin";
    /**
     * @description 余弦值
     * @param values
     */
    AggregateCalculationFunctionType["COS"] = "cos";
    /**
     * @description 反余弦值
     * @param values
     */
    AggregateCalculationFunctionType["ACOS"] = "acos";
    /**
     * @description 正切值
     * @param values
     */
    AggregateCalculationFunctionType["TAN"] = "tan";
    /**
     * @description 反正切值
     * @param values
     */
    AggregateCalculationFunctionType["ATAN"] = "atan";
    /**
     * @description 余切值
     * @param values
     */
    AggregateCalculationFunctionType["COT"] = "cot";
    /**
     * @description 平方根
     * @param values
     */
    AggregateCalculationFunctionType["SQRT"] = "sqrt";
    /**
     * @description 取模
     * @param values
     */
    AggregateCalculationFunctionType["MOD"] = "mod";
    /**
     * @description 在给定对数底下的 log 值
     * @param values
     */
    AggregateCalculationFunctionType["LOG"] = "log";
    /**
     * @description 指数次幂
     * @param values
     */
    AggregateCalculationFunctionType["POW"] = "pow";
    /**
     * @description  数组中最大值
     * @param values
     */
    AggregateCalculationFunctionType["GREATEST"] = "greatest";
    /**
     * @description 数组中最小值
     * @param values
     */
    AggregateCalculationFunctionType["LEAST"] = "least";
})(AggregateCalculationFunctionType || (AggregateCalculationFunctionType = {}));
/**
 * @description 字符串函数类型
 */
var AggregateStringType;
(function (AggregateStringType) {
    /**
     * @description 去除收尾空格
     * @param values
     */
    AggregateStringType["TRIM"] = "trim";
    /**
     * @description 反转字符串
     * @param values
     */
    AggregateStringType["REVERSE"] = "reverse";
    /**
     * @description 字符串长度
     * @param values
     */
    AggregateStringType["LENGTH"] = "length";
    /**
     * @description 大写字符串
     * @param values
     */
    AggregateStringType["UPPER"] = "upper";
    /**
     * @description 小写字符串
     * @param values
     */
    AggregateStringType["LOWER"] = "lower";
    /**
     * @description 从左侧字截取符串
     * @param values
     */
    AggregateStringType["LEFT"] = "left";
    /**
     * @description 从右侧字截取符串，
     * @param values
     */
    AggregateStringType["RIGHT"] = "right";
    /**
     * @description 从右侧字截取符串
     * @param values
     */
    AggregateStringType["REPLACE"] = "replace";
    /**
     * @description 截取字符串
     * @param values
     */
    AggregateStringType["SUBSTRING"] = "substring";
    /**
     * @description 截取字符串
     * @param values
     */
    AggregateStringType["INSERT"] = "insert";
    /**
     * @description 合并字符串
     * @param values
     */
    AggregateStringType["CONCAT"] = "concat";
})(AggregateStringType || (AggregateStringType = {}));
/**
 * @description 累计器操作符
 */
var AggregateAccumulationType;
(function (AggregateAccumulationType) {
    /**
     * @description 平均数
     * @param values
     */
    AggregateAccumulationType["AVG"] = "avg";
    /**
     * @description
     */
    AggregateAccumulationType["FIRST"] = "first";
    /**
     * @description
     */
    AggregateAccumulationType["LAST"] = "last";
    /**
     * @description 最大值
     * @param values
     */
    AggregateAccumulationType["MAX"] = "max";
    /**
     * @description 最小值
     * @param values
     */
    AggregateAccumulationType["MIN"] = "min";
    /**
     * @description 求和
     * @param values
     */
    AggregateAccumulationType["SUM"] = "sum";
    /**
     * @description 累加
     * @param values
     */
    AggregateAccumulationType["COUNT"] = "count";
})(AggregateAccumulationType || (AggregateAccumulationType = {}));
/**
 * @description 条件操作符
 */
var AggregateConditionType;
(function (AggregateConditionType) {
    /**
     * @description 布尔表达式
     * @param values
     */
    AggregateConditionType["COND"] = "cond";
    /**
     * @description null 替代值
     * @param values
     */
    AggregateConditionType["IFNULL"] = "ifNull";
})(AggregateConditionType || (AggregateConditionType = {}));
/**
 * @description 条件操作符
 */
var AggregateJsonType;
(function (AggregateJsonType) {
    /**
     * @description json 包含
     * @param values
     */
    AggregateJsonType["CONTAINS"] = "json_contains";
    /**
     * @description json 路径包含
     * @param values
     */
    AggregateJsonType["CONTAINS_PATH"] = "json_contains_path";
    /**
     * @description json 查找
     * @param values
     */
    AggregateJsonType["SEARCH"] = "json_search";
    /**
     * @description json 提取路径
     * @param values
     */
    AggregateJsonType["EXTRACT"] = "json_extract";
    /**
     * @description json 合并，保留重复的键
     * @param values
     */
    AggregateJsonType["MERGE_PRESERVE"] = "json_merge_preserve";
    /**
     * @description json 合并，替换重复键的值
     * @param values
     */
    AggregateJsonType["MERGE_PATCH"] = "json_merge_patch";
    /**
     * @description json 设置
     * @param values
     */
    AggregateJsonType["SET"] = "json_set";
    /**
     * @description json 插入
     * @param values
     */
    AggregateJsonType["INSERT"] = "json_insert";
    /**
     * @description json 替换
     * @param values
     */
    AggregateJsonType["REPLACE"] = "json_replace";
    /**
     * @description json 移除
     * @param values
     */
    AggregateJsonType["REMOVE"] = "json_remove";
    /**
     * @description json 向数组尾部追加数据
     * @param values
     */
    AggregateJsonType["ARRAY_APPEND"] = "json_array_append";
    /**
     * @description json 向数组插入数据
     * @param values
     */
    AggregateJsonType["ARRAY_INSERT"] = "json_array_insert";
    /**
     * @description json 对象
     * @param values
     */
    AggregateJsonType["OBJECT"] = "json_object";
    /**
     * @description json 数组
     * @param values
     */
    AggregateJsonType["ARRAY"] = "json_array";
    /**
     * @description json 字段类型
     * @param values
     */
    AggregateJsonType["TYPE"] = "json_type";
    /**
     * @description json 键
     * @param values
     */
    AggregateJsonType["KEYS"] = "json_keys";
    /**
     * @description json 深度
     * @param values
     */
    AggregateJsonType["DEPTH"] = "json_depth";
    /**
     * @description json 长度
     * @param values
     */
    AggregateJsonType["LENGTH"] = "json_length";
    /**
     * @description json 验证
     * @param values
     */
    AggregateJsonType["VALID"] = "json_valid";
    /**
     * @description json 美化
     * @param values
     */
    AggregateJsonType["PRETTY"] = "json_pretty";
    /**
     * @description json 键
     * @param values
     */
    AggregateJsonType["QUOTE"] = "json_quote";
    /**
     * @description json 取消引用
     * @param values
     */
    AggregateJsonType["UNQUOTE"] = "json_unquote";
})(AggregateJsonType || (AggregateJsonType = {}));

class MySQLAggregateCommand {
    $mode = 'aggregate';
    $type = undefined;
    $value = undefined;
    constructor(value, type) {
        this.$value = value;
        this.$type = type;
    }
    and(...values) {
        return new MySQLAggregateCommand(values, AggregateBooleanSimpleType.AND);
    }
    or(...values) {
        return new MySQLAggregateCommand(values, AggregateBooleanSimpleType.OR);
    }
    not(...values) {
        return new MySQLAggregateCommand(values, AggregateBooleanNegativeType.NOT);
    }
    nor(...values) {
        return new MySQLAggregateCommand(values, AggregateBooleanNegativeType.NOR);
    }
    nand(...values) {
        return new MySQLAggregateCommand(values, AggregateBooleanNegativeType.NAND);
    }
    cmp(...values) {
        return new MySQLAggregateCommand(values, AggregateCompareSimpleType.CMP);
    }
    eq(...values) {
        return new MySQLAggregateCommand(values, AggregateCompareSimpleType.EQ);
    }
    neq(...values) {
        return new MySQLAggregateCommand(values, AggregateCompareSimpleType.NEQ);
    }
    lt(...values) {
        return new MySQLAggregateCommand(values, AggregateCompareSimpleType.LT);
    }
    lte(...values) {
        return new MySQLAggregateCommand(values, AggregateCompareSimpleType.LTE);
    }
    gt(...values) {
        return new MySQLAggregateCommand(values, AggregateCompareSimpleType.GT);
    }
    gte(...values) {
        return new MySQLAggregateCommand(values, AggregateCompareSimpleType.GTE);
    }
    in(...values) {
        return new MySQLAggregateCommand(values, AggregateCompareFilterType.IN);
    }
    nin(...values) {
        return new MySQLAggregateCommand(values, AggregateCompareFilterType.NIN);
    }
    abs(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.ABS);
    }
    sqrt(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.SQRT);
    }
    ln(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.LN);
    }
    log10(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.LOG10);
    }
    sin(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.SIN);
    }
    asin(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.ASIN);
    }
    cos(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.COS);
    }
    acos(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.ACOS);
    }
    tan(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.TAN);
    }
    atan(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.ATAN);
    }
    cot(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.COT);
    }
    floor(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.FLOOR);
    }
    round(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.ROUND);
    }
    ceil(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.CEIL);
    }
    exp(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.EXP);
    }
    sign(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.SIGN);
    }
    mod(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.MOD);
    }
    log(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.LOG);
    }
    pow(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.POW);
    }
    greatest(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.GREATEST);
    }
    least(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationFunctionType.LEAST);
    }
    add(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationSimpleType.ADD);
    }
    subtract(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationSimpleType.SUBTRACT);
    }
    multiply(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationSimpleType.MULTIPLY);
    }
    divide(...values) {
        return new MySQLAggregateCommand(values, AggregateCalculationSimpleType.DIVIDE);
    }
    trim(...values) {
        return new MySQLAggregateCommand(values, AggregateStringType.TRIM);
    }
    reverse(...values) {
        return new MySQLAggregateCommand(values, AggregateStringType.REVERSE);
    }
    length(...values) {
        return new MySQLAggregateCommand(values, AggregateStringType.LENGTH);
    }
    upper(...values) {
        return new MySQLAggregateCommand(values, AggregateStringType.UPPER);
    }
    lower(...values) {
        return new MySQLAggregateCommand(values, AggregateStringType.LOWER);
    }
    left(...values) {
        return new MySQLAggregateCommand(values, AggregateStringType.LEFT);
    }
    right(...values) {
        return new MySQLAggregateCommand(values, AggregateStringType.RIGHT);
    }
    replace(...values) {
        return new MySQLAggregateCommand(values, AggregateStringType.REPLACE);
    }
    insert(...values) {
        return new MySQLAggregateCommand(values, AggregateStringType.INSERT);
    }
    substring(...values) {
        return new MySQLAggregateCommand(values, AggregateStringType.SUBSTRING);
    }
    concat(...values) {
        return new MySQLAggregateCommand(values, AggregateStringType.CONCAT);
    }
    avg(...values) {
        return new MySQLAggregateCommand(values, AggregateAccumulationType.AVG);
    }
    max(...values) {
        return new MySQLAggregateCommand(values, AggregateAccumulationType.MAX);
    }
    min(...values) {
        return new MySQLAggregateCommand(values, AggregateAccumulationType.MIN);
    }
    sum(...values) {
        return new MySQLAggregateCommand(values, AggregateAccumulationType.SUM);
    }
    count(...values) {
        return new MySQLAggregateCommand(values, AggregateAccumulationType.COUNT);
    }
    cond(...values) {
        return new MySQLAggregateCommand(values, AggregateConditionType.COND);
    }
    ifnull(...values) {
        return new MySQLAggregateCommand(values, AggregateConditionType.IFNULL);
    }
    json_contains(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.CONTAINS);
    }
    json_contains_path(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.CONTAINS_PATH);
    }
    json_search(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.SEARCH);
    }
    json_extract(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.EXTRACT);
    }
    json_merge_preserve(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.MERGE_PRESERVE);
    }
    json_merge_patch(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.MERGE_PATCH);
    }
    json_set(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.SET);
    }
    json_insert(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.INSERT);
    }
    json_replace(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.REPLACE);
    }
    json_remove(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.REMOVE);
    }
    json_array_append(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.ARRAY_APPEND);
    }
    json_array_insert(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.ARRAY_INSERT);
    }
    json_object(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.OBJECT);
    }
    json_array(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.ARRAY);
    }
    json_type(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.TYPE);
    }
    json_keys(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.KEYS);
    }
    json_depth(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.DEPTH);
    }
    json_length(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.LENGTH);
    }
    json_valid(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.VALID);
    }
    json_pretty(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.PRETTY);
    }
    json_quote(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.QUOTE);
    }
    json_unquote(...values) {
        return new MySQLAggregateCommand(values, AggregateJsonType.UNQUOTE);
    }
}
const $ = new MySQLAggregateCommand();

/**
 * @description 无类型
 */
var CommandNoneType;
(function (CommandNoneType) {
    /**
     * @description 无类型
     */
    CommandNoneType["NONE"] = "none";
})(CommandNoneType || (CommandNoneType = {}));
/**
 * @description 逻辑操作符
 */
var CommandLogicSimpleType;
(function (CommandLogicSimpleType) {
    /**
     * @description 逻辑操作符 且
     */
    CommandLogicSimpleType["AND"] = "and";
    /**
     * @description 逻辑操作符 或
     */
    CommandLogicSimpleType["OR"] = "or";
    /**
     * @description 逻辑操作符 非
     */
})(CommandLogicSimpleType || (CommandLogicSimpleType = {}));
/**
 * @description 否定逻辑操作符
 */
var CommandLogicNegativeType;
(function (CommandLogicNegativeType) {
    /**
     * @description 逻辑操作符 非
     */
    CommandLogicNegativeType["NOT"] = "!";
    /**
     * @description 逻辑操作符 都不
     */
    CommandLogicNegativeType["NOR"] = "!or";
    /**
     * @description 逻辑操作符 都不
     */
    CommandLogicNegativeType["NAND"] = "!and";
})(CommandLogicNegativeType || (CommandLogicNegativeType = {}));
/**
 * @description 简单比较操作
 */
var CommandCompareSimpleType;
(function (CommandCompareSimpleType) {
    /**
     * @description 比较操作符 等于
     */
    CommandCompareSimpleType["EQ"] = "=";
    /**
     * @description 比较操作符 不等于
     */
    CommandCompareSimpleType["NEQ"] = "!=";
    /**
     * @description 比较操作符 小于
     */
    CommandCompareSimpleType["LT"] = "<";
    /**
     * @description 比较操作符 小于等于
     */
    CommandCompareSimpleType["LTE"] = "<=";
    /**
     * @description 比较操作符 大于
     */
    CommandCompareSimpleType["GT"] = ">";
    /**
     * @description 比较操作符 大于等于
     */
    CommandCompareSimpleType["GTE"] = ">=";
})(CommandCompareSimpleType || (CommandCompareSimpleType = {}));
/**
 * @description 筛选比较操作
 */
var CommandCompareFilterType;
(function (CommandCompareFilterType) {
    /**
     * @description 比较操作符 在给定的数组内
     */
    CommandCompareFilterType["IN"] = "in";
    /**
     * @description 比较操作符 不在给定的数组内
     */
    CommandCompareFilterType["NIN"] = "not in";
})(CommandCompareFilterType || (CommandCompareFilterType = {}));

/**
 * @description aggregate clip 片段
 */
class MySQLAggregateCommandClip {
    and(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return args.join(` ${symbol} `);
    }
    or(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return args.join(` ${symbol} `);
    }
    not(aggregate) {
        // 值
        const { $value: rawArgs } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `not(${args[0]})`;
    }
    nor(aggregate) {
        // 值
        const { $value: rawArgs } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `not(${args.join(` or `)})`;
    }
    nand(aggregate) {
        // 值
        const { $value: rawArgs } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `not(${args.join(` and `)})`;
    }
    cmp(aggregate) {
        // 值
        const { $value: rawArgs } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `if(${args[0]} > ${args[1]}, 1, if(${args[0]} = ${args[1]}, 0, -1))`;
    }
    eq(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        // null
        if (args[0] === 'null') {
            return `${args[0]} is ${args[1]}`;
        }
        return `(${args[0]} ${symbol} ${args[1]})`;
    }
    neq(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        // null
        if (args[0] === 'null') {
            return `${args[0]} is not ${args[1]}`;
        }
        return `(${args[0]} ${symbol} ${args[1]})`;
    }
    lt(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `(${args[0]} ${symbol} ${args[1]})`;
    }
    lte(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `(${args[0]} ${symbol} ${args[1]})`;
    }
    gt(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `(${args[0]} ${symbol} ${args[1]})`;
    }
    gte(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `(${args[0]} ${symbol} ${args[1]})`;
    }
    in(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        const field = sqlClip.aggrValueClip(rawArgs[0]);
        // 参数
        const args = rawArgs[1].map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${field} ${symbol} (${args.join(', ')})`;
    }
    nin(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        const field = sqlClip.aggrValueClip(rawArgs[0]);
        // 参数
        const args = rawArgs[1].map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${field} ${symbol} (${args.join(', ')})`;
    }
    abs(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    sqrt(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    ln(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    log10(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    sin(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    asin(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    cos(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    acos(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    tan(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    atan(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    cot(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    floor(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    round(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    ceil(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    exp(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    sign(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    mod(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]}, ${args[1]})`;
    }
    log(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]}, ${args[1]})`;
    }
    pow(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]}, ${args[1]})`;
    }
    greatest(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args.join(', ')})`;
    }
    least(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args.join(', ')})`;
    }
    add(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `(${args.join(symbol)})`;
    }
    subtract(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `(${args.join(symbol)})`;
    }
    multiply(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `(${args.join(symbol)})`;
    }
    divide(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `(${args.join(symbol)})`;
    }
    length(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    reverse(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    trim(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    upper(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    lower(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    left(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]}, ${args[1]})`;
    }
    right(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]}, ${args[1]})`;
    }
    replace(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]}, ${args[1]}, ${args[2]})`;
    }
    substring(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]}, ${args[1]}, ${args[2]})`;
    }
    insert(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`;
    }
    concat(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args.join(', ')})`;
    }
    avg(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    max(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    min(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    sum(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    count(aggregate) {
        // 值
        const { $value: rawArgs, $type: symbol } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `${symbol}(${args[0]})`;
    }
    cond(aggregate) {
        // 值
        const { $value: rawArgs } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `if(${args[0]}, ${args[1]}, ${args[2]})`;
    }
    ifnull(aggregate) {
        // 值
        const { $value: rawArgs } = aggregate;
        // 参数
        const args = rawArgs.map((rawArg) => sqlClip.aggrValueClip(rawArg));
        return `ifnull(${args[0]}, ${args[1]})`;
    }
    json_contains(aggregate) {
        return '';
    }
    json_contains_path(aggregate) {
        return '';
    }
    json_search(aggregate) {
        return '';
    }
    json_extract(aggregate) {
        return '';
    }
    json_merge_preserve(aggregate) {
        return '';
    }
    json_merge_patch(aggregate) {
        return '';
    }
    json_set(aggregate) {
        return '';
    }
    json_insert(aggregate) {
        return '';
    }
    json_replace(aggregate) {
        return '';
    }
    json_remove(aggregate) {
        return '';
    }
    json_array_append(aggregate) {
        const { $value: rawArgs } = aggregate;
        const jsonArr = sqlClip.aggrJsonValueClip(rawArgs[0]);
        const appendVal = sqlClip.aggrJsonValueClip(rawArgs[1]);
        return `${AggregateJsonType.ARRAY_APPEND}(${jsonArr}, '$', ${appendVal})`;
    }
    json_array_insert(aggregate) {
        return '';
    }
    json_object(aggregate) {
        const { $value: rawArgs } = aggregate;
        return sqlClip.aggrJsonValueClip(rawArgs[0]);
    }
    json_array(aggregate) {
        const { $value: rawArgs } = aggregate;
        return sqlClip.aggrJsonValueClip(rawArgs[0]);
    }
    json_type(aggregate) {
        const { $value: rawArgs } = aggregate;
        return sqlClip.aggrJsonValueClip(rawArgs[0]);
    }
    json_keys(aggregate) {
        return '';
    }
    json_depth(aggregate) {
        return '';
    }
    json_length(aggregate) {
        return '';
    }
    json_valid(aggregate) {
        return '';
    }
    json_pretty(aggregate) {
        return '';
    }
    json_quote(aggregate) {
        return '';
    }
    json_unquote(aggregate) {
        return '';
    }
}
const sqlAggregateCommandClip = new MySQLAggregateCommandClip();

/**
 * @description sql片段
 */
class MySQLClip {
    aggrValueClip(value) {
        // AggregateCommand 类型
        if (typeOf.objStructMatch(value, ['$value', '$type'])) {
            return this.aggrControllerClip(value);
        }
        // 字符键表达式
        if (isKey(value)) {
            const key = this.keyClip(value);
            return key;
        }
        // number、string、boolean 类型
        if (typeOf.isNumber(value) ||
            typeOf.isString(value) ||
            typeOf.isBooloon(value)) {
            return mysql.escape(value);
        }
        // null 类型
        if (typeOf.isNull(value)) {
            return 'null';
        }
        // object、 array 类型
        if (typeOf.isArray(value) || typeOf.isObject(value)) {
            return `cast(${mysql.escape(JSON.stringify(value))} as json)`;
        }
        return '';
    }
    aggrJsonValueClip(value) {
        // AggregateCommand 类型
        if (typeOf.objStructMatch(value, ['$value', '$type'])) {
            return this.aggrControllerClip(value);
        }
        // 字符键表达式
        if (isKey(value)) {
            const key = this.keyClip(value);
            return key;
        }
        // number、string、boolean 类型
        if (typeOf.isNumber(value) ||
            typeOf.isString(value) ||
            typeOf.isBooloon(value)) {
            return mysql.escape(value);
        }
        // null 类型
        if (typeOf.isNull(value)) {
            return 'null';
        }
        //  array 类型
        if (typeOf.isArray(value)) {
            return `${AggregateJsonType.ARRAY}(${value
                .map((item) => {
                return this.aggrValueClip(item);
            })
                .join(', ')})`;
        }
        // object 类型
        if (typeOf.isObject(value)) {
            const obj = value;
            const keys = Object.keys(obj);
            return `${AggregateJsonType.OBJECT}(${keys
                .map((key) => {
                const value = obj[key];
                return `${mysql.escape(key)}, ${this.aggrValueClip(value)}`;
            })
                .join(',')})`;
        }
        return '';
    }
    aggrJsonClip(aggregate) {
        // 类型 值
        const { $type, $value } = aggregate;
        if (!$type) {
            // 报错：ARGUMENTS_TYPE_ERROR
            throw errHandler.createError(MySQLErrorType.ARGUMENTS_TYPE_ERROR, `aggregateCommand.type don't exist`);
        }
        // 原始参数
        const rawArgs = $value;
        // 参数过少
        if (!typeOf.isNotEmptyArr(rawArgs)) {
            // 报错：ARGUMENTS_LENGTH_ERROR
            throw errHandler.createError(MySQLErrorType.ARGUMENTS_LENGTH_ERROR, `Expected 1 arguments, but got 0`);
        }
        // 对象
        if ($type === AggregateJsonType.OBJECT) {
            return sqlAggregateCommandClip.json_object(aggregate);
        }
        // 数组
        if ($type === AggregateJsonType.ARRAY) {
            return sqlAggregateCommandClip.json_array(aggregate);
        }
        // 数组追加
        if ($type === AggregateJsonType.ARRAY_APPEND) {
            return sqlAggregateCommandClip.json_array_append(aggregate);
        }
        if ($type === AggregateJsonType.CONTAINS ||
            $type === AggregateJsonType.CONTAINS_PATH) {
            // 参数过少
            if (rawArgs.length < 1) {
                // 报错：ARGUMENTS_LENGTH_ERROR
                throw errHandler.createError(MySQLErrorType.ARGUMENTS_LENGTH_ERROR, `Expected 1 arguments, but got ${rawArgs.length}`);
            }
            return `${rawArgs[0]}`;
        }
        return '';
    }
    aggrControllerClip(aggregate) {
        // 类型 模式
        const { $type, $mode } = aggregate;
        if (typeOf.objStructMatch(aggregate, ['$value', '$type']) &&
            $mode === 'aggregate') {
            // 布尔操作符
            if ($type === AggregateBooleanSimpleType.AND) {
                return sqlAggregateCommandClip.and(aggregate);
            }
            if ($type === AggregateBooleanSimpleType.OR) {
                return sqlAggregateCommandClip.or(aggregate);
            }
            if ($type === AggregateBooleanNegativeType.NOT) {
                return sqlAggregateCommandClip.not(aggregate);
            }
            if ($type === AggregateBooleanNegativeType.NAND) {
                return sqlAggregateCommandClip.nand(aggregate);
            }
            if ($type === AggregateBooleanNegativeType.NOR) {
                return sqlAggregateCommandClip.nor(aggregate);
            }
            // 比较操作符
            if ($type === AggregateCompareSimpleType.CMP) {
                return sqlAggregateCommandClip.cmp(aggregate);
            }
            if ($type === AggregateCompareSimpleType.EQ) {
                return sqlAggregateCommandClip.eq(aggregate);
            }
            if ($type === AggregateCompareSimpleType.NEQ) {
                return sqlAggregateCommandClip.neq(aggregate);
            }
            if ($type === AggregateCompareSimpleType.LT) {
                return sqlAggregateCommandClip.lt(aggregate);
            }
            if ($type === AggregateCompareSimpleType.LTE) {
                return sqlAggregateCommandClip.lte(aggregate);
            }
            if ($type === AggregateCompareSimpleType.GT) {
                return sqlAggregateCommandClip.gt(aggregate);
            }
            if ($type === AggregateCompareSimpleType.GTE) {
                return sqlAggregateCommandClip.gte(aggregate);
            }
            if ($type === AggregateCompareFilterType.IN) {
                return sqlAggregateCommandClip.in(aggregate);
            }
            if ($type === AggregateCompareFilterType.NIN) {
                return sqlAggregateCommandClip.nin(aggregate);
            }
            // 计算操作符
            if ($type === AggregateCalculationFunctionType.ABS) {
                return sqlAggregateCommandClip.abs(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.CEIL) {
                return sqlAggregateCommandClip.ceil(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.FLOOR) {
                return sqlAggregateCommandClip.floor(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.ROUND) {
                return sqlAggregateCommandClip.round(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.LN) {
                return sqlAggregateCommandClip.ln(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.LOG10) {
                return sqlAggregateCommandClip.log10(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.SIN) {
                return sqlAggregateCommandClip.sin(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.ASIN) {
                return sqlAggregateCommandClip.asin(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.COS) {
                return sqlAggregateCommandClip.cos(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.ACOS) {
                return sqlAggregateCommandClip.acos(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.TAN) {
                return sqlAggregateCommandClip.tan(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.ATAN) {
                return sqlAggregateCommandClip.atan(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.COT) {
                return sqlAggregateCommandClip.cot(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.SQRT) {
                return sqlAggregateCommandClip.sqrt(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.EXP) {
                return sqlAggregateCommandClip.exp(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.SIGN) {
                return sqlAggregateCommandClip.sign(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.LOG) {
                return sqlAggregateCommandClip.log(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.MOD) {
                return sqlAggregateCommandClip.mod(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.POW) {
                return sqlAggregateCommandClip.pow(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.GREATEST) {
                return sqlAggregateCommandClip.greatest(aggregate);
            }
            if ($type === AggregateCalculationFunctionType.LEAST) {
                return sqlAggregateCommandClip.least(aggregate);
            }
            if ($type === AggregateCalculationSimpleType.ADD) {
                return sqlAggregateCommandClip.add(aggregate);
            }
            if ($type === AggregateCalculationSimpleType.SUBTRACT) {
                return sqlAggregateCommandClip.subtract(aggregate);
            }
            if ($type === AggregateCalculationSimpleType.MULTIPLY) {
                return sqlAggregateCommandClip.multiply(aggregate);
            }
            if ($type === AggregateCalculationSimpleType.DIVIDE) {
                return sqlAggregateCommandClip.divide(aggregate);
            }
            // 字符串操作
            if ($type === AggregateStringType.LENGTH) {
                return sqlAggregateCommandClip.length(aggregate);
            }
            if ($type === AggregateStringType.REVERSE) {
                return sqlAggregateCommandClip.reverse(aggregate);
            }
            if ($type === AggregateStringType.TRIM) {
                return sqlAggregateCommandClip.trim(aggregate);
            }
            if ($type === AggregateStringType.LOWER) {
                return sqlAggregateCommandClip.lower(aggregate);
            }
            if ($type === AggregateStringType.UPPER) {
                return sqlAggregateCommandClip.upper(aggregate);
            }
            if ($type === AggregateStringType.LEFT) {
                return sqlAggregateCommandClip.left(aggregate);
            }
            if ($type === AggregateStringType.RIGHT) {
                return sqlAggregateCommandClip.right(aggregate);
            }
            if ($type === AggregateStringType.REPLACE) {
                return sqlAggregateCommandClip.replace(aggregate);
            }
            if ($type === AggregateStringType.SUBSTRING) {
                return sqlAggregateCommandClip.substring(aggregate);
            }
            if ($type === AggregateStringType.INSERT) {
                return sqlAggregateCommandClip.insert(aggregate);
            }
            if ($type === AggregateStringType.CONCAT) {
                return sqlAggregateCommandClip.concat(aggregate);
            }
            // 累加操作符
            if ($type === AggregateAccumulationType.AVG) {
                return sqlAggregateCommandClip.avg(aggregate);
            }
            if ($type === AggregateAccumulationType.MAX) {
                return sqlAggregateCommandClip.max(aggregate);
            }
            if ($type === AggregateAccumulationType.MIN) {
                return sqlAggregateCommandClip.min(aggregate);
            }
            if ($type === AggregateAccumulationType.SUM) {
                return sqlAggregateCommandClip.sum(aggregate);
            }
            if ($type === AggregateAccumulationType.COUNT) {
                return sqlAggregateCommandClip.count(aggregate);
            }
            // 条件操作符
            if ($type === AggregateConditionType.COND) {
                return sqlAggregateCommandClip.cond(aggregate);
            }
            if ($type === AggregateConditionType.IFNULL) {
                return sqlAggregateCommandClip.ifnull(aggregate);
            }
            // json 操作
            if ($type === AggregateJsonType.OBJECT) {
                return sqlAggregateCommandClip.json_object(aggregate);
            }
            if ($type === AggregateJsonType.ARRAY) {
                return sqlAggregateCommandClip.json_array(aggregate);
            }
            if ($type === AggregateJsonType.ARRAY_APPEND) {
                return sqlAggregateCommandClip.json_array_append(aggregate);
            }
        }
        return '';
    }
    cmdValueClip(key, value) {
        // Command 类型
        if (typeOf.objStructMatch(value, ['$value', '$type'])) {
            return this.cmdControllerClip(key, value);
        }
        // 字符键表达式
        if (isKey(value)) {
            const key = this.keyClip(value);
            return key;
        }
        // number、string、boolean 类型
        if (typeOf.isNumber(value) ||
            typeOf.isString(value) ||
            typeOf.isBooloon(value)) {
            return `${mysql.escape(value)}`;
        }
        // null 类型
        if (typeOf.isNull(value)) {
            return 'null';
        }
        // object、array 类型
        if (typeOf.isObject(value) || typeOf.isArray(value)) {
            return `cast(${mysql.escape(JSON.stringify(value))} as json)`;
        }
        return '';
    }
    cmdCompareClip(key, command) {
        // 类型 值
        const { $type, $value } = command;
        // 数组
        if (typeOf.isNotEmptyArr($value)) {
            // 片段
            const clip = [];
            // 原始参数
            const rawArgs = $value;
            // 预处理参数
            rawArgs.forEach((rawArg) => {
                const arg = this.cmdValueClip(key, rawArg);
                clip.push(arg);
            });
            // 字段
            const fieldKey = this.keyClip(key);
            // 简单比较操作符
            if (clip[0] === 'null' && $type === CommandCompareSimpleType.EQ) {
                return `${fieldKey} is ${clip[0]}`;
            }
            if (clip[0] === 'null' && $type === CommandCompareSimpleType.NEQ) {
                return `${fieldKey} is not ${clip[0]}`;
            }
            if ($type === CommandCompareSimpleType.EQ ||
                $type === CommandCompareSimpleType.NEQ ||
                $type === CommandCompareSimpleType.LT ||
                $type === CommandCompareSimpleType.LTE ||
                $type === CommandCompareSimpleType.GT ||
                $type === CommandCompareSimpleType.GTE) {
                return `${fieldKey} ${$type} ${clip[0]}`;
            }
            // 筛选比较操作符
            if (AggregateCompareFilterType.IN || AggregateCompareFilterType.NIN) {
                return `${fieldKey} ${$type} (${clip.join(', ')})`;
            }
        }
        return '';
    }
    cmdLogicClip(key, command) {
        // 类型 值 模式
        const { $type, $value } = command;
        // 片段
        const clip = [];
        // 非空数组
        if (typeOf.isNotEmptyArr($value)) {
            // 原始参数
            const rawArgs = $value;
            // 预处理参数
            rawArgs.forEach((rawArg) => {
                const arg = this.cmdValueClip(key, rawArg);
                clip.push(arg);
            });
            // 简单逻辑操作符
            if ($type === CommandLogicSimpleType.AND ||
                $type === CommandLogicSimpleType.OR) {
                return clip.join(` ${$type} `);
            }
            // 否定逻辑操作
            if ($type === CommandLogicNegativeType.NOT) {
                return `not (${clip[0]})`;
            }
            if ($type === CommandLogicNegativeType.NOR) {
                return `not (${clip.join(` or `)})`;
            }
            if ($type === CommandLogicNegativeType.NAND) {
                return `not (${clip.join(` and `)})`;
            }
        }
        return '';
    }
    cmdControllerClip(key, command) {
        // 类型 值 模式
        const { $type } = command;
        if (typeOf.objStructMatch(command, ['$value', '$type'])) {
            // 逻辑操作符
            const logic = [
                ...Object.values(CommandLogicSimpleType),
                ...Object.values(CommandLogicNegativeType),
            ];
            if (logic.includes($type)) {
                return `${this.cmdLogicClip(key, command)}`;
            }
            // 比较操作符
            const compare = [
                ...Object.values(CommandCompareSimpleType),
                ...Object.values(CommandCompareFilterType),
            ];
            if (compare.includes($type)) {
                return `${this.cmdCompareClip(key, command)}`;
            }
        }
        return '';
    }
    nameClip(name) {
        if (typeOf.isNotBlankStr(name)) {
            // string
            return ` ${mysql.escapeId(name)} `;
        }
        if (typeOf.isNotEmptyObj(name)) {
            // keys
            const nameKeys = Object.keys(name);
            return nameKeys
                .map((key) => ` ${mysql.escapeId(key)} as ${mysql.escapeId(name[key])} `)
                .join(', ');
        }
        return '';
    }
    fieldsClip(fields, newfields, group) {
        // 字段片段
        const fieldsClip = [];
        if (group) {
            // 分组键
            const groupKeys = group.map((field) => this.keyClip(field));
            // 旧字段
            if (typeOf.isNotEmptyArr(fields)) {
                // 新字段
                if (typeOf.isNotEmptyObj(newfields)) {
                    // 去除重复
                    fields
                        .filter((field) => !typeOf.isNotUndefined(newfields[field]) &&
                        typeOf.isNotUndefined(field))
                        .forEach((field) => {
                        const fieldKey = this.keyClip(field);
                        if (groupKeys.includes(fieldKey)) {
                            fieldsClip.push(fieldKey);
                        }
                    });
                }
                else {
                    fields
                        .filter((field) => typeOf.isNotUndefined(field) && groupKeys.includes(field))
                        .forEach((field) => {
                        const fieldKey = this.keyClip(field);
                        if (groupKeys.includes(fieldKey)) {
                            fieldsClip.push(fieldKey);
                        }
                    });
                }
            }
            // 新字段
            if (typeOf.isNotEmptyObj(newfields)) {
                // 新字段片段
                const newfieldsClip = this.newfieldsClip(newfields);
                fieldsClip.push(newfieldsClip);
            }
        }
        else {
            // 旧字段
            if (typeOf.isNotEmptyArr(fields)) {
                if (typeOf.isNotEmptyObj(newfields)) {
                    // 去除重复
                    fields
                        .filter((field) => !typeOf.isNotUndefined(newfields[field]) &&
                        typeOf.isNotUndefined(field))
                        .forEach((field) => fieldsClip.push(this.keyClip(field)));
                }
                else {
                    fields
                        .filter((field) => typeOf.isNotUndefined(field))
                        .forEach((field) => fieldsClip.push(this.keyClip(field)));
                }
            }
            // 新字段
            if (typeOf.isNotEmptyObj(newfields)) {
                const newfieldsClip = this.newfieldsClip(newfields);
                fieldsClip.push(newfieldsClip);
            }
        }
        return typeOf.isNotEmptyArr(fieldsClip)
            ? ` ${fieldsClip.join(', ')} `
            : ' * ';
    }
    newfieldsClip(newfields) {
        // 字段片段
        let newfieldsClip = [];
        if (typeOf.isNotEmptyObj(newfields)) {
            // 字段数组
            const fieldKeys = Object.keys(newfields);
            fieldKeys.forEach((fieldKey) => {
                const { $mode } = newfields[fieldKey];
                // 聚合命令操作
                if (typeOf.objStructMatch(newfields[fieldKey], ['$value', '$type']) &&
                    $mode === 'aggregate') {
                    const aggregate = newfields[fieldKey];
                    const asKey = this.keyClip(fieldKey);
                    newfieldsClip.push(`${this.aggrControllerClip(aggregate)} as ${asKey}`);
                    return;
                }
                // 聚合键
                if (typeOf.isNotBlankStr(newfields[fieldKey]) &&
                    isKey(newfields[fieldKey])) {
                    const oldAsKey = this.keyClip(newfields[fieldKey]);
                    const asKey = this.keyClip(fieldKey);
                    if (asKey !== oldAsKey) {
                        newfieldsClip.push(`${oldAsKey} as ${asKey}`);
                        return;
                    }
                    newfieldsClip.push(`${oldAsKey}`);
                    return;
                }
                // number, string, boolean, null
                if (typeOf.isNumber(newfields[fieldKey]) ||
                    typeOf.isString(newfields[fieldKey]) ||
                    typeOf.isBooloon(newfields[fieldKey]) ||
                    typeOf.isNull(newfields[fieldKey])) {
                    const asKey = this.keyClip(fieldKey);
                    const oldAsKey = mysql.escape(newfields[fieldKey]);
                    if (asKey !== oldAsKey) {
                        newfieldsClip.push(`${oldAsKey} as ${asKey}`);
                        return;
                    }
                    newfieldsClip.push(`${oldAsKey}`);
                    return;
                }
                // 报错：ARGUMENTS_TYPE_ERROR
                throw errHandler.createError(MySQLErrorType.ARGUMENTS_TYPE_ERROR, 'In newfieldsClip, a argument type must be number, string, boolean, null, AggregateCommand, or AggregateKey');
            });
        }
        return newfieldsClip.join(', ');
    }
    fieldFilterClip(filter) {
        // 过滤行
        const filterColumnClip = [];
        if (typeOf.isNotEmptyObj(filter)) {
            // 前缀
            filterColumnClip.push(' and ');
            // 字段数组
            const filterKeys = Object.keys(filter);
            filterColumnClip.push(filterKeys
                .map((key) => filter[key]
                ? `column_name = ${mysql.escape(key)}`
                : `column_name != ${mysql.escape(key)}`)
                .join(' and '));
        }
        return filterColumnClip.join('');
    }
    likeClip(key, value) {
        // 字段
        const fieldKey = this.keyClip(key);
        // flags
        const options = value.$options.split('');
        if (options.includes('i')) {
            return `${fieldKey} like ${mysql.escape(value.$like)}`;
        }
        return `binary ${fieldKey} like ${mysql.escape(value.$like)}`;
    }
    regexClip(key, value) {
        // 正则
        let regex = null;
        // 正则表达式
        if (typeOf.isRegx(value)) {
            const { flags, source } = value;
            regex = { $regex: source, $options: flags };
        }
        // SQLRegex 正则表达式
        if (typeOf.objStructMatch(value, ['$regex', '$options'])) {
            regex = value;
        }
        if (regex) {
            // 字段
            const fieldKey = this.keyClip(key);
            if (typeOf.objStructMatch(regex, ['$regex', '$options'])) {
                // SQLRegex
                const { $options, $regex } = regex;
                // 大小写
                if ($options.includes('i')) {
                    // 单行
                    if (!$options.includes('m')) {
                        return `${fieldKey} regexp "^${mysql.escape($regex).replace(/^'(.*)'$/, '$1')}[^(\\n)]*$"`;
                    }
                    return `${fieldKey} regexp ${mysql.escape($regex)}`;
                }
                // 多行
                if ($options.includes('m')) {
                    return `binary ${fieldKey} regexp ${mysql.escape($regex)}`;
                }
                return `binary ${fieldKey} regexp "^${mysql.escape($regex).replace(/^'(.*)'$/, '$1')}[^(\n)]*$"`;
            }
        }
        return '';
    }
    keyClip(key) {
        // 是否是键
        if (isKey(key)) {
            // 获取子键
            const keys = getAllKey(key);
            if (keys.length !== 1 || typeOf.isNotEmptyArr(keys[0])) {
                // 获取字段
                const [field, ...subFields] = keys;
                const subKeys = subFields.map((subField) => {
                    if (typeOf.isNotEmptyArr(subField)) {
                        const [arrayField, ...indexs] = subField;
                        const indexField = indexs.map((index) => `[${index}]`).join('');
                        return `${arrayField}${indexField}`;
                    }
                    return subField;
                });
                if (typeOf.isNotEmptyArr(field)) {
                    const [arrayField, ...indexs] = field;
                    const indexField = indexs.map((index) => `[${index}]`).join('');
                    return `${mysql.escapeId(arrayField)}->${mysql.escape(`$${[indexField, ...subKeys].join('.')}`)}`;
                }
                return `${mysql.escapeId(field)}->${mysql.escape(`$.${subKeys.join('.')}`)}`;
            }
            return mysql.escapeId(keys[0]);
        }
        return mysql.escapeId(key);
    }
    whereClip(where) {
        // where
        const whereClip = [];
        if (typeOf.isNotEmptyObj(where)) {
            // 前缀
            whereClip.push(' where ');
            // 字段数组
            const fieldKeys = Object.keys(where);
            whereClip.push(fieldKeys
                .map((key) => {
                // SQLLike 模糊查询
                if (typeOf.objStructMatch(where[key], ['$like', '$options'])) {
                    return this.likeClip(key, where[key]);
                }
                // 标准正则、SQLRegex 正则表达式
                if (typeOf.objStructMatch(where[key], ['$regex', '$options']) ||
                    typeOf.isRegx(where[key])) {
                    return this.regexClip(key, where[key]);
                }
                // Command 命令
                if (typeOf.objStructMatch(where[key], ['$value', '$type'])) {
                    // 命令操作
                    const newWhere = where[key];
                    const { $mode } = newWhere;
                    if ($mode === 'command') {
                        return this.cmdControllerClip(key, newWhere);
                    }
                }
                // 字段
                const fieldKey = this.keyClip(key);
                // 对象、数组
                if (typeOf.isObject(where[key]) || typeOf.isArray(where[key])) {
                    return `${fieldKey} = cast(${mysql.escape(JSON.stringify(where[key]))} as json)`;
                }
                // null
                if (typeOf.isNull(where[key])) {
                    return `binary ${fieldKey} is null`;
                }
                // number, string, boolean
                if (typeOf.isNumber(where[key]) ||
                    typeOf.isString(where[key]) ||
                    typeOf.isBooloon(where[key])) {
                    return `binary ${fieldKey} = ${mysql.escape(where[key])}`;
                }
                // 报错：ARGUMENTS_TYPE_ERROR
                throw errHandler.createError(MySQLErrorType.ARGUMENTS_TYPE_ERROR, 'In whereClip, a argument type must be number, string, boolean, null, RegExp, Command, SQLLike or SQLRegex');
            })
                .join(' and '));
        }
        return whereClip.join('');
    }
    groupByClip(groupBy) {
        // 分组
        const groupByClip = [];
        if (typeOf.isNotEmptyArr(groupBy)) {
            // 前缀
            groupByClip.push(' group by ');
            // 排序数组
            groupByClip.push(groupBy.map((groupByKey) => this.keyClip(groupByKey)).join(', '));
        }
        return groupByClip.join('');
    }
    havingClip(where) {
        // having
        const havingClip = [];
        if (typeOf.isNotEmptyObj(where)) {
            // 前缀
            havingClip.push(' having ');
            // 字段数组
            const fieldKeys = Object.keys(where);
            havingClip.push(fieldKeys
                .map((key) => {
                // 字段
                const fieldKey = this.keyClip(key);
                // SQLLike 模糊查询
                if (typeOf.objStructMatch(where[key], ['$like', '$options'])) {
                    const newWhere = where[key];
                    const options = newWhere.$options.split('');
                    if (options.includes('i')) {
                        return `${fieldKey} like ${mysql.escape(newWhere.$like)}`;
                    }
                    return `binary ${fieldKey} like ${mysql.escape(newWhere.$like)}`;
                }
                // SQLRegex 正则表达式
                if (typeOf.objStructMatch(where[key], ['$regex', '$options'])) {
                    const newWhere = where[key];
                    const options = newWhere.$options.split('');
                    if (options.includes('i')) {
                        return `${fieldKey} regexp ${mysql.escape(newWhere.$regex)}`;
                    }
                    return `binary ${fieldKey} regexp ${mysql.escape(newWhere.$regex)}`;
                }
                // Command 命令
                if (typeOf.objStructMatch(where[key], ['$value', '$type'])) {
                    // 命令操作
                    const newWhere = where[key];
                    const { $mode } = newWhere;
                    if ($mode === 'command') {
                        return this.cmdControllerClip(key, newWhere);
                    }
                }
                // null
                if (typeOf.isNull(where[key])) {
                    return `binary ${fieldKey} is null`;
                }
                // number, string, boolean
                if (typeOf.isNumber(where[key]) ||
                    typeOf.isString(where[key]) ||
                    typeOf.isBooloon(where[key])) {
                    return `binary ${fieldKey} = ${mysql.escape(where[key])}`;
                }
                // 报错：ARGUMENTS_TYPE_ERROR
                throw errHandler.createError(MySQLErrorType.ARGUMENTS_TYPE_ERROR, 'In havingClip, a argument type must be number, string, boolean, null, RegExp, Command, SQLLike or SQLRegex');
            })
                .join(' and '));
        }
        return havingClip.join('');
    }
    orderByClip(orderBy) {
        // 排序
        const orderByClip = [];
        if (typeOf.isNotEmptyObj(orderBy)) {
            // 前缀
            orderByClip.push(' order by ');
            // 排序数组
            const orderByKeys = Object.keys(orderBy);
            orderByClip.push(orderByKeys
                .map((key) => {
                // 随机排序
                if (key.toLowerCase() === 'rand()') {
                    return `rand()`;
                }
                // 字段
                const fieldKey = this.keyClip(key);
                const orders = ['asc', 'desc', ''];
                if (typeOf.isString(orderBy[key]) &&
                    orders.includes(orderBy[key])) {
                    return `${fieldKey} ${orderBy[key]}`;
                }
                // 报错：ARGUMENTS_TYPE_ERROR
                throw errHandler.createError(MySQLErrorType.ARGUMENTS_TYPE_ERROR, `In OrderBy, 'order' value type must be 'asc', 'desc' or ''`);
            })
                .join(', '));
        }
        return orderByClip.join('');
    }
    limitClip(limit, skip) {
        // 限制记录条数
        const limitClip = [];
        if (typeOf.isNumber(limit)) {
            // 前缀
            limitClip.push(' limit ');
            if (typeOf.isNumber(skip)) {
                limitClip.push(`${skip}, ${limit}`);
            }
            else {
                limitClip.push(`${limit}`);
            }
        }
        if (typeOf.isNumber(skip) && !typeOf.isNumber(limit)) {
            // 报错：UNEXPECTED_TOKEN
            throw errHandler.createError(MySQLErrorType.UNEXPECTED_TOKEN, `'skip' must be used with 'limit'`);
        }
        return limitClip.join('');
    }
    recordClip(record) {
        // 限制记录条数
        const recordClip = [];
        if (typeOf.isNotEmptyObj(record)) {
            // 前缀
            recordClip.push(' set ');
            const recordKeys = Object.keys(record);
            recordClip.push(recordKeys
                .map((key) => {
                // 字段
                const fieldKey = this.keyClip(key);
                if (typeOf.isNotUndefined(record[key])) {
                    if (typeOf.isObject(record[key]) || typeOf.isArray(record[key])) {
                        return `${fieldKey} = ${mysql.escape(JSON.stringify(record[key]))}`;
                    }
                    return `${fieldKey} = ${mysql.escape(record[key])}`;
                }
            })
                .join(', '));
        }
        return recordClip.join('');
    }
}
const sqlClip = new MySQLClip();

/**
 * @description 所有 sql 类型
 */
var SQLTypes;
(function (SQLTypes) {
    SQLTypes[SQLTypes["SELECT"] = 0] = "SELECT";
    SQLTypes[SQLTypes["INSERT"] = 1] = "INSERT";
    SQLTypes[SQLTypes["UPDATE"] = 2] = "UPDATE";
    SQLTypes[SQLTypes["DELETE"] = 3] = "DELETE";
})(SQLTypes || (SQLTypes = {}));

/**
 * @description MySQL 选择 sql 语句生成器
 */
class MySQLSelectGenerator {
    $type = SQLTypes.SELECT;
    $fields;
    $newfields;
    $name;
    $where;
    $groupby;
    $orderby;
    $having;
    $limit;
    $skip;
    $child;
    constructor(config) {
        // 获取配置
        const { $fields, $newfields, $name, $where, $orderby, $groupby, $having, $limit, $skip, $child, } = config || {};
        // 属性赋值
        (typeOf.isNotBlankStr($name) || typeOf.isNotEmptyObj($name)) &&
            this.set('name', $name);
        typeOf.isNotEmptyArr($fields) && this.set('fields', $fields);
        typeOf.isNotEmptyObj($newfields) && this.set('newfields', $newfields);
        typeOf.isNotEmptyObj($where) && this.set('where', $where);
        typeOf.isNotEmptyObj($orderby) && this.set('orderby', $orderby);
        typeOf.isNotEmptyObj($groupby) && this.set('groupby', $groupby);
        typeOf.isNotEmptyObj($having) && this.set('having', $having);
        typeOf.isNumber($limit) && this.set('limit', $limit);
        typeOf.isNumber($skip) && this.set('skip', $skip);
        typeOf.isNotEmptyObj($child) && this.set('child', $child);
    }
    get(clipName) {
        return this[`$${clipName}`];
    }
    set(clipName, value) {
        // 类型匹配
        // fields
        if (clipName === 'fields') {
            if (typeOf.isNotEmptyArr(value)) {
                this.$fields = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLSelectGenerator', property 'fields' type must be 'SQLFields'!`);
        }
        // newfields
        if (clipName === 'newfields') {
            if (typeOf.isNotEmptyObj(value)) {
                this.$newfields = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLSelectGenerator', property 'newfields' type must be 'SQLNewFields'!`);
        }
        // name
        if (clipName === 'name') {
            if (typeOf.isNotBlankStr(value)) {
                this.$name = value;
                return this;
            }
            if (typeOf.isNotEmptyObj(value)) {
                this.$name = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLSelectGenerator', property 'name' type must be string or 'SQLAlias'!`);
        }
        // where
        if (clipName === 'where') {
            if (typeOf.isNotEmptyObj(value)) {
                // 初始化
                this.$where = {};
                for (const key in value) {
                    this.$where[key] = value[key];
                }
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLSelectGenerator', property 'where' type must be 'SQLWhere'!`);
        }
        // groupby
        if (clipName === 'groupby') {
            if (typeOf.isNotEmptyArr(value)) {
                this.$groupby = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLSelectGenerator', property 'groupby' type must be 'SQLGroupBy'!`);
        }
        // having
        if (clipName === 'having') {
            if (typeOf.isNotEmptyObj(value)) {
                this.$having = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLSelectGenerator', property 'having' type must be 'SQLName'!`);
        }
        // orderby
        if (clipName === 'orderby') {
            if (typeOf.isNotEmptyObj(value)) {
                this.$orderby = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLSelectGenerator', property 'orderby' type must be 'SQLOrderBy'!`);
        }
        // limit
        if (clipName === 'limit' || clipName === 'skip') {
            if (typeOf.isNumber(value)) {
                this.$limit = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLSelectGenerator', property 'limit' type must be number!`);
        }
        // skip
        if (clipName === 'skip') {
            if (typeOf.isNumber(value)) {
                this.$skip = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLSelectGenerator', property 'skip' type must be number!`);
        }
        // child
        if (clipName === 'child') {
            if (typeOf.isNotEmptyObj(value)) {
                this.$child = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLSelectGenerator', property 'child' type must be 'SelectGenerator'!`);
        }
        return this;
    }
    exists(clipName) {
        // name
        if (clipName == 'name') {
            return (typeOf.isNotBlankStr(this[`$${clipName}`]) ||
                typeOf.isNotEmptyObj(this[`$${clipName}`]));
        }
        // newfields | where | orderby | having | child
        if (clipName === 'newfields' ||
            clipName === 'where' ||
            clipName === 'orderby' ||
            clipName === 'having' ||
            clipName === 'child') {
            return typeOf.isNotEmptyObj(this[`$${clipName}`]);
        }
        // limit | skip
        if (clipName === 'limit' || clipName === 'skip') {
            return typeOf.isNumber(this[`$${clipName}`]);
        }
        // fields | groupby
        if (clipName == 'fields' || clipName === 'groupby') {
            return typeOf.isNotEmptyArr(this[`$${clipName}`]);
        }
        // 报错：SQLGENERATOR_PROPERTY_ERROR
        throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLSelectGenerator', don't exist property ${clipName}!`);
    }
    generate() {
        // 属性值
        const { $fields, $newfields, $name, $where, $orderby, $groupby, $having, $limit, $skip, } = this;
        if (typeOf.isNotBlankStr($name) || typeOf.isNotEmptyObj($name)) {
            // 字段筛选
            const fieldsClip = sqlClip.fieldsClip($fields, $newfields, $groupby);
            // 筛选片段
            const whereClip = sqlClip.whereClip($where);
            // 排序片段
            const orderByClip = sqlClip.orderByClip($orderby);
            // 限制条数片段
            const limitClip = sqlClip.limitClip($limit, $skip);
            // 集合名
            const nameClip = sqlClip.nameClip($name);
            // 分组
            const groupByClip = sqlClip.groupByClip($groupby);
            // 分组筛选
            const havingClip = sqlClip.havingClip($having);
            // sql
            const sql = `select${fieldsClip}from${nameClip}${whereClip}${groupByClip}${havingClip}${orderByClip}${limitClip}`;
            return sql;
        }
        // 报错：SQLGENERATOR_PROPERTY_ERROR
        throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLSelectGenerator', don't exist property '$name'!`);
    }
    subGenerate(alias, index = 0) {
        // 属性值
        const { $fields, $newfields, $name, $where, $orderby, $groupby, $having, $limit, $skip, $child, } = this;
        // 字段筛选
        const fieldsClip = sqlClip.fieldsClip($fields, $newfields, $groupby);
        // 筛选片段
        const whereClip = sqlClip.whereClip($where);
        // 排序片段
        const orderByClip = sqlClip.orderByClip($orderby);
        // 限制条数片段
        const limitClip = sqlClip.limitClip($limit, $skip);
        // 分组
        const groupByClip = sqlClip.groupByClip($groupby);
        // 分组筛选
        const havingClip = sqlClip.havingClip($having);
        // 存在别名
        if (typeOf.isNotBlankStr(alias)) {
            // 别名序号
            const aliasClip = `${alias}${index++}`;
            if (typeOf.isNotBlankStr($name) || typeOf.isNotEmptyObj($name)) {
                let subGenClip = sqlClip.nameClip($name);
                // sql
                const sql = `select${fieldsClip}from${subGenClip}${whereClip}${groupByClip}${havingClip}${orderByClip}${limitClip}`;
                return sql;
            }
            else if (typeOf.isNotEmptyObj($child)) {
                let subGenClip = ` (${$child.subGenerate(alias, index)}) as ${mysql.escapeId(aliasClip)} `;
                // sql
                const sql = `select${fieldsClip}from${subGenClip}${whereClip}${groupByClip}${havingClip}${orderByClip}${limitClip}`;
                return sql;
            }
        }
        // 报错：SQLGENERATOR_PROPERTY_ERROR
        throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLSelectGenerator', don't exist property '$name'!`);
    }
}

/**
 * @description MySQL 插入 sql 语句生成器
 */
class MySQLInsertGenerator {
    $type = SQLTypes.INSERT;
    $name;
    $record;
    constructor(config) {
        const { $record, $name } = config || {};
        // 属性赋值
        typeOf.isNotBlankStr($name) && this.set('name', $name);
        typeOf.isNotEmptyObj($record) && this.set('record', $record);
    }
    get(clipName) {
        return this[`$${clipName}`];
    }
    set(clipName, value) {
        // record
        if (clipName === 'record') {
            if (typeOf.isNotEmptyObj(value)) {
                // 初始化
                this.$record = {};
                for (const key in value) {
                    // 值为数组和对象类型
                    if (typeOf.isObject(value[key]) || typeOf.isArray(value[key])) {
                        this.$record[key] = JSON.stringify(value[key]);
                    }
                    else {
                        this.$record[key] = value[key];
                    }
                }
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLInsertGenerator', property 'record' type must be 'SQLRecord'!`);
        }
        // name
        if (clipName === 'name') {
            if (typeOf.isNotBlankStr(value)) {
                this.$name = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLInsertGenerator', property 'name' type must be string!`);
        }
        return this;
    }
    exists(clipName) {
        // name
        if (clipName == 'name') {
            return typeOf.isNotBlankStr(this[`$${clipName}`]);
        }
        // record
        if (clipName === 'record') {
            return typeOf.isNotEmptyObj(this.$record);
        }
        // 报错：SQLGENERATOR_PROPERTY_ERROR
        throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLInsertGenerator', don't exist property '$name'!`);
    }
    generate() {
        // 属性值
        const { $name, $record } = this;
        // 存在集合名
        if (typeOf.isNotBlankStr($name)) {
            // 集合名
            const nameClip = sqlClip.nameClip($name);
            // 记录
            const recordClip = sqlClip.recordClip($record);
            // sql
            const sql = `insert into${nameClip}${recordClip}`;
            return sql;
        }
        // 报错：SQLGENERATOR_PROPERTY_ERROR
        throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLInsertGenerator', don't exist property '$name'!`);
    }
}

/**
 * @description MySQL 删除 sql 语句生成器
 */
class MySQLDeleteGenerator {
    $type = SQLTypes.DELETE;
    $name;
    $where;
    $orderby;
    $limit;
    constructor(config) {
        const { $name, $where, $orderby, $limit } = config || {};
        // 属性赋值
        typeOf.isNotBlankStr($name) && this.set('name', $name);
        typeOf.isNotEmptyObj($where) && this.set('where', $where);
        typeOf.isNotEmptyObj($orderby) && this.set('orderby', $orderby);
        typeOf.isNumber($limit) && this.set('limit', $limit);
    }
    get(clipName) {
        return this[`$${clipName}`];
    }
    set(clipName, value) {
        // name
        if (clipName === 'name') {
            if (typeOf.isNotBlankStr(value)) {
                this.$name = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLDeleteGenerator', property 'name' type must be string!`);
        }
        // where
        if (clipName === 'where') {
            if (typeOf.isNotEmptyObj(value)) {
                this.$where = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLDeleteGenerator', property 'where' type must be 'SQLWhere'!`);
        }
        // orderby
        if (clipName === 'orderby') {
            if (typeOf.objStructTypeMatch(value, { '[key]': 'isNotBlankStr' })) {
                this.$orderby = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLDeleteGenerator', property 'orderby' type must be 'SQLOrderBy'!`);
        }
        // limit
        if (clipName === 'limit') {
            if (typeOf.isNumber(value)) {
                this.$limit = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLDeleteGenerator', property 'limit' type must be number!`);
        }
        return this;
    }
    exists(clipName) {
        // name
        if (clipName == 'name') {
            return typeOf.isNotBlankStr(this[`$${clipName}`]);
        }
        // where | orderby
        if (clipName === 'where' || clipName == 'orderby') {
            return typeOf.isNotEmptyObj(this[`$${clipName}`]);
        }
        // limit
        if (clipName === 'limit') {
            return typeOf.isNumber(this[`$${clipName}`]);
        }
        // 报错：SQLGENERATOR_PROPERTY_ERROR
        throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLDeleteGenerator', don't exist property ${clipName}!`);
    }
    generate() {
        // 属性值
        const { $name, $where, $orderby, $limit } = this;
        // 存在集合名
        if (typeOf.isNotBlankStr($name)) {
            // 筛选片段
            const whereClip = sqlClip.whereClip($where);
            // 排序片段
            const orderByClip = sqlClip.orderByClip($orderby);
            // 限制条数片段
            const limitClip = sqlClip.limitClip($limit);
            // 集合名
            const nameClip = sqlClip.nameClip($name);
            // sql
            const sql = `delete from${nameClip}${whereClip}${orderByClip}${limitClip}`;
            return sql;
        }
        // 报错：SQLGENERATOR_PROPERTY_ERROR
        throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLDeleteGenerator', don't exist property '$name'!`);
    }
}

/**
 * @description MySQL 更新 sql 语句生成器
 */
class MySQLUpdateGenerator {
    $type = SQLTypes.UPDATE;
    $name;
    $record;
    $where;
    $orderby;
    $limit;
    constructor(config) {
        const { $name, $where, $orderby, $limit, $record } = config || {};
        // 属性赋值
        typeOf.isNotBlankStr($name) && this.set('name', $name);
        typeOf.isNotEmptyObj($where) && this.set('where', $where);
        typeOf.isNotEmptyObj($orderby) && this.set('orderby', $orderby);
        typeOf.isNumber($limit) && this.set('limit', $limit);
        typeOf.isNotEmptyObj($record) && this.set('record', $record);
    }
    get(clipName) {
        return this[`$${clipName}`];
    }
    set(clipName, value) {
        // record
        if (clipName === 'record') {
            if (typeOf.isNotEmptyObj(value)) {
                this.$record = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLInsertGenerator', property 'record' type must be 'SQLRecord'`);
        }
        // name
        if (clipName === 'name') {
            if (typeOf.isNotBlankStr(value)) {
                this.$name = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLUpdateGenerator', property 'name' type must be 'SQLName' as string`);
        }
        // where
        if (clipName === 'where') {
            if (typeOf.isNotEmptyObj(value)) {
                this.$where = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLUpdateGenerator', property 'where' type must be 'SQLWhere'`);
        }
        // orderby
        if (clipName === 'orderby') {
            if (typeOf.objStructTypeMatch(value, { '[key]': 'isNotBlankStr' })) {
                this.$orderby = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLUpdateGenerator', property 'orderby' type must be 'SQLOrderBy'`);
        }
        // limit
        if (clipName === 'limit') {
            if (typeOf.isNumber(value)) {
                this.$limit = value;
                return this;
            }
            // 报错：SQLGENERATOR_PROPERTY_ERROR
            throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLUpdateGenerator', property 'limit' type must be 'SQLLimit' as number`);
        }
        // 报错：SQLGENERATOR_PROPERTY_ERROR
        throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `Don't exist property ${clipName}!`);
    }
    exists(clipName) {
        // name
        if (clipName == 'name') {
            return typeOf.isNotBlankStr(this[`$${clipName}`]);
        }
        // where| orderby| record
        if (clipName === 'where' ||
            clipName === 'orderby' ||
            clipName === 'record') {
            return typeOf.isNotEmptyObj(this[`$${clipName}`]);
        }
        // limit
        if (clipName === 'limit') {
            return typeOf.isNumber(this[`$${clipName}`]);
        }
        // 报错：SQLGENERATOR_PROPERTY_ERROR
        throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `Don't exist property ${clipName}!`);
    }
    generate() {
        // 属性值
        const { $name, $where, $orderby, $limit, $record } = this;
        // 存在集合名
        if (typeOf.isNotBlankStr($name)) {
            // 筛选片段
            const whereClip = sqlClip.whereClip($where);
            // 排序片段
            const orderByClip = sqlClip.orderByClip($orderby);
            // 限制条数片段
            const limitClip = sqlClip.limitClip($limit);
            // 集合名
            const nameClip = sqlClip.nameClip($name);
            // 记录
            const recordClip = sqlClip.recordClip($record);
            // sql
            const sql = `update${nameClip}${recordClip}${whereClip}${orderByClip}${limitClip}`;
            return sql;
        }
        // 报错：SQLGENERATOR_PROPERTY_ERROR
        throw errHandler.createError(MySQLErrorType.SQLGENERATOR_PROPERTY_ERROR, `In class 'MySQLUpdateGenerator', don't exist property '$name'!`);
    }
}

/**
 * @description 任务类型
 */
var AggregateTaskType;
(function (AggregateTaskType) {
    AggregateTaskType[AggregateTaskType["NEWFIELDS"] = 0] = "NEWFIELDS";
    AggregateTaskType[AggregateTaskType["GROUPBY"] = 1] = "GROUPBY";
    AggregateTaskType[AggregateTaskType["MATCH"] = 2] = "MATCH";
    AggregateTaskType[AggregateTaskType["FILTER"] = 3] = "FILTER";
    AggregateTaskType[AggregateTaskType["ORDERBY"] = 4] = "ORDERBY";
    AggregateTaskType[AggregateTaskType["COUNT"] = 5] = "COUNT";
    AggregateTaskType[AggregateTaskType["LIMIT"] = 6] = "LIMIT";
    AggregateTaskType[AggregateTaskType["SKIP"] = 7] = "SKIP";
})(AggregateTaskType || (AggregateTaskType = {}));

class MySQLAggregate {
    $collection;
    $taskList;
    constructor(collection) {
        this.$collection = collection;
        this.$taskList = [];
    }
    async handleTask(selectGen, task) {
        const { $type, $value } = task;
        // 新增字段
        if ($type === AggregateTaskType.NEWFIELDS &&
            !selectGen.exists('newfields')) {
            // 字段值
            selectGen.set('newfields', $value);
            return selectGen;
        }
        // 排序
        if ($type === AggregateTaskType.ORDERBY && !selectGen.exists('orderby')) {
            selectGen.set('orderby', $value);
            return selectGen;
        }
        // 分页
        if ($type === AggregateTaskType.LIMIT && !selectGen.exists('limit')) {
            selectGen.set('limit', $value);
            return selectGen;
        }
        // 跳过分页
        if ($type === AggregateTaskType.SKIP && !selectGen.exists('skip')) {
            selectGen.set('skip', $value);
            return selectGen;
        }
        // 分组
        if ($type === AggregateTaskType.GROUPBY && !selectGen.exists('groupby')) {
            selectGen.set('groupby', $value);
            return selectGen;
        }
        // 筛选
        if ($type === AggregateTaskType.MATCH && !selectGen.exists('where')) {
            selectGen.set('where', $value);
            return selectGen;
        }
        // 字段
        if ($type === AggregateTaskType.FILTER && !selectGen.exists('fields')) {
            // 字段值
            const fields = await this.$collection.getFields($value);
            const $fields = fields.map((field) => field.COLUMN_NAME);
            selectGen.set('fields', $fields);
            return selectGen;
        }
        // 重复属性
        const newSelectGen = new MySQLSelectGenerator();
        // 子句
        newSelectGen.set('child', selectGen);
        // 当前字段
        const { $fields = [], $newfields = {} } = selectGen;
        const newfields = Object.keys($newfields);
        const currentFields = [...$fields, ...newfields];
        // 新字段
        if ($type === AggregateTaskType.NEWFIELDS) {
            newSelectGen.set('newfields', $value);
        }
        // 排序
        if ($type === AggregateTaskType.ORDERBY) {
            newSelectGen.set('orderby', $value);
        }
        // 分页
        if ($type === AggregateTaskType.LIMIT) {
            newSelectGen.set('limit', $value);
        }
        // 跳过分页
        if ($type === AggregateTaskType.SKIP) {
            newSelectGen.set('skip', $value);
        }
        // 分组
        if ($type === AggregateTaskType.GROUPBY) {
            newSelectGen.set('groupby', $value);
        }
        // 筛选
        if ($type === AggregateTaskType.MATCH) {
            newSelectGen.set('where', $value);
        }
        // 过滤
        if ($type === AggregateTaskType.FILTER) {
            const filters = (Object.keys($value)).filter((field) => $value && !$value[field]);
            const fields = currentFields.filter((field) => !filters.includes(field));
            newSelectGen.set('fields', fields);
        }
        return newSelectGen;
    }
    async preTaskList() {
        const { $name } = this.$collection;
        let selectGen = new MySQLSelectGenerator({ $name });
        // 遍历任务列表
        for (const i in this.$taskList) {
            selectGen = await this.handleTask(selectGen, this.$taskList[i]);
        }
        return selectGen.subGenerate('tb');
    }
    addFields(fields) {
        this.$taskList.push({
            $type: AggregateTaskType.NEWFIELDS,
            $value: fields,
        });
        return this;
    }
    count(fieldName) {
        this.addFields({
            [fieldName]: $.count(1),
        });
        return this;
    }
    async end() {
        // 集合名
        const { $name } = this.$collection;
        // name
        if (!typeOf.isNotBlankStr($name)) {
            throw errHandler.createError(MySQLErrorType.AGGREGATE_END_ERROR, 'aggregate.name is an invalid value');
        }
        try {
            const sql = await this.preTaskList();
            // 处理sql结果
            const { results, fields } = await this.$collection.execSQL(sql);
            // fields
            if (!fields) {
                throw errHandler.createError(MySQLErrorType.AGGREGATE_END_ERROR, "aggregate.fields don't exist");
            }
            // 不存在结果
            if (!typeOf.isNotEmptyArr(results)) {
                return {
                    result: results,
                    status: false,
                };
            }
            // 配置
            const { jsonParse, tinyIntToBool } = this.$collection.$config;
            // json 转换为 object 或 array
            if (jsonParse) {
                parseJson(fields, results);
            }
            // tinyint 转换为 boolean
            if (tinyIntToBool) {
                tinyToBoolean(fields, results);
            }
            return {
                result: results,
                status: true,
            };
        }
        catch (err) {
            throw errHandler.createError(MySQLErrorType.AGGREGATE_END_ERROR, String(new Error(err).stack) || '');
        }
    }
    group(group) {
        // 字段名
        const fieldNames = [];
        for (const key in group) {
            if (typeOf.objStructMatch(group[key], ['$value', '$type'])) {
                group[key];
            }
            if (isKey(group[key])) {
                fieldNames.push(group[key]);
            }
        }
        // 新增字段
        this.addFields(group);
        // 分组
        this.$taskList.push({
            $type: AggregateTaskType.GROUPBY,
            $value: fieldNames,
        });
        return this;
    }
    skip(skip) {
        this.$taskList.push({
            $type: AggregateTaskType.SKIP,
            $value: skip,
        });
        return this;
    }
    limit(limit) {
        this.$taskList.push({
            $type: AggregateTaskType.LIMIT,
            $value: limit,
        });
        return this;
    }
    match(fields) {
        this.$taskList.push({
            $type: AggregateTaskType.MATCH,
            $value: fields,
        });
        return this;
    }
    project(project) {
        // 过滤
        const filter = {};
        // 新字段
        const newfields = {};
        for (const key in project) {
            if (typeOf.isBooloon(project[key])) {
                filter[key] = project[key];
                continue;
            }
            newfields[key] = project[key];
        }
        // 新增字段非空
        if (typeOf.isNotEmptyObj(newfields)) {
            this.addFields(newfields);
        }
        // 过滤字段非空
        if (typeOf.isNotEmptyObj(filter)) {
            this.filter(filter);
        }
        return this;
    }
    filter(filter) {
        this.$taskList.push({
            $type: AggregateTaskType.FILTER,
            $value: filter,
        });
        return this;
    }
    sample(size) {
        this.sort({
            'rand()': '',
        });
        this.limit(size);
        return this;
    }
    sort(orderby) {
        this.$taskList.push({
            $type: AggregateTaskType.ORDERBY,
            $value: orderby,
        });
        return this;
    }
    sortByCount(fieldName) {
        this.group({
            count: $.count(1),
            _id: fieldName,
        });
        return this;
    }
}

/**
 * @description mysql 集合
 * @example // 获取数据
 * new MySQLCollection<T>(name)
 * .where(where)
 * .get()
 * @example // 添加数据
 * new MySQLCollection<T>(name)
 * .where(where)
 * .add(data)
 * @example // 删除数据
 * new MySQLCollection<T>(name)
 * .where(where)
 * .remove()
 * @example // 修改数据数据
 * new MySQLCollection<T>(name)
 * .where(where)
 * .update(data)
 */
class MySQLCollection {
    $name;
    $filter;
    $where;
    $orderby;
    $skip;
    $limit;
    $config;
    $conn;
    $database;
    constructor(database, props, config, conn) {
        // 绑定数据库
        this.$database = database;
        // 属性
        const { $filter, $where, $limit, $skip, $orderby, $name } = props;
        this.$name = $name;
        this.$filter = $filter;
        this.$where = $where;
        this.$limit = $limit;
        this.$skip = $skip;
        this.$orderby = $orderby;
        // 配置
        this.$config = config;
        // 连接
        this.$conn = conn;
    }
    create(props) {
        const { $database, $config, $conn, $name } = this;
        const { $limit, $skip, $filter, $where, $orderby } = props;
        // 属性
        const $props = { $name };
        // 合并属性
        if (typeOf.isObject(this.$filter)) {
            $props.$filter = objectMerge({}, this.$filter, $filter);
        }
        if (typeOf.isObject(this.$where)) {
            $props.$where = objectMerge({}, this.$where, $where);
        }
        if (typeOf.isObject(this.$orderby)) {
            $props.$orderby = objectMerge({}, this.$orderby, $orderby);
        }
        if (typeOf.isNumber($skip)) {
            $props.$skip = $skip;
        }
        else {
            $props.$skip = this.$skip;
        }
        if (typeOf.isNumber($limit)) {
            $props.$limit = $limit;
        }
        else {
            $props.$limit = this.$limit;
        }
        // 新集合
        const newCollection = new MySQLCollection($database, $props, $config, $conn);
        return newCollection;
    }
    aggregate() {
        return new MySQLAggregate(this);
    }
    field(filter) {
        // 存在字段
        if (typeOf.isNotEmptyObj(filter)) {
            const newFields = {};
            for (const key in filter) {
                if (typeOf.isBooloon(filter[key])) {
                    newFields[key] = filter[key];
                }
            }
            return this.create({ $filter: newFields });
        }
        throw errHandler.createError(MySQLErrorType.COLLECTION_PROPERTY_ERROR, `In MySQLCollection, property 'field' type must be Filter`);
    }
    where(where) {
        // 存在字段
        if (typeOf.isNotEmptyObj(where)) {
            const newWhere = {};
            for (const key in where) {
                if (typeOf.isNotUndefined(where[key])) {
                    // 普通类型处理
                    newWhere[key] = where[key];
                }
            }
            return this.create({ $where: newWhere });
        }
        throw errHandler.createError(MySQLErrorType.COLLECTION_PROPERTY_ERROR, `In MySQLCollection, property 'where' type must be Where`);
    }
    orderBy(orderBy) {
        if (typeOf.isNotEmptyObj(orderBy)) {
            const newOrderBy = {};
            for (const key in orderBy) {
                // 排序方法
                const orders = ['asc', 'desc', ''];
                if (typeOf.isString(orderBy[key]) &&
                    orders.includes(orderBy[key])) {
                    newOrderBy[key] = orderBy[key];
                }
            }
            return this.create({ $orderby: newOrderBy });
        }
        throw errHandler.createError(MySQLErrorType.COLLECTION_PROPERTY_ERROR, `In MySQLCollection, property 'orderBy' type must be OrderBy`);
    }
    random() {
        const orderby = {
            'rand()': '',
        };
        return this.create({ $orderby: orderby });
    }
    limit(limit) {
        if (typeOf.isNumber(limit)) {
            return this.create({ $limit: limit });
        }
        throw errHandler.createError(MySQLErrorType.COLLECTION_PROPERTY_ERROR, `In MySQLCollection, property 'limit' must be a number`);
    }
    skip(skip) {
        if (typeOf.isNumber(skip)) {
            return this.create({ $skip: skip });
        }
        throw errHandler.createError(MySQLErrorType.COLLECTION_PROPERTY_ERROR, `In MySQLCollection, property 'skip' must be a number`);
    }
    async execSQL(sql) {
        // 连接不存在
        if (!this.$conn) {
            this.$conn = await this.$database.connController.getConn();
        }
        const res = await this.$database.connController.execSQL(this.$conn, sql);
        // 非事务 释放连接
        if ((this.$config.mode = 'common')) {
            this.$database.connController.release(this.$conn);
            this.$conn = undefined;
        }
        return res;
    }
    async count() {
        const { $name, $where, $skip, $orderby, $limit } = this;
        if (typeOf.isNotBlankStr($name)) {
            try {
                // 筛选片段
                const whereClip = sqlClip.whereClip($where);
                // 排序片段
                const orderByClip = sqlClip.orderByClip($orderby);
                // 限制条数片段
                const limitClip = sqlClip.limitClip($limit, $skip);
                // 集合名
                const nameClip = sqlClip.nameClip($name);
                // sql
                const sql = `select count(*) as total from ${nameClip}${whereClip}${orderByClip}${limitClip}`;
                // 处理sql结果
                const { results } = await this.execSQL(sql);
                if (typeOf.isNotEmptyArr(results)) {
                    return {
                        result: results[0],
                        status: true,
                    };
                }
                return {
                    result: 0,
                    status: false,
                };
            }
            catch (error) {
                return {
                    result: 0,
                    status: false,
                };
            }
        }
        return {
            result: 0,
            status: false,
        };
    }
    async get() {
        const { $name, $filter, $where, $skip, $orderby, $limit } = this;
        // name
        if (!typeOf.isNotBlankStr($name)) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_GET_ERROR, 'collection.name is an invalid value');
        }
        try {
            let $fields = [];
            if (typeOf.isNotEmptyObj($filter)) {
                // 字段值
                const fields = await this.getFields($filter);
                $fields = fields.map((field) => field.COLUMN_NAME);
            }
            // 字段筛选
            const selectGen = new MySQLSelectGenerator({
                $name,
                $where: $where,
                $skip,
                $orderby: $orderby,
                $limit,
                $fields: $fields,
            });
            // sql
            const sql = selectGen.generate();
            // 处理sql结果
            const { results, fields } = await this.execSQL(sql);
            // fields
            if (!fields) {
                throw errHandler.createError(MySQLErrorType.AGGREGATE_END_ERROR, "collection.fields don't exist");
            }
            // 不存在结果
            if (!typeOf.isNotEmptyArr(results)) {
                return {
                    result: results,
                    status: false,
                };
            }
            // 配置
            const { jsonParse, tinyIntToBool } = this.$config;
            // json 转换为 object 或 array
            if (jsonParse) {
                parseJson(fields, results);
            }
            // tinyint 转换为 boolean
            if (tinyIntToBool) {
                tinyToBoolean(fields, results);
            }
            return {
                result: results,
                status: true,
            };
        }
        catch (err) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_GET_ERROR, err);
        }
    }
    async add(data) {
        const { $name } = this;
        // name
        if (!typeOf.isNotBlankStr($name)) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_ADD_ERROR, 'collection.name is an invalid value');
        }
        // data
        if (!typeOf.isNotEmptyObj(data)) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_ADD_ERROR, 'data is an invalid value');
        }
        try {
            // json处理
            const newData = stringfyJson(data);
            const insertGen = new MySQLInsertGenerator({
                $name,
                $record: newData,
            });
            // sql
            const sql = insertGen.generate();
            // 处理sql结果
            const { results } = await this.execSQL(sql);
            return {
                result: results,
                status: Boolean(results.affectedRows),
            };
        }
        catch (err) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_ADD_ERROR, err);
        }
    }
    async remove() {
        const { $name, $where, $orderby, $limit } = this;
        // name
        if (!typeOf.isNotBlankStr($name)) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_REMOVE_ERROR, 'collection.name is an invalid value');
        }
        try {
            const deleteGen = new MySQLDeleteGenerator({
                $name,
                $where: $where,
                $orderby,
                $limit,
            });
            // sql
            const sql = deleteGen.generate();
            // 处理sql结果
            const { results } = await this.execSQL(sql);
            return {
                result: results,
                status: Boolean(results.affectedRows),
            };
        }
        catch (err) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_REMOVE_ERROR, err);
        }
    }
    async update(data) {
        const { $name, $where, $orderby, $limit } = this;
        // name
        if (!typeOf.isNotBlankStr($name)) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_UPDATE_ERROR, 'collection.name is an invalid value');
        }
        // data
        if (!typeOf.isNotEmptyObj(data)) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_UPDATE_ERROR, 'data is an invalid value');
        }
        try {
            // json处理
            const newData = stringfyJson(data);
            const updateGen = new MySQLUpdateGenerator({
                $name,
                $where,
                $limit,
                $orderby,
                $record: newData,
            });
            // sql
            const sql = updateGen.generate();
            // 处理sql结果
            const { results } = await this.execSQL(sql);
            return {
                result: results,
                status: Boolean(results.affectedRows),
            };
        }
        catch (err) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_UPDATE_ERROR, err);
        }
    }
    async set(data) {
        const { $name } = this;
        // name
        if (!typeOf.isNotBlankStr($name)) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_SET_ERROR, 'collection.name is an invalid value');
        }
        // data
        if (!typeOf.isNotEmptyObj(data)) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_SET_ERROR, 'data is an invalid value');
        }
        try {
            // 获取字段
            const fields = await this.getFields();
            // 处理过的数据
            const newData = {};
            fields.forEach((field) => {
                // 字段名
                const fieldName = field.COLUMN_NAME;
                newData[fieldName] =
                    data[fieldName];
            });
            // 执行更新
            const res = await this.update(newData);
            return res;
        }
        catch (err) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_SET_ERROR, err);
        }
    }
    async getFields(filter) {
        const { $name } = this;
        // name
        if (!typeOf.isNotBlankStr($name)) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_GETFIELDS_ERROR, 'collection.name is an invalid value');
        }
        try {
            // 数据库名
            const { database } = this.$database.$config.connConfig;
            const filterColumnClip = sqlClip.fieldFilterClip(filter);
            // sql
            const sql = `select * from information_schema.columns where table_name = ${mysql.escape($name)} and table_schema = ${mysql.escape(database)}${filterColumnClip}`;
            // 查询字段
            const { results } = await this.execSQL(sql);
            // 字段
            return results;
        }
        catch (err) {
            throw errHandler.createError(MySQLErrorType.COLLECTION_GETFIELDS_ERROR, err);
        }
    }
}

/**
 * @description 命令操作
 */
class MySQLCommand {
    $value;
    $type;
    $mode;
    constructor(value = [], type = CommandNoneType.NONE) {
        this.$value = value;
        this.$type = type;
        this.$mode = 'command';
    }
    aggregate() {
        return new MySQLAggregateCommand();
    }
    and(value, ...rest) {
        const results = valuesToArr(value, rest, this);
        return new MySQLCommand(results, CommandLogicSimpleType.AND);
    }
    or(value, ...rest) {
        const results = valuesToArr(value, rest, this);
        return new MySQLCommand(results, CommandLogicSimpleType.OR);
    }
    not(value) {
        const results = valueToArr(value);
        return new MySQLCommand(results, CommandLogicNegativeType.NOT);
    }
    nor(value, ...rest) {
        const results = valuesToArr(value, rest, this);
        return new MySQLCommand(results, CommandLogicNegativeType.NOR);
    }
    nand(value, ...rest) {
        const results = valuesToArr(value, rest, this);
        return new MySQLCommand(results, CommandLogicNegativeType.NAND);
    }
    eq(value) {
        const cmd = new MySQLCommand([value], CommandCompareSimpleType.EQ);
        if (typeOf.objStructMatch(this, ['$value', '$type'])) {
            return this.and(cmd);
        }
        return cmd;
    }
    neq(value) {
        const cmd = new MySQLCommand([value], CommandCompareSimpleType.NEQ);
        if (typeOf.objStructMatch(this, ['$value', '$type'])) {
            return this.and(cmd);
        }
        return cmd;
    }
    lt(value) {
        const cmd = new MySQLCommand([value], CommandCompareSimpleType.LT);
        if (typeOf.objStructMatch(this, ['$value', '$type'])) {
            return this.and(cmd);
        }
        return cmd;
    }
    lte(value) {
        const cmd = new MySQLCommand([value], CommandCompareSimpleType.LTE);
        if (typeOf.objStructMatch(this, ['$value', '$type'])) {
            return this.and(cmd);
        }
        return cmd;
    }
    gt(value) {
        const cmd = new MySQLCommand([value], CommandCompareSimpleType.GT);
        if (typeOf.objStructMatch(this, ['$value', '$type'])) {
            return this.and(cmd);
        }
        return cmd;
    }
    gte(value) {
        const cmd = new MySQLCommand([value], CommandCompareSimpleType.GTE);
        if (typeOf.objStructMatch(this, ['$value', '$type'])) {
            return this.and(cmd);
        }
        return cmd;
    }
    in(value, ...rest) {
        const results = valuesToArr(value, rest);
        return new MySQLCommand(results, CommandCompareFilterType.IN);
    }
    nin(value, ...rest) {
        const results = valuesToArr(value, rest);
        return new MySQLCommand(results, CommandCompareFilterType.NIN);
    }
}
const cmd = new MySQLCommand();

/**
 * @description mysql连接控制
 * @example
 * const controller = new MySQLConnectionController(database: Database)
 */
class MySQLConnectionController {
    $type;
    $database;
    constructor(database) {
        this.$database = database;
        this.$type = database.$config.type;
    }
    create(database) {
        const controller = new MySQLConnectionController(database);
        return controller;
    }
    async getPoolConn() {
        return new Promise((resolve, reject) => {
            // 连接不存在
            if (!this.$database.$pool) {
                reject("connection pool of database don't exist");
                return;
            }
            // 连接非连接池
            if (this.$database.$config.type !== 'pool') {
                reject('database config `type` must be `pool`');
                return;
            }
            // 连接池
            const pool = this.$database.$pool;
            // 获取连接
            pool.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(conn);
            });
        });
    }
    async getSingleConn() {
        return new Promise((resolve, reject) => {
            // 连接非单连接
            if (this.$database.$config.type !== 'single') {
                reject('database config type must be `single`');
                return;
            }
            // 连接
            const conn = mysql.createConnection(this.$database.$config.connConfig);
            // 获取连接
            conn.connect((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(conn);
            });
        });
    }
    getConn() {
        // 单连接
        if (this.$type === 'single') {
            return this.getSingleConn();
        }
        // 连接池
        if (this.$type === 'pool') {
            return this.getPoolConn();
        }
        throw new Error('Failed to obtain a connection!');
    }
    async execSQL(conn, sql, values) {
        // 调试模式
        this.$database.$config.debug && console.log({ sql, values });
        return new Promise(async (resolve, reject) => {
            if (typeOf.isNotEmptyArr(values)) {
                // 执行sql语句
                conn.query(sql, values, (err, results, fields) => {
                    if (err) {
                        this.release(conn);
                        reject(err);
                        return;
                    }
                    resolve({ results, fields: fields || [] });
                });
                return;
            }
            // 执行sql语句
            conn.query(sql, (err, results, fields) => {
                if (err) {
                    this.release(conn);
                    reject(err);
                    return;
                }
                resolve({ results, fields: fields });
            });
        });
    }
    release(conn) {
        if (conn) {
            if (this.$type === 'pool') {
                const poolConn = conn;
                poolConn.release();
            }
            if (this.$type === 'single') {
                const singleConn = conn;
                singleConn.end();
            }
        }
    }
}

class MySQLDatabaseRegExp {
    $regex;
    $options;
    constructor($regex, $options) {
        this.$regex = $regex;
        this.$options = $options;
    }
    create(regexp) {
        let databaseRegxp = new MySQLDatabaseRegExp();
        if (typeOf.isRegx(regexp)) {
            const { flags, source } = regexp;
            databaseRegxp.$options = flags;
            databaseRegxp.$regex = source;
        }
        if (typeOf.objStructMatch(regexp, ['$regex', '$options'])) {
            databaseRegxp = regexp;
        }
        return databaseRegxp;
    }
}

class MySQLTransaction {
    $database;
    $conn;
    constructor(conn, database) {
        this.$database = database;
        this.$conn = conn;
    }
    collection(name) {
        const { jsonParse, tinyIntToBool } = this.$database.$config;
        const newCollection = new MySQLCollection(this.$database, { $name: name }, { jsonParse, tinyIntToBool, mode: 'transaction' }, this.$conn);
        return newCollection;
    }
    commit(reason) {
        return new Promise((resolve, reject) => {
            this.$conn.commit((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.$database.connController.release(this.$conn);
                resolve(reason);
            });
        });
    }
    rollback(reason) {
        return new Promise((resolve, reject) => {
            this.$conn.rollback(() => {
                resolve(reason);
            });
        });
    }
}

class MySQLDatabase {
    command = cmd;
    connController;
    $config;
    $conn;
    $pool;
    constructor(config) {
        const { type } = config;
        // 配置
        this.$config = config;
        // 连接池
        if (type === 'pool') {
            this.$pool = this.createPool();
        }
        // 获取连接控制
        this.connController = new MySQLConnectionController(this);
    }
    collection(name) {
        // 配置
        const { jsonParse, tinyIntToBool } = this.$config;
        const newCollection = new MySQLCollection(this, { $name: name }, { jsonParse, tinyIntToBool, mode: 'common' });
        return newCollection;
    }
    RegExp(regexp) {
        const newRegExp = new MySQLDatabaseRegExp();
        return newRegExp.create(regexp);
    }
    createPool() {
        // 创建连接池
        const pool = mysql.createPool(this.$config.connConfig);
        return pool;
    }
    async runTransaction(callback) {
        // 获取事务
        const transaction = await this.startTransaction();
        const res = await callback(transaction);
        return res;
    }
    async startTransaction() {
        // 获取连接
        const conn = await this.connController.getConn();
        return new Promise((resolve, reject) => {
            conn.beginTransaction((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                // 事务
                const transation = new MySQLTransaction(conn, this);
                resolve(transation);
            });
        });
    }
}
/**
 * @description 实例化 MySQL 数据库
 */
const database = (config) => {
    // 实例化 MySQL 数据库
    const db = new MySQLDatabase(config);
    return db;
};

/**
 * @description mysql默认配置文件
 */
const defaultConfig = {
    /**
     * @description 连接配置
     */
    connConfig: {
        /**
         * @description 主机地址
         */
        host: 'localhost',
        /**
         * @description 允许每个查询有多个mysql语句
         */
        multipleStatements: true,
        /**
         * @description 连接限制
         */
        connectionLimit: 10,
        /**
         * @description 用户名
         */
        user: 'root',
        /**
         * @description 密码
         */
        password: 'root',
        /**
         * @description 端口
         */
        port: 3306,
        /**
         * @description 数据库名
         */
        database: 'database',
    },
    /**
     * @description 数据库类型
     */
    type: 'single',
    /**
     * @description 启用字符串json化
     */
    jsonParse: false,
    /**
     * @description tinyint(1) 转换为 boolean
     */
    tinyIntToBool: false,
};

/**
 * @description 构建配置
 * @param config
 * @returns
 */
const defineConfig = (config) => {
    return objectMerge(defaultConfig, config);
};

exports.database = database;
exports.defineConfig = defineConfig;
