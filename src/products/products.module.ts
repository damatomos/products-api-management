import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { FirebaseRepositoryModule } from 'src/repositories/firebase/firebase_repository.module';

@Module({
  imports: [FirebaseRepositoryModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
