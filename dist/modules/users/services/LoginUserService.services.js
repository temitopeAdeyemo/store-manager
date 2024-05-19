'use strict';
// import ILoginDTO from '../dtos/ILoginDTO';
// import VerifiedUserRepository from '../models/repositories/VerifiedUserRepository';
// import UserRepository from '../models/repositories/UserRepository';
// import ICreateSessionDTO from '../dtos/ICreateSessionDTO';
// import AppError from '../../../shared/utils/AppError';
// import Bcrypt from '../../../shared/services/Bcrypt';
// import Jwt from '../../../shared/services/JWT';
// import SendSms from '../../../shared/services/SendSMS';
// import { generateOTP } from '../../../shared/utils';
// import OtpRepository from '../models/repositories/OtpRepository';
// import { Otp } from '../models/entities/Otp';
// import EmailService from '../../../shared/services/SendGrid';
// class LoginUserService {
//   private userRepository: UserRepository;
//   private verifiedUserRepository: VerifiedUserRepository;
//   private otpRepository: OtpRepository;
//   private bcrypt: Bcrypt;
//   private jwt: Jwt;
//   private sendSMS: SendSms;
//   constructor() {
//     this.userRepository = new UserRepository();
//     this.verifiedUserRepository = new VerifiedUserRepository();
//     this.otpRepository = new OtpRepository();
//     this.bcrypt = new Bcrypt();
//     this.jwt = new Jwt();
//     this.sendSMS = new SendSms();
//   }
//   async execute({
//     phone_number,
//     password,
//     phone_id,
//     device_token,
//   }: // phone_processor,
//   {
//     phone_number: string;
//     password: string;
//     phone_id: string;
//     device_token: string;
//     // phone_processor: string;
//   }): Promise<ICreateSessionDTO> {
//     const user = await this.userRepository.findByPhoneNumber(phone_number);
//     if (!user) {
//       throw new AppError('Incorrect Login Credentials', 401);
//     }
//     if (!user.phone_verified) {
//       throw new AppError(
//         'Phone number not verified, Please verify Phone number.',
//         401
//       );
//     }
//     const passwordMatch = await this.bcrypt.compare(password, user.password);
//     // const passwordMatch = password === process.env.DEFAULT_PASSWORD;
//     if (!passwordMatch) {
//       throw new AppError('Incorrect Login Credentials', 401);
//     }
//     if (!user.is_bvn_verified) {
//       const verifiedData =
//         await this.verifiedUserRepository.findByPhoneNumberAndEmail(user.email);
//       const validStatus = ['success', true, 'true'];
//       if (
//         !verifiedData ||
//         !validStatus.includes(verifiedData.verification_status)
//       ) {
//         throw new AppError(
//           'Bvn verification in progress. Try again in 1mins.\n Please contact support if this takes more than 1hour.',
//           401
//         );
//       }
//       await this.userRepository.update(user._id, { is_bvn_verified: true });
//     }
//     if (user.phone_id !== phone_id) {
//       await this.otpRepository.deleteUserOtp(
//         phone_number,
//         'LOGIN_VERIFICATION'
//       );
//       const otp = generateOTP();
//       const payload = {
//         user: user.phone_number,
//         otp,
//         for: 'LOGIN_VERIFICATION',
//       };
//       await this.otpRepository.create(payload);
//       this.sendSMS.sendLoginVerificationOtp(user.phone_number, otp);
//       return {
//         access_token: '',
//         message:
//           'New phone detected, Please verify with otp sent to your phone...',
//       };
//     }
//     if (device_token !== user.device_token) {
//       this.userRepository.update(user._id, { device_token });
//     }
//     const access_token = await this.jwt.generateAccessToken({
//       _id: user._id,
//       device_id: user.phone_id,
//       bvnVerificationStatus: user.is_bvn_verified,
//     });
//     await this.userRepository.update(user._id, { authorization_token: access_token });
//     // if (user.email) {
//     //   new EmailService().sendEmail(
//     //     [user.email],
//     //     'New Login Alert.',
//     //     'A new login has been detected, If this is not you, Please update your password.'
//     //   );
//     // }
//     return { access_token };
//   }
// }
// export default LoginUserService;
