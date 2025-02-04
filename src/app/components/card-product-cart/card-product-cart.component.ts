import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RealPipe } from '../../pipes/real.pipe';
import { CartService } from '../../services/cart.service';
import { ICart } from '../../entities/cart';

@Component({
  selector: 'app-card-product-cart',
  standalone: true,
  imports: [RealPipe],
  templateUrl: './card-product-cart.component.html',
  styleUrl: './card-product-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductCartComponent {
  public cartItem = input.required<ICart>();

  constructor(private cartService: CartService) {}

  protected onHandleRemoveItem(productId: string) {
    this.cartService.removeItemFromCart(productId);
  }
}
