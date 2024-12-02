import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  FilterService,
  IOrganizeForFilter,
  IPageFilter,
  IProductFilter,
  OrganizeForType,
} from '../../services/filter.service';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBarComponent implements OnInit {
  productItems: IProductFilter[] = [];
  organizeForItems: IOrganizeForFilter[] = [];
  paginationItems: IPageFilter[] = [];
  isOpenMenu: boolean = false;

  constructor(
    private destroyRef: DestroyRef,
    private filterService: FilterService
  ) {}

  public openMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  public closeMenu() {
    this.isOpenMenu = false;
  }

  public onToogleProduct(item: IProductFilter) {
    this.filterService.toggleProduct(item);
    this.closeMenu();
  }
  public onToogleOrganizeFor(item: IOrganizeForFilter) {
    this.filterService.toggleOrganizeFor(item);
    this.closeMenu();
  }
  public onTooglePage(item: IPageFilter) {
    this.filterService.togglePage(item);
    this.closeMenu();
  }

  ngOnInit(): void {
    this.productItems = this.filterService.getProductItems();
    this.organizeForItems = this.filterService.getOrganizeForItems();
    this.paginationItems = this.filterService.getPaginationItems();
  }
}
