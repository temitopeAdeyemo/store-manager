"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
const ProductRepository_1 = __importDefault(require("../models/repositories/ProductRepository"));
const http_status_codes_1 = require("http-status-codes");
class GetProductService {
    constructor() {
        this.productRepository = new ProductRepository_1.default();
    }
    async fetchOne(dataField, value) {
        const product = await this.productRepository.findByUniqueData(dataField, value, ['uploaded_by', 'category']);
        if (!product)
            throw new AppError_1.default(constants_1.default.CATEGORY_NOT_FOUND, http_status_codes_1.StatusCodes.BAD_REQUEST);
        if (product._doc) {
            const cr = product._doc.uploaded_by;
            cr.authorization_token = '';
        }
        return product._doc;
    }
    async fetchAll(filter) {
        const products = await this.productRepository.fetchAll(filter);
        return products;
    }
}
exports.default = GetProductService;
