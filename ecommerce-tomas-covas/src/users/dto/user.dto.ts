import { ApiHideProperty, ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from './../../decorators/matchPassword.decorator';
import { Orders } from './../../orders/entities/orders.entity';

export class CreateUserDto {
  @ApiHideProperty()
  id: string;
  @ApiHideProperty()
  orders: Orders[];

  @ApiProperty({
    description:
      'Debe ser un string de entre 3 y 80 caracteres, no puede estar vacio',
    example: 'Usuario01',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(80, { message: 'El nombre no debe exceder los 80 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Debe ser un email valido.',
    example: 'Usuario01@mail.com',
  })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsString({ message: 'El email debe ser texto' })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;

  @ApiProperty({
    description:
      'Debe ser un string de entre 8 y 15 caracteres, debe contener una letra mayúscula, una letra minúscula, un número y un símbolo.',
    example: 'Usuario1!',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser texto' })
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un símbolo.',
    },
  )
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15, { message: 'La contraseña no debe exceder los 15 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Debe ser igual al password.',
    example: 'Usuario1!',
  })
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({
    description: 'Debe ser un numero.',
    example: '123456789',
  })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @IsNumber({}, { message: 'El teléfono debe ser un número' })
  phone: number;

  @ApiProperty({
    description: 'Debe ser un string de entre 5 y 20 caracteres.',
    example: 'Example Country',
  })
  @IsString({ message: 'El pais debe ser texto' })
  @MinLength(5, { message: 'El país debe tener al menos 5 caracteres' })
  @MaxLength(20, { message: 'El país no debe exceder los 20 caracteres' })
  country: string;

  @ApiProperty({
    description: 'Debe ser un string de entre 3 y 80 caracteres.',
    example: 'Example Address',
  })
  @IsString({ message: 'La dirección debe ser texto' })
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres' })
  @MaxLength(80, { message: 'La dirección no debe exceder los 80 caracteres' })
  address: string;

  @ApiProperty({
    description: 'Debe ser un string de entre 5 y 20 caracteres.',
    example: 'Example City',
  })
  @IsString({ message: 'La ciudad debe ser texto' })
  @MinLength(5, { message: 'La ciudad debe tener al menos 5 caracteres' })
  @MaxLength(20, { message: 'La ciudad no debe exceder los 20 caracteres' })
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin: boolean;
}

export class UpdateUserDto extends PickType(CreateUserDto, [
  'name',
  'email',
  'password',
  'phone',
  'country',
  'address',
  'city',
] as const) {
  @IsEmpty({ message: 'El nombre no se puede modificar' })
  name: string;

  @IsEmpty({ message: 'El email no se puede modificar' })
  email: string;

  @IsEmpty({ message: 'La contraseña no se puede modificar' })
  password: string;

  @IsOptional()
  phone: number;

  @IsOptional()
  country: string;

  @IsOptional()
  address: string;

  @IsOptional()
  city: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
