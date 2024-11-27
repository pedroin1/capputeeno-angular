import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private typesItems: ItemProp[] = [
    { name: 'Todos os Produtos', type: 'ALL', selected: true },
    { name: 'Camisas', type: 'SHIRT', selected: false },
    { name: 'Canecas', type: 'MUG', selected: false },
  ];

  private _selectedItem$ = new BehaviorSubject<ItemProp>(this.typesItems[0]);

  public selectedItem$: Observable<ItemProp | null> =
    this._selectedItem$.asObservable();

  toggleItem(item: ItemProp): void {
    this.typesItems.forEach((i) => {
      i.selected = i.name === item.name;
    });

    const selectedItem = this.typesItems.find((i) => i.selected);
    this._selectedItem$.next(selectedItem!);
  }

  getItems(): ItemProp[] {
    return this.typesItems;
  }
}
export interface ItemProp {
  name: string;
  type: ItemType;
  selected: boolean;
}

export type ItemType = 'ALL' | 'SHIRT' | 'MUG';
