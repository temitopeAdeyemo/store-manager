"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    product_name: {
        type: String,
        required: true,
        unique: true,
    },
    product_code: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    amount: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
        default: '0.00',
    },
    quantity: {
        type: String,
    },
    availability_status: {
        type: String,
        enum: ['AVAILABLE', 'OUT OF STOCK'],
        default: 'AVAILABLE',
    },
    images: {
        type: String,
        default: '/',
    },
    uploaded_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});
productSchema.post('find', function (docs) {
    for (const doc of docs) {
        if (doc?._doc) {
            doc._doc._id = doc._doc._id.toString();
            delete doc._doc.__v;
        }
    }
});
productSchema.post('findOne', function (doc) {
    if (doc?._doc) {
        doc._doc._id = doc._doc._id.toString();
        delete doc._doc.__v;
    }
    return doc;
});
productSchema.index({ id: 1 });
productSchema.index({ product_code: 1 });
productSchema.index({ uploaded_by: 1 });
productSchema.index({ category: 1 });
productSchema.index({ availability_status: 1 });
productSchema.index({ product_name: 1, amount: 1, discount: 1, availability_status: 1 });
exports.Product = (0, mongoose_1.model)('Product', productSchema);
