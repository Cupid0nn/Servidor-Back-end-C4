import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./Products.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'categories'})
export class CategoryEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        type: "String",
        example: 'Clothes',
        description: 'Name of the category',
    })
    @Column({ type: "varchar", length: 50, nullable: false, unique: true})
    name: string;

    @ApiProperty({
        type: "Array de ProductEntity",
        description: 'Products of the category',
        example: '[]'
    })
    @OneToMany(() => ProductEntity, product => product.category)
    @JoinColumn()
    products: ProductEntity[];

}
