import { NgModule } from '@angular/core';

import { TasksPageRoutingModule } from './tasks-routing.module';

import { TasksPage } from './tasks.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [TasksPageRoutingModule, SharedModule],
  declarations: [TasksPage],
})
export class TasksPageModule {}
