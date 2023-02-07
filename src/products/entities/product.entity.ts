export class Product extends Model {
  id?: string;
  title: string;
  description: string;
  price: number = 0;
  discountPercentage: number = 0;
  rating: number = 0;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [] = [];
}
