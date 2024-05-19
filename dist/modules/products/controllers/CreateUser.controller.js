"use strict";
// import { Request, Response, NextFunction } from 'express';
// import RegisterUserService from '../services/RegisterUserService';
// class CreateUser {
//   async create(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<Response> {
//     try {
//       const {
//         referral_code,
//         tempId,
//         first_name,
//         last_name,
//         password,
//         device_token,
//         phone_id,
//         email,
//         date_of_birth,
//         gender,
//         phone_number,
//         bvn,
//       } = req.body;
//       // console.log("THIS IS ON SIGN UP", req.body);
//       const registerUserService = new RegisterUserService();
//       const createUser = await registerUserService.execute({
//         tempId,
//         first_name,
//         last_name,
//         password,
//         referral_code,
//         email,
//         device_token,
//         phone_id,
//         date_of_birth,
//         gender,
//         phone_number,
//         bvn,
//       });
//       return res.status(201).json({
//         success: true,
//         message: 'User Successfully Created.',
//         createUser,
//       });
//     } catch (error: any) {
//       // next(error)
//       return res.status(error.statusCode || 500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }
// }
// export default CreateUser;
