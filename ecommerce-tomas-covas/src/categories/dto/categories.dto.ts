import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Debe ser un string de entre 3 y 50 caracteres',
    example: 'televisor',
  })
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio' })
  @MinLength(3, {
    message: 'El nombre de la categoría debe tener al menos 3 caracteres',
  })
  @MaxLength(50, {
    message: 'El nombre de la categoría debe tener como máximo 50 caracteres',
  })
  name: string;
}

export class UpdateCategoryDto extends PickType(CreateCategoryDto, [
  'name',
] as const) {
  @IsOptional()
  name: string;
}
