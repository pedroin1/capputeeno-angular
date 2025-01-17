import { Routes } from '@angular/router';
import { canDeactivateGuard } from './guards/can-deactivate.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/product-list/product-list.component').then(
        (page) => page.ProductListComponent,
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/product-cart/product-cart.component').then(
        (page) => page.ProductCartComponent,
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
