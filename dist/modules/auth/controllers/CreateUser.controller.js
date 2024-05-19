"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = __importDefault(require("../../../shared/utils/AppSuccess"));
const services_1 = require("../services");
const http_status_codes_1 = require("http-status-codes");
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
class RegisterUser {
    async create(req, res) {
        const { email, password, first_name, last_name } = req.body;
        const { id } = await new services_1.RegisterUserService().execute({ email, password, first_name, last_name });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(new AppSuccess_1.default(http_status_codes_1.StatusCodes.CREATED, constants_1.default.USER_CREATED_SUCCESSFULLY, { id }));
    }
}
exports.default = new RegisterUser();
