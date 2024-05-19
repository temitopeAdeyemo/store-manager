"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VerifyLoginOtpService_1 = __importDefault(require("../services/VerifyLoginOtpService"));
class VerifyLogin {
    async verifyOtp(req, res) {
        try {
            const { otp, phone_number } = req.body;
            //   const id = req.user;
            const verifyLoginService = new VerifyLoginOtpService_1.default();
            const accessToken = await verifyLoginService.execute({
                phone_number,
                otp,
            });
            return res.status(200).json({
                success: true,
                message: 'Phone Verified successfully...',
                accessToken,
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
exports.default = VerifyLogin;
