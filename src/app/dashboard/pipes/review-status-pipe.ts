import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reviewStatus',
})
export class ReviewStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch(value) {
      case 'approved': return 'Aprobat'; break;
      case 'pending': return 'În așteptare'; break;
      case 'rejected': return 'Respins'; break;
      default: return 'nedefinit';
    }
  }
}
