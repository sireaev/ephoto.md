import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, ResponseArray } from '../interfaces/response.interface';
import { IPrice } from '../interfaces/price.interface';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private http = inject(HttpClient);
  private API = '/api/admin/price';

  create(price: IPrice): Observable<Response<IPrice>> {
    return this.http.post<Response<IPrice>>(`${this.API}`, price);
  }

  update(price: Partial<IPrice>): Observable<any> {
    return this.http.patch(`${this.API}/${price.id}`, price);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  list(): Observable<ResponseArray<IPrice>> {
    return this.http.get<ResponseArray<IPrice>>(`${this.API}/list`)
  }
}
