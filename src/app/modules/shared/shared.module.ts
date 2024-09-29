import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';

const MODULES = [
  CommonModule,
  FormsModule,
  IonicModule,
  ReactiveFormsModule,
];

const COMPONENTS = [
  InputComponent
];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...MODULES
  ],
  providers: [],
  exports: [...MODULES, ...COMPONENTS]
})
export class SharedModule {}
