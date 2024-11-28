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
  IOrganizeFor,
  IPage,
  IProduct,
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
  productItems: IProduct[] = [];
  organizeForItems: IOrganizeFor[] = [];
  paginationItems: IPage[] = [];
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

  public onToogleProduct(item: IProduct) {
    this.filterService.toggleProduct(item);
    this.closeMenu();
  }
  public onToogleOrganizeFor(item: IOrganizeFor) {
    this.filterService.toggleOrganizeFor(item);
    this.closeMenu();
  }
  public onTooglePage(item: IPage) {
    this.filterService.togglePage(item);
    this.closeMenu();
  }

  ngOnInit(): void {
    this.productItems = this.filterService.getProductItems();
    this.organizeForItems = this.filterService.getOrganizeForItems();
    this.paginationItems = this.filterService.getPaginationItems();
  }
}
