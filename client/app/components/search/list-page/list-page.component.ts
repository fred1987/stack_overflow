import {Component, OnInit} from '@angular/core'
import {StackOverflowQuestion} from '../../../interfaces'
import {StackoverflowService} from '../../../services/stackoverflow.service'
import {Router} from '@angular/router'

@Component({
    selector: 'search-list',
    templateUrl: 'list-page.component.html'
})
export class ListPageComponent implements OnInit {

    questions: StackOverflowQuestion[] = []
    infoTable: StackOverflowQuestion[] = []
    showPanel: boolean = false

    constructor(public stackOverflowService: StackoverflowService,
                private router: Router) {
    }

    ngOnInit() {
        this.questions = this.stackOverflowService.table
    }

    getAnswers(id: number, count: number): void {
        if (count > 0) {
            this.router.navigate([`/search/posts/${id}`])
        } else {
            //TODO сообщение что ответов на этот вопрос еще нет
        }
    }

    getTagQuestions(tag: string): void {
        this.showPanel = false
        this.stackOverflowService.getQuestions({
            order: 'desc',
            sort: 'activity',
            tagged: tag,
            site: 'stackoverflow'
        }).subscribe(
            (data) => {
                this.infoTable = data
                this.showPanel = true
            },
            error => {
                //TODO сообщение об ошибке
            }
        )
    }

    getAuthorQuestions(userId: number): void {
        this.showPanel = false
        this.stackOverflowService.getQuestions({
            order: 'desc',
            sort: 'activity',
            user: userId,
            site: 'stackoverflow'
        }).subscribe(
            (data) => {
                this.infoTable = data
                this.showPanel = true
            },
            error => {
                //TODO сообщение об ошибке
            }
        )
    }
}