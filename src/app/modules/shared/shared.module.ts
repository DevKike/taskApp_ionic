import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { FirestoreService } from './services/firestore/firestore.service';
import { StorageService } from './services/storage/storage.service';
import { ToastService } from './services/toast/toast.service';
import { HeaderComponent } from './components/header/header.component';
import { LoadingService } from './services/loading/loading.service';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { RouterModule } from '@angular/router';

const MODULES = [
  CommonModule,
  FormsModule,
  IonicModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule
];

const COMPONENTS = [
  InputComponent,
  ButtonComponent,
  CardComponent,
  HeaderComponent,
  FooterComponent,
  MenuComponent,
  ThumbnailComponent,
];

const PROVIDERS = [
  FirestoreService,
  StorageService,
  ToastService,
  LoadingService,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [...PROVIDERS],
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}
