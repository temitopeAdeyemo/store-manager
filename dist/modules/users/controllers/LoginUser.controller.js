"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = __importDefault(require("../../../shared/utils/AppSuccess"));
const services_1 = require("../services");
class LoginUser {
    constructor() {
        this.LoginUserService = new services_1.LoginUserService();
    }
    async create(req, res) {
        const { email, password } = req.body;
        const { access_token } = await this.LoginUserService.execute({ email, password, });
        return res.json(new AppSuccess_1.default(200, 'Logged in successfully.', { access_token }));
    }
}
exports.default = LoginUser;
