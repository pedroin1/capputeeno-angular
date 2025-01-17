import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'real',
  standalone: true,
})
export class RealPipe implements PipeTransform {
  transform(value: number): string {
    if (!Number(value)) {
      throw new Error('Value is not an number');
    }

    return (value / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
