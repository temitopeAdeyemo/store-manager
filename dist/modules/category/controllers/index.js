"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = exports.updateCategory = exports.deleteCategory = exports.createCategory = void 0;
const CreateCategory_conroller_1 = __importDefault(require("./CreateCategory.conroller"));
exports.createCategory = CreateCategory_conroller_1.default;
const DeleteCategory_controller_1 = __importDefault(require("./DeleteCategory.controller"));
exports.deleteCategory = DeleteCategory_controller_1.default;
const GetCategory_controller_1 = __importDefault(require("./GetCategory.controller"));
exports.getCategory = GetCategory_controller_1.default;
const UpdateCategory_controller_1 = __importDefault(require("./UpdateCategory.controller"));
exports.updateCategory = UpdateCategory_controller_1.default;
