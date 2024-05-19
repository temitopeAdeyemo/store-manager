import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';
import { Category } from '../entities/Category';
import ICategoryModel from '../entities/Category';
import BaseRepository from '../../../../shared/core/BaseRepository';

class CategoryRepository extends BaseRepository<ICategoryModel, ICreateCategoryDTO, '_id' | 'category_code'> {
  private category;

  constructor() {
    super(Category);
    this.category = Category;
  }

  async findByUploader(uploaderId: string): Promise<ICategoryModel[]> {
    const categories = await this.category.find({ created_by: uploaderId });

    return categories;
  }
}

export default CategoryRepository;
