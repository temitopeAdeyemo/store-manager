"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const UserRepository_1 = __importDefault(require("../models/repositories/UserRepository"));
const PasswordHashService_1 = __importDefault(require("../../../shared/service/PasswordHashService"));
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
class RegisterUserService {
    constructor() {
        this.userRepository = new UserRepository_1.default();
        this.passwordHashService = new PasswordHashService_1.default();
    }
    async execute(data) {
        const emailExists = await this.userRepository.findByUniqueData('email', data.email);
        if (emailExists)
            throw new AppError_1.default(constants_1.default.EMAIL_EXISTS, http_status_codes_1.StatusCodes.CONFLICT);
        const hashedPassword = await this.passwordHashService.hash(data.password);
        const { _id: id } = await this.userRepository.create({ ...data, password: hashedPassword });
        return { id };
    }
}
exports.default = RegisterUserService;
