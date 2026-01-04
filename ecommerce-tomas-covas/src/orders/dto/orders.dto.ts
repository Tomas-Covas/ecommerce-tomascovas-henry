import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Products } from './../../products/entities/products.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'uuid v4 generado por la BBDD',
    example: 'ID del usuario',
  })
  @IsNotEmpty({
    message: 'El ID del usuario es requerido para realizar una orden.',
  })
  @IsString({ message: 'El ID del usuario debe ser una cadena de texto.' })
  userId: string;

  @ApiProperty({
    description: 'Array de IDs de productos',
    example: [{ id: 'ID del producto' }, { id: 'ID del producto' }],
  })
  @IsArray()
  @ArrayMinSize(1, {
    message: 'Al menos un producto es requerido para realizar una orden.',
  })
  products: Products[];
}
