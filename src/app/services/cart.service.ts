import { Injectable } from '@angular/core';
import { IProduct } from '../entities/product';
import { BehaviorSubject } from 'rxjs';
import { ICart } from '../entities/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private CART_LIST_PRODUCTS = 'cart-list-products';

  private cartListPrivate: ICart[] = [];

  private _cartList$ = new BehaviorSubject<ICart[]>([]);

  readonly cartList$ = this._cartList$.asObservable();

  private _countItems$ = new BehaviorSubject<number>(0);

  readonly countItems$ = this._countItems$.asObservable();

  constructor() {
    if (typeof localStorage !== 'undefined') {
      this.onGetCartList();
      this.onGetCountItems();
      this.initializePrivateList();
    }
  }

  public addItemOnCart(product: IProduct) {
    const productIndex = this.cartListPrivate.findIndex(
      ({ product: listProduct }) => listProduct.id === product.id,
    );

    if (productIndex > -1) {
      if (this.cartListPrivate[productIndex].count === 5) {
        throw new Error('Quantidade deste produto excedida no carrinho');
      } else {
        this.cartListPrivate[productIndex].count += 1;
      }
    } else {
      this.cartListPrivate.push({ product: product, count: 1 });
    }

    this.updateCartOnLocalStorage();
    this.updateCartObservers();
  }

  public removeItemFromCart(productId: string) {
    const productIndex = this.cartListPrivate.findIndex(
      ({ product }) => product.id === productId,
    );

    if (productIndex === -1) return;

    if (productIndex > -1) {
      if (this.cartListPrivate[productIndex].count > 1) {
        this.cartListPrivate[productIndex].count -= 1;
      } else {
        this.cartListPrivate.splice(productIndex, 1);
      }
    }

    this.updateCartOnLocalStorage();
    this.updateCartObservers();
  }

  public updateQuantity(productId: string, newQuantity: number) {
    const productIndex = this.cartListPrivate.findIndex(
      ({ product }) => product.id === productId,
    );

    if (productIndex === -1) return;

    if (productIndex > -1) {
      this.cartListPrivate[productIndex].count = newQuantity;
    }

    this.updateCartOnLocalStorage();
    this.updateCartObservers();
  }

  public finishBuy() {
    this.cartListPrivate = [];
    this.updateCartOnLocalStorage();
    this.updateCartObservers();
  }

  private updateCartOnLocalStorage() {
    localStorage.setItem(
      this.CART_LIST_PRODUCTS,
      JSON.stringify(this.cartListPrivate),
    );
  }

  private updateCartObservers() {
    this._cartList$.next(this.cartListPrivate);
    this._countItems$.next(
      this.cartListPrivate.reduce((acc, { count }) => acc + count, 0),
    );
  }

  private getListFromLocalStorage(): ICart[] {
    const item = localStorage.getItem(this.CART_LIST_PRODUCTS);
    const cartList = JSON.parse(item!);
    return cartList as ICart[];
  }

  private onGetCartList() {
    this._cartList$.next(this.getListFromLocalStorage());
  }

  private onGetCountItems() {
    this._countItems$.next(
      this.getListFromLocalStorage().reduce((acc, { count }) => acc + count, 0),
    );
  }

  private initializePrivateList() {
    this.cartListPrivate = this.getListFromLocalStorage();
  }
}
