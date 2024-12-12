import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
  standalone: true,
})
export class ReplacePipe implements PipeTransform {
  transform(
    value: unknown,
    valueToReplace: string,
    replacedValue: string
  ): unknown {
    if (!value || !valueToReplace) return null;

    return value.toString().replace(valueToReplace, replacedValue);
  }
}
