import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Prestation, Customer } from 'src/app/models';
import { PrestationState } from 'src/app/store/reducers/prestation.reducer';
import { CustomerState } from 'src/app/store/reducers/customer.reducer';
import { selectPrestations } from 'src/app/store/selectors/prestation.selectors';
import { selectUsers } from 'src/app/store/selectors/customer.selectors';

@Component({
  selector: 'msb-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent {
  data: any;
  reservationForm: FormGroup;
  customers$: Observable<Customer[]> = this.store.select(selectUsers);
  prestations$: Observable<Prestation[]> = this.store.select(selectPrestations);

  constructor(
    public dialogRef: MatDialogRef<AddReservationComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private formBuilder: FormBuilder,
    private store: Store<CustomerState|PrestationState>
  ) {
    this.data = data;
    this.reservationForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      customer: [],
      prestation: [],
      comment: [],
    })
  }

  selectHistory(user: Customer | undefined) {
    if (user) {
      const { id: customerId } = user;
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
