import { Inject, Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from "src/app/features/auth/service/auth.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Asegurarse de que las cookies se envien automaticamente
        const cloneRequest = req.clone({ withCredentials: true });

        return next.handle(cloneRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                // Verificar si el error es por token expirado
                if (error.status === 401 && !req.url.includes('refresh')) {
                    // Intentar renovar el token si expiro
                    return this.authService.refreshToken().pipe(
                        switchMap(() => {
                            // Reintentar la solicitud original después de renovar el token
                            const newRequest = req.clone({ withCredentials: true });
                            return next.handle(newRequest);
                        })
                    );
                }
                return throwError(error);
            })
        );
    }

}