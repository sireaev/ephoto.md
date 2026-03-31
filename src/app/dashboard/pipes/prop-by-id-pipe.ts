import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propById',
})
export class PropByIdPipe implements PipeTransform {
  transform(array: any[], id: number | string, propName: string): any {
    if (!array || !id || !propName) {
      return null;
    }
    
    // Find the object with the matching ID
    const foundItem = array.find(item => item.id === id);
    
    // Return the property value if found
    return foundItem ? foundItem[propName] : null;
  }
}
