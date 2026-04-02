import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  http = inject(HttpClient);
  private API = '/api/admin/event-upload';

  upload(eventId: number, file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.API}/${eventId}`, formData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
