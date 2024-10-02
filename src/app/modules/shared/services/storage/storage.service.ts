import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private readonly _ngFireStorageSrv: AngularFireStorage) {}

  public async upload(filePath: string, file: any) {
    try {
      await this._ngFireStorageSrv.upload(filePath, file);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getUrl(filePath: string) {
    try {
      const pathRef = this._ngFireStorageSrv.ref(filePath);
      return await lastValueFrom(pathRef.getDownloadURL());
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
