"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../entities/Product");
const BaseRepository_1 = __importDefault(require("../../../../shared/core/BaseRepository"));
class ProductRepository extends BaseRepository_1.default {
    constructor() {
        super(Product_1.Product);
        this.product = Product_1.Product;
    }
    async save(model) {
        await model.save();
    }
    async findByCategory(category_id) {
        const products = await this.product.find({ category: category_id });
        return products;
    }
    async findByUploader(uploaderId) {
        const products = await this.product.find({ uploaded_by: uploaderId });
        return products;
    }
}
exports.default = ProductRepository;
