"use strict";
// import { Router } from "express";
// import multer from 'multer';
// import FetchUser from '../controllers/FetchUser.controller';
// import Avatar from '../controllers/CreateAvatar.controller';
// import auth, { adminAuth } from '../../../shared/middlewares/auth';
// import WithdrawReferralReward from '../controllers/WithdrawReferralReward.controllers';
// import FetchReferrals from '../controllers/FetchReferrals.controller';
// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now());
//   },
// });
// const maxSize = 10 * 1000 * 1000;
// const upload = multer({
//   storage,
//   limits: { fileSize: maxSize },
// });
// const router = Router();
// const fetchUser = new FetchUser();
// const avatar = new Avatar();
// const withdrawReferralReward = new WithdrawReferralReward();
// const fetchReferrals = new FetchReferrals();
// router.get("/me", auth, fetchUser.fetch);
// router.get('/all',
//   adminAuth,
//   fetchUser.fetch_all);
// router.post('/avatar', auth, upload.single("avatar"), avatar.create);
// router.post('/referral/claim', auth, withdrawReferralReward.withdraw);
// router.get('/referral/fetch-all', auth, fetchReferrals.fetch);
// export default router;
