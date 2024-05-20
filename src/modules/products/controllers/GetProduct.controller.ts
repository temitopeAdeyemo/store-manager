import { Request, Response } from 'express';
import JsonResponse from '../../../shared/utils/AppSuccess';
import { GetProductService } from '../services';
import { StatusCodes } from 'http-status-codes';
import { fetchProductsFilter } from '../dtos/fetchProductsType';
import { fetchOneProductFilter } from '../dtos/fetchOneProductFilter';
import constants from '../../../shared/utils/constants';

class GetProduct {
  async fetchOne(req: Request<{}, {}, {}, fetchOneProductFilter>, res: Response): Promise<Response> {
    const { product_id, product_code } = req.query;

    const product = await new GetProductService().fetchOne(product_id ? '_id' : 'product_code', (product_id || product_code) as string);

    return res.status(StatusCodes.OK).json(new JsonResponse(StatusCodes.OK, constants.CATEGORY_FETCHED_SUCCESSFULLY, product));
  }

  async fetchAll(req: Request<{}, {}, {}, fetchProductsFilter | any>, res: Response): Promise<Response> {
    const { product_name, uploaded_by, category, amount, discount } = req.query;

    const products = await new GetProductService().fetchAll({ product_name, uploaded_by, category, amount, discount });

    return res.status(StatusCodes.OK).json(new JsonResponse(StatusCodes.OK, constants.PRODUCTS_FETCHED_SUCCESSFULLY, { products }));
  }
}

export default new GetProduct();
