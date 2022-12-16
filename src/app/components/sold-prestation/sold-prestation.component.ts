import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CreateSoldPrestationDto } from 'src/app/core/dtos/sold-prestation.dto';
import { Prestation, User } from 'src/app/models';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { selectUsers } from 'src/app/store/selectors/user.selectors';

const USER_DATA = [
  {
    id: 1,
    firstName: "Avotra",
    lastName: "Rakotoson",
    gender: "Homme",
    dob: "12/14/1997",
    email: "avotra@gmail.com ",
    address: "",
    primaryPhone: "+261 34 93 543 89",
    secondaryPhone: "",
  },
  {
    id: 2,
    firstName: "Avotra",
    lastName: "Rakotoson",
    gender: "Homme",
    dob: "12/14/1997",
    email: "avotra@gmail.com ",
    address: "",
    primaryPhone: "+261 34 93 543 89",
    secondaryPhone: "",
  },
  {
    id: 3,
    firstName: "Avotra",
    lastName: "Rakotoson",
    gender: "Homme",
    dob: "12/14/1997",
    email: "avotra@gmail.com ",
    address: "",
    primaryPhone: "+261 34 93 543 89",
    secondaryPhone: "",
  },
  {
    id: 4,
    firstName: "Avotra",
    lastName: "Rakotoson",
    gender: "Homme",
    dob: "12/14/1997",
    email: "avotra@gmail.com ",
    address: "",
    primaryPhone: "+261 34 93 543 89",
    secondaryPhone: "",
  },
  {
    id: 5,
    firstName: "Avotra",
    lastName: "Rakotoson",
    gender: "Homme",
    dob: "12/14/1997",
    email: "avotra@gmail.com ",
    address: "",
    primaryPhone: "+261 34 93 543 89",
    secondaryPhone: "",
  },
  {
    id: 6,
    firstName: "Avotra",
    lastName: "Rakotoson",
    gender: "Homme",
    dob: "12/14/1997",
    email: "avotra@gmail.com ",
    address: "",
    primaryPhone: "+261 34 93 543 89",
    secondaryPhone: "",
  },
  {
    id: 7,
    firstName: "Avotra",
    lastName: "Rakotoson",
    gender: "Homme",
    dob: "12/14/1997",
    email: "avotra@gmail.com ",
    address: "",
    primaryPhone: "+261 34 93 543 89",
    secondaryPhone: "",
  },
  {
    id: 8,
    firstName: "Avotra",
    lastName: "Rakotoson",
    gender: "Homme",
    dob: "12/14/1997",
    email: "avotra@gmail.com ",
    address: "",
    primaryPhone: "+261 34 93 543 89",
    secondaryPhone: "",
  },
  {
    id: 9,
    firstName: "Avotra Niaina",
    lastName: "Rakotoson",
    gender: "Homme",
    dob: "12/14/1997",
    email: "avotra@gmail.com ",
    address: "",
    primaryPhone: "+261 34 93 543 89",
    secondaryPhone: "",
  },{
    id: 10,
    firstName: "Avotra Tolojanahary",
    lastName: "Rakotoson",
    gender: "Homme",
    dob: "12/14/1997",
    email: "avotra@gmail.com ",
    address: "",
    primaryPhone: "+261 34 93 543 89",
    secondaryPhone: "",
  },
  {
    id: 11,
    firstName: "Avotra",
    lastName: "Rakotoson",
    gender: "Homme",
    dob: "12/14/1997",
    email: "avotra@gmail.com ",
    address: "",
    primaryPhone: "+261 34 93 543 89",
    secondaryPhone: "",
  }
]

@Component({
  selector: 'msb-sold-prestation',
  templateUrl: './sold-prestation.component.html',
  styleUrls: ['./sold-prestation.component.scss']
})
export class SoldPrestationComponent {
  data: Prestation;
  soldPrestationForm: FormGroup;

  users$: Observable<User[]> = this.store.select(selectUsers)
    .pipe(
      map((users) => {
        return users.map((user) => {
          user = {...user, fullName: user.firstName + ' ' + user.lastName};
          return user;
        });
      })
    );
  isBirthday: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<SoldPrestationComponent>,
    @Inject(MAT_DIALOG_DATA) data: Prestation,
    private formBuilder: FormBuilder,
    private store: Store<UserState>,
    private datePipe: DatePipe
  ) {
    this.data = data;
    this.soldPrestationForm = this.formBuilder.group({
      date: [new Date()],
      prestationId: [this.data.id],
      userId: ['', Validators.required],
      rate: [],
      currency: [],
      discount: [0]
    })
  }

  get date() {
    return this.soldPrestationForm.get('date')?.value;
  }

  ngOnInit(): void {
    if (this.data) {
      this.soldPrestationForm.patchValue(this.data);
      this.soldPrestationForm.get('rate')?.setValue(this.getRate());
      this.soldPrestationForm.get('currency')?.setValue(this.getCurrency());
    }
  }

  getItems(items: string[]): string {
    return items.join(', ');
  }

  getTotal(): string {
    const discount = this.soldPrestationForm.get('discount')?.value;
    let price = this.soldPrestationForm.get('rate')?.value;

    if (discount && discount > 0) {
      price = price - ((price * discount) / 100);
    }

    return `${ price } ${this.soldPrestationForm.get('currency')?.value}`;
  }

  getRate(): number {
    const timestamps = this.data.rates.map(item => item.timestamp);
    const timestamp = Math.max(...timestamps);
    const result = this.data.rates.find(item => item.timestamp === timestamp);

    return result?.rate ?? 0;
  }

  getCurrency(): string {
    const timestamps = this.data.rates.map(item => item.timestamp);
    const timestamp = Math.max(...timestamps);
    const result = this.data.rates.find(item => item.timestamp === timestamp);

    return result?.currency ?? '';
  }

  onUserChange(user: User) {
    const { dob } = user;

    const now = new Date();
    const birthday = new Date(dob);

    if (now.getMonth() === birthday.getMonth() && now.getDate() === birthday.getDate()) {
      this.isBirthday = true;
    } else {
      this.isBirthday = false;
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.soldPrestationForm.invalid) return;

    const payload: CreateSoldPrestationDto = this.soldPrestationForm.value;
    payload.date = this.datePipe.transform(payload.date, 'MM/dd/YYYY hh:mm') ?? '';

    this.dialogRef.close(payload);
  }
}
