import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProduct } from '../../services/product.service';

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
