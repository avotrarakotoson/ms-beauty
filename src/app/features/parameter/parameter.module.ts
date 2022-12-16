import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParameterComponent } from './parameter/parameter.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ParameterComponent
  }
]

@NgModule({
  declarations: [
    ParameterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ParameterModule { }
