import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {tap} from 'rxjs/operators'
import {User} from '../interfaces'

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _token: string = null

    constructor(private http: HttpClient) {
    }

    register(user: User): Observable<{ token: string }> {
        return this.http.post<{ token: string }>('/api/register', user).pipe(
            tap(
                ({token}) => {
                    localStorage.setItem('auth-token', token)
                    this.token = token
                }
            )
        )
    }

    login(user: User): Observable<{ token: string }> {
        return this.http.post<{ token: string }>('/api/login', user).pipe(
            tap(
                ({token}) => {
                    localStorage.setItem('auth-token', token)
                    this.token = token
                }
            )
        )
    }

    sendEmailRecovery(email: string) {
        return this.http.post<{}>('/api/recovery/email', {email})
    }

    changePassword(data: { password: string, hash: string }) {
        return this.http.post<{}>('/api/recovery/pswd', data)
    }

    set token(token: string) {
        this._token = token
    }

    get token(): string {
        return this._token
    }

    //just checking for a token in localStorage
    isAuthenticated(): boolean {
        return !!this.token
    }

    logout() {
        this.token = null
        localStorage.clear()
    }
}