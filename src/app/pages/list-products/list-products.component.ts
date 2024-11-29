import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { ProductService } from '../../services/product.service';
import { JsonPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [FilterBarComponent, JsonPipe],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProductsComponent implements OnInit {
  list: any = [];

  constructor(
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.productService
      .GetProducts()
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        //@ts-ignore
        this.list = data.data.allProducts;
        this.changeDetectorRef.detectChanges();
      });
  }
}
