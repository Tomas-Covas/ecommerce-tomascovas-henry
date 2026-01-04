import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/enums/roles.enum';
import { Roles } from '../decorators/roles.decorator';
import { CreateCategoryDto } from './dto/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('seeder')
  @ApiOperation({ summary: 'Añadir categorias' })
  addCategories() {
    return this.categoriesService.addCategories();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Añadir una categoria nueva' })
  @ApiBody({ type: CreateCategoryDto })
  createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de categorias' })
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
