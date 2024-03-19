// app/interceptor/error-interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * Cette classe permet d'intercepter les codes d'erreurs http reçus et de les traiter.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private router: Router) {}
    
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status == 400) {
                    this.router.navigate(['/error/bad-request']);
                }

                if (error.status == 404) {
                    this.router.navigate(['/error/not-found']);
                }

                if (error.status >= 500 && error.status < 600) {
                    this.router.navigate(['/error/internal-server']);
                }

                return throwError(() => new Error("Une erreur a été interceptée."));
            })
        );
    }
}
