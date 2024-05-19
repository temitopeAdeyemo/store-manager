import { Request, Response } from 'express';
import { UpdateCategoryService } from '../services';
import JsonResponse from '../../../shared/utils/AppSuccess';
import { StatusCodes } from 'http-status-codes';
import IUpdateCategoryDTO from '../dtos/IUpdateCategoryDTO';
import constants from '../../../shared/utils/constants';

class UpdateCategory {
  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { category_code, category_name, discount } = req.body as IUpdateCategoryDTO;

    await new UpdateCategoryService().execute(id, { category_code, category_name, discount });

    return res.status(StatusCodes.OK).json(new JsonResponse(StatusCodes.OK, constants.CATEGORY_UPDATED_SUCCESSFULLY, { id }));
  }
}

export default new UpdateCategory();
