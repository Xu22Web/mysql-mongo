declare enum BaseType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    OBJECT = "object",
    NULL = "null",
    UNDEFINED = "undefined",
    ARRAY = "array",
    UNKNOWN = "unknown"
}
type PropsFuntion<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
interface TypeOfConstructor {
    /**
     * @description 获取类型
     * @param value
     */
    getType(value: any): BaseType | string;
    /**
     * @description 判断 Object 对象
     * @param value
     */
    isObject(value: any): value is object;
    /**
     * @description 判断 Function 函数
     * @param value
     */
    isFunction(value: any): value is Function;
    /**
     * @description 判断 RegExp 正则
     * @param value
     */
    isRegx(value: any): value is RegExp;
    /**
     * @description 判断 Set 集合对象
     * @param value
     */
    isSet<T = any>(value: any): value is Set<T>;
    /**
     * @description 判断 Map 对象
     * @param value
     */
    isMap<K = any, V = any>(value: any): value is Map<K, V>;
    /**
     * @description 判断 Array 数组
     * @param value
     */
    isArray<T = any>(value: any): value is T[];
    /**
     * @description 判断 Number 数字
     * @param value
     */
    isNumber(value: any): value is number;
    /**
     * @description 判断继承
     * @param value
     */
    isInsOf<T>(value: any, construct: T): boolean;
    /**
     * @description 判断字符串
     * @param value
     */
    isString(value: any): value is string;
    /**
     * @description 判断布尔
     * @param value
     */
    isBooloon(value: any): value is boolean;
    /**
     * @description 判断空数组
     * @param value
     */
    isEmptyArr<T = any>(value: any): value is T[];
    /**
     * @description 判断非空数组
     * @param value
     */
    isNotEmptyArr<T = any>(value: any): value is T[];
    /**
     * @description 判断空对象
     * @param value
     */
    isEmptyObj(value: any): value is object;
    /**
     * @description 判断非空对象
     * @param value
     */
    isNotEmptyObj(value: any): value is object;
    /**
     * @description 判断空字符
     * @param value
     */
    isBlankStr(value: any): value is string;
    /**
     * @description 判断非空字符
     * @param value
     */
    isNotBlankStr(value: any): value is string;
    /**
     * @description 判断 null
     * @param value
     */
    isNull(value: any): value is null;
    /**
     * @description 判断 undefined
     * @param value
     */
    isUndefined(value: any): value is undefined;
    /**
     * @description 判断非 undefined 和 null
     * @param value
     */
    isNotNullOrUndefined(value: any): boolean;
    /**
     * @description 判断 undefined 或 null
     * @param value
     */
    isNullOrUndefined(value: any): value is null | undefined;
    /**
     * @description 判断非 null
     * @param value
     */
    isNotNull(value: any): boolean;
    /**
     * @description 判断非 undefined
     * @param value
     */
    isNotUndefined(value: any): boolean;
    /**
     * @description 判断对象结构类型
     * @param value
     * @param keys
     */
    objStructMatch<T extends object = object>(value: any, keys: string[]): value is T;
    /**
     * @description 判断对象结构值类型
     * @param value
     * @param template
     */
    objStructTypeMatch<T extends object = object>(value: any, template: {
        [key: string]: PropsFuntion<TypeOfConstructor>;
    }): value is T;
    /**
     * @description 是否为json
     * @param value
     */
    isJson(value: any): value is string;
    /**
     * @description 是否为json数组
     * @param value
     */
    isJsonArr(value: any): value is string;
    /**
     * @description 是否为json对象
     * @param value
     */
    isJsonObj(value: any): value is string;
    /**
     * @description 是否为json布尔
     * @param value
     */
    isJsonBool(value: any): value is string;
    /**
     * @description 字符匹配
     * @param value
     * @param regexp
     */
    strMatch(value: any, regexp: RegExp | string): boolean;
}
declare const typeOf: TypeOfConstructor;
export default typeOf;
