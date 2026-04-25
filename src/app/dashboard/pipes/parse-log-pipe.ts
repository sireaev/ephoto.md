import { Pipe, PipeTransform } from '@angular/core';
import { ILog } from '../interfaces/logs.interface';

@Pipe({
  name: 'parseLog',
})
export class ParseLogPipe implements PipeTransform {
  transform(log: ILog): string {
    switch(log.action) {
      case 'login': {
        switch(log.domain) {
          case 'user':
            return `${log.userName} cu ID#${log.domainId} s-a logat.`
          default: return '';
        }
      }
      case 'create': {
        switch(log.domain) {
          case 'category':
            return `${log.userName} a creat categoria cu ID#${log.domainId}.`;
          case 'event':
            return `${log.userName} a creat evenimentul cu ID#${log.domainId}.`;
          case 'review':
            return `${log.userName} a creat recenzia cu ID#${log.domainId}.`;
          case 'price':
            return `${log.userName} a creat blocul de preț cu ID#${log.domainId}.`;
            default: return `S-a creat cu ID#${log.domainId}`;
        }
      }
      case 'update': {
        switch(log.domain) {
          case 'category':
            return `${log.userName} a actualizată categoria cu ID#${log.domainId}.`;
          case 'event':
            return `${log.userName} a actualizat evenimentul cu ID#${log.domainId}.`;
          case 'review':
            return `${log.userName} a actualizată recenzia cu ID#${log.domainId}.`;
          case 'price':
            return `${log.userName} a actualizat blocul de preț cu ID#${log.domainId}.`;
            default: return `S-a actualizat cu ID#${log.domainId}`;
        }
      }
      case 'remove': {
        switch(log.domain) {
          case 'category':
            return `${log.userName} a șters categoria cu ID#${log.domainId}.`;
          case 'event':
            return `${log.userName} a șters evenimentul cu ID#${log.domainId}.`;
          case 'review':
            return `${log.userName} a șters recenzia cu ID#${log.domainId}.`;
          case 'price':
            return `${log.userName} a șters blocul de preț cu ID#${log.domainId}.`;
            default: return `A fost șters cu ID#${log.domainId}`;
        }
      }
      case 'upload': {
        switch(log.domain) {
          case 'event':
            return `${log.userName} a încărcat o imagine cu eveniment ID#${log.domainId}.`;
          case 'category':
            return `${log.userName} a încărcat o imagine cu categorie ID#${log.domainId}.`;
          case 'removeUpload':
            return `${log.userName} a șters imaginea cu ID#${log.domainId}.`;
          default: return 'A încărcat o imagine';
        }
      }

      case 'send': {
        return 'Ai primit o cerere nouă.';
      }

      default: return 'O actiune neidentificata!';
    }
  }
}
