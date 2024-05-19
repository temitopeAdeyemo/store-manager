"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonResponse {
    constructor(statusCode, message, data = null) {
        this.statusCode = statusCode;
        this.success = true;
        this.message = message;
        this.data = { ...data };
        // this.k()
        // return this;
    }
    k(req, res) {
        return res.status(200).json(this);
    }
}
exports.default = JsonResponse;
// export const jsonResponse = new JsonResponse();
