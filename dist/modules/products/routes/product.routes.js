"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_1 = __importDefault(require("../../../shared/middlewares/auth"));
const createProduct_validator_1 = __importDefault(require("../validators/createProduct.validator"));
const deleteProduct_validator_1 = __importDefault(require("../validators/deleteProduct.validator"));
const updateProduct_validator_1 = __importDefault(require("../validators/updateProduct.validator"));
const getProduct_validator_1 = require("../validators/getProduct.validator");
const router = (0, express_1.Router)();
router.post('/create', createProduct_validator_1.default, auth_1.default, controllers_1.createProduct.create);
router.delete('/delete', deleteProduct_validator_1.default, auth_1.default, controllers_1.deleteProduct.delete);
router.patch('/update', updateProduct_validator_1.default, auth_1.default, controllers_1.updateProduct.update);
router.get('/single', getProduct_validator_1.getOneValidator, auth_1.default, controllers_1.getProduct.fetchOne);
router.get('/all', getProduct_validator_1.getManyValidator, auth_1.default, controllers_1.getProduct.fetchAll);
exports.default = router;
