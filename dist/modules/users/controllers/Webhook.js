"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const DojaWebhookService_1 = __importDefault(require("../services/DojaWebhookService"));
const Encryption_decryption_1 = __importDefault(require("../../../shared/Helpers/Encryption-decryption"));
class DojaWebhook {
    async authBvnData(req, res) {
        try {
            console.log(req.body);
            const { metadata: { phone_number: phast_phone_number, email: phast_email }, governmentData: { title, nationality, bvn, first_name, middle_name, last_name, date_of_birth, phone_number1, phone_number2, gender, enrollment_bank, enrollment_branch, 
            // email,
            lga_of_origin, lga_of_residence, marital_status, nin, //: "",
            name_on_card, residential_address, state_of_origin, state_of_residence, watch_listed, level_of_account, registration_date, customer, image_url, }, idType, value, message, referenceId, verificationMode, verificationType, verificationValue, verificationUrl, selfieUrl, status, aml: { status: aml_status }, verificationStatus, } = req.body;
            const dojaWebhookService = new DojaWebhookService_1.default();
            await dojaWebhookService.execute({
                bvn,
                first_name,
                last_name,
                middle_name,
                gender,
                date_of_birth,
                phone_number: phast_phone_number.trim(),
                email: phast_email.trim(),
                country: nationality,
                status,
                verification_url: verificationUrl,
                verification_id: referenceId,
                government_data: req.body.governmentData,
                metadata: new Encryption_decryption_1.default().encryptData(JSON.stringify(req.body)),
            });
            return res.status(200).json({
                message: 'success',
            });
        }
        catch (error) {
            console.log(error);
            if (error instanceof AppError_1.default) {
                return res.status(error.statusCode || 500).json({
                    success: false,
                    ...error,
                });
            }
            return res.status(error.statusCode || 500).json({
                success: false,
                message: 'Retry.',
            });
        }
    }
}
exports.default = DojaWebhook;
