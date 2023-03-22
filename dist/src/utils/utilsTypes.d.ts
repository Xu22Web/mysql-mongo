/**
 * @description 枚举类型转换为联合类型
 */
export type EnumToUnion<T extends object, P extends 'lower' | 'upper' | 'capital' | 'uncapital' | 'normal' = 'lower'> = P extends 'lower' ? Lowercase<keyof T extends string ? keyof T : never> : P extends 'upper' ? Uppercase<keyof T extends string ? keyof T : never> : P extends 'capital' ? Capitalize<keyof T extends string ? keyof T : never> : P extends 'uncapital' ? Uncapitalize<keyof T extends string ? keyof T : never> : P extends 'normal' ? keyof T : never;
/**
 * @description 特殊类型属性
 */
export type SpecificType<T, K> = {
    [U in keyof T]: T[U] extends K ? StringExtendsType<U> : never;
}[keyof T];
/**
 * @description 继承字符串类型
 */
export type StringExtendsType<T> = T extends string ? T : never;
