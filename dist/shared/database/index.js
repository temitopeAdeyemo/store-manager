"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require dependencies
const mongoose_1 = __importDefault(require("mongoose"));
const environments_config_1 = __importDefault(require("../../config/environments.config"));
class Database {
    async connect() {
        try {
            mongoose_1.default.set('strictQuery', true);
            await mongoose_1.default.connect(environments_config_1.default.dburl);
            console.log('Database Connected');
        }
        catch (error) {
            console.log(error);
            throw new Error('Database not Connected');
        }
    }
}
exports.default = Database;
