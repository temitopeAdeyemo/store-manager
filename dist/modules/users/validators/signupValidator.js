"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
exports.default = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        phone_number: celebrate_1.Joi.string(),
        email: celebrate_1.Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
    },
});
