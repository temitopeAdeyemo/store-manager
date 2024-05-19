"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReferralService_1 = __importDefault(require("../services/ReferralService"));
class WithdrawReferralReward {
    async withdraw(req, res) {
        try {
            const _id = req.user;
            const referralService = new ReferralService_1.default();
            const response = await referralService.claimReferral({
                userId: _id,
            });
            return res.status(200).json({
                success: true,
                message: 'Referrals rewards withdrawn successsfully...',
                response,
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
exports.default = WithdrawReferralReward;
