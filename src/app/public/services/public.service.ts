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
  private categoryAPI = '/api/categories';
  private categoryEventsAPI = '/api/events';
  private eventAPI = '/api/event';

  createReview(review: any): Observable<any> {
    return this.http.post<any>(`${this.reviewAPI}`, review);
  }

  reviewList(): Observable<ResponseArray<any>> {
    return this.http.get<ResponseArray<any>>(`${this.reviewAPI}/list`);
  }

  pricesList(): Observable<ResponseArray<any>> {
    return this.http.get<ResponseArray<any>>(`${this.pricesAPI}/list`);
  }

  categoryList(): Observable<ResponseArray<any>> {
    return this.http.get<ResponseArray<any>>(`${this.categoryAPI}/list`);
  }

  categoryEvents(slug: string): Observable<ResponseArray<any>> {
    return this.http.get<ResponseArray<any>>(`${this.categoryEventsAPI}/${slug}`);
  }

  eventFiles(eventId: number): Observable<ResponseArray<any>> {
    return this.http.get<ResponseArray<any>>(`${this.eventAPI}/${eventId}`);
  } 
}
