"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
exports.default = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object()
        .keys({
        category_name: celebrate_1.Joi.string()
            .pattern(/^[\w-]+$/)
            .message('Name can only be numbers, letters, hyphens and underscores.'),
        category_code: celebrate_1.Joi.string()
            .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
            .message('Code can only be upper case letters, underscore and numbers'),
        discount: celebrate_1.Joi.string()
            .pattern(/^[0-9]+$/)
            .message('Discount values can only be number.'),
    }),
    // .xor('category_name', 'category_code', 'discount'),
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object().keys({
        category_id: celebrate_1.Joi.string().required(),
    }),
});
