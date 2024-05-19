"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
exports.default = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        password: celebrate_1.Joi.string()
            .pattern(/^[\w-]+$/)
            .message('Password can only be numbers, letters, hyphens and underscores.')
            .required(),
        email: celebrate_1.Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        }),
    },
});
