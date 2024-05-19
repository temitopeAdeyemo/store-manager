"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../shared/database"));
const Cache_1 = __importDefault(require("./service/Cache"));
(async () => {
    try {
        const App = require('./app').default;
        const redisClient = new Cache_1.default();
        redisClient.client.on('connect', () => {
            console.log('Redis Connected.');
        });
        redisClient.client.on('ready', async () => {
            console.log('Redis ready for connection');
            const database = new database_1.default();
            await database.connect();
            const app = new App();
            app.listen();
        });
    }
    catch (err) {
        console.log(err);
        console.error('Something went wrong when initializing the server:\n', err.stack);
    }
})();
