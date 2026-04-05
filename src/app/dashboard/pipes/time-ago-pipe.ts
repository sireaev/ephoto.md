import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  standalone: true, // Angular 15+
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (!value) return '';

    return formatDistanceToNow(new Date(value), {
      addSuffix: true, // 👉 "ago"
    });
  }
}