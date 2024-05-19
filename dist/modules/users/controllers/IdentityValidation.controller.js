"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IdValidation_services_1 = __importDefault(require("../services/IdValidation.services"));
class IdentityValidation {
    async validate(req, res) {
        try {
            const user_id = req.user;
            const { nin, vin, dl, ipn } = req.body;
            const bvnValidationService = new IdValidation_services_1.default();
            await bvnValidationService.execute({ user_id, nin, vin, dl, ipn });
            return res.status(200).json({
                success: true,
                message: 'Id Verified.',
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
exports.default = IdentityValidation;
