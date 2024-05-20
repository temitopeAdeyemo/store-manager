"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneValidator = exports.getManyValidator = void 0;
const celebrate_1 = require("celebrate");
exports.getManyValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object().keys({
        product_name: celebrate_1.Joi.string(),
        product_code: celebrate_1.Joi.string()
            .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
            .message('product code can only be upper case letters, underscore and numbers'),
        amount: celebrate_1.Joi.number().positive(),
        discount: celebrate_1.Joi.string()
            .pattern(/^[0-9]+$/)
            .message('Discount values can only be number.'),
        category: celebrate_1.Joi.string(),
        uploaded_by: celebrate_1.Joi.string(),
        quantity: celebrate_1.Joi.string(),
        images: celebrate_1.Joi.string(),
        availability_status: celebrate_1.Joi.string(),
    }),
});
exports.getOneValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object()
        .keys({
        product_code: celebrate_1.Joi.string()
            .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
            .message('Code can only be upper case letters, underscore and numbers'),
        product_id: celebrate_1.Joi.string(),
    })
        .xor('product_code', 'product_id'),
});
