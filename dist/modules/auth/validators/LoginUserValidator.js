"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
exports.default = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        password: celebrate_1.Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
            .message('Password must contain minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.')
            .required(),
        email: celebrate_1.Joi.string()
            .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
            .required(),
    },
});
