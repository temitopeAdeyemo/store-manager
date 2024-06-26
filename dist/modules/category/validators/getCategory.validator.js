"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneValidator = exports.getManyValidator = void 0;
const celebrate_1 = require("celebrate");
exports.getManyValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object().keys({
        category_name: celebrate_1.Joi.string(),
        page: celebrate_1.Joi.string(),
        size: celebrate_1.Joi.string(),
        category_code: celebrate_1.Joi.string()
            .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
            .message('Code can only be upper case letters, underscore and numbers'),
        discount: celebrate_1.Joi.string()
            .pattern(/^[0-9]+$/)
            .message('Discount values can only be number.'),
        created_by: celebrate_1.Joi.string().pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
    }),
});
exports.getOneValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object()
        .keys({
        category_code: celebrate_1.Joi.string()
            .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
            .message('Code can only be upper case letters, underscore and numbers'),
        category_id: celebrate_1.Joi.string(),
    })
        .xor('category_code', 'category_id'),
});
