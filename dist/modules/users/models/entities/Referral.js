"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Referral = void 0;
const mongoose_1 = require("mongoose");
const referralSchema = new mongoose_1.Schema({
    referral: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    referree_phone_number: {
        type: String,
        required: true,
        unique: true,
    },
    referral_code: {
        type: String,
        required: true,
    },
    reward_claimed: {
        type: Boolean,
        default: false,
    },
    reward_amount: {
        type: String,
        required: true,
    },
});
exports.Referral = (0, mongoose_1.model)('Referral', referralSchema);
