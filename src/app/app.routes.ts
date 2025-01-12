import { Routes } from '@angular/router';
import { canDeactivateGuard } from './guards/can-deactivate.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/list-products/list-products.component').then(
        (page) => page.ListProductsComponent,
      ),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('../app/pages/product-info/product-info.component').then(
        (page) => page.ProductInfoComponent,
      ),
    canDeactivate: [canDeactivateGuard],
  },
];
