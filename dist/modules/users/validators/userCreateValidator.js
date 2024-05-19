"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
exports.default = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        tempId: celebrate_1.Joi.string().required(),
        first_name: celebrate_1.Joi.string().required(),
        last_name: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().min(8).required(),
        referral_code: celebrate_1.Joi.string().allow("", null),
        phone_id: celebrate_1.Joi.string(),
        // phone_id: Joi.string().required(),
        // device_token: Joi.string().required(),
        device_token: celebrate_1.Joi.string(),
        // email: Joi.string().required(),
        date_of_birth: celebrate_1.Joi.date(),
        gender: celebrate_1.Joi.string(),
        bvn: celebrate_1.Joi.string().required().length(11),
        phone_number: celebrate_1.Joi.string().required().min(10).max(14),
    }),
});
