import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response, ResponseArray } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private http = inject(HttpClient);
  private API = '/api/admin/user';

  create(category: IUser): Observable<Response<IUser>> {
    return this.http.post<Response<IUser>>(`${this.API}`, category);
  }

  update(category: Partial<IUser>): Observable<any> {
    return this.http.patch(`${this.API}/${category.id}`, category);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  list(): Observable<ResponseArray<IUser>> {
    return this.http.get<ResponseArray<IUser>>(`${this.API}/list`)
  }
}
