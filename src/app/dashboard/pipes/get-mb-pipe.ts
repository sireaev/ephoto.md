import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getMB',
})
export class GetMBPipe implements PipeTransform {
  transform(value: unknown, decimals: number = 2): string | null {
      if (value === null || value === undefined) return null;

      const bytes = Number(value);

      if (isNaN(bytes)) return null;

      const mb = bytes / (1024 * 1024);

      return mb.toFixed(decimals);
    }
}
