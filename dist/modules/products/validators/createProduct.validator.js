"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
exports.default = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        product_name: celebrate_1.Joi.string()
            .pattern(/^[\w-]+$/)
            .message('Product Name can only be numbers, letters, hyphens and underscores.')
            .required(),
        product_code: celebrate_1.Joi.string()
            .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
            .message('Product Code can only be upper case letters, underscore and numbers')
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
