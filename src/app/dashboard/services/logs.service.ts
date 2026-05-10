import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseArray, ResponseBarStats } from '../interfaces/response.interface';
import { ILog } from '../interfaces/logs.interface';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private http = inject(HttpClient);
  private API = '/api/admin/logs';

  list(): Observable<ResponseArray<ILog>> {
    return this.http.get<ResponseArray<ILog>>(`${this.API}/list`);
  }

  barStats(view: any): Observable<{
  labels: string[];
  data: { label: string; v1: number; v2: number }[];
  }> {
  return this.http.get<ResponseBarStats>(`${this.API}/stats`, { params: { view }}).pipe(
    map((res) => {
      const current = res.data.current || [];
      const previous = res.data.previous || [];

      const labels: string[] = [];
      const data = current.map((curr: any, i: number) => {
        const prev = previous[i];

        const label = curr.label ?? `${curr.bucket}`;

        labels.push(label);

        return {
          label,
          v1: prev.count,          // current
          v2: curr?.count || 0,    // previous
        };
      });

      return {
        labels,
        data,
      };
    })
  );
  }

  browserStats(): Observable<any> {
    return this.http.get<any>(`${this.API}/browser-stats`);
  }

  audienceStats(): Observable<any> {
    return this.http.get<any>(`${this.API}/audience-stats`);
  }
}
