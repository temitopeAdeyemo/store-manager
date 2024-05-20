"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const AppSuccess_1 = __importDefault(require("../../../shared/utils/AppSuccess"));
const http_status_codes_1 = require("http-status-codes");
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
class CreateProduct {
    async create(req, res) {
        const { product_code, product_name, category, discount, amount, images, quantity } = req.body;
        const uploaded_by = req.user;
        const { id } = await new services_1.CreateProductService().execute({
            product_code,
            product_name,
            category,
            amount,
            uploaded_by,
            discount,
            images,
            quantity,
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(new AppSuccess_1.default(http_status_codes_1.StatusCodes.CREATED, constants_1.default.PRODUCT_CREATED_SUCCESSFULLY, { id }));
    }
}
exports.default = new CreateProduct();
