"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChangePinService_services_1 = __importDefault(require("../services/ChangePinService.services"));
class ChangePin {
    async update(req, res) {
        try {
            const { old_pin, new_pin, confirm_pin } = req.body;
            const id = req.user;
            const changePinService = new ChangePinService_services_1.default();
            await changePinService.execute({
                id,
                old_pin,
                new_pin,
                confirm_pin
            });
            return res.json({
                success: true,
                message: "Pin Changed successful",
            });
        }
        catch (error) {
            // console.log(error);
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.default = ChangePin;
