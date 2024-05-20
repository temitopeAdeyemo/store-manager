import AppError from '../../../shared/utils/AppError';
import constants from '../../../shared/utils/constants';
import IUser from '../../auth/dtos/IUserDTO';
import { fetchProductsFilter } from '../dtos/fetchProductsType';
import ProductRepository from '../models/repositories/ProductRepository';
import { StatusCodes } from 'http-status-codes';

class GetProductService {
  private productRepository = new ProductRepository();

  async fetchOne(dataField: 'product_code' | '_id', value: string) {
    const product = await this.productRepository.findByUniqueData(dataField, value, ['uploaded_by', 'category']);

    if (!product) throw new AppError(constants.CATEGORY_NOT_FOUND, StatusCodes.BAD_REQUEST);

    if (product._doc) {
      const cr = product._doc.uploaded_by as Partial<IUser>;
      cr.authorization_token = '';
    }

    return product._doc;
  }

  async fetchAll(filter: Partial<fetchProductsFilter>, page?: string, size?: string) {
    const products = await this.productRepository.fetchAll(filter, page, size);

    return products;
  }
}

export default GetProductService;
