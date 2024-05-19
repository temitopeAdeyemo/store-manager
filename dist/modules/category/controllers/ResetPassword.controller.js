"use strict";
// import { Request, Response } from "express";
// import ResetPasswordService from "../services/ResetPasswordService";
// class ResetPassword {
//   async reset(req: Request, res: Response): Promise<Response> {
//     try {
//       const { phone_number, otp, password, confirmPassword } = req.body;
//       const resetPasswordService = new ResetPasswordService();
//       await resetPasswordService.execute({
//         phone_number,
//         otp,
//         password,
//         confirmPassword,
//       });
//       return res.json({
//         success: true,
//         message: "password updated successfully",
//       });
//     } catch (error: any) {
//       return res.status(error.statusCode || 500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }
// }
// export default ResetPassword;
