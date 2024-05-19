"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneValidator = exports.getManyValidator = void 0;
const celebrate_1 = require("celebrate");
exports.getManyValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object().keys({
        product_name: celebrate_1.Joi.string().required(),
        product_code: celebrate_1.Joi.string()
            .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
            .message('product code can only be upper case letters, underscore and numbers')
            .required(),
        amount: celebrate_1.Joi.number().positive().required(),
        discount: celebrate_1.Joi.string()
            .pattern(/^[0-9]+$/)
            .message('Discount values can only be number.')
            .required(),
        category: celebrate_1.Joi.string()
            .pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
            .message('Invalid category')
            .required(),
    }),
});
exports.getOneValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object()
        .keys({
        product_code: celebrate_1.Joi.string()
            .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
            .message('Code can only be upper case letters, underscore and numbers')
            .required(),
        product_id: celebrate_1.Joi.string()
            .pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
            .required(),
    })
        .xor('product_code', 'product_id'),
    // .message('product code or id is required.'),
});
