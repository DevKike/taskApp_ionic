import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(environment.FIREBASE_CREDENTIALS),
    AngularFireAuthModule,
    AngularFirestoreModule
  ]
})
export class CoreModule { }
