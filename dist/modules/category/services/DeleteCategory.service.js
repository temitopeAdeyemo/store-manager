"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryRepository_1 = __importDefault(require("../models/repositories/CategoryRepository"));
const GetCategory_service_1 = __importDefault(require("./GetCategory.service"));
class DeleteCategoryService {
    constructor() {
        this.getCategoryService = new GetCategory_service_1.default();
        this.categoryRepository = new CategoryRepository_1.default();
    }
    async execute(id) {
        await this.getCategoryService.fetchOne('_id', id);
        await this.categoryRepository.deleteById(id);
        return;
    }
}
exports.default = DeleteCategoryService;
