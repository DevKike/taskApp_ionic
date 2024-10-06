import { NgModule } from '@angular/core';


import { TaskPage } from './task.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { TaskPageRoutingModule } from './task-routing.module';

@NgModule({
  imports: [TaskPageRoutingModule, SharedModule],
  declarations: [TaskPage],
})
export class TaskPageModule {}
