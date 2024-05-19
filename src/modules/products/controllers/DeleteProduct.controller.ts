import { Request, Response } from 'express';
import JsonResponse from '../../../shared/utils/AppSuccess';
import { DeleteProductService } from '../services';
import { StatusCodes } from 'http-status-codes';
import constants from '../../../shared/utils/constants';

class DeleteProduct {
  private deleteProductService: DeleteProductService = new DeleteProductService();

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.deleteProductService.execute(id);

    return res.status(StatusCodes.OK).json(new JsonResponse(StatusCodes.OK, constants.PRODUCT_DELETED_SUCCESSFULLY));
  }
}

export default new DeleteProduct();
