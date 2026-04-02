import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IReview } from '../interfaces/review.interface';
import { Observable } from 'rxjs';
import { Response, ResponseArray } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);
  private API = '/api/admin/reviews';

  create(category: IReview): Observable<Response<IReview>> {
    return this.http.post<Response<IReview>>(`${this.API}`, category);
  }

  update(category: IReview): Observable<any> {
    return this.http.patch(`${this.API}/${category.id}`, category);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  list(): Observable<ResponseArray<IReview>> {
    return this.http.get<ResponseArray<IReview>>(`${this.API}/list`)
  }
}
