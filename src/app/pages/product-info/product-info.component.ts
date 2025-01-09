import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IProduct } from '../../entities/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoComponent implements OnInit {
  protected product!: IProduct;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.selectedProduct$.subscribe((productSelected) => {
      if (productSelected) {
        this.product = productSelected;
      }
    });
  }
}
