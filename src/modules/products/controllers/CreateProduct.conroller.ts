import { Request, Response } from 'express';
import ICreateProductDto from '../dtos/ICreateProductDto';
import { CreateProductService } from '../services';
import JsonResponse from '../../../shared/utils/AppSuccess';
import { StatusCodes } from 'http-status-codes';
import constants from '../../../shared/utils/constants';

class CreateProduct {
  async create(req: Request, res: Response): Promise<Response> {
    const { product_code, product_name, category, discount, amount, images, quantity } = req.body as ICreateProductDto;

    const uploaded_by = req.user;

    const { id } = await new CreateProductService().execute({
      product_code,
      product_name,
      category,
      amount,
      uploaded_by,
      discount,
      images,
      quantity,
    });

    return res.status(StatusCodes.CREATED).json(new JsonResponse(StatusCodes.CREATED, constants.PRODUCT_CREATED_SUCCESSFULLY, { id }));
  }
}

export default new CreateProduct();
