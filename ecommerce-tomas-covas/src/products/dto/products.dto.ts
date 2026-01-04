import { ApiHideProperty, ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Categories } from './../../categories/entities/categories.entity';

export class CreateProductDto {
  @ApiHideProperty()
  id: string;

  @ApiProperty({
    description: 'Debe ser un string de entre 3 y 80 caracteres.',
    example: 'Producto 01',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(80, { message: 'El nombre no debe exceder los 80 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Debe ser un string de entre 10 y 120 caracteres.',
    example: 'Este es un producto, llamado Producto 01',
  })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser texto' })
  @MinLength(10, { message: 'El nombre debe tener al menos 10 caracteres' })
  @MaxLength(120, { message: 'El nombre no debe exceder los 120 caracteres' })
  description: string;

  @ApiProperty({
    description: 'Debe ser un numero.',
    example: '1200.00',
  })
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  price: number;

  @ApiProperty({
    description: 'Debe ser un numero.',
    example: '6',
  })
  @IsNotEmpty({ message: 'El stock es obligatorio' })
  @IsNumber({}, { message: 'El stock debe ser un número' })
  stock: number;

  @ApiProperty({
    description: 'Debe ser una url de imagen valida.',
    example:
      ' https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/2048px-Imagen_no_disponible.svg.png',
  })
  @IsNotEmpty({ message: 'La URL de la imagen es obligatoria' })
  @IsString({ message: 'La descripción debe ser texto' })
  imgUrl: string;

  @IsNotEmpty({ message: 'El ID de la categoría es obligatorio' })
  @IsString({ message: 'El ID de la categoría debe ser texto' })
  categoryId: string;

  @ApiHideProperty()
  categories: Categories;
}

export class UpdateProductDto extends PickType(CreateProductDto, [
  'name',
  'description',
  'price',
  'stock',
] as const) {
  @ApiProperty({
    description: 'Debe ser un string de entre 3 y 80 caracteres.',
    example: 'Producto 01',
  })
  @IsOptional()
  name: string;
  @ApiProperty({
    description: 'Debe ser un string de entre 10 y 120 caracteres.',
    example: 'Este es un producto, llamado Producto 01',
  })
  @IsOptional()
  description: string;
  @ApiProperty({
    description: 'Debe ser un numero.',
    example: '1200.00',
  })
  @IsOptional()
  price: number;
  @ApiProperty({
    description: 'Debe ser un numero.',
    example: '6',
  })
  @IsOptional()
  stock: number;
}
