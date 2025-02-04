import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'real',
  standalone: true,
})
export class RealPipe implements PipeTransform {
  transform(value: number): string {
    if (typeof value !== 'number') {
      throw new Error(`${value} is not a number`);
    }

    return (value / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
