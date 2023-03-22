import { DatabaseConfig, DatabaseType } from '../lib/database/interface';

/**
 * @description mysql默认配置文件
 */
const defaultConfig: DatabaseConfig<DatabaseType> = {
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

export default defaultConfig;
