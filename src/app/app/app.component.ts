import { mSBeautyItem } from './../store/actions/item.actions';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { mSBeautyPrestations } from '../store/actions/prestation.actions';
import { mSBeautyCustomers } from '../store/actions/customer.actions';

@Component({
  selector: 'msb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ms-beauty';
  current: Date = new Date();

  constructor(
    public dialog: MatDialog,
    private store: Store<any>,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(mSBeautyPrestations());
    this.store.dispatch(mSBeautyCustomers());
    this.store.dispatch(mSBeautyItem());
  }
}
