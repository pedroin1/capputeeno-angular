import {
  ChangeDetectionStrategy,
  Component,
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
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
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
    this.productService.selectedProduct$.subscribe((productSelected) => {
      if (productSelected) {
        this.product.set(productSelected);
      }
    });
  }
}
