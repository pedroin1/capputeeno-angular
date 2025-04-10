import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { CartService } from '../../services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-header',
    imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected hasValueSearched: boolean = false;
  protected inputSearch = new FormControl<string>('');

  constructor(
    protected filterService: FilterService,
    protected cartService: CartService,
    protected router: Router,
  ) {
    this.filterService.searchedProduct$.subscribe((result) => {
      if (result !== '') {
        this.hasValueSearched = true;
      }
    });
  }

  protected onHandleSearch() {
    this.filterService.searchedProduct$.next(this.inputSearch.value as string);
  }
  protected onHandleClearSerach() {
    this.filterService.searchedProduct$.next('');
    this.inputSearch.reset('');
    this.hasValueSearched = false;
  }

  protected onHandleNavigateToCart() {
    this.router.navigate(['/cart'], { replaceUrl: true });
  }
}
