import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, Relation, JoinColumn } from "typeorm";
import { CategoryEntity } from "./Category.Entity";
import { orderDetailsEntity } from "./OrderDetails.entity";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

@Entity({name: "products"})
export class ProductEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * @description el nombre del producto debe ser unico, de largo maximo 50, no puede ser nulo
     */
    @Column({ length: 50, unique: true, nullable: false })
    name: string;

    /**
     * @description la descripción del producto es de largo maximo 200
     */
    @Column('text')
    description: string;

    /**
     * @description el precio del producto debe ser un decimal
     */
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    /**
     * @description el stock del producto debe ser un entero, y por defecto es 0
     */
    @Column('int', { default: 0 })
    stock: number;

    /**
     * @description la imagen del producto debe ser un string
     */
    @Column({ default: 'default-image-url.jpg' })
    imgUrl: string;
    
    @ManyToOne(() => CategoryEntity, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    @ManyToMany(() => orderDetailsEntity, orderDetails => orderDetails.products)
    orderDetails: orderDetailsEntity[];
  
}