import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { orderDetailsEntity } from "./OrderDetails.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

@Entity({name: "Orders"})
export class OrderEntity {
    @ApiHideProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

   
    @ManyToOne(() => UserEntity, (User) => User.orders)
    @JoinColumn({name: "user_id"})
    user: UserEntity;

    @ApiProperty({
        description: "Debe ser una fecha del tipo dd/mm/yyyy",
        example: "01/01/2024"
    })
    @Column()
    date: Date

    @OneToOne(() => orderDetailsEntity, (orderDetails) => orderDetails.orders)
    orderDetails: orderDetailsEntity;
}