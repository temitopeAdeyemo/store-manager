import { Request, Response } from 'express';
import { UpdateProductService } from '../services';
import JsonResponse from '../../../shared/utils/AppSuccess';
import { StatusCodes } from 'http-status-codes';
import IUpdateProductDTO from '../dtos/IUpdateProductDto';
import constants from '../../../shared/utils/constants';

class UpdateProduct {
  async update(req: Request, res: Response): Promise<Response> {
    const { product_id } = req.params;

    const { product_code, product_name, discount, amount, category } = req.body as IUpdateProductDTO;

    await new UpdateProductService().execute(product_id, { product_code, product_name, discount, amount, category });

    return res.status(StatusCodes.OK).json(new JsonResponse(StatusCodes.OK, constants.PRODUCT_UPDATED_SUCCESSFULLY));
  }
}

export default new UpdateProduct();
