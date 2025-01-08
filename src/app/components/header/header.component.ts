import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  itensCount!: number;
  inputSearch = new FormControl('');
  hasValueSearched: boolean = false;

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
      this.itensCount = result;
    });
  }
}
