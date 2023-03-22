import defaultConfig from '../config';
import { DatabaseConfig, DatabaseType } from '../lib/database/interface';
import { objectMerge } from './handler';
/**
 * @description 构建配置
 * @param config
 * @returns
 */
const defineConfig = <T extends DatabaseType = 'single'>(
  config: Partial<DatabaseConfig<T>>
) => {
  return <DatabaseConfig<T>>objectMerge(defaultConfig, config);
};

export { defineConfig };
