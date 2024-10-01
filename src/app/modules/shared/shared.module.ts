import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { FirestoreService } from './services/firestore/firestore.service';
import { StorageService } from './services/storage/storage.service';

const MODULES = [CommonModule, FormsModule, IonicModule, ReactiveFormsModule];

const COMPONENTS = [InputComponent, ButtonComponent, CardComponent];

const PROVIDERS = [FirestoreService, StorageService];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [...PROVIDERS],
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}
