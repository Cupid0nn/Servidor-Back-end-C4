import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, ValidateNested, ArrayMinSize } from 'class-validator';
import { ProductEntity } from 'src/Entityes/Products.entity';

export class CreateOrderDto {
    @ApiProperty({
        example: 'wajiodj2198783ua0',
    })
    @IsNotEmpty({ message: 'El userId es obligatorio' })
    @IsUUID('4', { message: 'El userId debe tener un formato UUID válido' })
    userId: string;

    @ApiProperty({
        example: [
            {
                id: '1',
                quantity: 1
            },
            {
                id: '2',
                quantity: 2
            }
        ],
        description: 'Array de productos',
        required: true
    })
    @IsNotEmpty({ message: 'El array de productos es obligatorio' })
    @ArrayMinSize(1, { message: 'El array de productos debe contener al menos un elemento' })
    products: Partial<ProductEntity>[];
}

