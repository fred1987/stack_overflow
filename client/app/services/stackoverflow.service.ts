import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

import {StackPost} from '../interfaces'
import {tap} from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class StackoverflowService {

    //no redux
    private _posts: StackPost[] = []
    private baseUrl: string = 'https://api.stackexchange.com/2.2'

    constructor(private http: HttpClient) {
    }

    getPosts(requestBody: string) {
        return this.http.get<{ items: { answer_count: number, owner: { display_name: string }, tags: string[], title: string }[] }>(`${this.baseUrl}/search/advanced?order=desc&sort=activity&q=${requestBody}&site=stackoverflow`)
            .pipe(tap(data => {
                data.items.forEach(item => {
                    this._posts.push({
                        author: item.owner.display_name,
                        theme: item.title,
                        tags: item.tags,
                        answers: item.answer_count
                    })
                })
            }))
    }

    get posts() {
        return this._posts
    }




}