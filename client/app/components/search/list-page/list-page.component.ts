import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import {MessageService} from '../../../services/message.service'
import {StackOverflowQuestion} from '../../../interfaces'
import {StackoverflowService} from '../../../services/stackoverflow.service'

@Component({
    selector: 'search-list',
    templateUrl: 'list-page.component.html',
    styleUrls: ['list-page.component.css']
})
export class ListPageComponent implements OnInit {

    questions: StackOverflowQuestion[] = []
    infoTable: StackOverflowQuestion[] = []
    showPanel: boolean = false
    loading: boolean = false

    constructor(public stackOverflowService: StackoverflowService,
                private router: Router,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.questions = this.stackOverflowService.table
    }

    getAnswers(id: number): void {
        this.router.navigate([`/search/posts/${id}`])
    }

    getTagQuestions(tag: string): void {
        this.showPanel = false
        this.loading = true
        this.stackOverflowService.getQuestions({
            order: 'desc',
            sort: 'activity',
            tagged: tag,
            site: 'stackoverflow'
        }).subscribe(
            (data) => {
                this.infoTable = data
                this.showPanel = true
                this.loading = false
            },
            () => {
                this.messageService.add({
                    type: 'error',
                    text: 'Что-то пошло не так...'
                })
            }
        )
    }

    getAuthorQuestions(userId: number): void {
        this.showPanel = false
        this.loading = true
        this.stackOverflowService.getQuestions({
            order: 'desc',
            sort: 'activity',
            user: userId,
            site: 'stackoverflow'
        }).subscribe(
            (data) => {
                this.infoTable = data
                this.showPanel = true
                this.loading = false
            },
            () => {
                this.messageService.add({
                    type: 'error',
                    text: 'Что-то пошло не так...'
                })
            }
        )
    }

    sort(by: string): void {
        switch (by) {
            case 'theme':
                this.questions = this.questions.sort((a, b) => {
                    if (a.title > b.title) return 1
                    if (a.title < b.title) return -1
                    return 0
                })
                break
            case 'author':
                this.questions = this.questions.sort((a, b) => {
                    if (a.owner.name > b.owner.name) return 1
                    if (a.owner.name < b.owner.name) return -1
                    return 0
                })
                break
            case 'count':
                this.questions = this.questions.sort((a, b) => {
                    return a.answer_count - b.answer_count
                })
                break
            case 'tags':
                this.questions = this.questions.sort((a, b) => {
                    return a.tags.length - b.tags.length
                })
        }
    }
}