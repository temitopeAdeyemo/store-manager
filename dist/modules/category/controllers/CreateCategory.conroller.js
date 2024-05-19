"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const AppSuccess_1 = __importDefault(require("../../../shared/utils/AppSuccess"));
const http_status_codes_1 = require("http-status-codes");
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
class CreateCategory {
    async create(req, res) {
        const { category_code, category_name, discount } = req.body;
        const { id } = await new services_1.CreateCategoryService().execute({ category_code, category_name, created_by: req.user, discount });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(new AppSuccess_1.default(http_status_codes_1.StatusCodes.CREATED, constants_1.default.CATEGORY_CREATED_SUCCESSFULLY, { id }));
    }
}
exports.default = new CreateCategory();
