import { NgModule } from '@angular/core';

import { ConfigurationPageRoutingModule } from './configuration-routing.module';

import { ConfigurationPage } from './configuration.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    ConfigurationPageRoutingModule,
    SharedModule
  ],
  declarations: [ConfigurationPage]
})
export class ConfigurationPageModule {}
