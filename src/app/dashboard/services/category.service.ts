import { inject, Injectable } from '@angular/core';
import { Response, ResponseArray } from '../interfaces/response.interface';
import { ICategory } from '../interfaces/category.interface';
import { BehaviorSubject, map, Observable, of, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private API = '/api/admin/category';
  list$ = new BehaviorSubject<ResponseArray<ICategory> | null>(null);

  create(category: ICategory): Observable<Response<ICategory>> {
    return this.http.post<Response<ICategory>>(`${this.API}`, category);
  }

  update(category: ICategory): Observable<any> {
    return this.http.patch(`${this.API}/${category.id}`, category);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  list(): Observable<ResponseArray<ICategory>> {
    if (this.list$.getValue() !== null) {
      return of(<ResponseArray<ICategory>>this.list$.getValue());
    }

    return this.http.get<ResponseArray<ICategory>>(`${this.API}/list`).pipe(
      tap((list) => {
        this.list$.next(list);
      })
    )
  }
}
