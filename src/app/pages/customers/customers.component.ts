import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddCustomerComponent } from 'src/app/components/add-customer/add-customer.component';
import { ConfirmDeleteComponent } from 'src/app/components/confirm-delete/confirm-delete.component';
import { UpdateCustomerDto } from 'src/app/core/dtos/customer.dto';
import { Customer, PrestationSold } from 'src/app/models';
import { mSBeautyCreateCustomer, mSBeautyUpdateCustomer, mSBeautyDeleteCustomer } from 'src/app/store/actions/customer.actions';
import { mSBeautyPrestationSoldByCustomer } from 'src/app/store/actions/prestation-sales.actions';
import { CustomerState } from 'src/app/store/reducers/customer.reducer';
import { selectUsers } from 'src/app/store/selectors/customer.selectors';
import { selectSoldPrestationsByCustomer } from 'src/app/store/selectors/prestation-sales.selectors';

@Component({
  selector: 'msb-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  displayedColumns: string[] = ['username', 'dob', 'contact', 'next_appointment', 'last_appointment', 'regiter_date', 'action'];
  customers$: Observable<Customer[]> = this.store.select(selectUsers);
  history$: Observable<PrestationSold[]> = this.store.select(selectSoldPrestationsByCustomer);

  today: Date = new Date();

  constructor(
    public dialog: MatDialog,
    private store: Store<CustomerState>
  ) {}

  isBirthday(dob: string): boolean {
    const now = new Date();
    const birthday = new Date(dob);

    if (now.getMonth() === birthday.getMonth() && now.getDate() === birthday.getDate()) {
      return true
    }

    return false;
  }

  getHistory(id: number) {
    this.store.dispatch(mSBeautyPrestationSoldByCustomer({ id }));
  }

  addUserModal() {
    const dialogRef = this.dialog.open(AddCustomerComponent);

    dialogRef.afterClosed().subscribe(result => {
      const item = result;

      if (item) {
        this.store.dispatch(mSBeautyCreateCustomer({ data: item }));
      }
    });
  }

  updateUserModal(user: Customer) {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      const item: UpdateCustomerDto = Object.assign({...user}, result);
      this.store.dispatch(mSBeautyUpdateCustomer({ data: item }));
    });
  }

  deleteUserModal(user: Customer) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { label: user.fullName, id: user.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(mSBeautyDeleteCustomer({ id: result }));
      }
    });
  }
}
