import { Component, inject } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  itensCount: number = 2;
}
