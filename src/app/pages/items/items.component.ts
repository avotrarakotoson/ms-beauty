import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { debounceTime, filter, map, Observable, mergeAll } from 'rxjs';
import { AddItemComponent } from 'src/app/components/add-item/add-item.component';
import { ConfirmDeleteComponent } from 'src/app/components/confirm-delete/confirm-delete.component';
import { Item } from 'src/app/models';
import { mSBeautyCreateItem, mSBeautyDeleteItem } from 'src/app/store/actions/item.actions';
import { ItemState } from 'src/app/store/reducers/item.reducer';
import { selectItems } from 'src/app/store/selectors/item.selectors';

@Component({
  selector: 'msb-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
  allItems$: Observable<Item[]> = this.store.select(selectItems);
  items$: Observable<Item[]> = this.allItems$;

  constructor(
    public dialog: MatDialog,
    private store: Store<ItemState>
  ) {}

  searchItem(event: any) {
    const keyword: string = event.target.value;
    if (keyword.length > 2) {
      this.items$ = this.allItems$
        .pipe(
          debounceTime(500),
          map(items => {
            return items.filter(item => {
              return this.matchPattern(item.label, keyword);
            });
          })
        )
    } else {
      this.items$ = this.allItems$;
    }
  }

  matchPattern(target: string, value: string): boolean {
    return target.toLowerCase().includes(value.toLowerCase());
  }

  addItemModal() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const item = result;
      this.store.dispatch(mSBeautyCreateItem({ data: item }));
    });
  }

  removeItemModal(item: Item) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { label: item.label, id: item.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(mSBeautyDeleteItem({ id: result }));
      }
    });
  }
}
