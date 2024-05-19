import { Request, Response } from 'express';
import JsonResponse from '../../../shared/utils/AppSuccess';
import { LoginUserService } from '../services';
import ILoginUser from '../dtos/ILoginDto';
import constants from '../../../shared/utils/constants';
import { StatusCodes } from 'http-status-codes';

class LoginUser {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as ILoginUser;

    const { access_token } = await new LoginUserService().execute({ email, password });

    return res.status(StatusCodes.OK).json(new JsonResponse(StatusCodes.OK, constants.LOGGED_IN_SUCCESSFULLY, { access_token }));
  }
}

export default new LoginUser();
