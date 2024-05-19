import AppError from '../../../shared/utils/AppError';
import constants from '../../../shared/utils/constants';
import {fetchProductsFilter} from '../dtos/fetchProductsType';
import ProductRepository from '../models/repositories/ProductRepository';
import { StatusCodes } from 'http-status-codes';

class GetProductService {
  private productRepository = new ProductRepository();

  async fetchOne(dataField: 'product_code' | '_id', value: string) {
    const product = await this.productRepository.findByUniqueData(dataField, value);

    if (!product) throw new AppError(constants.CATEGORY_NOT_FOUND, StatusCodes.BAD_REQUEST);

    return product._doc;
  }

  async fetchAll(filter: Partial<fetchProductsFilter>) {
    const products = await this.productRepository.fetchAll(filter);

    return products;
  }
}

export default GetProductService;
