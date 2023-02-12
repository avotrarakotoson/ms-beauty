import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCustomerComponent } from 'src/app/components/add-customer/add-customer.component';
import { AddItemComponent } from 'src/app/components/add-item/add-item.component';
import { AddPrestationComponent } from 'src/app/components/add-prestation/add-prestation.component';
import { AddReservationComponent } from 'src/app/components/add-reservation/add-reservation.component';
import { ConfirmDeleteComponent } from '../components/confirm-delete/confirm-delete.component';
import { DateAgendaComponent } from '../components/date-agenda/date-agenda.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { SoldPrestationComponent } from '../components/sold-prestation/sold-prestation.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRippleModule} from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FullCalendarModule } from '@fullcalendar/angular';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { IsBirthdayPipe } from '../core/pipes/is-birthday.pipe';
import { JoinPipe } from '../core/pipes/join.pipe';
import { DefaultViewPipe } from '../core/pipes/default-view.pipe';

const materialModule = [
  FormsModule,
  ReactiveFormsModule,
  MatToolbarModule,
  MatCardModule,
  MatChipsModule,
  MatDividerModule,
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatListModule,
  MatIconModule,
  MatBadgeModule,
  MatDialogModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatAutocompleteModule,
  MatRippleModule,
  MatIconModule,
  MatExpansionModule,
  NgSelectModule,
  MatProgressSpinnerModule,
  FullCalendarModule,
]

@NgModule({
  declarations: [
    AddCustomerComponent,
    AddItemComponent,
    AddPrestationComponent,
    AddReservationComponent,
    ConfirmDeleteComponent,
    SoldPrestationComponent,
    DateAgendaComponent,
    LoaderComponent,

    // Pipes
    IsBirthdayPipe,
    JoinPipe,
    DefaultViewPipe,
  ],
  imports: [
    CommonModule,
    ...materialModule
  ],
  exports: [
    ...materialModule,
    CommonModule,
    AddCustomerComponent,
    AddItemComponent,
    AddPrestationComponent,
    AddReservationComponent,
    ConfirmDeleteComponent,
    SoldPrestationComponent,
    DateAgendaComponent,
    LoaderComponent,

    // Pipes
    IsBirthdayPipe,
    JoinPipe,
    DefaultViewPipe,
  ]
})
export class SharedModule { }
