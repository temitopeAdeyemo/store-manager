"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../shared/app"));
const app = new app_1.default().getApp();
const supertest_1 = __importDefault(require("supertest"));
const rateLimiter_1 = require("../shared/middlewares/rateLimiter");
let mongo;
beforeAll(async () => {
    mongo = new mongodb_memory_server_1.MongoMemoryServer();
    await mongo.start();
    const mongoUri = mongo.getUri();
    try {
        await mongoose_1.default.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch (error) {
        console.log("+++++++++++++++++++++++++++++++++++++++++", error);
    }
});
beforeEach(async () => {
    const collections = await mongoose_1.default.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});
afterAll(async () => {
    await mongo.stop();
    await mongoose_1.default.connection.close();
    rateLimiter_1.redisClient.disconnect();
});
global.signIn = async () => {
    const mockUser = {
        password: 'Temitope12@#',
        first_name: 'Temitope',
        last_name: 'Julius',
        email: 'temitope@gmail.com',
    };
    const response = await (0, supertest_1.default)(app).post('/api/v1/auth/register').send(mockUser);
    return response;
};
global.createCategory = async () => {
    const mockUser = {
        category_name: 'dka',
        category_code: 'ELCRTR',
        discount: '10',
    };
    const response = await (0, supertest_1.default)(app).post('/api/v1/category/create').send(mockUser);
    return response;
};
global.createProduct = async () => {
    const mockUser = {
        product_name: 'BULB',
        category: '6649f18559baf81f9979353a',
        product_code: 'BLB',
        amount: '40',
        discount: '10',
        images: '/',
        quantity: '5',
    };
    const response = await (0, supertest_1.default)(app).post('/api/v1/product/create').send(mockUser);
    return response;
};
