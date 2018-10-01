import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Subscription} from 'rxjs'

import {StackOverflowAnswers} from '../../../interfaces'
import {StackoverflowService} from '../../../services/stackoverflow.service'
import {MessageService} from '../../../services/message.service'

@Component({
    selector: 'question-page',
    templateUrl: './question-page.component.html',
    styleUrls: ['./question-page.component.css']

})
export class QuestionPageComponent implements OnInit, OnDestroy {

    answers: StackOverflowAnswers[] = []
    preloader: boolean = true
    sub: Subscription

    constructor(private stackOverflowService: StackoverflowService,
                private route: ActivatedRoute,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.sub = this.stackOverflowService.getAnswers(this.route.snapshot.params.id)
            .subscribe(
                (data) => {
                    this.answers = data
                    this.preloader = false
                },
                () => {
                    this.messageService.add({
                        type: 'error',
                        text: 'Что-то пошло не так...'
                    })
                }
            )
    }

    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe()
    }
}