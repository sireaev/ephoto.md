import { inject } from '@angular/core';
import {
    HttpInterceptorFn,
    HttpErrorResponse,
} from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.includes('/auth/login') || req.url.includes('/auth/refresh')) {
        return next(req);
    }
    const auth = inject(AuthService);
    const router = inject(Router);


    const accessToken = auth.accessToken;

    // Attach token
    const authReq = accessToken
        ? req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        : req;

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            // If unauthorized → try refresh
            if (error.status === 401) {
                return auth.refresh().pipe(
                    switchMap((newToken: any) => {
                        const retryReq = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${newToken}`,
                            },
                        });
                        return next(retryReq);
                    }),
                    catchError(err => {
                        // Refresh failed → logout
                        auth.logout();
                        console.log('request failed navigating to login')
                        router.navigate(['/admin/login']);
                        return throwError(() => err);
                    })
                );
            }

            return throwError(() => error);
        })
    );
};
