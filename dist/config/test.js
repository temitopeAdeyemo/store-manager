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
class TestGlobals {
}
exports.default = TestGlobals;
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
        console.log('Database connected successfully...');
    }
    catch (error) {
        console.log(error);
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
TestGlobals.signIn = async () => {
    const mockUser = {
        password: 'Temitope12@#',
        email: 'temitope@gmail.com',
    };
    const response = await (0, supertest_1.default)(app).post('/api/v1/auth/login').send(mockUser);
    return response;
};
TestGlobals.signUp = async () => {
    const mockUser = {
        password: 'Temitope12@#',
        first_name: 'Temitope',
        last_name: 'Julius',
        email: 'temitope@gmail.com',
    };
    const response = await (0, supertest_1.default)(app).post('/api/v1/auth/register').send(mockUser);
    return response;
};
TestGlobals.createCategory = async () => {
    const mockUser = {
        category_name: 'Charger',
        category_code: 'ELCRTR',
        discount: '10',
    };
    await TestGlobals.signUp();
    const signInResponse = await TestGlobals.signIn();
    const response = await (0, supertest_1.default)(app).post('/api/v1/category/create').send(mockUser).set('Authorization', signInResponse.body.data.access_token);
    return response;
};
TestGlobals.createCategories = async () => {
    const mockDatas = [
        {
            category_name: 'FOOD',
            category_code: 'FD',
            discount: '10',
        },
        {
            category_name: 'ELECTRONICS',
            category_code: 'ELCRTR',
            discount: '20',
        },
    ];
    await TestGlobals.signUp();
    const signInResponse = await TestGlobals.signIn();
    for (let data of mockDatas) {
        await (0, supertest_1.default)(app).post('/api/v1/category/create').send(data).set('Authorization', signInResponse.body.data.access_token);
    }
    return;
};
TestGlobals.createProduct = async () => {
    const categoryResponse = await TestGlobals.createCategory();
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", categoryResponse);
    const mockUser = {
        product_name: 'BULB',
        category: categoryResponse.body.data.id,
        product_code: 'BLB',
        amount: '40',
        discount: '10',
        images: '/',
        quantity: '5',
    };
    await TestGlobals.signUp();
    const signInResponse = await TestGlobals.signIn();
    const response = await (0, supertest_1.default)(app).post('/api/v1/product/create').send(mockUser).set('Authorization', signInResponse.body.data.access_token);
    return response;
};
TestGlobals.createProducts = async () => {
    const categoryResponse = await TestGlobals.createCategory();
    const mockDatas = [
        {
            product_name: 'BULB',
            category: categoryResponse.body.data.id,
            product_code: 'BLB',
            amount: '40',
            discount: '10',
            images: '/',
            quantity: '5',
        },
        {
            product_name: 'FAN',
            category: categoryResponse.body.data.id,
            product_code: 'FN',
            amount: '40',
            discount: '10',
            images: '/',
            quantity: '2',
        },
    ];
    await TestGlobals.signUp();
    const signInResponse = await TestGlobals.signIn();
    for (let data of mockDatas) {
        await (0, supertest_1.default)(app).post('/api/v1/product/create').send(data).set('Authorization', signInResponse.body.data.access_token);
    }
    return;
};
