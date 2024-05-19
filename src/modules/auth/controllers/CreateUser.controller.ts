import { Request, Response } from 'express';
import JsonResponse from '../../../shared/utils/AppSuccess';
import ICreateUser from '../dtos/ICreateUserDTO';
import { RegisterUserService } from '../services';
import { StatusCodes } from 'http-status-codes';
import constants from '../../../shared/utils/constants';

class RegisterUser {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password, first_name, last_name } = req.body as ICreateUser;

    const { id } = await new RegisterUserService().execute({ email, password, first_name, last_name });

    return res.status(StatusCodes.CREATED).json(new JsonResponse(StatusCodes.CREATED, constants.USER_CREATED_SUCCESSFULLY, { id }));
  }
}

export default new RegisterUser();
