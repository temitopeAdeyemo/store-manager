"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email_verified: {
        type: Boolean,
        default: false,
    },
    authorization_token: { type: String },
}, {
    timestamps: true,
});
UserSchema.index({ id: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ email_verified: 1 });
exports.User = (0, mongoose_1.model)('User', UserSchema);
