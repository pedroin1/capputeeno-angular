import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProductFilter } from '../entities/product-filter';
import { IOrganizeForFilter } from '../entities/organize-filter';
import { IPageFilter } from '../entities/page-filter';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private productTypes: IProductFilter[] = [
    { name: 'Todos os Produtos', type: 'ALL', selected: true },
    { name: 'Camisas', type: 'T-SHIRTS', selected: false },
    { name: 'Canecas', type: 'MUGS', selected: false },
  ];

  private organizeForTypes: IOrganizeForFilter[] = [
    { name: 'Novidades', type: 'NEWS', selected: true },
    { name: 'Preco Menor - Maior', type: 'MINOR_PRICE', selected: false },
    { name: 'Preco Maior - Menor', type: 'BIGGEST_PRICE', selected: false },
    { name: 'Mais Vendidos', type: 'MOST_SELL', selected: false },
  ];

  private paginationOrder: IPageFilter[] = [
    { page: '1', selected: true },
    { page: '2', selected: false },
    { page: '3', selected: false },
    { page: '4', selected: false },
    { page: '5', selected: false },
    { page: '<', selected: false },
    { page: '>', selected: false },
  ];

  private _selectedProduct$ = new BehaviorSubject<IProductFilter>(
    this.productTypes[0]
  );
  public selectedProduct$ = this._selectedProduct$.asObservable();

  private _selectedOrganizeFor$ = new BehaviorSubject<IOrganizeForFilter>(
    this.organizeForTypes[0]
  );
  public selectedOrganizeFor$ = this._selectedOrganizeFor$.asObservable();

  private _selectedPage$ = new BehaviorSubject<IPageFilter>(
    this.paginationOrder[0]
  );
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

  public toggleProduct(selectedProduct: IProductFilter) {
    this.productTypes.forEach((item) => {
      item.selected = item.type === selectedProduct.type;

      if (item.type === selectedProduct.type) {
        this._selectedProduct$.next(item);
      }
    });
  }
  public toggleOrganizeFor(selectedOrganizeFor: IOrganizeForFilter) {
    this.organizeForTypes.forEach((item) => {
      item.selected = item.type === selectedOrganizeFor.type;

      if (item.type === selectedOrganizeFor.type) {
        this._selectedOrganizeFor$.next(item);
      }
    });
  }
  public togglePage(selectedPage: IPageFilter) {
    this.paginationOrder.forEach((item) => {
      item.selected = item.page === selectedPage.page;

      if (item.page === selectedPage.page) {
        this._selectedPage$.next(item);
      }
    });
  }
}
