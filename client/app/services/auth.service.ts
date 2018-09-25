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

    register(user: User): Observable<User> {
        return this.http.post<User>('http://localhost:3000/api/register', user)
    }

    login(user: User): Observable<{ token: string }> {
        return this.http.post<{ token: string }>('http://localhost:3000/api/login', user).pipe(
            tap(
                ({token}) => {
                    localStorage.setItem('auth-token', token)
                    this.token = token
                }
            )
        )
    }

    sendEmailRecovery(email: string) {
        return this.http.post<{}>('http://localhost:3000/api/recovery/email', {email})
    }

    changePassword(data: { password: string, hash: string }) {
        return this.http.post<{}>('http://localhost:3000/api/recovery/pswd', data)
    }

    //Why? For honor!!!
    set token(token: string) {
        this._token = token
    }

    get token(): string {
        return this._token
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    logout() {
        this.token = null
        localStorage.clear()
    }
}