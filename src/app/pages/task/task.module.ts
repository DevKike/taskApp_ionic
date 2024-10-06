import { NgModule } from '@angular/core';


import { TasksPage } from './task.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { TaskPageRoutingModule } from './task-routing.module';

@NgModule({
  imports: [TaskPageRoutingModule, SharedModule],
  declarations: [TasksPage],
})
export class TasksPageModule {}
