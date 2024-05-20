import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export default {
  port: process.env.PORT || '',
  nodeEnv: process.env.NODE_ENV || '',
  dburl: process.env.DB_URL || '',
  testdburl: process.env.TEST_DB_URL || '',
  redisHost: process.env.REDIS_HOST,
  redisPassword: process.env.REDIS_PASSWORD,
  redisPort: Number(process.env.REDIS_PORT),
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  saltRounds: process.env.SALT_ROUNDS || 10,
};