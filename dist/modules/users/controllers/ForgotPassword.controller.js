"use strict";
// import { Request, Response } from "express";
// import ForgotPasswordService from "../services/ForgotPasswordService.services"
// class ForgotPassword {
//   async sendOtp(req: Request, res: Response): Promise<Response> {
//     try {
//       const { phone_number } = req.body;
//       const forgotPasswordService = new ForgotPasswordService();
//       const verifyPhoneNumber = await forgotPasswordService.execute({
//         phone_number,
//       });
//       return res.status(200).json({
//         success: true,
//         message: "Otp sent successsfully...",
//         verifyPhoneNumber,
//       });
//     } catch (error: any) {
//       return res.status(error.statusCode || 500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }
// }
// export default ForgotPassword;
