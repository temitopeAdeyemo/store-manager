"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
exports.default = {
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
