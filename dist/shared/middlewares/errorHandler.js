"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
// import { AxiosError, isAxiosError } from 'axios';
const AppError_1 = __importDefault(require("../utils/AppError"));
// import { MulterError } from 'multer';
// import { BaseError, QueryError, ValidationError } from 'sequelize';
function errorHandler(error, request, response, _) {
    console.log(error);
    if (error instanceof AppError_1.default) {
        return response.status(error.statusCode).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
    if (error instanceof celebrate_1.CelebrateError) {
        const bodyMessage = error.details.get('body')?.message;
        const queryMessage = error.details.get('query')?.message;
        const paramsMessage = error.details.get('params')?.message;
        const headersMessage = error.details.get('headers')?.message;
        return response.status(400).json({
            success: false,
            message: bodyMessage || queryMessage || paramsMessage || headersMessage,
            data: null,
        });
    }
    return response.status(500).json({
        success: false,
        message: 'Internal server error',
        data: null,
    });
}
exports.default = errorHandler;
