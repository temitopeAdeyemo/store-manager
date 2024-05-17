import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export default {
  port: process.env.PORT || '',
  nodeEnv: process.env.NODE_ENV || '',
};
