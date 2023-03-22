import { DatabaseConfig, DatabaseType } from '../lib/database/interface';
/**
 * @description 构建配置
 * @param config
 * @returns
 */
declare const defineConfig: <T extends DatabaseType = "single">(config: Partial<DatabaseConfig<T>>) => DatabaseConfig<T>;
export { defineConfig };
