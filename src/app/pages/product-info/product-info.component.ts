import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  signal,
} from '@angular/core';
import { IProduct } from '../../entities/product';
import { ProductService } from '../../services/product.service';
import { ICategory } from '../../entities/product-category';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { RealPipe } from '../../pipes/real.pipe';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FREE_FREIGHT_VALUE,
  FREIGHT_VALUE,
} from '../../constants/product-freight';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [RealPipe, BackButtonComponent],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoComponent implements OnInit {
  protected product = signal<IProduct | null>(null);

  protected readonly freightValue = FREIGHT_VALUE;

  protected readonly freeFreightValue = FREE_FREIGHT_VALUE;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private destroyRef: DestroyRef,
  ) {}

  protected getCategoryName(productCategory: ICategory) {
    switch (productCategory) {
      case 't-shirts':
        return 'Camisa';
      case 'mugs':
        return 'Caneca';
    }
  }

  protected onAddOnCart(product: IProduct) {
    this.cartService.addItemOnCart(product);
  }

  protected onHandleNavigateToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.productService.selectedProduct$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((productSelected) => {
        if (productSelected) {
          this.product.set(productSelected);
        }
      });
  }
}
