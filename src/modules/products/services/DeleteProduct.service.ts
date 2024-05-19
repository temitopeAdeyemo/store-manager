import ProductRepository from '../models/repositories/ProductRepository';
import GetProductService from './GetProduct.service';

class DeleteProductService {
  private getProductService: GetProductService = new GetProductService();
  private productRepository = new ProductRepository();

  async execute(id: string) {
    await this.getProductService.fetchOne('_id', id);

    await this.productRepository.deleteById(id);

    return;
  }
}

export default DeleteProductService;
