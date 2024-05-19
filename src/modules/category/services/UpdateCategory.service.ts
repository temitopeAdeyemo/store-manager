import IUpdateCategoryDTO from '../dtos/IUpdateCategoryDTO';
import CategoryRepository from '../models/repositories/CategoryRepository';
import GetCategoryService from './GetCategory.service';

class UpdateCategoryService {
  constructor() {}

  private getCategoryService: GetCategoryService = new GetCategoryService();
  private categoryRepository = new CategoryRepository();

  async execute(id: string, updateData: Partial<IUpdateCategoryDTO>) {
    await this.getCategoryService.fetchOne('_id', id);

    await this.categoryRepository.updateById(id, updateData);

    return;
  }
}

export default UpdateCategoryService;
