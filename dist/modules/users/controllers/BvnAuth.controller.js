"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BvnValidationService_services_1 = __importDefault(require("../services/BvnValidationService.services"));
class BvnAuth {
    async check(req, res) {
        try {
            //   const user_id = req.user;
            const { bvn } = req.body;
            const bvnValidationService = new BvnValidationService_services_1.default();
            const bvnExists = await bvnValidationService.execute2(bvn);
            return res.status(200).json({
                success: true,
                message: 'Bvn checked successfully.',
                bvnExists,
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
// deploy
exports.default = BvnAuth;
