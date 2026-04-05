import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseArray } from '../interfaces/response.interface';
import { ILog } from '../interfaces/logs.interface';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private http = inject(HttpClient);
  private API = '/api/admin/logs';

  list(): Observable<ResponseArray<ILog>> {
    return this.http.get<ResponseArray<ILog>>(`${this.API}/list`);
  }
}
