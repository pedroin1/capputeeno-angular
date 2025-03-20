import { gql } from 'apollo-angular';

export const GET_PRODUCTS_WITH_FILTER = (
  page: number,
  queryFilter: string,
  sortField: string,
  sortOrder: string,
) => gql`
  query {
    allProducts(page: ${page}, perPage: 10, filter: { category: "${queryFilter}"} sortField: "${sortField}", sortOrder: "${sortOrder}") {
      id
      name
      price_in_cents
      image_url
      description
      category
    }
  }
`;
