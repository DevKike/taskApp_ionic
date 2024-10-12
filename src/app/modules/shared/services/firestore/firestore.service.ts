import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private readonly _ngFirestore: AngularFirestore) {}

  public async create(collection: string, data: any): Promise<void> {
    try {
      await this._ngFirestore.collection(collection).add(data);
    } catch (error) {
      throw error;
    }
  }

  public async getDocumentsByCollection(collection: string): Promise<any[]> {
    try {
      const collectionRef = this._ngFirestore.collection(collection);
      const snapshot = await lastValueFrom(collectionRef.get());

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        if (data) {
          return { id: doc.id, ...data };
        } else {
          return { id: doc.id };
        }
      });
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

  public async delete(collection: string, docId: string): Promise<void> {
    try {
      await this._ngFirestore.collection(collection).doc(docId).delete();
    } catch (error) {
      throw error;
    }
  }

  public async update(collection: string, docId: string, data: any): Promise<void> {
    try {
      await this._ngFirestore.collection(collection).doc(docId).update(data);
    } catch (error) {
      throw error;
    }
  }
}
