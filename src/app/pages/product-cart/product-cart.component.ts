import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCartComponent {

}
