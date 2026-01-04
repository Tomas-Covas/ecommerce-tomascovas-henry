import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../categories/entities/categories.entity';
import { Repository } from 'typeorm';
import data from '../utils/data.json';
import { CreateCategoryDto } from './dto/categories.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async addCategories() {
    try {
      const categoriesData = data as {
        name: string;
        description: string;
        price: number;
        stock: number;
        category: string;
      }[];

      if (!Array.isArray(categoriesData)) {
        throw new Error('Data no es un array válido');
      }

      await Promise.all(
        categoriesData.map((element) =>
          this.categoriesRepository
            .createQueryBuilder()
            .insert()
            .into(Categories)
            .values({ name: element.category })
            .orIgnore()
            .execute(),
        ),
      );
      return 'Categorías agregadas';
    } catch (error) {
      console.error('Fallo mientras se agregaban categorías:', error);
      throw new Error('Fallo al agregar categorías');
    }
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategory = this.categoriesRepository.create(category);
    return await this.categoriesRepository.save(newCategory);
  }

  async getCategories() {
    return await this.categoriesRepository.find();
  }
}
