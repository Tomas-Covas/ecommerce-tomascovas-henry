import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Products } from './../../products/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Categories {
  @ApiProperty({
    description: 'uuid v4 generado por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ser un string de maximo 50 caracteres',
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}
