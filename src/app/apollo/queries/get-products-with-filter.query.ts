import { gql } from 'apollo-angular';

export const GET_PRODUCTS_WITH_FILTER = (queryFilter: string) => gql`
  query {
    allProducts(filter: { category: "${queryFilter}"}) {
      id
      name
      price_in_cents
      image_url
    }
  }
`;
