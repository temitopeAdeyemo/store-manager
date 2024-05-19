"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../entities/Category");
class CategoryRepository {
    constructor() {
        this.category = Category_1.Category;
    }
    async create(data) {
        const category = await this.category.create(data);
        return category;
    }
    async findByUploader(uploaderId) {
        const categorys = await this.category.find({ created_by: uploaderId });
        return categorys;
    }
    async findByUniqueData(field, value) {
        const filter = {};
        filter[field] = value;
        const category = await this.category.findOne(filter);
        return category;
    }
    async fetchAll(data) {
        const categorys = await this.category.find(data);
        return categorys;
    }
    async updateCategory(categoryId, updateData) {
        await this.category.updateOne({ category: categoryId }, updateData);
        return;
    }
    async deleteCategory(categoryId) {
        await this.category.deleteOne({ _id: categoryId });
        return;
    }
}
exports.default = CategoryRepository;
