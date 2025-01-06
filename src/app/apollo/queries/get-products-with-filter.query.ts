import { gql } from 'apollo-angular';

export const GET_PRODUCTS_WITH_FILTER = (
  queryFilter: string,
  sortField: string,
  sortOrder: string
) => gql`
  query {
    allProducts(filter: { category: "${queryFilter}"} sortField: "${sortField}", sortOrder: "${sortOrder}") {
      id
      name
      price_in_cents
      image_url
    }
  }
`;
