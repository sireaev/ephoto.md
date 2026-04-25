import { inject, Injectable } from '@angular/core';
import { Response, ResponseArray } from '../interfaces/response.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBeforeAfter } from '../interfaces/before-after.interface';

@Injectable({
  providedIn: 'root',
})
export class BeforeAfterService {
  private http = inject(HttpClient);
  private API = '/api/admin/before-after';

  create(beforeAfter: any): Observable<Response<IBeforeAfter>> {
    const form = new FormData();
    if (beforeAfter.type === 'after') {
        form.append('file', beforeAfter.file);
    }

    if (beforeAfter.type === 'before') {
        form.append('file', beforeAfter.file);
    }

    form.append('type', beforeAfter.type);
    if (beforeAfter.beforeAfterId) {
        form.append('beforeAfterId', beforeAfter.beforeAfterId.toString());
    }
    return this.http.post<Response<IBeforeAfter>>(`${this.API}`, form);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  list(): Observable<ResponseArray<IBeforeAfter>> {
    return this.http.get<ResponseArray<IBeforeAfter>>(`${this.API}/list`);
  }
}
