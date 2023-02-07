import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FirebaseRepository } from 'src/repositories/firebase/firebase_repository.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly repository: FirebaseRepository<Product>) {
    repository.init('products');
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.repository.find({
      title: createProductDto.title,
    });
    if (product.length > 0) {
      throw new ForbiddenException(
        `A product with title [${createProductDto.title}] already exists.`,
      );
    }

    return this.repository.create(createProductDto as Product);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.repository.update(id, updateProductDto as Product);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
