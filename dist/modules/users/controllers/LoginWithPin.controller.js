"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoginWithPinService_services_1 = __importDefault(require("../services/LoginWithPinService.services"));
class LoginWithPin {
    async session(req, res) {
        try {
            const { pin, phone_number, device_token } = req.body;
            const loginWithPinService = new LoginWithPinService_services_1.default();
            const token = await loginWithPinService.execute({
                phone_number,
                pin,
                device_token,
            });
            return res.status(200).json({
                success: true,
                message: "login successful",
                token,
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
exports.default = LoginWithPin;
