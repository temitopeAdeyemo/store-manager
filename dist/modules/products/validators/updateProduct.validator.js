"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
exports.default = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object()
        .keys({
        product_name: celebrate_1.Joi.string()
            .pattern(/^[\w-]+$/)
            .message('Product name can only be numbers, letters, hyphens and underscores.'),
        product_code: celebrate_1.Joi.string()
            .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
            .message('Product Code can only be upper case letters, underscore and numbers'),
        amount: celebrate_1.Joi.number().positive(),
        discount: celebrate_1.Joi.string()
            .pattern(/^[0-9]+$/)
            .message('Discount values can only be number.'),
        category: celebrate_1.Joi.string(),
        quantity: celebrate_1.Joi.string(),
        images: celebrate_1.Joi.string(),
        availability_status: celebrate_1.Joi.string(),
    })
        .xor('product_name', 'product_code', 'amount', 'discount', 'category'),
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object().keys({
        product_id: celebrate_1.Joi.string().required(),
    }),
});
