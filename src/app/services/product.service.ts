import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ProductQueryResult } from '../entities/product-query';
import { IProduct } from '../entities/product';

const GET_PRODUCTS = gql`
  query {
    allProducts {
      id
      name
      price_in_cents
      image_url
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private apollo: Apollo) {}

  public GetProducts(): Observable<ProductQueryResult> {
    return this.apollo.watchQuery<{ allProducts: IProduct[] }>({
      query: GET_PRODUCTS,
    }).valueChanges;
  }
}
