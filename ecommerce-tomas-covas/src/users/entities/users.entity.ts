import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Orders } from './../../orders/entities/orders.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class Users {
  @ApiProperty({
    description: 'uuid v4 generado por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ser un string de maximo 50 caracteres',
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Debe ser un string de maximo 50 caracteres',
  })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @ApiProperty({
    description: 'Debe ser un string de maximo 60 caracteres',
  })
  @Column({ type: 'varchar', length: 60, nullable: false })
  password: string;

  @ApiProperty({
    description: 'Debe ser un numero',
  })
  @Column({ type: 'int', nullable: true })
  phone: number;

  @ApiProperty({
    description: 'Debe ser un string de maximo 50 caracteres',
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  @ApiProperty({
    description: 'Debe ser un string',
  })
  @Column({ type: 'text', nullable: true })
  address: string;

  @ApiProperty({
    description: 'Debe ser un string de maximo 50 caracteres',
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @ApiHideProperty()
  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Orders, (order) => order.users)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}
