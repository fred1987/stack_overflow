import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, of} from 'rxjs'

import {StackPost} from '../interfaces'
import {catchError, tap} from 'rxjs/operators'
import {MessageService} from './message.service'


@Injectable({
    providedIn: 'root'
})
export class StackoverflowService {

    private _posts: StackPost[] = []
    private baseUrl: string = 'http://api.stackexchange.com/2.2'

    constructor(private http: HttpClient,
                private messageService: MessageService) {
    }

    getPosts() {
        return this.http.get(`${this.baseUrl}/users/2/questions?order=desc&sort=activity&site=stackoverflow&page=1`)
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError('getPosts', []))
            )
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error) // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`)

            // Let the app keep running by returning an empty result.
            return of(result as T)
        }
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`StackoverflowService: ${message}`)

    }

    get posts() {
        return this._posts
    }

}