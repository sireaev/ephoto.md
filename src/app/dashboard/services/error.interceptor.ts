import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastService } from './toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Skip refresh endpoint
      if (req.url.includes('/auth/refresh')) {
        return throwError(() => error);
      }

      const err = error.error;

      // ✅ Case 1: structured validation error
      if (err?.message && Array.isArray(err?.details)) {
        // Show main message
        toast.error('Error', err?.message, err?.details.join(''));
      }

      // ✅ Case 2: array message (NestJS default sometimes)
      else if (Array.isArray(err?.message)) {
        err.message.forEach((msg: string) => {
          toast.error('Error', msg);
        });
      }

      // ✅ Case 3: single message
      else if (err?.message) {
        toast.error('Error', err.message);
      }

      // ✅ Case 4: network error
      else if (error.status === 0) {
        toast.error('Error', 'Cannot connect to server');
      }

      // ✅ Fallback
      else {
        toast.error('Error', 'Something went wrong');
      }

      return throwError(() => error);
    })
  );
};
