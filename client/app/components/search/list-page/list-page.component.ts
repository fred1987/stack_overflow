import {Component, OnInit} from '@angular/core'
import {StackOverflowQuestion} from '../../../interfaces'
import {StackoverflowService} from '../../../services/stackoverflow.service'
import {Router} from '@angular/router'

@Component({
    selector: 'search-list',
    templateUrl: 'list-page.component.html',
    styleUrls: ['list-page.component.css']
})
export class ListPageComponent implements OnInit {

    questions: StackOverflowQuestion[] = []
    infoTable: StackOverflowQuestion[] = []

    constructor(public stackOverflowService: StackoverflowService,
                private router: Router) {
    }

    ngOnInit() {
        this.questions = this.stackOverflowService.table
    }

    getAnswers(id: number): void {
        this.router.navigate([`/search/posts/${id}`])
    }

    getTagQuestions(tag: string): void {
        this.stackOverflowService.getQuestions({
            order: 'desc',
            sort: 'activity',
            tagged: tag,
            site: 'stackoverflow'
        }).subscribe(
            (data) => this.infoTable = data,
            error => {
                //TODO сообщение об ошибке
            }
        )
    }

    getAuthorQuestions(userId: number): void {
        this.stackOverflowService.getQuestions({
            order: 'desc',
            sort: 'activity',
            user: userId,
            site: 'stackoverflow'
        }).subscribe(
            (data) => this.infoTable = data,
            error => {
                //TODO сообщение об ошибке
            }
        )
    }
}