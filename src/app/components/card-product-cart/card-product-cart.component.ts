import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';
import { RealPipe } from '../../pipes/real.pipe';
import { CartService } from '../../services/cart.service';
import { ICart } from '../../entities/cart';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-product-cart',
  standalone: true,
  imports: [RealPipe, ReactiveFormsModule],
  templateUrl: './card-product-cart.component.html',
  styleUrl: './card-product-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductCartComponent implements OnInit {
  public cartItem = input.required<ICart>();

  protected quantityFormControl!: FormControl<number | null>;

  protected options = [1, 2, 3, 4, 5];

  constructor(private cartService: CartService) {}

  protected onHandleRemoveItem(productId: string) {
    this.cartService.removeItemFromCart(productId);
  }

  protected onHandleUpdateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  ngOnInit(): void {
    this.quantityFormControl = new FormControl(this.cartItem().count);

    this.quantityFormControl.valueChanges.subscribe((value) =>
      this.onHandleUpdateQuantity(this.cartItem().product.id, value!),
    );
  }
}
