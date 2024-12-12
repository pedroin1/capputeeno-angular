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
import { ProductType } from '../../entities/product-type';
import { FilterService } from '../../services/filter.service';

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
    private filterService: FilterService,
    private changeDetectorRef: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.filterService.selectedProduct$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((filter) => {
        if (filter.type === 'ALL') {
          this.productService.GetProducts().subscribe((result) => {
            this.productList = result.data.allProducts;
            this.changeDetectorRef.detectChanges();
          });
        } else {
          this.productService
            .GetProductsWithFilter(filter.type)
            .subscribe((result) => {
              this.productList = result.data.allProducts;
              this.changeDetectorRef.detectChanges();
            });
        }
        this.changeDetectorRef.markForCheck();
      });
  }
}
