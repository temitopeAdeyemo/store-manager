"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateAvatarService_1 = __importDefault(require("../services/CreateAvatarService"));
class Avatar {
    async create(req, res) {
        try {
            const user_id = req.user;
            const file = req.file;
            const createCardHolderService = new CreateAvatarService_1.default();
            const response = await createCardHolderService.execute({
                user_id,
                file,
            });
            return res.status(201).json({
                success: true,
                message: 'Avatar updated successfully...',
                ...response,
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
exports.default = Avatar;
