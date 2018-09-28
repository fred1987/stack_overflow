import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {tap, map} from 'rxjs/operators'

import {StackOverflowQuestion, StackOverflowAnswers} from '../interfaces'

@Injectable({
    providedIn: 'root'
})
export class StackoverflowService {

    //don't use redux
    private _table: StackOverflowQuestion[] = []
    private baseUrl: string = 'https://api.stackexchange.com/2.2'

    constructor(private http: HttpClient) {
    }

    static queryString(params: {}) {
        return '?' + Object.keys(params).map(key => {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(params[key])
        }).join('&')
    }

    getQuestions(params: {}): Observable<StackOverflowQuestion[]> {
        return this.http.get(`${this.baseUrl}/search/advanced${StackoverflowService.queryString(params)}`)
            .pipe(
                map(data => {
                    let questions = data['items']
                    return questions.map((item: any) => {
                        return {
                            id: item.question_id,
                            title: item.title,
                            owner: {
                                id: item.owner.user_id,
                                name: item.owner.display_name
                            },
                            tags: item.tags,
                            answer_count: item.answer_count
                        }
                    })
                }),
                tap(data => {
                    if ('q' in params) this._table = data
                })
            )
    }

    getAnswers(questionId: number): Observable<StackOverflowAnswers[]> {
        return this.http.get(`${this.baseUrl}/questions/${questionId}/answers?order=desc&sort=activity&site=stackoverflow`)
            .pipe(
                map(data => {
                    let answers = data['items']
                    return answers.map((item: any) => {
                        return {
                            creation_date: item.creation_date,
                            owner_name: item.owner.display_name,
                            link: `https://stackoverflow.com/questions/${item.question_id}/${item.answer_id}#${item.answer_id}`
                        }
                    })
                })
            )
    }

    get table() {
        return this._table
    }
}