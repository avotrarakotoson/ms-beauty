import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prestation } from 'src/app/models';
import { CreatePrestationDto, UpdatePrestationDto } from '../dtos/prestation.dto';

const PRESTATION_DATA = [
  {
    id: 1,
    title: "Prestation",
    items: ["Shampooing", "Soins", "Brushung"],
    description: "",
    rates: [
      { rate: 2, currency: 'USD', timestamp: 1670950352 }
    ]
  },
  {
    id: 2,
    title: "Prestation",
    items: ["Shampooing", "Soins", "Coupe", "Brushung"],
    description: "",
    rates: [
      { rate: 2, currency: 'USD', timestamp: 1670950352 }
    ]
  },
  {
    id: 3,
    title: "Prestation",
    items: ["Couleur", "Shampooing", "Soins", "Brushung"],
    description: "",
    rates: [
      { rate: 2, currency: 'USD', timestamp: 1670950352 }
    ]
  },
  {
    id: 4,
    title: "Prestation",
    items: ["Meches", "Shampooing", "Soins", "Brushung"],
    description: "",
    rates: [
      { rate: 2, currency: 'USD', timestamp: 1670950352 }
    ]
  },
  {
    id: 5,
    title: "Prestation",
    items: ["Meches", "Shampooing", "Soins", "Coupe", "Brushung"],
    description: "",
    rates: [
      { rate: 2, currency: 'USD', timestamp: 1670950352 }
    ]
  },
  {
    id: 6,
    title: "Prestation",
    items: ["Couleur", "Meches", "Shampooing", "Soins", "Coupe", "Brushung"],
    description: "",
    rates: [
      { rate: 2, currency: 'USD', timestamp: 1670950352 }
    ]
  },
  {
    id: 7,
    title: "Prestation",
    items: ["Shampooing", "Coupe Homme"],
    description: "",
    rates: [
      { rate: 2, currency: 'USD', timestamp: 1670950352 }
    ]
  },
  {
    id: 8,
    title: "Prestation",
    items: ["Shampooing", "Soins seulement"],
    description: "",
    rates: [
      { rate: 2, currency: 'USD', timestamp: 1670950352 }
    ]
  },
  // {
  //   id: 9,
  //   title: "Prestation",
  //   items: ["Defrisage", "Shampooing", "Soins", "Brushing"],
  //   description: "",
  //   rates: [
  //     { rate: 2, currency: 'USD', timestamp: 1670950352 }
  //   ]
  // },
  // {
  //   id: 10,
  //   title: "Prestation",
  //   items: ["Defrisage", "Shampooing", "Soins", "Coupe", "Brushing"],
  //   description: "",
  //   rates: [
  //     { rate: 2, currency: 'USD', timestamp: 1670950352 }
  //   ]
  // },
  // {
  //   id: 11,
  //   title: "Prestation",
  //   items: ["Lissage Brésilien",],
  //   description: "",
  //   rates: [
  //     { rate: 2, currency: 'USD', timestamp: 1670950352 }
  //   ]
  // },
  // {
  //   id: 12,
  //   title: "Prestation",
  //   items: ["Soins lissant à l\'hyalluronique"],
  //   description: "",
  //   rates: [
  //     { rate: 2, currency: 'USD', timestamp: 1670950352 }
  //   ]
  // },
  // {
  //   id: 13,
  //   title: "Prestation",
  //   items: ["Lissage a l\'huile d\'olive"],
  //   description: "",
  //   rates: [
  //     { rate: 2, currency: 'USD', timestamp: 1670950352 }
  //   ]
  // },
  // {
  //   id: 14,
  //   title: "Prestation",
  //   items: ["Permanente"],
  //   description: "",
  //   rates: [
  //     { rate: 2, currency: 'USD', timestamp: 1670950352 },
  //     { rate: 2.3, currency: 'USD', timestamp: 1670950342 },
  //     { rate: 2.1, currency: 'USD', timestamp: 1670950362 },
  //   ]
  // },
]

@Injectable({
  providedIn: 'root'
})
export class PrestationService {
  prestations: Prestation[] = PRESTATION_DATA;

  constructor() { }

  getAll(): Observable<Prestation[]> {
    return of(this.prestations);
  }

  getOne(id: number): Observable<Prestation | null> {
    const user = this.prestations.find(user => user.id === id);

    if (!user) return of(null);
    return of(user);
  }

  create(paylaod: CreatePrestationDto): Observable<Prestation> {
    const rate = { rate: paylaod.rate, currency: paylaod.currency, timestamp: Date.now() }
    const prestation = {
      id: 19,
      title: paylaod.title,
      description: paylaod.description,
      items: paylaod.items,
      rates: [rate],
    }

    this.prestations = [...this.prestations, prestation];
    return of(prestation);
  }

  update(payload: UpdatePrestationDto): Observable<boolean> {
    const { id } = payload;
    let prestation = this.prestations.find(prestation => prestation.id === id);

    if (!prestation) return of(false);

    prestation = {...prestation, ...payload};
    return of(true);
  }
}
