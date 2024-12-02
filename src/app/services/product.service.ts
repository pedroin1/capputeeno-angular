import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

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

export type ProductQueryResult = ApolloQueryResult<{ allProducts: IProduct[] }>;

export interface IProduct {
  id: string;
  name: string;
  price_in_cents: number;
  image_url: string;
}
