import { ProductType } from './product-type';

export interface IProductFilter {
  name: string;
  type: ProductType;
  selected: boolean;
}
