import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, JoinTable } from "typeorm";
import { OrderEntity } from "./Order.entity";
import { ProductEntity } from "./Products.entity";

@Entity({name: "Order_details"})
export class orderDetailsEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    /**
     * @description El atributo "price" es de tipo numérico decimal (10,2) y no puede ser nulo.
     */
    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number; // price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo. 

    
    @OneToOne(() => OrderEntity, order => order.orderDetails)
    @JoinColumn({ name: "order_id" })
    orders: OrderEntity;

    @ManyToMany(() => ProductEntity)
    @JoinTable({
        name: "Order_details_products",
        joinColumn: {
            name: "products_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "order_details_id",
            referencedColumnName: "id"
        }
    })
    products: ProductEntity[];
}