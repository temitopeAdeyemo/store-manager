"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
const services_1 = require("../../category/services");
const ProductRepository_1 = __importDefault(require("../models/repositories/ProductRepository"));
const http_status_codes_1 = require("http-status-codes");
class CreateProductService {
    constructor() {
        this.productRepository = new ProductRepository_1.default();
        this.getCategoryService = new services_1.GetCategoryService();
    }
    async execute(data) {
        await this.getCategoryService.fetchOne('_id', data.category);
        const productExists = await this.productRepository.findByUniqueData('product_code', data.product_code);
        if (productExists)
            throw new AppError_1.default(constants_1.default.CATEGORY_EXISTS, http_status_codes_1.StatusCodes.CONFLICT);
        const { _id: id } = await this.productRepository.create(data);
        return { id };
    }
}
exports.default = CreateProductService;
