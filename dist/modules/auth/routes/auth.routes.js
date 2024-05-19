"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const LoginUserValidator_1 = __importDefault(require("../validators/LoginUserValidator"));
const signupValidator_1 = __importDefault(require("../validators/signupValidator"));
const router = (0, express_1.Router)();
router.post('/login', LoginUserValidator_1.default, controllers_1.loginUserController.login);
router.post('/register', signupValidator_1.default, controllers_1.createUserController.create);
exports.default = router;
