"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VerifyPhoneNumberService_1 = __importDefault(require("../services/VerifyPhoneNumberService"));
class VerifyPhoneNumber {
    async sendOtp(req, res) {
        try {
            const { phone_number } = req.body;
            const verifyPhoneNumberService = new VerifyPhoneNumberService_1.default();
            const otp = await verifyPhoneNumberService.execute({
                phone_number,
            });
            return res.status(200).json({
                success: true,
                message: "Otp sent successsfully...",
                phone_number,
                otp,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async verifyOtp(req, res) {
        try {
            const { otp, phone_number } = req.body;
            const verifyPhoneNumberService = new VerifyPhoneNumberService_1.default();
            const tempId = await verifyPhoneNumberService.execute2({
                phone_number,
                otp,
            });
            return res.status(200).json({
                success: true,
                message: "PhoneNumber Verified successsfully...",
                tempId,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.default = VerifyPhoneNumber;
