import { Injectable } from '@angular/core';
import { map, Observable, of, firstValueFrom, from } from 'rxjs';
import { Customer, CustomerFromCmd } from 'src/app/models';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { invoke } from '@tauri-apps/api';

const USER_DATA = [
  {
    id: 1,
    firstName: "Avotra",
    lastName: "Rakotoson",
    gender: "Homme",
    dob: "01/27/1997",
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
]

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: Customer[] = USER_DATA;

  getAll(): Observable<Customer[]> {
    // return of(this.customers)
    //   .pipe(
    //     map((results: Customer[]) => {
    //       return results.map(item => {
    //         const { firstName, lastName, ...customer } = item;

    //         return Object.assign(customer, {
    //           firstName: firstName,
    //           lastName: lastName,
    //           fullName: firstName + ' ' + lastName,
    //         });
    //       })
    //     })
    //   )

    return from(invoke('get_all_customer'))
      .pipe(
        map((results: any) => {
          const customersFromCmd: CustomerFromCmd[] = JSON.parse(results)

          return customersFromCmd.map(customerFromCmd => {
            const { first_name, last_name, primary_phone, registry_date, ...customer } = customerFromCmd;

            return Object.assign(customer, {
              firstName: first_name,
              lastName: last_name,
              fullName: first_name + ' ' + last_name,
              primaryPhone: primary_phone,
              registryDate: registry_date
            });
          })
        })
      )
  }

  getOne(id: number): Observable<Customer> {
    return from(invoke('get_customer', { id }))
      .pipe(
        map((result: any) => {
          const customerFromCmd: CustomerFromCmd = JSON.parse(result)
          const { first_name, last_name, primary_phone, registry_date, ...customer } = customerFromCmd;

          return Object.assign(customer, {
            firstName: first_name,
            lastName: last_name,
            fullName: first_name + ' ' + last_name,
            primaryPhone: primary_phone,
            registryDate: registry_date
          });
        })
      )
  }

  create(customer: CreateCustomerDto): Observable<Customer> {
    return from(invoke('create_customer', {
      payload : {
        last_name: customer.lastName,
        first_name: customer.firstName,
        gender: customer.gender,
        dob: customer.dob,
        email: customer.email,
        primary_phone: customer.primaryPhone
      }
    }))
    .pipe(
      map((result: any) => {
        const customerFromCmd: CustomerFromCmd = JSON.parse(result)
        const { first_name, last_name, primary_phone, registry_date, ...customer } = customerFromCmd;

        return  Object.assign(customer, {
          firstName: first_name,
          lastName: last_name,
          fullName: first_name + ' ' + last_name,
          primaryPhone: primary_phone,
          registryDate: registry_date,
        })
      })
    )
  }

  update(customer: UpdateCustomerDto): Observable<boolean> {
    return from(invoke('update_customer', {
      payload : {
        id: customer.id,
        customer: {
          last_name: customer.lastName,
          first_name: customer.firstName,
          gender: customer.gender,
          dob: customer.dob,
          email: customer.email,
          primary_phone: customer.primaryPhone
        }
      }
    }))
    .pipe(map((result: any) => result === 'true'));
  }

  delete(id: number): Observable<boolean> {
    return from(invoke('delete_customer', { id }))
      .pipe(
        map((result: any) => {
          return result === 'true';
        })
      )
  }
}
