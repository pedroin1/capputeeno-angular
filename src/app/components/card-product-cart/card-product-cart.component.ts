import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IProduct } from '../../entities/product';
import { RealPipe } from '../../pipes/real.pipe';

@Component({
  selector: 'app-card-product-cart',
  standalone: true,
  imports: [RealPipe],
  templateUrl: './card-product-cart.component.html',
  styleUrl: './card-product-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductCartComponent {
  public product = input.required<IProduct>();

  constructor() {}
}
