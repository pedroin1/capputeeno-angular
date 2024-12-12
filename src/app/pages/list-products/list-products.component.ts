import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { ProductService } from '../../services/product.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { IProduct } from '../../entities/product';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [FilterBarComponent, CardProductComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProductsComponent implements OnInit {
  productList: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.productService
      .GetProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.productList = result.data.allProducts;
        this.changeDetectorRef.detectChanges();
      });
  }
}
