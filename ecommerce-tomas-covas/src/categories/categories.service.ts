import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  addCategories() {
    return this.categoriesRepository.addCategories();
  }

  createCategory(category: CreateCategoryDto) {
    return this.categoriesRepository.createCategory(category);
  }

  getCategories() {
    return this.categoriesRepository.getCategories();
  }
}
