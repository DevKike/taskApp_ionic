import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/shared/services/guard/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'register/:userId',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'principal',
    loadChildren: () =>
      import('./pages/principal/principal.module').then(
        (m) => m.PrincipalPageModule
      ),
      canActivate: [AuthGuard],
  },
  {
    path: 'task',
    loadChildren: () =>
      import('./pages/task/task.module').then((m) => m.TaskPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./pages/tasks/tasks.module').then((m) => m.TasksPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'configuration',
    loadChildren: () =>
      import('./pages/configuration/configuration.module').then(
        (m) => m.ConfigurationPageModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
