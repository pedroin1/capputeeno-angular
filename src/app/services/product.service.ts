import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ProductQueryResult } from '../entities/product-query';
import { IProduct } from '../entities/product';
import { ProductType } from '../entities/product-type';
import { GET_PRODUCTS } from '../apollo/queries/get-products.query';
import { GET_PRODUCTS_WITH_FILTER } from '../apollo/queries/get-products-with-filter.query';
import { FilterService } from './filter.service';
import { OrganizeForType } from '../entities/organize-type';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private apollo: Apollo, private filterService: FilterService) {}

  public GetProducts(): Observable<ProductQueryResult> {
    return this.apollo.watchQuery<{ allProducts: IProduct[] }>({
      query: GET_PRODUCTS,
    }).valueChanges;
  }

  public GetProductsWithFilter(
    productType: ProductType,
    organizeFor: OrganizeForType
  ) {
    const queryFilter = productType.toString().toLowerCase();
    const { field, order } = this.filterService.getFieldByPriority(organizeFor);
    console.log(field, order);

    return this.apollo.watchQuery<{ allProducts: IProduct[] }>({
      query: GET_PRODUCTS_WITH_FILTER(queryFilter, field, order),
    }).valueChanges;
  }
}
