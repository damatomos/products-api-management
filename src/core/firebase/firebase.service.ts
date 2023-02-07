import { CollectionReference, DocumentData } from "@google-cloud/firestore";
import { Injectable } from "@nestjs/common";
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseService {

  getDatabaseCollection(collection: string): CollectionReference<DocumentData> {
    return getFirestore().collection(collection);
  }

}
