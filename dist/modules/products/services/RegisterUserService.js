"use strict";
// import UserRepository from '../models/repositories/UserRepository';
// import OtpRepository from '../models/repositories/OtpRepository';
// import ICreateUserDTO from '../dtos/ICreateUserDTO';
// import IPhoneNumberDTO from '../dtos/IPhoneNumberDTO';
// import AppError from '../../../shared/utils/AppError';
// import Bcrypt from '../../../shared/services/Bcrypt';
// import Notification from '../../../shared/services/Firebase';
// import SMS from '../../../shared/services/SendSMS';
// import EmailService from '../../../shared/services/SendGrid';
// import { generateOTP } from '../../../shared/utils';
// import BvnService from './BvnValidationService.services';
// import config from '../../../config/environment';
// import E_D from '../../../shared/Helpers/Encryption-decryption';
// import redis from '../../../shared/services/Redis';
// import ReferralRepository from '../models/repositories/ReferralRepository';
// class RegisterUserService {
//   private userRepository: UserRepository;
//   private otpRepository: OtpRepository;
//   private bcrypt: Bcrypt;
//   private emailService: EmailService;
//   private sms: SMS;
//   private notification: Notification;
//   private bvnService: BvnService;
//   private encryptDecrypt: E_D;
//   private referralRepository: ReferralRepository;
//   constructor() {
//     this.userRepository = new UserRepository();
//     this.bcrypt = new Bcrypt();
//     this.otpRepository = new OtpRepository();
//     this.emailService = new EmailService();
//     this.sms = new SMS();
//     this.notification = new Notification();
//     this.bvnService = new BvnService();
//     this.encryptDecrypt = new E_D();
//     this.referralRepository = new ReferralRepository();
//   }
//   async execute({
//     tempId,
//     // email,
//     first_name,
//     last_name,
//     password,
//     referral_code,
//     phone_id,
//     phone_number,
//     // phone_processor,
//     device_token,
//     // date_of_birth,
//     // gender,
//     bvn,
//   }: ICreateUserDTO): Promise<IPhoneNumberDTO> {
//     if (config.blacklistedBvn?.split(',').includes(bvn)) {
//       throw new AppError(`Error.`);
//     }
//     const savedData = await this.otpRepository.findById(tempId);
//     const phoneNumberExists = await this.userRepository.findByPhoneNumber(
//       phone_number
//     );
//     const bvnExists = await this.bvnService.execute2(bvn);
//     if (bvnExists) {
//       throw new AppError(`bvn already used to register another user.`);
//     }
//     if (phoneNumberExists) {
//       throw new AppError(`${phone_number} already exists...`);
//     }
//     if (!savedData || savedData.for !== 'COMPLETE_REGISTRATION') {
//       throw new AppError('Invalid tempId...', 401);
//     }
//     const hashedPassword = await this.bcrypt.hash(password);
//     // console.log("savedData", savedData);
//     const encryptedBvn = this.encryptDecrypt.encryptData(bvn);
//     // const referralId = generateReferralId();
//     let newWord = '';
//     for (let i of encryptedBvn.split('')) {
//       if (newWord.length > 3) break;
//       if (encryptedBvn.indexOf(i) % 2 === 0) continue;
//       if (encryptedBvn.indexOf(i) === 5) i = encryptedBvn[2];
//       if (encryptedBvn.indexOf(i) === 9) i = encryptedBvn[4];
//       newWord = newWord + i;
//     }
//     // userData.   referral_code = `${first_name}-${newWord}`;
//     const userData = {
//       first_name: first_name.trim(),
//       last_name: last_name.trim(),
//       phone_number,
//       password: hashedPassword,
//       referral_code: `${first_name.trim()}-${newWord}`.toUpperCase(),
//       phone_id,
//       // phone_processor,
//       device_token,
//       // email: savedData.user,
//       // date_of_birth,
//       // gender,
//       bvn: encryptedBvn,
//       ...savedData.data,
//       // email_verified: savedData.data?.email_verified,
//     };
//     let referral;
//     if (referral_code)
//       referral = await this.userRepository.findByReferralId(referral_code);
//     // if (  referral_code && !referral)
//     //   throw new AppError('Invalid Referral code.');
//     if (referral_code && referral) {
//       const referralRewardData = {
//         referral: referral._id,
//         referree_phone_number: phone_number,
//         referral_code,
//         reward_amount: process.env.REFERRAL_REWARD_AMOUNT,
//       };
//       const referred = await this.referralRepository.findByReferree(
//         phone_number
//       );
//       if (!referred) await this.referralRepository.create(referralRewardData);
//     }
//     await this.userRepository.create(userData);
//     const otp = generateOTP();
//     const hashedOtp = await this.bcrypt.hash(otp);
//     redis.set(`verify-number:${phone_number}`, hashedOtp, 15 * 60);
//     console.log('This is registered phone number', phone_number);
//     this.sms.sendVerifcationOtp(phone_number, otp);
//     await this.otpRepository.delete(tempId);
//     this.notification.sendWelcomeMessage(device_token);
//     this.emailService.sendWelcomeMail([savedData.user], first_name);
//     return { phone_number, referral_code, email: savedData.user };
//   }
// }
// export default RegisterUserService;
