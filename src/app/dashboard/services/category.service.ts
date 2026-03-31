import { inject, Injectable } from '@angular/core';
import { Response, ResponseArray } from '../interfaces/response.interface';
import { ICategory } from '../interfaces/category.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private API = '/api/admin/category';


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
        return this.http.get<ResponseArray<ICategory>>(`${this.API}/list`).pipe(
          map((eventResponse: ResponseArray<ICategory>) => {
            return eventResponse;
          })
        )
      }
}
