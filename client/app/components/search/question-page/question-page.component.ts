import {Component, OnDestroy, OnInit} from '@angular/core'
import {StackoverflowService} from '../../../services/stackoverflow.service'
import {ActivatedRoute} from '@angular/router'
import {StackOverflowAnswers} from '../../../interfaces'
import {Subscription} from 'rxjs'

@Component({
    selector: 'question-page',
    templateUrl: './question-page.component.html',
    styleUrls: ['./question-page.component.css']

})
export class QuestionPageComponent implements OnInit, OnDestroy {

    answers: StackOverflowAnswers[] = []
    sub: Subscription

    constructor(private stackOverflowService: StackoverflowService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.stackOverflowService.getAnswers(this.route.snapshot.params.id).subscribe(
            (data) => {
                this.answers = data
            },
            error => {
                //TODO сообщение об ошибке
            }
        )
    }

    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe()
    }
}