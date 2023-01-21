import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api';
import { from, map, Observable, of } from 'rxjs';
import { PrestationSold, PrestationSoldFromCmd } from 'src/app/models';
import { CreateSoldPrestationDto } from '../dtos/sold-prestation.dto';

const PRESTATION_DATA = [
  {
    id: 3,
    saleDate: "2023-01-20T23:17:42.537",
    amount: 3.2,
    reduction: 20,
    customerId: 1,
    fullName: 'Avotra Rakotoson',
    items: [
      {
        id: 5,
        title: "Prestation",
        items: "Shampooing, Coupe Homme",
        rate: 2,
        currency: "USD",
      },
      {
        id: 6,
        title: "Prestation",
        items: "Shampooing, Soins seulement",
        rate: 2,
        currency: "USD",
      }
    ],
  }
]

@Injectable({
  providedIn: 'root'
})
export class SoldPrestationService {
  prestationSold: PrestationSold[] = PRESTATION_DATA;

  getAll(): Observable<PrestationSold[]> {
    // return of(this.prestationSold);
    return from(invoke('get_all_sales'))
      .pipe(
        map((result: any) => {
          const salesPrestation: PrestationSoldFromCmd[] = JSON.parse(result);

          return salesPrestation.map(salePrestation => {
            const { sale_date, customer_id, full_name, items, ...data } = salePrestation;

            return Object.assign(data, {
              saleDate: sale_date,
              customerId: customer_id,
              fullName: full_name,
              items: items.map(item => {
                const { sale_id, ...originItem } = item;
                return originItem;
              })
            });
          })
        })
      )
  }

  getAllByCustomerId(id: number): Observable<PrestationSold[]> {
    console.log('Start getting info...');

    return from(invoke('get_all_sale_by_customer_id', { id }))
      .pipe(
        map((result: any) => {
          const salesPrestation: PrestationSoldFromCmd[] = JSON.parse(result);

          return salesPrestation.map(salePrestation => {
            const { sale_date, customer_id, full_name, items, ...data } = salePrestation;

            return Object.assign(data, {
              saleDate: sale_date,
              customerId: customer_id,
              fullName: full_name,
              items: items.map(item => {
                const { sale_id, ...originItem } = item;
                return originItem;
              })
            });
          })
        })
      )
  }

  getOne(id: number): Observable<PrestationSold> {
    // const user = this.prestationSold.find(user => user.id === id);
    // return of(user);

    return of();
  }

  create(payload: CreateSoldPrestationDto): Observable<PrestationSold> {
    return from(invoke('create_sale_prestation', {
      payload : {
        sale_date: payload.saleDate,
        amount: payload.amount,
        reduction: payload.reduction,
        customer_id: payload.customerId,
        items: payload.items.map(item => {
          return {
            title: item.title,
            items: item.items.join(', '),
            rate: item.rate,
            currency: item.currency
          };
        }),
      },
    }))
    .pipe(
      map((result: any) => {
        const salesPrestation: PrestationSoldFromCmd = JSON.parse(result);
        const { sale_date, customer_id, full_name, items, ...data } = salesPrestation;

        return Object.assign(data, {
          saleDate: sale_date,
          customerId: customer_id,
          fullName: full_name,
          items: items.map(item => {
            const { sale_id, ...originItem } = item;
            return originItem;
          })
        });
      })
    )
  }
}
