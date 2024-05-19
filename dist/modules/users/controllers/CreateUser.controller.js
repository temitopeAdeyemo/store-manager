"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = __importDefault(require("../../../shared/utils/AppSuccess"));
const services_1 = require("../services");
class RegisterUser {
    constructor() {
        this.registerUserService = new services_1.RegisterUserService();
    }
    async create(req, res) {
        const { email, password, first_name, last_name } = req.body;
        const { id } = await this.registerUserService.execute({ email, password, first_name, last_name });
        return res.json(new AppSuccess_1.default(201, 'User created Successfully.', { id }));
    }
}
exports.default = RegisterUser;
