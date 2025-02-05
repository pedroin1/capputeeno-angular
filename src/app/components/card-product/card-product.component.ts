import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProduct } from '../../entities/product';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { RealPipe } from '../../pipes/real.pipe';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [RealPipe],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent {
  @Input({ required: true }) product!: IProduct;
  constructor(
    private router: Router,
    private productService: ProductService,
  ) {}

  protected onHandleNavigate(product: IProduct) {
    this.productService.selectProduct(product);
    this.router.navigate([`/product/${product.id}`]);
  }
}
