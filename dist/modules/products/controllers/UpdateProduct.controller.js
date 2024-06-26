"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const AppSuccess_1 = __importDefault(require("../../../shared/utils/AppSuccess"));
const http_status_codes_1 = require("http-status-codes");
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
class UpdateProduct {
    async update(req, res) {
        const { product_id } = req.params;
        const { product_code, product_name, discount, amount, category } = req.body;
        await new services_1.UpdateProductService().execute(product_id, { product_code, product_name, discount, amount, category });
        return res.status(http_status_codes_1.StatusCodes.OK).json(new AppSuccess_1.default(http_status_codes_1.StatusCodes.OK, constants_1.default.PRODUCT_UPDATED_SUCCESSFULLY));
    }
}
exports.default = new UpdateProduct();
