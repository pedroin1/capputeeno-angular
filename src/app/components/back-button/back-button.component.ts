import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  text = input<string>('Voltar');

  action = input<'button' | 'submit' | 'reset'>('button');
}
