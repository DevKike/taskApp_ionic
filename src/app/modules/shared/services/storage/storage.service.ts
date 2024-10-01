import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private readonly _ngFireStorageSrv: AngularFireStorage) {}

  public async upload(filePath: string, file: any) {
    const fileRef = this._ngFireStorageSrv.ref(filePath);
    await this._ngFireStorageSrv.upload(filePath, file);
  }
}
