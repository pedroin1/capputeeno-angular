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
import { FilterService } from '../../services/filter.service';
import { IProductFilter } from '../../entities/product-filter';
import { IOrganizeForFilter } from '../../entities/organize-filter';
import { IPageFilter } from '../../entities/page-filter';
import { combineLatest, switchMap } from 'rxjs';
import { ProductQueryResult } from '../../entities/product-query';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [FilterBarComponent, CardProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  protected productList: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private filterService: FilterService,
    private changeDetectorRef: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {}

  private getProducts() {
    const combinedObservables$ = combineLatest<
      [IPageFilter, IProductFilter, IOrganizeForFilter]
    >([
      this.filterService.selectedPage$,
      this.filterService.selectedProduct$,
      this.filterService.selectedOrganizeFor$,
    ]);

    combinedObservables$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(([pageFilter, productFilter, organizeForFilter]) =>
          productFilter.type === 'ALL'
            ? this.productService.GetProducts(pageFilter.page)
            : this.productService.GetProductsWithFilter(
                pageFilter.page,
                productFilter.type,
                organizeForFilter.type,
              ),
        ),
      )
      .subscribe((result: ProductQueryResult) => {
        this.productList = result.data.allProducts;
        this.changeDetectorRef.detectChanges();
        this.changeDetectorRef.markForCheck();
      });
  }

  private filterProductsByInputSearch() {
    this.filterService.searchedProduct$.subscribe((result) => {
      if (result !== '') {
        const filteredListByInput = this.productList.filter((product) =>
          product.name.includes(result),
        );
        this.productList = filteredListByInput;
        this.changeDetectorRef.markForCheck();
      } else {
        this.getProducts();
      }
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.filterProductsByInputSearch();
  }
}
