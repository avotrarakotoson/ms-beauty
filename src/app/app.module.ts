import { DatePipe } from '@angular/common';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as fromUser from './store/reducers/user.reducer';
import * as fromItem from './store/reducers/item.reducer';
import * as fromPrestation from './store/reducers/prestation.reducer';
import * as fromPrestationSales from './store/reducers/prestation-sales.reducer';

import { UserEffects } from './store/effects/user.effects';
import { PrestationEffects } from './store/effects/prestation.effects';
import { PrestationSalesEffects } from './store/effects/prestation-sales.effects';

import { SharedModule } from './shared/shared.module';

import { UserService } from './core/services/user.service';
import { PrestationService } from './core/services/prestation.service';
import { SoldPrestationService } from './core/services/sold-prestation.service';
import { ItemEffects } from './store/effects/item.effects';
import { ItemService } from './core/services/item.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({
      [fromUser.userFeatureKey]: fromUser.reducer,
      [fromPrestation.prestationFeatureKey]: fromPrestation.reducer,
      [fromPrestationSales.prestationSalesFeatureKey]: fromPrestationSales.reducer,
      [fromItem.itemFeatureKey]: fromItem.reducer,
    }, {}),
    EffectsModule.forRoot([UserEffects, ItemEffects, PrestationEffects, PrestationSalesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [DatePipe, UserService, ItemService, PrestationService, SoldPrestationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
