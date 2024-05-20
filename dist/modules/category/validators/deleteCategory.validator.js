"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
exports.default = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object().keys({
        category_id: celebrate_1.Joi.string()
            .required(),
    }),
});
