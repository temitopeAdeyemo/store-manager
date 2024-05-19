"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = __importDefault(require("../../../shared/utils/AppSuccess"));
const services_1 = require("../services");
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
const http_status_codes_1 = require("http-status-codes");
class LoginUser {
    async login(req, res) {
        const { email, password } = req.body;
        const { access_token } = await new services_1.LoginUserService().execute({ email, password });
        return res.status(http_status_codes_1.StatusCodes.OK).json(new AppSuccess_1.default(http_status_codes_1.StatusCodes.OK, constants_1.default.LOGGED_IN_SUCCESSFULLY, { access_token }));
    }
}
exports.default = new LoginUser();
