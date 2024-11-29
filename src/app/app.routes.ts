import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/list-products/list-products.component').then(
        (page) => page.ListProductsComponent
      ),
  },
];
