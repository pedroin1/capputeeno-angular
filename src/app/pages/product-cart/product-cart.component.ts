import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCartComponent implements OnInit {
  constructor(private router: Router) {}

  protected onHandleNavigate() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
