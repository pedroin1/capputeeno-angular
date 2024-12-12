import { gql } from 'apollo-angular';

export const GET_PRODUCTS = gql`
  query {
    allProducts {
      id
      name
      price_in_cents
      image_url
    }
  }
`;
