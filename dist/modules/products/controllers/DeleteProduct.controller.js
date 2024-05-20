"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = __importDefault(require("../../../shared/utils/AppSuccess"));
const services_1 = require("../services");
const http_status_codes_1 = require("http-status-codes");
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
class DeleteProduct {
    async delete(req, res) {
        const { product_id } = req.params;
        await new services_1.DeleteProductService().execute(product_id);
        return res.status(http_status_codes_1.StatusCodes.OK).json(new AppSuccess_1.default(http_status_codes_1.StatusCodes.OK, constants_1.default.PRODUCT_DELETED_SUCCESSFULLY));
    }
}
exports.default = new DeleteProduct();
