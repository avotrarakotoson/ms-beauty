import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PrestationSold } from 'src/app/models';
import { CreateSoldPrestationDto } from '../dtos/sold-prestation.dto';

const PRESTATION_DATA = [
  {
    id: 1,
    date: "12/14/2022 02:23",
    prestation: "Pack 1",
    fullName: "Avotra Rakotoson",
    items: ["Permanent, Coupe"],
    rate: 2,
    currency: "USD",
    discount: 5,
  },
  {
    id: 2,
    date: "12/09/2022 05:23",
    prestation: "Pack 1",
    fullName: "Avotra Rakotoson",
    items: ["Permanent, Soins"],
    rate: 2,
    currency: "USD",
    discount: 10,
  }
]

@Injectable({
  providedIn: 'root'
})
export class SoldPrestationService {
  prestationSold: PrestationSold[] = PRESTATION_DATA;

  getAll(): Observable<PrestationSold[]> {
    return of(this.prestationSold);
  }

  getOne(id: number): Observable<PrestationSold | null> {
    const user = this.prestationSold.find(user => user.id === id);

    if (!user) return of(null);
    return of(user);
  }

  create(payload: CreateSoldPrestationDto): Observable<PrestationSold> {
    const prestation: PrestationSold = {
      id: 19,
      date: payload.date,
      prestation: "",
      fullName: "",
      items: [],
      rate: payload.rate,
      currency: payload.currency,
      discount: payload.discount,
    }

    this.prestationSold = [...this.prestationSold, prestation];
    return of(prestation);
  }
}
