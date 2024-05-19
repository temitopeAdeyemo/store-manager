import AppError from '../../../shared/utils/AppError';
import constants from '../../../shared/utils/constants';
import { GetCategoryService } from '../../category/services';
import ICreateProductDTO from '../dtos/ICreateProductDto';
import ProductRepository from '../models/repositories/ProductRepository';
import { StatusCodes } from 'http-status-codes';

class CreateProductService {
  private productRepository = new ProductRepository();
  private getCategoryService = new GetCategoryService();
  constructor() {}

  async execute(data: ICreateProductDTO) {
    await this.getCategoryService.fetchOne('_id', data.category);

    const productExists = await this.productRepository.findByUniqueData('product_code', data.product_code);

    if (productExists) throw new AppError(constants.CATEGORY_EXISTS, StatusCodes.CONFLICT);

    const { _id: id } = await this.productRepository.create(data);

    return { id };
  }
}

export default CreateProductService;
