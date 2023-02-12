import { DatePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, map } from 'rxjs';
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
  styleUrls: ['./customers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['username', 'contact', 'next_appointment', 'last_appointment', 'regiter_date', 'action'];
  allCustomers$!: Observable<Customer[]>;
  customers$!: Observable<Customer[]>;
  history$!: Observable<PrestationSold[]>;

  constructor(
    public dialog: MatDialog,
    private store: Store<CustomerState>,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.allCustomers$ = this.store.select(selectUsers);
    this.customers$ = this.allCustomers$;

    this.history$ = this.store.select(selectSoldPrestationsByCustomer);
  }

  onSearch(event: any) {
    const keyword: string = event.target.value;

    if (keyword.length > 2) {
      this.customers$ = this.allCustomers$
        .pipe(
          debounceTime(500),
          map(customers => {
            return customers.filter(customer => {
              for (const key of ['firstName', 'lastName', 'email', 'primaryPhone', 'dob', 'registryDate']) {
                let target = (customer[key as keyof Customer])?.toString() ?? '';

                if (['dob', 'registryDate'].includes(key)) {
                  target = this.datePipe.transform(target, 'd MMMM y') ?? '';
                }

                if (this.matchPattern(target, keyword)) {
                  return true;
                }
              }

              return false;
            });
          })
        )
    } else {
      this.customers$ = this.allCustomers$;
    }
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

  private matchPattern(target: string, value: string) {
    return target.match(new RegExp(value, 'gi'));
  }
}
