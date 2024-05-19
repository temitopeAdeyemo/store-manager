import AppError from '../../../shared/utils/AppError';
import constants from '../../../shared/utils/constants';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import CategoryRepository from '../models/repositories/CategoryRepository';
import { StatusCodes } from 'http-status-codes';

class CreateCategoryService {
  private categoryRepository = new CategoryRepository();

  constructor() {}

  async execute(data: ICreateCategoryDTO) {
    const categoryExists = await this.categoryRepository.findByUniqueData('category_code', data.category_code);

    if (categoryExists) throw new AppError(constants.CATEGORY_EXISTS, StatusCodes.CONFLICT);

    const { _id: id } = await this.categoryRepository.create(data);

    return { id };
  }
}

export default CreateCategoryService;
