import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserComponent } from 'src/app/components/add-user/add-user.component';
import { AddItemComponent } from 'src/app/components/add-item/add-item.component';
import { AddPrestationComponent } from 'src/app/components/add-prestation/add-prestation.component';
import { SoldPrestationComponent } from 'src/app/components/sold-prestation/sold-prestation.component';

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
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatAutocompleteModule,
  MatRippleModule,
  NgSelectModule
]

@NgModule({
  declarations: [
    AddUserComponent,
    AddItemComponent,
    AddPrestationComponent,
    SoldPrestationComponent
  ],
  imports: [
    CommonModule,
    ...materialModule
  ],
  exports: [
    ...materialModule,
    CommonModule,
    AddUserComponent,
    AddItemComponent,
    AddPrestationComponent,
    SoldPrestationComponent
  ]
})
export class SharedModule { }