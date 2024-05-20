"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const UserRepository_1 = __importDefault(require("../models/repositories/UserRepository"));
const PasswordHashService_1 = __importDefault(require("../../../shared/service/PasswordHashService"));
const JWT_1 = __importDefault(require("../../../shared/service/JWT"));
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
const Logger_1 = require("../../../shared/utils/Logger");
class LoginUserService {
    constructor() {
        this.userRepository = new UserRepository_1.default();
        this.passwordHashService = new PasswordHashService_1.default();
        this.jwtClient = new JWT_1.default();
    }
    async execute(data) {
        const emailExists = await this.userRepository.findByUniqueData('email', data.email);
        if (!emailExists)
            throw new AppError_1.default(constants_1.default.INCORRECT_LOGIN_CREDENTIALS, http_status_codes_1.StatusCodes.UNAUTHORIZED);
        const passwordMatch = await this.passwordHashService.compare(data.password, emailExists.password);
        if (!passwordMatch)
            throw new AppError_1.default(constants_1.default.INCORRECT_LOGIN_CREDENTIALS, http_status_codes_1.StatusCodes.UNAUTHORIZED);
        const accessToken = this.jwtClient.generateAccessToken({ id: emailExists._id, email: data.email });
        await this.userRepository.updateById(emailExists._id, { authorization_token: accessToken });
        (0, Logger_1.systemLogs)(data.email).info("Logged in successfully.");
        return { access_token: accessToken };
    }
}
exports.default = LoginUserService;
