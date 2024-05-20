"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = __importDefault(require("../../../shared/utils/AppSuccess"));
const services_1 = require("../services");
const http_status_codes_1 = require("http-status-codes");
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
class GetProduct {
    async fetchOne(req, res) {
        const { product_id, product_code } = req.query;
        const product = await new services_1.GetProductService().fetchOne(product_id ? '_id' : 'product_code', (product_id || product_code));
        return res.status(http_status_codes_1.StatusCodes.OK).json(new AppSuccess_1.default(http_status_codes_1.StatusCodes.OK, constants_1.default.CATEGORY_FETCHED_SUCCESSFULLY, product));
    }
    async fetchAll(req, res) {
        const { product_name, uploaded_by, category, amount, discount } = req.query;
        const products = await new services_1.GetProductService().fetchAll({ product_name, uploaded_by, category, amount, discount });
        return res.status(http_status_codes_1.StatusCodes.OK).json(new AppSuccess_1.default(http_status_codes_1.StatusCodes.OK, constants_1.default.PRODUCTS_FETCHED_SUCCESSFULLY, { products }));
    }
}
exports.default = new GetProduct();
