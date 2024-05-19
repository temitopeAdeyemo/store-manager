"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../modules/auth/routes/auth.routes"));
const category_routes_1 = __importDefault(require("../modules/category/routes/category.routes"));
const product_routes_1 = __importDefault(require("../modules/products/routes/product.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/category', category_routes_1.default);
router.use('/product', product_routes_1.default);
exports.default = router;
