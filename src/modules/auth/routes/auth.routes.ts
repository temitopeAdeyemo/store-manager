import { Router } from 'express';
import { loginUserController, createUserController } from '../controllers';
import LoginUserValidator from '../validators/LoginUserValidator';
import userCreateValidator from '../validators/userCreateValidator';
import signupValidator from '../validators/signupValidator';

const router = Router();

router.post('/login', LoginUserValidator, loginUserController.login)
router.post('/register', signupValidator, createUserController.create);

export default router;
