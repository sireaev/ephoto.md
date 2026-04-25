import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClient } from '../interfaces/client.interface';
import { Response, ResponseArray } from '../interfaces/response.interface';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private API = '/api/admin/client';
  list$ = new BehaviorSubject<ResponseArray<IClient> | null>(null);

  create(client: IClient): Observable<Response<IClient>> {
    return this.http.post<Response<IClient>>(`${this.API}`, client);
  }

  update(client: IClient): Observable<any> {
    return this.http.patch(`${this.API}/${client.id}`, client);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  list(): Observable<ResponseArray<IClient>> {
    if (this.list$.getValue() !== null) {
      return of(<ResponseArray<IClient>>this.list$.getValue());
    }

    return this.http.get<ResponseArray<IClient>>(`${this.API}/list`).pipe(
      tap((list) => {
        this.list$.next(list);
      })
    )
  }
}
