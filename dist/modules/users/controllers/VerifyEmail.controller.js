"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VerifyEmailService_1 = __importDefault(require("../services/VerifyEmailService"));
class VerifyEmail {
    async sendOtp(req, res) {
        try {
            const { email } = req.body;
            const verifyEmailService = new VerifyEmailService_1.default();
            const otp = await verifyEmailService.execute({
                email,
            });
            return res.status(200).json({
                success: true,
                message: "Otp sent successsfully...",
                otp,
            });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async verifyOtp(req, res) {
        try {
            const { email, otp } = req.body;
            // const id = req.user;
            const verifyEmailService = new VerifyEmailService_1.default();
            const response = await verifyEmailService.execute2({
                email,
                otp,
            });
            return res.status(200).json({
                success: true,
                message: 'Email Verified successsfully...',
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
exports.default = VerifyEmail;
