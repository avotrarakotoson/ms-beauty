import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { firstValueFrom, map, Observable } from 'rxjs';
import { AddCustomerComponent } from 'src/app/components/add-customer/add-customer.component';
import { Prestation, Customer } from 'src/app/models';
import { mSBeautyCreateCustomer } from 'src/app/store/actions/customer.actions';
import { PrestationState } from 'src/app/store/reducers/prestation.reducer';
import { selectPrestations } from 'src/app/store/selectors/prestation.selectors';
import { selectCustomerFullName, selectUsers } from 'src/app/store/selectors/customer.selectors';
import { SoldPrestationComponent } from 'src/app/components/sold-prestation/sold-prestation.component';
import { mSBeautyCreatePrestationSold } from 'src/app/store/actions/prestation-sales.actions';

@Component({
  selector: 'msb-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesComponent {
  prestations$: Observable<Prestation[]> = this.store.select(selectPrestations);

  customers$: Observable<Customer[]> = this.store.select(selectUsers);

  isBirthday: boolean = false;
  soldPrestations: Prestation[] = [];

  isChecked: boolean = false;
  reduction: number = 0;
  customerId: number | undefined;
  total: { rate: number, currency: string } = { rate: 0, currency: ''};

  constructor(
    private store: Store<PrestationState>,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {}

  get date() {
    return new Date();
  }

  setTotal(): void {
    this.total = this.soldPrestations.reduce((acc, prestation) => {
      acc.rate += prestation.rate;
      acc.currency = prestation.currency;

      return acc
    }, { rate: 0, currency: '' });

    if (this.reduction) {
      this.total.rate = this.total.rate - (this.total.rate * this.reduction / 100);
    }
  }

  getItems(items: string[]): string {
    return items.join(', ');
  }

  soldPrestation(prestation: Prestation) {
    const index = this.soldPrestations.findIndex(item => item.id === prestation.id);

    if (index === -1) {
      this.soldPrestations.push(prestation);
      this.setTotal();
    }
  }

  removeSoldPrestation(index: number) {
    this.soldPrestations.splice(index, 1);
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

  async validateSale() {
    if (!this.customerId) {
      this._snackBar.open('Veuillez choisir un client', 'Fermer');
      return;
    }

    if (this.soldPrestations.length < 1) {
      this._snackBar.open('Veuillez choisir une prestation', 'Fermer');
      return;
    }

    const totalRateItem = this.soldPrestations.reduce((sum, item) => sum += item.rate, 0);

    const payload = {
      saleDate: Date.now(),
      customerId: this.customerId,
      amount: this.reduction ? totalRateItem - (totalRateItem * this.reduction / 100) : totalRateItem,
      reduction: this.reduction,
      items: this.soldPrestations.map(item => {
        return {
          title: item.title,
          items: item.items,
          rate: item.rate,
          currency: item.currency
        };
      })
    };

    const dialogRef = this.dialog.open(SoldPrestationComponent, {
      data: {
        fullName: await firstValueFrom(this.store.select(selectCustomerFullName(this.customerId))),
        amount: payload.amount,
        currency: payload.items[0].currency,
        reduction: this.reduction
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(mSBeautyCreatePrestationSold({ data: payload }));
        this.reset();
      }
    });
  }

  reset() {
    console.log('Here...');

    this.soldPrestations = [];
    this.reduction = 0;
    this.setTotal();
    this.customerId = undefined;

    this.cd.detectChanges();
  }
}
