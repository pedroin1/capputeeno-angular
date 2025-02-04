import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { Router } from '@angular/router';
import { RealPipe } from '../../pipes/real.pipe';
import { CartService } from '../../services/cart.service';
import { AsyncPipe } from '@angular/common';
import { CardProductCartComponent } from '../../components/card-product-cart/card-product-cart.component';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CardProductCartComponent, BackButtonComponent, RealPipe, AsyncPipe],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCartComponent implements OnInit {
  protected totalValue = signal<number>(0);

  constructor(
    private router: Router,
    protected cartService: CartService,
  ) {}

  protected onHandleNavigate() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.cartService.cartList$.subscribe((cartList) => {
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
