import { Injectable } from '@angular/core';
import { IProduct } from '../entities/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private CARD_LIST_PRODUCTS = 'cart-list-products';
  private productList: IProduct[] = [];
  private _countItems$ = new BehaviorSubject<number>(0);

  constructor() {}

  public addItemOnCart(product: IProduct) {
    this.productList.push(product);
    localStorage.setItem(
      this.CARD_LIST_PRODUCTS,
      JSON.stringify(this.productList),
    );
    this._countItems$.next(this.getList().length);
  }

  public getCountListItens() {
    this._countItems$.next(this.getList().length);
    return this._countItems$.asObservable();
  }

  private getList(): [] {
    const list = localStorage.getItem(this.CARD_LIST_PRODUCTS);
    const tempList = JSON.parse(list!);
    return tempList as [];
  }
}
