const dotenv = require('dotenv').config();
export const vars = {
  port: process.env.PORT || 8000,
  dbHost: process.env.DB_HOST || '127.0.0.1',
  dbService: process.env.DB_SERVICE || 'johndoe',
  dbUserName: 'root',
  dbPassword: 'YOUR_PASSWORD',
  dbPort: Number(process.env.DB_PORT) || 3306,
  dbSync: process.env.DB_SYNC == 'true',
  dbName: process.env.DB_SERVICE || 'YOUR_DATABASE_NAME',
  dbSslModeRequire: process.env.DB_SSL_MODE_REQUIRE == 'true',
  dbDialect: process.env.DB_DIALECT || 'mysql',
  dbSchema: process.env.DB_SCHEMA || 'public',
  dbMaxPoolSize: Number(process.env.MAX_DB_POOL_SIZE) || 30,
  dbPoolAcquireTimeout: Number(process.env.DB_ACQUIRE_TIMEOUT) || 60000,
  dbPoolIdleConnectionTime: Number(process.env.DB_POOL_IDLE_CONNECTION_TIME) || 30000,
  dbLogging: process.env.DB_LOGGING === 'true',
};
