import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private readonly _ngFirestore: AngularFirestore) {}

  public async create(collection: string, data: any) {
    try {
      return await this._ngFirestore.collection(collection).add(data);
    } catch (error) {
      throw error;
    }
  }

  public get() {}

  public delete() {}

  public update() {}
}
