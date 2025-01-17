import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { IProduct } from '../../entities/product';
import { ProductService } from '../../services/product.service';
import { ICategory } from '../../entities/product-category';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ReplacePipe } from '../../pipes/replace.pipe';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CurrencyPipe, ReplacePipe],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoComponent implements OnInit {
  protected product = signal<IProduct | null>(null);
  constructor(
    private productService: ProductService,
    private localStorageService: LocalStorageService,
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
    this.localStorageService.addItemOnCart(product);
  }

  protected onHandleBack() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.productService.selectedProduct$.subscribe((productSelected) => {
      if (productSelected) {
        this.product.set(productSelected);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
