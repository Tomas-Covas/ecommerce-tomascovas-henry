import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './../../users/entities/users.entity';
import { OrderDetail } from './orderdetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Orders {
  @ApiProperty({
    description: 'uuid v4 generado por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (users) => users.orders)
  @JoinColumn({ name: 'user_id' })
  users: Users;

  @ApiProperty({
    description: 'Debe ingresar una fecha con formato dd/mm/yyyy',
    example: '10/10/1000',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail;
}
