import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CollectionReference,
  DocumentData,
  FieldPath,
} from 'firebase-admin/firestore';
import { FirebaseRepositoryException } from 'src/core/exceptions/firebase_repository.exception';
import { FirebaseService } from 'src/core/firebase/firebase.service';

@Injectable()
export class FirebaseRepository<T extends Model | Partial<T>> {
  private db: CollectionReference<DocumentData>;

  constructor(private readonly firebaseService: FirebaseService) {}

  init(collection: string) {
    this.db = this.firebaseService.getDatabaseCollection(collection);
  }

  async create(data: T): Promise<any> {
    if (!this.db) throw new FirebaseRepositoryException('Model collectio not initialized!');
    try {
      return await this.db.doc().set(data);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async find(where: {} = {}): Promise<T[] | any[]> {
    if (!this.db) throw new FirebaseRepositoryException('Model collectio not initialized!');
    const whereVector = Object.keys(where);

    try {
      let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = null;
      if (whereVector.length > 0) {
        query = this.db.where(whereVector[0], '==', where[whereVector[0]]);
        whereVector.forEach((key) => {
          if (whereVector[0] == key) return query;
          query = this.db.where(key, '==', where[key]);
        });
      }
      const snapshot = query ? await query.get() : await this.db.get();
      return snapshot.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });
    } catch (err) {
      console.log('error: ', err);
      throw new BadRequestException(err);
    }
  }

  async findOne(where: {}): Promise<T> {
    if (!this.db) throw new FirebaseRepositoryException('Model collectio not initialized!');
    const whereVector = Object.keys(where);
    if (whereVector.length == 0) return;

    try {
      let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = null;
      whereVector.forEach((key) => {
        query = this.db.where(key, '==', where[key]);
      });
      const snapshot = await query.get();

      const id = snapshot.docs[0].id;
      return { id, ...snapshot.docs[0].data() as T };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async findById(id: string): Promise<T> {
    if (!this.db) throw new FirebaseRepositoryException('Model collectio not initialized!');
    try {
      const snapshot = await this.db
        .where(FieldPath.documentId(), '==', id)
        .get();
      return snapshot.docs[0].data() as T;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async update(id: string, data: T): Promise<any> {
    if (!this.db) throw new FirebaseRepositoryException('Model collectio not initialized!');
    try {
      return await this.db.doc(id).update({...data});
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async remove(id: string): Promise<any> {
    if (!this.db) throw new FirebaseRepositoryException('Model collectio not initialized!');
    try {
      return await this.db.doc(id).delete();
    } catch (err)
    {
      throw new BadRequestException(err);
    }
  }
}
