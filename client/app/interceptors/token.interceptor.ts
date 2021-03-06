import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'

import {AuthService} from '../services/auth.service'
import {catchError} from 'rxjs/operators'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService,
                private  router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //set header only for backend api
        if (this.auth.isAuthenticated() && !req.url.includes('api.stackexchange.com')) {
            req = req.clone({
                setHeaders: {
                    Authorization: this.auth.token
                }
            })
        }

        return next.handle(req).pipe(
            catchError(
                (error: HttpErrorResponse) => this.handleAuthError(error)
            )
        )
    }

    private handleAuthError(error: HttpErrorResponse): Observable<any> {
        if (error.status === 401) {
            this.router.navigate(['/'], {
                queryParams: {
                    sessionFailed: true
                }
            })
        }
        return throwError(error)
    }
}