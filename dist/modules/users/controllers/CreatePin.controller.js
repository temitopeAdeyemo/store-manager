"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreatePinService_services_1 = __importDefault(require("../services/CreatePinService.services"));
class CreatePin {
    async create(req, res) {
        try {
            const id = req.user;
            const { pin, confirm_pin } = req.body;
            const createPinService = new CreatePinService_services_1.default();
            const response = await createPinService.execute({
                id,
                pin,
                confirm_pin,
            });
            return res.json({
                success: true,
                message: "Pin Successfully Created...",
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
exports.default = CreatePin;
