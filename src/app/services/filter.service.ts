import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private productTypes: IProduct[] = [
    { name: 'Todos os Produtos', type: 'ALL', selected: true },
    { name: 'Camisas', type: 'SHIRT', selected: false },
    { name: 'Canecas', type: 'MUG', selected: false },
  ];

  private organizeForTypes: IOrganizeFor[] = [
    { name: 'Novidades', type: 'NEWS', selected: true },
    { name: 'Preco Menor - Maior', type: 'LOW_PRICE', selected: false },
    { name: 'Preco Maior - Menor', type: 'HIGH_PRICE', selected: false },
    { name: 'Mais Vendidos', type: 'MOST_SELL', selected: false },
  ];

  private paginationOrder: IPage[] = [
    { page: '1', selected: true },
    { page: '2', selected: false },
    { page: '3', selected: false },
    { page: '4', selected: false },
    { page: '5', selected: false },
    { page: '<', selected: false },
    { page: '>', selected: false },
  ];

  private _selectedProduct$ = new BehaviorSubject<IProduct>(
    this.productTypes[0]
  );
  public selectedProduct$ = this._selectedProduct$.asObservable();

  private _selectedOrganizeFor$ = new BehaviorSubject<IOrganizeFor>(
    this.organizeForTypes[0]
  );
  public selectedOrganizeFor$ = this._selectedOrganizeFor$.asObservable();

  private _selectedPage$ = new BehaviorSubject<IPage>(this.paginationOrder[0]);
  public selectedPage$ = this._selectedPage$.asObservable();

  public getProductItems() {
    return this.productTypes;
  }
  public getOrganizeForItems() {
    return this.organizeForTypes;
  }
  public getPaginationItems() {
    return this.paginationOrder;
  }

  public toggleProduct(selectedProduct: IProduct) {
    this.productTypes.forEach((item) => {
      item.selected = item.type === selectedProduct.type;

      if (item.type === selectedProduct.type) {
        this._selectedProduct$.next(item);
      }
    });
  }
  public toggleOrganizeFor(selectedOrganizeFor: IOrganizeFor) {
    this.organizeForTypes.forEach((item) => {
      item.selected = item.type === selectedOrganizeFor.type;

      if (item.type === selectedOrganizeFor.type) {
        this._selectedOrganizeFor$.next(item);
      }
    });
  }
  public togglePage(selectedPage: IPage) {
    this.paginationOrder.forEach((item) => {
      item.selected = item.page === selectedPage.page;

      if (item.page === selectedPage.page) {
        this._selectedPage$.next(item);
      }
    });
  }
}
export interface IProduct {
  name: string;
  type: ProductType;
  selected: boolean;
}

export interface IOrganizeFor {
  name: string;
  type: OrganizeForType;
  selected: boolean;
}

export interface IPage {
  page: string;
  selected: boolean;
}

export type ProductType = 'ALL' | 'SHIRT' | 'MUG';
export type OrganizeForType = 'NEWS' | 'LOW_PRICE' | 'HIGH_PRICE' | 'MOST_SELL';
