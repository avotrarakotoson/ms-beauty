import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api';
import { from, map, Observable, of } from 'rxjs';
import { Prestation, PrestationFromCmd } from 'src/app/models';
import { CreatePrestationDto, UpdatePrestationDto } from '../dtos/prestation.dto';

const PRESTATION_DATA = [
  {
    id: 1,
    title: "Prestation",
    items: ["Shampooing", "Soins", "Brushung"],
    description: "",
    rate: 2,
    currency: 'USD'
  },
  {
    id: 2,
    title: "Prestation",
    items: ["Shampooing", "Soins", "Coupe", "Brushung"],
    description: "",
    rate: 2,
    currency: 'USD'
  },
  {
    id: 3,
    title: "Prestation",
    items: ["Couleur", "Shampooing", "Soins", "Brushung"],
    description: "",
    rate: 2,
    currency: 'USD'
  },
  {
    id: 4,
    title: "Prestation",
    items: ["Meches", "Shampooing", "Soins", "Brushung"],
    description: "",
    rate: 2,
    currency: 'USD'
  },
  {
    id: 5,
    title: "Prestation",
    items: ["Meches", "Shampooing", "Soins", "Coupe", "Brushung"],
    description: "",
    rate: 2,
    currency: 'USD'
  },
  {
    id: 6,
    title: "Prestation",
    items: ["Couleur", "Meches", "Shampooing", "Soins", "Coupe", "Brushung"],
    description: "",
    rate: 2,
    currency: 'USD'
  },
  {
    id: 7,
    title: "Prestation",
    items: ["Shampooing", "Coupe Homme"],
    description: "",
    rate: 2,
    currency: 'USD'
  },
  {
    id: 8,
    title: "Prestation",
    items: ["Shampooing", "Soins seulement"],
    description: "",
    rate: 2,
    currency: 'USD'
  },
]

@Injectable({
  providedIn: 'root'
})
export class PrestationService {
  prestations: Prestation[] = PRESTATION_DATA;

  getAll(): Observable<Prestation[]> {
    // return of(this.prestations);

    return from(invoke('get_all_prestation'))
      .pipe(
        map((results: any) => {
          const prestationsFromCmd: PrestationFromCmd[] = JSON.parse(results)

          return prestationsFromCmd.map(prestationFromCmd => {
            const { items, ...prestation } = prestationFromCmd;

            return Object.assign(prestation, {
              items: items.split(',').map(item => item.trim())
            });
          })
        })
      )
  }

  getOne(id: number): Observable<Prestation | null> {
    return from(invoke('get_prestation', { id }))
      .pipe(
        map((result: any) => {
          const prestationFromCmd: PrestationFromCmd = JSON.parse(result)
          const { items, ...prestation } = prestationFromCmd;

          return Object.assign(prestation, {
            items: items.split(',').map(item => item.trim())
          });
        })
      )
  }

  create(prestation: CreatePrestationDto): Observable<Prestation> {
    return from(invoke('create_prestation', {
      payload : {
        title: prestation.title,
        items: prestation.items.join(', '),
        description: prestation.description,
        rate: prestation.rate,
        currency: prestation.currency,
      }
    }))
    .pipe(
      map((result: any) => {
        const prestationFromCmd: PrestationFromCmd = JSON.parse(result)
        const { items, ...prestation } = prestationFromCmd;

        return  Object.assign(prestation, {
          items: items.split(',').map(item => item.trim())
        })
      })
    )
  }

  update(prestation: UpdatePrestationDto): Observable<boolean> {
    return from(invoke('update_prestation', {
      payload : {
        id: prestation.id,
        prestation: {
          title: prestation.title,
          items: prestation.items.join(', '),
          description: prestation.description,
          rate: prestation.rate,
          currency: prestation.currency,
        }
      }
    }))
    .pipe(map((result: any) => result === 'true'));
  }

  delete(id: number): Observable<boolean> {
    return from(invoke('delete_prestation', { id }))
      .pipe(
        map((result: any) => {
          return result === 'true';
        })
      )
  }
}
