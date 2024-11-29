import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_PRODUCTS = gql`
  query {
    allProducts {
      id
      name
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private apollo: Apollo) {}

  public GetProducts() {
    return this.apollo.watchQuery({ query: GET_PRODUCTS });
  }
}
