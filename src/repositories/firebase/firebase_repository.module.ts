import { Module } from '@nestjs/common';

import { FirebaseRepository } from './firebase_repository.repository';
import { FirebaseModule } from 'src/core/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [],
  providers: [FirebaseRepository],
  exports: [FirebaseRepository],
})
export class FirebaseRepositoryModule {

  constructor()
  {
  }

}
