import { DatePipe, registerLocaleData } from '@angular/common';
import { NgModule, isDevMode, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as fromCustomer from './store/reducers/customer.reducer';
import * as fromItem from './store/reducers/item.reducer';
import * as fromPrestation from './store/reducers/prestation.reducer';
import * as fromPrestationSales from './store/reducers/prestation-sales.reducer';
import * as fromAgenda from './store/reducers/agenda.reducer';

import { CustomerEffects } from './store/effects/customer.effects';
import { PrestationEffects } from './store/effects/prestation.effects';
import { PrestationSalesEffects } from './store/effects/prestation-sales.effects';

import { SharedModule } from './shared/shared.module';

import { CustomerService } from './core/services/customer.service';
import { PrestationService } from './core/services/prestation.service';
import { SoldPrestationService } from './core/services/sold-prestation.service';
import { ItemEffects } from './store/effects/item.effects';
import { ItemService } from './core/services/item.service';
import { HomeComponent } from './pages/home/home.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ItemsComponent } from './pages/items/items.component';
import { PrestationsComponent } from './pages/prestations/prestations.component';
import { SalesComponent } from './pages/sales/sales.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AgendaService } from './core/services/agenda.service';
import { AgendaEffects } from './store/effects/agenda.effects';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr')

const components = [
  HomeComponent,
  CustomersComponent,
  ItemsComponent,
  PrestationsComponent,
  SalesComponent,
  AgendaComponent,
  ReportsComponent
]

@NgModule({
  declarations: [
    AppComponent,
    ...components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({
      [fromCustomer.customerFeatureKey]: fromCustomer.reducer,
      [fromPrestation.prestationFeatureKey]: fromPrestation.reducer,
      [fromPrestationSales.prestationSalesFeatureKey]: fromPrestationSales.reducer,
      [fromItem.itemFeatureKey]: fromItem.reducer,
      [fromAgenda.agendaFeatureKey]: fromAgenda.reducer,
    }, {}),
    EffectsModule.forRoot([CustomerEffects, ItemEffects, PrestationEffects, PrestationSalesEffects, AgendaEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    DatePipe,
    CustomerService,
    ItemService,
    PrestationService,
    SoldPrestationService,
    AgendaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
