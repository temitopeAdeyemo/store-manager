"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
const CategoryRepository_1 = __importDefault(require("../models/repositories/CategoryRepository"));
const http_status_codes_1 = require("http-status-codes");
class GetCategoryService {
    constructor() {
        this.categoryRepository = new CategoryRepository_1.default();
    }
    async fetchOne(dataField, value) {
        const product = await this.categoryRepository.findByUniqueData(dataField, value);
        if (!product)
            throw new AppError_1.default(constants_1.default.CATEGORY_NOT_FOUND, http_status_codes_1.StatusCodes.BAD_REQUEST);
        return product._doc;
    }
    async fetchAll(filter) {
        const products = await this.categoryRepository.fetchAll(filter);
        return products;
    }
}
exports.default = GetCategoryService;