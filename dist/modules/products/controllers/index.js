"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.getProduct = exports.createProduct = void 0;
const CreateProduct_conroller_1 = __importDefault(require("./CreateProduct.conroller"));
exports.createProduct = CreateProduct_conroller_1.default;
const DeleteProduct_controller_1 = __importDefault(require("./DeleteProduct.controller"));
exports.deleteProduct = DeleteProduct_controller_1.default;
const GetProduct_controller_1 = __importDefault(require("./GetProduct.controller"));
exports.getProduct = GetProduct_controller_1.default;
const UpdateProduct_controller_1 = __importDefault(require("./UpdateProduct.controller"));
exports.updateProduct = UpdateProduct_controller_1.default;
