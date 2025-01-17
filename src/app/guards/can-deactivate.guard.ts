import { CanDeactivateFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { inject } from '@angular/core';

export const canDeactivateGuard: CanDeactivateFn<unknown> = (
  component, // eslint-disable-line
  currentRoute, // eslint-disable-line
  currentState, // eslint-disable-line
  nextState, // eslint-disable-line
) => {
  const productService = inject(ProductService);
  if (productService.hasProductSelected()) {
    productService.clearProductSelected();
  }
  return true;
};
