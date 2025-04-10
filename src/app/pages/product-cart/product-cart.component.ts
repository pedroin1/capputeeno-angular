import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
  signal,
} from '@angular/core';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { Router } from '@angular/router';
import { RealPipe } from '../../pipes/real.pipe';
import { CartService } from '../../services/cart.service';
import { AsyncPipe } from '@angular/common';
import { CardProductCartComponent } from '../../components/card-product-cart/card-product-cart.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import {
  FREE_FREIGHT_VALUE,
  FREIGHT_VALUE,
} from '../../constants/product-freight';

@Component({
    selector: 'app-product-cart',
    imports: [CardProductCartComponent, BackButtonComponent, RealPipe, AsyncPipe],
    templateUrl: './product-cart.component.html',
    styleUrl: './product-cart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCartComponent implements OnInit {
  protected totalValue = signal<number>(0);

  protected readonly freightValue = FREIGHT_VALUE;

  protected readonly freeFreightValue = FREE_FREIGHT_VALUE;

  protected totalValueWithFreight = computed(() => {
    if (this.totalValue() > 0) {
      return this.totalValue() + 4000;
    } else return 0;
  });

  constructor(
    private router: Router,
    protected cartService: CartService,
    private destroyRef: DestroyRef,
    private toastService: ToastrService,
  ) {}

  protected onHandleNavigateToHome() {
    this.router.navigate(['/']);
  }
  protected onHandleBuyItems() {
    try {
      this.toastService.success('Compra finalizada com sucesso!');
      setTimeout(() => {
        this.cartService.finishBuy();
        this.router.navigate(['/']);
      }, 700);
    } catch (error: unknown) {
      console.log(error);
      this.toastService.error('Erro ao finalizar compra !');
    }
  }

  ngOnInit(): void {
    this.cartService.cartList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cartList) => {
        if (cartList.length > 0) {
          this.totalValue.set(
            cartList.reduce(
              (acc, { product, count }) => acc + product.price_in_cents * count,
              0,
            ),
          );
        } else {
          this.totalValue.set(0);
        }
      });
  }
}
