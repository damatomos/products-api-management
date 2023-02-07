import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  title?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  price?: number;
  @ApiProperty()
  discountPercentage?: number;
  @ApiProperty()
  rating?: number = 0;
  @ApiProperty()
  stock?: number;
  @ApiProperty()
  brand?: string;
  @ApiProperty()
  category?: string;
  @ApiProperty()
  thumbnail?: string;
  @ApiProperty()
  images?: [] = [];
}
