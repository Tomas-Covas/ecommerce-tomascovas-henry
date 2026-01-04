import { Module } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { ProductsController } from '../products/products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from '../categories/entities/categories.entity';
import { Products } from '../products/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Products])],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
