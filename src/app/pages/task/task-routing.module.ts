import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksPage } from './task.page';


const routes: Routes = [
  {
    path: '',
    component: TasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskPageRoutingModule {}
