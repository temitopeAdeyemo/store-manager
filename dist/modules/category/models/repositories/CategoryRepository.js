"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../entities/Category");
const BaseRepository_1 = __importDefault(require("../../../../shared/core/BaseRepository"));
class CategoryRepository extends BaseRepository_1.default {
    constructor() {
        super(Category_1.Category);
        this.category = Category_1.Category;
    }
    async findByUploader(uploaderId) {
        const categories = await this.category.find({ created_by: uploaderId });
        return categories;
    }
}
exports.default = CategoryRepository;
