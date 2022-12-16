import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

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
    firstName: "Tolotra",
    lastName: "Rabe",
    gender: "Homme",
    dob: "12/15/1997",
    email: "tolotra@gmail.com ",
    address: "",
    primaryPhone: "+261 34 32 000 54",
    secondaryPhone: "",
  },
  // {
  //   id: 3,
  //   firstName: "Avotra",
  //   lastName: "Rakotoson",
  //   gender: "Homme",
  //   dob: "12/14/1997",
  //   email: "avotra@gmail.com ",
  //   address: "",
  //   primaryPhone: "+261 34 93 543 89",
  //   secondaryPhone: "",
  // },
  // {
  //   id: 4,
  //   firstName: "Avotra",
  //   lastName: "Rakotoson",
  //   gender: "Homme",
  //   dob: "12/14/1997",
  //   email: "avotra@gmail.com ",
  //   address: "",
  //   primaryPhone: "+261 34 93 543 89",
  //   secondaryPhone: "",
  // },
  // {
  //   id: 5,
  //   firstName: "Avotra",
  //   lastName: "Rakotoson",
  //   gender: "Homme",
  //   dob: "12/14/1997",
  //   email: "avotra@gmail.com ",
  //   address: "",
  //   primaryPhone: "+261 34 93 543 89",
  //   secondaryPhone: "",
  // },
  // {
  //   id: 6,
  //   firstName: "Avotra",
  //   lastName: "Rakotoson",
  //   gender: "Homme",
  //   dob: "12/14/1997",
  //   email: "avotra@gmail.com ",
  //   address: "",
  //   primaryPhone: "+261 34 93 543 89",
  //   secondaryPhone: "",
  // },
  // {
  //   id: 7,
  //   firstName: "Avotra",
  //   lastName: "Rakotoson",
  //   gender: "Homme",
  //   dob: "12/14/1997",
  //   email: "avotra@gmail.com ",
  //   address: "",
  //   primaryPhone: "+261 34 93 543 89",
  //   secondaryPhone: "",
  // },
  // {
  //   id: 8,
  //   firstName: "Avotra",
  //   lastName: "Rakotoson",
  //   gender: "Homme",
  //   dob: "12/14/1997",
  //   email: "avotra@gmail.com ",
  //   address: "",
  //   primaryPhone: "+261 34 93 543 89",
  //   secondaryPhone: "",
  // },
  // {
  //   id: 9,
  //   firstName: "Avotra Niaina",
  //   lastName: "Rakotoson",
  //   gender: "Homme",
  //   dob: "12/14/1997",
  //   email: "avotra@gmail.com ",
  //   address: "",
  //   primaryPhone: "+261 34 93 543 89",
  //   secondaryPhone: "",
  // },{
  //   id: 10,
  //   firstName: "Avotra Tolojanahary",
  //   lastName: "Rakotoson",
  //   gender: "Homme",
  //   dob: "12/14/1997",
  //   email: "avotra@gmail.com ",
  //   address: "",
  //   primaryPhone: "+261 34 93 543 89",
  //   secondaryPhone: "",
  // },
  // {
  //   id: 11,
  //   firstName: "Avotra",
  //   lastName: "Rakotoson",
  //   gender: "Homme",
  //   dob: "12/14/1997",
  //   email: "avotra@gmail.com ",
  //   address: "",
  //   primaryPhone: "+261 34 93 543 89",
  //   secondaryPhone: "",
  // }
]

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = USER_DATA;
  constructor() { }

  getAll(): Observable<User[]> {
    return of(this.users);
  }

  getOne(id: number): Observable<User | null> {
    const user = this.users.find(user => user.id === id);

    if (!user) return of(null);

    return of(user);
  }

  create(paylaod: CreateUserDto): Observable<User> {
    const user = {
      id: 19,
      firstName: paylaod.firstName,
      lastName: paylaod.lastName,
      gender: paylaod.gender,
      dob: paylaod.dob,
      email: paylaod.email,
      address: "",
      primaryPhone: paylaod.primaryPhone,
      secondaryPhone: "",
    }

    this.users = [...this.users, user];
    return of(user);
  }

  update(payload: UpdateUserDto): Observable<boolean> {
    const { id } = payload;
    this.users = this.users.map(user => {
      if(user.id === id) {
        user = Object.assign({...user}, payload);
      }

      return user;
    });

    return of(true);
  }
}
