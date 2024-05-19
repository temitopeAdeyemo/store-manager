"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWT_1 = __importDefault(require("../../shared/service/JWT"));
const AppError_1 = __importDefault(require("../../shared/utils/AppError"));
const UserRepository_1 = __importDefault(require("../../modules/auth/models/repositories/UserRepository"));
const auth = async (request, response, next) => {
    let token = request.headers['authorization'];
    if (!token)
        throw new AppError_1.default('No token provided', 401);
    token = token.replace('Bearer ', '');
    const { id } = new JWT_1.default().verifyAccessToken(token);
    const userRepository = new UserRepository_1.default();
    const user = await userRepository.findByUniqueData('_id', id);
    if (!user)
        throw new AppError_1.default('Not Authorised', 403);
    if (!user.authorization_token || user.authorization_token !== token)
        throw new AppError_1.default('Session Expired, Please Login.', 401);
    request.user = id;
    return next();
};
exports.default = auth;
