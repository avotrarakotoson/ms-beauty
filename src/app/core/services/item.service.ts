import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api';
import { from, map, Observable } from 'rxjs';
import { Item } from 'src/app/models';
import { CreateItemDto } from '../dtos/item.dto';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  getAll(): Observable<Item[]> {
    return from(invoke('get_all_item'))
      .pipe(
        map((results: any) => {
          const items: Item[] = JSON.parse(results)
          return items;
        })
      )
  }

  getOne(id: number): Observable<Item> {
    return from(invoke('get_item', { id }))
      .pipe(
        map((result: any) => {
          const itemFromCmd: Item = JSON.parse(result);

          return itemFromCmd;
        })
      )
  }

  create(item: CreateItemDto): Observable<Item> {
    return from(invoke('create_item', {
      payload: {
        label: item.label
      }
    }))
    .pipe(
      map((result: any) => {
        const itemFromCmd: Item = JSON.parse(result);

        return itemFromCmd;
      })
    )
  }

  delete(id: number): Observable<boolean> {
    return from(invoke('delete_item', { id }))
      .pipe(
        map((result: any) => {
          return result === 'true';
        })
      )
  }
}
