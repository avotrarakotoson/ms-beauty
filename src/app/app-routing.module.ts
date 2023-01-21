import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemsComponent } from './pages/items/items.component';
import { PrestationsComponent } from './pages/prestations/prestations.component';
import { SalesComponent } from './pages/sales/sales.component';

const routes: Routes = [
  {
    title: 'Home',
    path: 'ms-home',
    component: HomeComponent
  },
  {
    title: 'Clients',
    path: 'ms-customers',
    component: CustomersComponent
  },
  {
    title: 'Items',
    path: 'ms-items',
    component: ItemsComponent
  },
  {
    title: 'Prestations',
    path: 'ms-prestations',
    component: PrestationsComponent
  },
  {
    title: 'Sales',
    path: 'ms-sales',
    component: SalesComponent
  },
  {
    title: 'Agenda',
    path: 'ms-agenda',
    component: AgendaComponent
  },
  {
    title: 'report',
    path: 'ms-reports',
    component: ReportsComponent
  },
  {
    path: '',
    redirectTo: 'ms-home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'ms-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
