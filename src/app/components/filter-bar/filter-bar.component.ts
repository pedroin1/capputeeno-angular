import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FilterService, ItemProp } from '../../services/filter.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBarComponent implements OnInit {
  typesItens: ItemProp[] = [];
  selectedItem: ItemProp | null = null;
  filterService = inject(FilterService);
  destroyRef = inject(DestroyRef);

  onToogleItem(item: ItemProp) {
    this.filterService.toggleItem(item);
  }

  ngOnInit(): void {
    this.typesItens = this.filterService.getItems();

    this.filterService.selectedItem$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((item) => {
        this.selectedItem = item;
      });
  }
}
