"use strict";
// import { Router } from "express";
// import VerifyEmail from "../controllers/VerifyEmail.controller";
// import CreatePin from "../controllers/CreatePin.controller";
// import ChangePin from "../controllers/ChangePin.controller";
// import VerifyPhoneNumber from "../controllers/VerifyPhoneNumber.controller";
// import BvnValidation from "../controllers/BvnValidation.controller";
// import CreateUser from "../controllers/CreateUser.controller";
// import ForgetPassword from "../controllers/ForgotPassword.controller";
// import LoginUser from "../controllers/LoginUser.controller";
// import LoginWithPin from "../controllers/LoginWithPin.controller";
// import ResetPassword from "../controllers/ResetPassword.controller";
// import ChangePassword from "../controllers/ChangePassword.controller";
// import VerifyLogin from "../controllers/VerifyLogin.controller";
// import BvnAuth from '../controllers/BvnAuth.controller';
// import DojaWebhook from "../controllers/Webhook";
// import IdentityValidation from '../controllers/IdentityValidation.controller';
// import validateLoginUser from "../validators/loginValidator";
// import validateId from '../validators/validateId';
// import validateCreateUser from "../validators/userCreateValidator";
// import validatePhoneNumber from "../validators/phoneNumberValidator";
// import pinValidator from "../validators/pinValidator";
// import validateBvn from "../validators/validateBvn";
// import validateResetPassword from "../validators/resetPasswordValidator";
// import verifyPhoneNumberValidator from "../validators/verifyPhoneNumberValidator";
// import changePasswordValidator from "../validators/changePasswordValidator";
// import emailValidator from "../validators/emailValidator";
// import changePinValidator from "../validators/changePinValidator";
// import pinLoginValidator from "../validators/pinLoginValidator";
// import otpValidator from "../validators/otpValidator";
// import auth from "../../../shared/middlewares/auth";
// const router = Router();
// const verifyPhoneNumber = new VerifyPhoneNumber();
// const verifyEmail = new VerifyEmail();
// const createUser = new CreateUser();
// const bvnValidation = new BvnValidation();
// const login = new LoginUser();
// const forgetPassword = new ForgetPassword();
// const resetPassword = new ResetPassword();
// const changePassword = new ChangePassword();
// const createPin = new CreatePin();
// const changePin = new ChangePin();
// const loginWithPin = new LoginWithPin();
// const verifyLogin = new VerifyLogin();
// const bvn = new BvnAuth();
// const webhook = new DojaWebhook();
// const identityValidation = new IdentityValidation();
// router.post("/", validateCreateUser, createUser.create);
// router.get("/bvnValidation",auth, validateBvn, bvnValidation.validate);
// router.post("/login", validateLoginUser, login.session);
// router.post("/forgotPassword", validatePhoneNumber, forgetPassword.sendOtp);
// router.patch("/resetPassword", validateResetPassword, resetPassword.reset);
// router.post("/phoneNumber", validatePhoneNumber, verifyPhoneNumber.sendOtp);
// router.post(
//   "/verifyPhoneNumber",
//   verifyPhoneNumberValidator,
//   verifyPhoneNumber.verifyOtp
// );
// router.patch(
//   "/changePassword",
//   auth,
//   changePasswordValidator,
//   changePassword.update
// );
// router.post("/verifyEmail", emailValidator, verifyEmail.sendOtp);
// router.patch("/verifyEmail", otpValidator, verifyEmail.verifyOtp);
// router.post("/createPin", auth, pinValidator, createPin.create);
// router.patch("/changePin", auth, changePinValidator, changePin.update);
// router.post("/loginWithPin", pinLoginValidator, loginWithPin.session);
// router.post("/verifyLogin", verifyPhoneNumberValidator, verifyLogin.verifyOtp);
// router.post("/bvn-check", validateId, bvn.check);
// router.get('/gov-identity', auth, validateId, identityValidation.validate);
// router.post('/gov-identity', bvnValidation.validate);
// router.post("/wh-dj",
//   // wh_auth,
//   webhook.authBvnData
// )
// export default router;
