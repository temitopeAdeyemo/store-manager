"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Referral_1 = require("../entities/Referral");
const mongoose_1 = __importDefault(require("mongoose"));
class ReferralRepository {
    constructor() {
        this.referral = Referral_1.Referral;
    }
    async create(data) {
        const referral = await this.referral.create(data);
        return referral;
    }
    async fetchedUnClaimed(userId) {
        const unclaimedReferralReward = await this.referral.find({
            reward_claimed: false,
            referral: userId,
        });
        return unclaimedReferralReward;
    }
    async getUnclaimedTotalAmountAndTotalRef(userId) {
        let unclaimedTotalAmountAndTotalRef = await this.referral.aggregate([
            {
                $match: {
                    referral: new mongoose_1.default.Types.ObjectId(userId),
                },
            },
            {
                $group: {
                    _id: null,
                    totalReferrals: { $sum: 1 },
                    totalUnclaimedAmount: {
                        $sum: {
                            $cond: [
                                { $eq: ['$reward_claimed', false] },
                                { $toDouble: '$reward_amount' },
                                0,
                            ],
                        },
                    },
                },
            },
        ]);
        if (!unclaimedTotalAmountAndTotalRef.length) {
            return { _id: null, totalReferrals: 0, totalUnclaimedAmount: 0 };
        }
        return unclaimedTotalAmountAndTotalRef[0];
    }
    async findByReferree(referree_phone_number) {
        const referee = await this.referral.findOne({ referree_phone_number });
        return referee;
    }
    async findByReferralId(referral_code) {
        const referral = await this.referral.find({ referral_code });
        return referral;
    }
    async findByReferral(phone_number) {
        const referral = await this.referral.find({ phone_number });
        return referral;
    }
    async updateClaimedToTrue(userId) {
        await this.referral.updateMany({ referral: userId }, { reward_claimed: true });
        return;
    }
}
exports.default = ReferralRepository;
