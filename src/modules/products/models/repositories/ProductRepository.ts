import ICreateProductDTO from '../../dtos/ICreateProductDto';
import { Product } from '../entities/Product';
import IProductModel from '../entities/Product';
import BaseRepository from '../../../../shared/core/BaseRepository';

class ProductRepository extends BaseRepository<IProductModel, ICreateProductDTO, '_id' | 'product_code'> {
  private product;

  constructor() {
    super(Product);
    this.product = Product;
  }

  async save(model: IProductModel) {
    await model.save();
  }

  async findByCategory(category_id: string): Promise<IProductModel[]> {
    const products = await this.product.find({ category: category_id });

    return products;
  }

  async findByUploader(uploaderId: string): Promise<IProductModel[]> {
    const products = await this.product.find({ uploaded_by: uploaderId });

    return products;
  }
}

export default ProductRepository;
