import { gql } from 'apollo-angular';

export const GET_PRODUCTS = (
  page: number,
  sortField: string,
  sortOrder: string,
) => gql`
  query {
    allProducts(page: ${page}, perPage: 10, sortField: "${sortField}", sortOrder: "${sortOrder}") {
      id
      name
      price_in_cents
      image_url
      description
      category
    }
  }
`;
