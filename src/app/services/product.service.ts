import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductQueryResult } from '../entities/product-query';
import { IProduct } from '../entities/product';
import { ProductType } from '../entities/product-type';
import { GET_PRODUCTS } from '../apollo/queries/get-products.query';
import { GET_PRODUCTS_WITH_FILTER } from '../apollo/queries/get-products-with-filter.query';
import { FilterService } from './filter.service';
import { OrganizeForType } from '../entities/organize-type';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _selectedProduct$ = new BehaviorSubject<IProduct | null>(null);
  readonly selectedProduct$ = this._selectedProduct$.asObservable();

  constructor(
    private apollo: Apollo,
    private filterService: FilterService,
  ) {}

  public GetProducts(): Observable<ProductQueryResult> {
    return this.apollo.watchQuery<{ allProducts: IProduct[] }>({
      query: GET_PRODUCTS,
    }).valueChanges;
  }

  public GetProductsWithFilter(
    productType: ProductType,
    organizeFor: OrganizeForType,
  ) {
    const queryFilter = productType.toString().toLowerCase();
    const { field, order } = this.filterService.getFieldByPriority(organizeFor);

    return this.apollo.watchQuery<{ allProducts: IProduct[] }>({
      query: GET_PRODUCTS_WITH_FILTER(queryFilter, field, order),
    }).valueChanges;
  }

  public selectProduct(product: IProduct) {
    this._selectedProduct$.next(product);
  }
  public clearProductSelected() {
    this._selectedProduct$.next(null);
  }

  public hasProductSelected() {
    return this._selectedProduct$.value !== null;
  }
}
