import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './core/firebase/firebase.module';
import { FirebaseRepositoryModule } from './repositories/firebase/firebase_repository.module';

@Module({
  imports: [ConfigModule.forRoot(), FirebaseModule, FirebaseRepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
