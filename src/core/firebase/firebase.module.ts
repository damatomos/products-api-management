import { Module } from '@nestjs/common';

import admin from 'firebase-admin';
import { FirebaseService } from './firebase.service';
import { FirebaseController } from './firebase.controller';

@Module({
  controllers: [FirebaseController],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {

  constructor()
  {
    const serviceAccount = require('../../../config/serviceAccountKey.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://bluejaygm-website-default-rtdb.firebaseio.com",
    })
  }

}
