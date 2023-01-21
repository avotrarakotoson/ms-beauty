import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Prestation, Customer, PrestationSold } from 'src/app/models';
import { PrestationState } from 'src/app/store/reducers/prestation.reducer';
import { CustomerState } from 'src/app/store/reducers/customer.reducer';
import { selectPrestations } from 'src/app/store/selectors/prestation.selectors';
import { selectUsers } from 'src/app/store/selectors/customer.selectors';
import { selectSoldPrestationsByCustomer } from 'src/app/store/selectors/prestation-sales.selectors';
import { mSBeautyPrestationSoldByCustomer } from 'src/app/store/actions/prestation-sales.actions';

@Component({
  selector: 'msb-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent {
  today = new Date();
  data: any;
  reservationForm: FormGroup;
  customers$: Observable<Customer[]> = this.store.select(selectUsers);
  history$: Observable<PrestationSold[]> = this.store.select(selectSoldPrestationsByCustomer);
  prestations$: Observable<Prestation[]> = this.store.select(selectPrestations);

  constructor(
    public dialogRef: MatDialogRef<AddReservationComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private formBuilder: FormBuilder,
    private store: Store<CustomerState|PrestationState>
  ) {
    this.data = data;
    this.reservationForm = this.formBuilder.group({
      agendaDate: ['', Validators.required],
      customerId: [null, Validators.required],
      prestations: [null, Validators.required],
      comment: [''],
    })
  }

  selectHistory(user: Customer | undefined) {
    if (user) {
      const { id } = user;
      console.log('Select histoty component...', id);
      this.store.dispatch(mSBeautyPrestationSoldByCustomer({ id }));
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.reservationForm.invalid) return;

    const payload: any = this.reservationForm.value;
    this.dialogRef.close(payload);
  }
}
