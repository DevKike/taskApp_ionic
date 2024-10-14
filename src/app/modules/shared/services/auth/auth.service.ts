import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly _angularFire: AngularFireAuth) {}

  public async register(email: string, password: string) {
    return await this._angularFire.createUserWithEmailAndPassword(email, password);
  }
  
  public async login(email: string, password: string) {
    return await this._angularFire.signInWithEmailAndPassword(email, password);
  }

  public async logout() {
   await this._angularFire.signOut();
  }

  public async isAuth() {
    const user = await this._angularFire.authState.pipe(first()).toPromise();
    return Boolean(user?.uid); 
  }

  public async getAuthUserId() {
    const user = await this._angularFire.authState.pipe(first()).toPromise();
    const isAuth = await this.isAuth();
    if (user && isAuth) {
      return user.uid;
    } else {
      return 0;
    }
  }
}
