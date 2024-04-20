import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/entities/Product.entity';

export class CreateOrderDto {
  
  @ApiProperty({description: 'Here is the id of the user',example: '174e4587-e81b-12d9-a457-426655441111'})
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({description: 'Here is an array of products in the order',
    example: [{id: '123e4567-e89b-12d3-a456-426655440000'}]})
  @IsArray()
  @ArrayMinSize(1, { message: 'Debe agregar al menos un producto' })
  products: Partial<Product>[];
}