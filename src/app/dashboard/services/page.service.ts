import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, ResponseArray } from '../interfaces/response.interface';
import { IPage } from '../interfaces/page.interface';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private http = inject(HttpClient);
  private API = '/api/admin/page';

  create(category: IPage): Observable<Response<IPage>> {
    return this.http.post<Response<IPage>>(`${this.API}`, category);
  }

  update(category: IPage): Observable<any> {
    return this.http.patch(`${this.API}/${category.id}`, category);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  list(): Observable<ResponseArray<IPage>> {
    return this.http.get<ResponseArray<IPage>>(`${this.API}/list`)
  }
}
