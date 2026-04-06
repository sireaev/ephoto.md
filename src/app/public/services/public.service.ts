import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseArray } from '../../dashboard/interfaces/response.interface';
import { IMail } from '../../dashboard/interfaces/mail.interface';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private http = inject(HttpClient);
  private reviewAPI = '/api/review';
  private pricesAPI = '/api/prices';
  private categoryAPI = '/api/categories';
  private categoryEventsAPI = '/api/events';
  private eventAPI = '/api/event';
  private mailAPI = '/api/mail';

  createReview(review: any): Observable<any> {
    return this.http.post<any>(`${this.reviewAPI}`, review);
  }

  reviewList(): Observable<ResponseArray<any>> {
    return this.http.get<ResponseArray<any>>(`${this.reviewAPI}s/list`);
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

  sendEmail(body: IMail): Observable<any> {
    return this.http.post(`${this.mailAPI}`, body);
  }
}
