import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProduct } from '../../entities/product';
import { CurrencyPipe } from '@angular/common';
import { ReplacePipe } from '../../pipes/replace.pipe';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CurrencyPipe, ReplacePipe],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent {
  @Input({ required: true }) product!: IProduct;
  constructor() {}
}
