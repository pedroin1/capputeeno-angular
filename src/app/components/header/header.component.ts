import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { CartService } from '../../services/local-storage.service';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  hasValueSearched: boolean = false;
  inputSearch = new FormControl('');

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

  protected search() {
    this.filterService.searchedProduct$.next(this.inputSearch.value as string);
  }
  protected clearSearch() {
    this.filterService.searchedProduct$.next('');
    this.inputSearch.reset('');
    this.hasValueSearched = false;
  }

  protected onHandleNavigateToCart() {
    this.router.navigate(['/cart'], { replaceUrl: true });
  }
}
