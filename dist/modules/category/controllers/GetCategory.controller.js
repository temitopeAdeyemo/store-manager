"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppSuccess_1 = __importDefault(require("../../../shared/utils/AppSuccess"));
const services_1 = require("../services");
const http_status_codes_1 = require("http-status-codes");
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
class GetCategory {
    async fetchOne(req, res) {
        const { category_id, category_code } = req.query;
        const category = await new services_1.GetCategoryService().fetchOne(category_id ? '_id' : 'category_code', category_id || category_code);
        return res.status(http_status_codes_1.StatusCodes.OK).json(new AppSuccess_1.default(http_status_codes_1.StatusCodes.OK, constants_1.default.CATEGORY_FETCHED_SUCCESSFULLY, category));
    }
    async fetchAll(req, res) {
        const { category_name, created_by, page, size } = req.query;
        const categories = await new services_1.GetCategoryService().fetchAll({ category_name, created_by }, page, size);
        return res.status(http_status_codes_1.StatusCodes.OK).json(new AppSuccess_1.default(http_status_codes_1.StatusCodes.OK, constants_1.default.CATEGORIES_FETCHED_SUCCESSFULLY, { categories }));
    }
}
exports.default = new GetCategory();
