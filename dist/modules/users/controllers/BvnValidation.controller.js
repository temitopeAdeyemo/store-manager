"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BvnValidationService_services_1 = __importDefault(require("../services/BvnValidationService.services"));
class BvnValidation {
    async validate(req, res) {
        try {
            const user_id = req.user;
            const { validation_type, value } = req.body;
            const bvnValidationService = new BvnValidationService_services_1.default();
            await bvnValidationService.execute({ user_id, validation_type, value });
            return res.status(200).json({
                success: true,
                message: 'Bvn Verified.',
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
// deploy
exports.default = BvnValidation;
