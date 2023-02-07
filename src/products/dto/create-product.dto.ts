import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class CreateProductDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  discountPercentage?: number;
  @ApiProperty()
  rating?: number;
  @ApiProperty()
  stock: number;
  @ApiProperty()
  brand: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  thumbnail: string;
  @ApiProperty()
  images?: [];
}
