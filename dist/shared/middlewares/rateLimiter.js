"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const ip_1 = __importDefault(require("ip"));
const AppError_1 = __importDefault(require("../../shared/utils/AppError"));
const JWT_1 = __importDefault(require("../service/JWT"));
const ioredis_1 = __importDefault(require("ioredis"));
const environments_config_1 = __importDefault(require("../../config/environments.config"));
const Logger_1 = require("../utils/Logger");
const redisClient = new ioredis_1.default({
    host: environments_config_1.default.redisHost,
    port: environments_config_1.default.redisPort,
    password: environments_config_1.default.redisPassword,
    connectionName: 'REDIS_RATE_LIMITER',
    connectTimeout: 30 * 1000,
    name: 'REDIS_RATE_LIMITER',
});
exports.redisClient = redisClient;
redisClient.on('end', () => {
    if (environments_config_1.default.nodeEnv != 'test')
        console.log('Redis ended');
});
redisClient.on('error', () => {
    if (environments_config_1.default.nodeEnv != 'test')
        console.log('Redis Error');
});
redisClient.on('SIGINT', () => {
    if (environments_config_1.default.nodeEnv != 'test')
        console.log('SIGINT ERR');
});
async function rateLimiter(request, response, next) {
    let key;
    let controlledPath = ['/create', '/update', '/reset', '/login', '/register'];
    let isControlledPath = false;
    try {
        const limiter = new rate_limiter_flexible_1.RateLimiterRedis({
            points: environments_config_1.default.nodeEnv == 'test' ? 50 : 5,
            duration: 2,
            storeClient: redisClient,
        });
        key = ip_1.default.address() || request.ip;
        if (request.headers['authorization'] && request.headers['authorization'].split(' ')[1])
            key = request.headers['authorization'].split(' ')[1];
        for (let path of controlledPath) {
            if (request.path.includes(path)) {
                console.log('HITTING CONTROLLED ENDPOINT...');
                isControlledPath = true;
                limiter.points = environments_config_1.default.nodeEnv == 'test' ? 50 : 2;
                limiter.duration = 2;
                await limiter.consume(`trans-${path}-${key}`);
                return next();
            }
        }
        await limiter.consume(`trans-${key}`);
        return next();
    }
    catch (error) {
        if (request.headers['authorization'] && request.headers['authorization'].split(' ')[1]) {
            const jwtClient = new JWT_1.default();
            const user = jwtClient.verifyAccessToken(key);
            Logger_1.systemLogs.warn('ERROR: Too many requests on path: ' + request.path + ' from: ' + user.email + '. Please try again later.');
        }
        throw new AppError_1.default(`System busy, Try again in a moment.`, 429);
    }
}
exports.default = rateLimiter;
