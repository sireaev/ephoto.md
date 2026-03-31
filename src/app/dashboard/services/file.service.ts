import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  http = inject(HttpClient);
  private API = '/api/admin/event';

  list(): Observable<any> {
    return this.http.get<any>(`${this.API}/list`)
  }
}
