"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
const CategoryRepository_1 = __importDefault(require("../models/repositories/CategoryRepository"));
const http_status_codes_1 = require("http-status-codes");
class CreateCategoryService {
    constructor() {
        this.categoryRepository = new CategoryRepository_1.default();
    }
    async execute(data) {
        const categoryExists = await this.categoryRepository.findByUniqueData('category_code', data.category_code);
        if (categoryExists)
            throw new AppError_1.default(constants_1.default.CATEGORY_EXISTS, http_status_codes_1.StatusCodes.CONFLICT);
        const { _id: id } = await this.categoryRepository.create(data);
        return { id };
    }
}
exports.default = CreateCategoryService;
