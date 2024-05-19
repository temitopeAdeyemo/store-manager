"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductRepository_1 = __importDefault(require("../models/repositories/ProductRepository"));
const GetProduct_service_1 = __importDefault(require("./GetProduct.service"));
class UpdateProductService {
    constructor() {
        this.getProductService = new GetProduct_service_1.default();
        this.productRepository = new ProductRepository_1.default();
    }
    async execute(id, updateData) {
        await this.getProductService.fetchOne('_id', id);
        await this.productRepository.updateById(id, updateData);
        return;
    }
}
exports.default = UpdateProductService;
