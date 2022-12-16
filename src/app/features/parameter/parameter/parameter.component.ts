import { mSBeautyUpdatePrestation } from './../../../store/actions/prestation.actions';
import { mSBeautyUpdateUser } from './../../../store/actions/user.actions';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddPrestationComponent } from 'src/app/components/add-prestation/add-prestation.component';
import { AddUserComponent } from 'src/app/components/add-user/add-user.component';
import { Prestation, User } from 'src/app/models';
import { PrestationState } from 'src/app/store/reducers/prestation.reducer';
import { selectPrestations } from 'src/app/store/selectors/prestation.selectors';
import { selectUsers } from 'src/app/store/selectors/user.selectors';
import { UpdateUserDto } from 'src/app/core/dtos/user.dto';
import { UpdatePrestationDto } from 'src/app/core/dtos/prestation.dto';

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
  selector: 'msb-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent {
  displayedColumns: string[] = ['username', 'gender', 'dob', 'contact'];
  dataSource$: Observable<User[]> = this.store.select(selectUsers);

  displayedColumnsPreatation: string[] = ['name', 'item', 'price'];
  dataSourcePrestation$: Observable<Prestation[]> = this.store.select(selectPrestations);

  constructor(
    public dialog: MatDialog,
    private store: Store<PrestationState>
  ) {}

  getItems(items: string[]): string {
    if (!items) return '';

    return items.join(', ');
  }

  isBirthday(dob: string): boolean {
    const now = new Date();
    const birthday = new Date(dob);

    if (now.getMonth() === birthday.getMonth() && now.getDate() === birthday.getDate()) {
      return true
    }

    return false;
  }

  getPrice(value: { rate: number, currency: string; timestamp: number }[]): string {
    const timestamps = value.map(item => item.timestamp);
    const timestamp = Math.max(...timestamps);
    const result = value.find(item => item.timestamp === timestamp);

    if (!result) return '';
    return `${result.rate} ${result.currency}`;
  }

  updateUserModal(user: User) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      const item: UpdateUserDto = Object.assign({...user}, result);
      this.store.dispatch(mSBeautyUpdateUser({ data: item }));
    });
  }

  updatePrestationModal(prestation: Prestation) {
    const dialogRef = this.dialog.open(AddPrestationComponent, {
      data: prestation,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const item: UpdatePrestationDto = Object.assign({...prestation}, result);
      this.store.dispatch(mSBeautyUpdatePrestation({ data: item }));
    });
  }
}
