import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from 'src/app/models';
import { CreateItemDto, UpdateItemDto } from '../dtos/item.dto';

const ITEM_DATA = [
  {
    id: 1,
    label: "Shampooing",
  },
  {
    id: 2,
    label: "Soins",
  },
  {
    id: 3,
    label: "Brushung",
  },
  {
    id: 4,
    label: "Coupe",
  },
  {
    id: 5,
    label: "Couleur",
  },
  {
    id: 6,
    label: "Meches",
  },
  {
    id: 7,
    label: "Coupe Homme",
  },
  {
    id: 8,
    label: "Soins seulement",
  },
  {
    id: 9,
    label: "Defrisage",
  },{
    id: 10,
    label: "Lissage Brésilien",
  },
  {
    id: 11,
    label: "Soins lissant à l'hyalluronique",
  },
  {
    id: 12,
    label: "Lissage a l'huile d'olive",
  },
  {
    id: 13,
    label: "Permanente"
  }
]

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Item[] = ITEM_DATA;

  constructor() { }

  getAll(): Observable<Item[]> {
    return of(this.items);
  }

  getOne(id: number): Observable<Item | null> {
    const item = this.items.find(item => item.id === id);

    if (!item) return of(null);

    return of(item);
  }

  create(paylaod: CreateItemDto): Observable<Item> {
    const item = {
      id: 2,
      label: paylaod.label,
    }

    this.items = [...this.items, item];
    return of(item);
  }

  update(payload: UpdateItemDto): Observable<boolean> {
    const { id } = payload;
    let item = this.items.find(item => item.id === id);

    if (!item) return of(false);

    item = {...item, ...payload};
    return of(true);
  }
}
