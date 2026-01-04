import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from '../products/entities/products.entity';
import { CreateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getAllProducts(page: number, limit: number) {
    return this.productsRepository.getAllProducts(page, limit);
  }

  getProductById(id: string): Promise<Partial<Products>> {
    return this.productsRepository.getProductById(id);
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }

  async createNewProduct(product: Partial<CreateProductDto>) {
    return this.productsRepository.createNewProduct(product);
  }

  updateProduct(id: string, product: Partial<Products>) {
    return this.productsRepository.updateProduct(id, product);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
