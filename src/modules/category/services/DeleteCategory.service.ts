import CategoryRepository from '../models/repositories/CategoryRepository';
import GetCategoryService from './GetCategory.service';

class DeleteCategoryService {
  private getCategoryService: GetCategoryService = new GetCategoryService();
  private categoryRepository = new CategoryRepository();

  async execute(id: string) {
    await this.getCategoryService.fetchOne('_id', id);

    await this.categoryRepository.deleteById(id);

    return;
  }
}

export default DeleteCategoryService;
