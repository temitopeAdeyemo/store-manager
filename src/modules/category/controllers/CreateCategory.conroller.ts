import { Request, Response } from 'express';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import { CreateCategoryService } from '../services';
import JsonResponse from '../../../shared/utils/AppSuccess';
import { StatusCodes } from 'http-status-codes';
import constants from '../../../shared/utils/constants';

class CreateCategory {
  async create(req: Request, res: Response): Promise<Response> {
    const { category_code, category_name, discount } = req.body as ICreateCategoryDTO;

    const { id } = await new CreateCategoryService().execute({ category_code, category_name, created_by: req.user, discount });

    return res.status(StatusCodes.CREATED).json(new JsonResponse(StatusCodes.CREATED, constants.CATEGORY_CREATED_SUCCESSFULLY, { id }));
  }
}

export default new CreateCategory();
