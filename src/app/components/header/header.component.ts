import { Component, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  itensCount = signal<number>(0);
  hasValueSearched: boolean = false;
  inputSearch = new FormControl('');

  constructor(
    protected filterService: FilterService,
    protected localStorageService: LocalStorageService,
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

  ngOnInit(): void {
    this.localStorageService.getCountListItens().subscribe((result) => {
      this.itensCount.set(result);
    });
  }
}
