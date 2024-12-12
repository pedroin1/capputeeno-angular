import { ApolloQueryResult } from '@apollo/client/core';
import { IProduct } from './product';

export type ProductQueryResult = ApolloQueryResult<{ allProducts: IProduct[] }>;
