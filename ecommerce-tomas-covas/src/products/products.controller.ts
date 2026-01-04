import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProductsService } from '../products/products.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(200)
  @Get()
  @ApiOperation({ summary: 'Obtener lista de productos paginada' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Número de pagina',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Cantidad de productos por pagina',
  })
  getAllProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) {
      return this.productsService.getAllProducts(Number(page), Number(limit));
    }
    return this.productsService.getAllProducts(Number(1), Number(5));
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtener productos por id' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID del producto',
  })
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @HttpCode(201)
  @ApiBearerAuth()
  @Post('seeder')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Añadir productos' })
  addProducts() {
    return this.productsService.addProducts();
  }

  @HttpCode(201)
  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Añadir un producto nuevo' })
  @ApiBody({ type: CreateProductDto })
  createNewProduct(@Body() product: Partial<CreateProductDto>) {
    return this.productsService.createNewProduct(product);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Actualizar productos' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID del producto',
  })
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: UpdateProductDto,
  ) {
    if (!id) return 'El id del producto es obligatorio';
    if (!product)
      return 'Los datos para actualizar el producto son obligatorios';
    return this.productsService.updateProduct(id, product);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID del producto',
  })
  @HttpCode(200)
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Borrar un producto por id' })
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
