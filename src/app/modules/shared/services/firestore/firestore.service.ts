import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private readonly _ngFirestore: AngularFirestore) {}

  public async create(collection: string, data: any) {
    try {
      return await this._ngFirestore.collection(collection).add(data);
    } catch (error) {
      throw error;
    }
  }

  public async getCollections(collection: string): Promise<any[]> {
    try {
      const collectionRef = this._ngFirestore.collection(collection);
      const snapshot = lastValueFrom(collectionRef.get());
      return (await snapshot).docs.map((doc) => ({ id: doc.id, ...doc.data }));
    } catch (error) {
      throw error;
    }
  }

  public async getDocumentById(collection: string, documentId: string): Promise<any> {
    try {
      const docRef = this._ngFirestore.collection(collection).doc(documentId);
      const snapshot = await lastValueFrom(docRef.get());

      return { id: snapshot.id, ...(snapshot.data() || {}) };
    } catch (error) {
      throw error;
    }
  }

  public delete(collection: string) {
    try {
    } catch (error) {
      throw error;
    }
  }

  public update() {}
}
