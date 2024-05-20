import { Request, Response } from 'express';
import JsonResponse from '../../../shared/utils/AppSuccess';
import { DeleteCategoryService } from '../services';
import { StatusCodes } from 'http-status-codes';
import constants from '../../../shared/utils/constants';

class DeleteCategory {
  async delete(req: Request, res: Response): Promise<Response> {
    const { category_id } = req.params;

    await new DeleteCategoryService().execute(category_id);

    return res.status(StatusCodes.OK).json(new JsonResponse(StatusCodes.OK, constants.CATEGORY_DELETED_SUCCESSFULLY));
  }
}

export default new DeleteCategory();
