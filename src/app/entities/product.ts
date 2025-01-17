import { ICategory } from './product-category';

export interface IProduct {
  id: string;
  name: string;
  price_in_cents: number;
  image_url: string;
  description: string;
  category: ICategory;
}
