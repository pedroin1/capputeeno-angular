import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  signal,
} from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { IProductFilter } from '../../entities/product-filter';
import { IOrganizeForFilter } from '../../entities/organize-filter';
import { IPageFilter } from '../../entities/page-filter';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filter-bar',
  imports: [NgClass],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBarComponent implements OnInit {
  protected productItems = signal<IProductFilter[]>([]);
  protected organizeForItems = signal<IOrganizeForFilter[]>([]);
  protected paginationItems = signal<IPageFilter[]>([]);
  protected isMenuOpened = signal<boolean>(false);
  protected organizeForSelected = signal<string>('');

  constructor(
    protected filterService: FilterService,
    private destroyRef: DestroyRef,
  ) {}

  public openMenu() {
    this.isMenuOpened.set(true);
  }

  public closeMenu() {
    this.isMenuOpened.set(false);
  }

  public onToogleProduct(product: IProductFilter) {
    this.filterService.toggleProduct(product);
    this.closeMenu();
  }
  public onToogleOrganizeFor(organizeFor: IOrganizeForFilter) {
    this.filterService.toggleOrganizeFor(organizeFor);
    this.closeMenu();
  }
  public onTooglePage(page: IPageFilter) {
    this.filterService.togglePage(page);
    this.closeMenu();
  }

  private setupFilters() {
    this.productItems.set(this.filterService.getProductItems());
    this.organizeForItems.set(this.filterService.getOrganizeForItems());
    this.paginationItems.set(this.filterService.getPaginationItems());
  }

  ngOnInit(): void {
    this.setupFilters();

    this.filterService.selectedOrganizeFor$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((organizeForFilter: IOrganizeForFilter) =>
        this.organizeForSelected.set(organizeForFilter.name),
      );
  }
}
