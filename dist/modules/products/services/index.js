"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductService = exports.UpdateProductService = exports.DeleteProductService = exports.CreateProductService = void 0;
const CreateProduct_service_1 = __importDefault(require("./CreateProduct.service"));
exports.CreateProductService = CreateProduct_service_1.default;
const DeleteProduct_service_1 = __importDefault(require("./DeleteProduct.service"));
exports.DeleteProductService = DeleteProduct_service_1.default;
const GetProduct_service_1 = __importDefault(require("./GetProduct.service"));
exports.GetProductService = GetProduct_service_1.default;
const UpdateProduct_service_1 = __importDefault(require("./UpdateProduct.service"));
exports.UpdateProductService = UpdateProduct_service_1.default;
