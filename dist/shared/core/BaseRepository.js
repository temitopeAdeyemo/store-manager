"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
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
    async findByUniqueData(field, value, populateData) {
        const filter = {};
        filter[field] = value;
        (0, utils_1.cleanObjectData)(filter);
        const result = await this.model.findOne(filter).populate(populateData);
        return result;
    }
    async fetchAll(data, page, size, populateData) {
        const filter = data || {};
        (0, utils_1.cleanObjectData)(filter);
        console.log(page, size);
        // page = page ? Number(page) : 1;
        // size = size ? Number(size) : 5;
        const results = await this.model
            .find(filter)
            .limit(Number(size) || 5)
            .skip((Number(page) - 1) * Number(size))
            .sort({
            name: 'asc',
        })
            .populate(populateData);
        return results;
    }
    async updateById(_id, updateData) {
        (0, utils_1.cleanObjectData)(updateData);
        await this.model.updateOne({ _id }, updateData);
        return;
    }
    async deleteById(_id) {
        await this.model.deleteOne({ _id });
        return;
    }
    async deleteMany() {
        await this.model.deleteMany({});
        return;
    }
}
exports.default = BaseRepository;
