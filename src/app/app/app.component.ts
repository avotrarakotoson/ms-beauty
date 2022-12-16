import { mSBeautyCreatePrestation } from './../store/actions/prestation.actions';
import { mSBeautyCreateUser } from './../store/actions/user.actions';
import { mSBeautyItem, mSBeautyCreateItem } from './../store/actions/item.actions';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AddPrestationComponent } from '../components/add-prestation/add-prestation.component';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { PrestationState } from '../store/reducers/prestation.reducer';
import { mSBeautyPrestations } from '../store/actions/prestation.actions';
import { mSBeautyUsers } from '../store/actions/user.actions';
import { AddItemComponent } from '../components/add-item/add-item.component';

@Component({
  selector: 'msb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ms-beauty';

  constructor(
    public dialog: MatDialog,
    private store: Store<PrestationState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(mSBeautyPrestations());
    this.store.dispatch(mSBeautyUsers());
    this.store.dispatch(mSBeautyItem());
  }

  addItemModal() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const item = result;
      this.store.dispatch(mSBeautyCreateItem({ data: item }));
    });
  }

  addUserModal() {
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      const item = result;
      this.store.dispatch(mSBeautyCreateUser({ data: item }));
    });
  }

  addPrestationModal() {
    const dialogRef = this.dialog.open(AddPrestationComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const item = result;
      this.store.dispatch(mSBeautyCreatePrestation({ data: item }))
    });
  }
}
