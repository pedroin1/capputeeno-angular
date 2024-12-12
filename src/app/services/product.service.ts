import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ProductQueryResult } from '../entities/product-query';
import { IProduct } from '../entities/product';
import { ProductType } from '../entities/product-type';
import { GET_PRODUCTS } from '../apollo/queries/get-products.query';
import { GET_PRODUCTS_WITH_FILTER } from '../apollo/queries/get-products-with-filter.query';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private apollo: Apollo) {}

  public GetProducts(): Observable<ProductQueryResult> {
    return this.apollo.watchQuery<{ allProducts: IProduct[] }>({
      query: GET_PRODUCTS,
    }).valueChanges;
  }

  public GetProductsWithFilter(productType: ProductType) {
    const queryFilter = productType.toString().toLowerCase();
    return this.apollo.watchQuery<{ allProducts: IProduct[] }>({
      query: GET_PRODUCTS_WITH_FILTER(queryFilter),
    }).valueChanges;
  }
}
