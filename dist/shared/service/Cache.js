"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const environments_config_1 = __importDefault(require("../../config/environments.config"));
const { redisHost, redisPassword, redisPort } = environments_config_1.default;
class CacheService {
    constructor(connName) {
        const redisClient = new ioredis_1.default({
            host: redisHost,
            port: redisPort,
            password: redisPassword,
            connectionName: connName || undefined,
            connectTimeout: 10 * 1000,
            name: connName || undefined,
        });
        // redisClient.on('connect', () => {
        //   console.log('Redis Connected');
        // });
        // redisClient.on('ready', () => {
        //   console.log('Redis ready for connection.');
        // });
        redisClient.on('end', () => {
            console.log('Redis ended');
        });
        redisClient.on('error', (er) => {
            console.log(er);
            throw new Error('Redis Error');
        });
        redisClient.on('SIGINT', () => {
            console.log('SIGINT ERR');
        });
        this.client = redisClient;
    }
    set(key, value, expiry = 72 * 60 * 60) {
        this.client.set(key, JSON.stringify(value), 'EX', expiry);
    }
    async get(key) {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }
    delete(key) {
        this.client.del(key);
    }
}
exports.default = CacheService;
