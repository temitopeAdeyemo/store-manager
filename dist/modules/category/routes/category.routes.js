"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_1 = __importDefault(require("../../../shared/middlewares/auth"));
const createCategory_validator_1 = __importDefault(require("../../category/validators/createCategory.validator"));
const deleteCategory_validator_1 = __importDefault(require("../validators/deleteCategory.validator"));
const updateCategory_validator_1 = __importDefault(require("../validators/updateCategory.validator"));
const getCategory_validator_1 = require("../validators/getCategory.validator");
const router = (0, express_1.Router)();
router.post('/create', createCategory_validator_1.default, auth_1.default, controllers_1.createCategory.create);
router.delete('/delete/:category_id', deleteCategory_validator_1.default, auth_1.default, controllers_1.deleteCategory.delete);
router.patch('/update/:category_id', updateCategory_validator_1.default, auth_1.default, controllers_1.updateCategory.update);
router.get('/single', getCategory_validator_1.getOneValidator, auth_1.default, controllers_1.getCategory.fetchOne);
router.get('/all', getCategory_validator_1.getManyValidator, auth_1.default, controllers_1.getCategory.fetchAll);
exports.default = router;
