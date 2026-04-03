import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseArray } from '../../dashboard/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private http = inject(HttpClient);
  private reviewAPI = '/api/reviews';
  private pricesAPI = '/api/prices';

  createReview(review: any): Observable<any> {
    return this.http.post<any>(`${this.reviewAPI}`, review);
  }

  reviewList(): Observable<ResponseArray<any>> {
    return this.http.get<ResponseArray<any>>(`${this.reviewAPI}/list`);
  }

  pricesList(): Observable<ResponseArray<any>> {
    return this.http.get<ResponseArray<any>>(`${this.pricesAPI}/list`);
  }
}
