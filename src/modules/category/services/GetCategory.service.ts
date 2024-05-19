import AppError from '../../../shared/utils/AppError';
import constants from '../../../shared/utils/constants';
import ICategoryDTO from '../dtos/ICategoryDTO';
import { fetchCategoriesFilter } from '../dtos/fetchCategoriesType';
import CategoryRepository from '../models/repositories/CategoryRepository';
import { StatusCodes } from 'http-status-codes';

class GetCategoryService {
  private categoryRepository = new CategoryRepository();

  async fetchOne(dataField: 'category_code' | '_id', value: string) {
    const product = await this.categoryRepository.findByUniqueData(dataField, value);

    if (!product) throw new AppError(constants.CATEGORY_NOT_FOUND, StatusCodes.BAD_REQUEST);

    return product._doc;
  }

  async fetchAll(filter: Partial<fetchCategoriesFilter>) {
    const products = await this.categoryRepository.fetchAll(filter);

    return products;
  }
}

export default GetCategoryService;
