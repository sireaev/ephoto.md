import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Response, ResponseArray } from '../interfaces/response.interface';
import { IEvent } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);
  private API = '/api/admin/event';

  create(event: IEvent): Observable<Response<IEvent>> {
    return this.http.post<Response<IEvent>>(`${this.API}`, event);
  }

  get(id: number): Observable<Response<IEvent>> {
    return this.http.get<Response<IEvent>>(`${this.API}/${id}`);
  }

  update(event: IEvent): Observable<Response<IEvent>> {
    return this.http.patch<Response<IEvent>>(`${this.API}/${event.id}`, event);
  }

  delete(id: number): Observable<Response<IEvent>> {
    return this.http.delete<Response<IEvent>>(`${this.API}/${id}`);
  }

  list(): Observable<ResponseArray<IEvent>> {
    return this.http.get<ResponseArray<IEvent>>(`${this.API}/list`);
  }
}
