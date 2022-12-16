import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'ms-parameter',
    loadChildren: () => import('./features/parameter/parameter.module').then((m) => m.ParameterModule)
  },
  {
    path: 'ms-dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
