import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProduct } from '../../entities/product';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent {
  @Input({ required: true }) product!: IProduct;
  constructor() {}
}
