import AppError from '../../../shared/utils/AppError';
import constants from '../../../shared/utils/constants';
import IUser from '../../auth/dtos/IUserDTO';
import ICategoryDTO from '../dtos/ICategoryDTO';
import { fetchCategoriesFilter } from '../dtos/fetchCategoriesType';
import CategoryRepository from '../models/repositories/CategoryRepository';
import { StatusCodes } from 'http-status-codes';

class GetCategoryService {
  private categoryRepository = new CategoryRepository();

  async fetchOne(dataField: 'category_code' | '_id', value: string) {
    const category = await this.categoryRepository.findByUniqueData(dataField, value, 'created_by');

    if (!category) throw new AppError(constants.CATEGORY_NOT_FOUND, StatusCodes.BAD_REQUEST);

    if (category._doc) {
      const cr = category._doc.created_by as Partial<IUser>;
      cr.authorization_token = '';
    }

    return category._doc;
  }

  async fetchAll(filter: Partial<fetchCategoriesFilter>) {
    const categories = await this.categoryRepository.fetchAll(filter);

    return categories;
  }
}

export default GetCategoryService;
