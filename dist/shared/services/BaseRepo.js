"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @SchemaModel is the mongoose model interface to be used.
 * @CreateDataDTO is the insert/create method's data interface(DTO).
 * @E is a string type used in the get unique data method. E.g "_id"|"email"
 */
class BaseRepository {
    constructor(SchemaModel) {
        this.model = SchemaModel;
    }
    async create(data) {
        const result = await this.model.create(data);
        return result;
    }
    async save(model) {
        await model.save();
    }
    async findByUniqueData(field, value) {
        const filter = {};
        filter[field] = value;
        const result = await this.model.findOne(filter);
        return result;
    }
    async fetchAll(data) {
        const results = await this.model.find(data);
        return results;
    }
    async updateById(_id, updateData) {
        await this.model.updateOne({ _id }, updateData);
        return;
    }
    async deleteById(productId) {
        await this.model.deleteOne({ _id: productId });
        return;
    }
}
exports.default = BaseRepository;
