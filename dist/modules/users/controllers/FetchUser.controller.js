"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FetchUsersService_services_1 = __importDefault(require("../services/FetchUsersService.services"));
class FetchUser {
    async fetch(req, res) {
        try {
            const _id = req.user;
            const fetchUserService = new FetchUsersService_services_1.default();
            const response = await fetchUserService.execute({
                _id,
            });
            return res.status(200).json({
                success: true,
                message: 'User fetched successsfully...',
                response,
            });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async fetch_all(req, res) {
        try {
            const fetchUserService = new FetchUsersService_services_1.default();
            const response = await fetchUserService.execute2();
            return res.status(200).json({
                success: true,
                message: 'Users fetched successsfully...',
                response,
            });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.default = FetchUser;
