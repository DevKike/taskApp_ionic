import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly angularFire: AngularFireAuth) { }

  public async register(email: string, password: string) {
    return await this.angularFire.createUserWithEmailAndPassword(email, password)
  }

  public async login(email: string, password: string) {
    return await this.angularFire.signInWithEmailAndPassword(email, password);
  }

  public async logout() {
    return await this.angularFire.signOut();
  }

  public async isAuth() {
    const user = await this.angularFire.currentUser;
    console.log(user, !!user);
    return !!user;
  }

}
