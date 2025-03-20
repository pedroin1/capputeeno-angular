import { gql } from 'apollo-angular';

export const GET_PRODUCTS = (page: number) => gql`
  query {
    allProducts(page: ${page}, perPage: 10) {
      id
      name
      price_in_cents
      image_url
      description
      category
    }
  }
`;
