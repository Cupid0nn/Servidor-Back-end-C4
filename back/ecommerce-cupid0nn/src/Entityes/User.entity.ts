import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './Order.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /**
   * @description El nombre del usuario debe ser de un largo de 80 y no puede ser nulo
   */
  @Column({ length: 80, nullable: false })
  name: string;

  /**
   * @description El email del usuario debe ser de un largo de 50, no puede ser nulo y es unico
   */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  /**
   * @description El password del usuario debe ser de un largo de 128, no puede ser nulo
   */
  @Column({ type: 'varchar', length: 128, nullable: false })
  password: string;

  /**
   * @description El confirm password del usuario debe ser de un largo de 128, no puede ser nulo
   */
  @Column({ type: 'varchar', length: 128, nullable: false })
  confirmPassword: string;

  /**
   * @description El telefóno del usuario debe ser de un largo de 9 y no puede ser nulo
   */
  @Column({ type: 'int' })
  phone: number;

  /**
   * @description El país del usuario debe ser de un largo de 50 
   */
  @Column({ type: 'varchar', length: 50 })
  country: string;

  /**
   * @description El address del usuario debe ser de un largo de 50 y no puede ser nulo
  */
  @Column('text', { nullable: false })
  address: string;

  /** 
   * @description la Edad del usuario debe de ser de un largo de 1 a 2 y no puede ser nula
   */
  @Column({ type: 'int',  nullable: false})
  Edad : Number;

  /**
   * @description El city del usuario debe ser de un largo de 50 y es de tipo varchar
  */
  @Column({ type: 'varchar', length: 50 })
  city: string;

  /**
   * @description este puede ser o no admin
  */
  @Column({ default: false}) // aqui se declara que empiezan en false
  isAdmin:boolean

  @Column({default: false})
  IsSuperAdmin:boolean

  @OneToMany(() => OrderEntity, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: OrderEntity[];
}
