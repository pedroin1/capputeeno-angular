import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { Router } from '@angular/router';
import { RealPipe } from '../../pipes/real.pipe';
import { LocalStorageService } from '../../services/local-storage.service';
import { AsyncPipe } from '@angular/common';
import { CardProductCartComponent } from '../../components/card-product-cart/card-product-cart.component';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CardProductCartComponent, BackButtonComponent, RealPipe, AsyncPipe],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCartComponent implements OnInit {
  value = 3322;
  constructor(
    private router: Router,
    protected localStorageService: LocalStorageService,
  ) {}

  protected onHandleNavigate() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
