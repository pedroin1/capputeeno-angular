import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [FilterBarComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProductsComponent {}
