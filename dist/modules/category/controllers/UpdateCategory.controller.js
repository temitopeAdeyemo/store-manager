"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const AppSuccess_1 = __importDefault(require("../../../shared/utils/AppSuccess"));
const http_status_codes_1 = require("http-status-codes");
const constants_1 = __importDefault(require("../../../shared/utils/constants"));
class UpdateCategory {
    async update(req, res) {
        const { id } = req.params;
        const { category_code, category_name, discount } = req.body;
        await new services_1.UpdateCategoryService().execute(id, { category_code, category_name, discount });
        return res.status(http_status_codes_1.StatusCodes.OK).json(new AppSuccess_1.default(http_status_codes_1.StatusCodes.OK, constants_1.default.CATEGORY_UPDATED_SUCCESSFULLY, { id }));
    }
}
exports.default = new UpdateCategory();
