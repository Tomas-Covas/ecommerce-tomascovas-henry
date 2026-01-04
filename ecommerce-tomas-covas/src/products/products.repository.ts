import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../categories/entities/categories.entity';
import { Products } from '../products/entities/products.entity';
import { Repository } from 'typeorm';
import data from '../utils/data.json';
import { CreateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}
  async getAllProducts(page: number, limit: number): Promise<Products[]> {
    const skip = (page - 1) * limit;
    const products = await this.productsRepository.find({
      relations: {
        category: true,
      },
      skip: skip,
      take: limit,
    });
    return products;
  }

  async getProductById(id: string): Promise<Partial<Products>> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    return product;
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();
    await Promise.all(
      data.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );
        if (!category) {
          throw new NotFoundException(
            `La categoría ${element.category} no existe`,
          );
        }
        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category;
        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .orIgnore()
          .execute();
      }),
    );
    return 'Productos agregados';
  }

  async createNewProduct(product: Partial<CreateProductDto>) {
    const newProduct = this.productsRepository.create({
      ...product,
      category: { id: product.categoryId },
    });
    const savedProduct = await this.productsRepository.save(newProduct);

    if (!savedProduct) {
      throw new Error('No se pudo añadir el producto');
    }

    return savedProduct;
  }

  async updateProduct(id: string, product: Partial<Products>) {
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const productIndex = await this.productsRepository.delete(id);
    if (productIndex.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return `Producto con ID ${id} eliminado`;
  }
}
