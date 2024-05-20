import { Request, Response } from 'express';
import JsonResponse from '../../../shared/utils/AppSuccess';
import { GetCategoryService } from '../services';
import { StatusCodes } from 'http-status-codes';
import { fetchCategoriesFilter } from '../dtos/fetchCategoriesType';
import { fetchOneFilter } from '../dtos/fetchOneCategoryFilter';

import constants from '../../../shared/utils/constants';

class GetCategory {
  async fetchOne(req: Request<{}, {}, {}, fetchOneFilter>, res: Response): Promise<Response> {
    const { category_id, category_code } = req.query;

    const category = await new GetCategoryService().fetchOne(category_id ? '_id' : 'category_code', category_id || category_code);

    return res.status(StatusCodes.OK).json(new JsonResponse(StatusCodes.OK, constants.CATEGORY_FETCHED_SUCCESSFULLY, category));
  }

  async fetchAll(req: Request<{}, {}, {}, fetchCategoriesFilter>, res: Response): Promise<Response> {
    const { category_name, created_by } = req.query;

    const categories = await new GetCategoryService().fetchAll({ category_name, created_by });

    return res.status(StatusCodes.OK).json(new JsonResponse(StatusCodes.OK, constants.CATEGORIES_FETCHED_SUCCESSFULLY, {categories}));
  }
}

export default new GetCategory();
