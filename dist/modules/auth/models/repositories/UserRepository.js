"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const BaseRepository_1 = __importDefault(require("../../../../shared/core/BaseRepository"));
class UserRepository extends BaseRepository_1.default {
    constructor() {
        super(User_1.User);
    }
}
exports.default = UserRepository;
