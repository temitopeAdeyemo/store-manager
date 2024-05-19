import IUpdateProductDTO from '../dtos/IUpdateProductDto';
import ProductRepository from '../models/repositories/ProductRepository';
import GetProductService from './GetProduct.service';

class UpdateProductService {
  constructor() {}

  private getProductService: GetProductService = new GetProductService();
  private productRepository = new ProductRepository();

  async execute(id: string, updateData: Partial<IUpdateProductDTO>) {
    await this.getProductService.fetchOne('_id', id);

    await this.productRepository.updateById(id, updateData);

    return;
  }
}

export default UpdateProductService;
