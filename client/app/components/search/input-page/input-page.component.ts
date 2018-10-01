import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'

import {StackoverflowService} from '../../../services/stackoverflow.service'
import {MessageService} from '../../../services/message.service'

@Component({
    selector: 'search-input',
    templateUrl: 'input-page.component.html',
    styleUrls: ['input-page.component.css']
})
export class InputPageComponent implements OnInit {

    searchForm: FormGroup
    sent: boolean = false

    constructor(private stackOverflowService: StackoverflowService,
                private router: Router,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.searchForm = new FormGroup({
            search: new FormControl(
                null,
                [Validators.required]
            )
        })
    }

    send(): void {
        this.sent = true
        this.searchForm.disable()
        this.stackOverflowService.getQuestions({
            order: 'desc',
            sort: 'activity',
            q: this.searchForm.get('search').value.trim(),
            site: 'stackoverflow'
        }).subscribe(
            () => {
                this.sent = false
                this.router.navigate(['/search/posts'])
            },
            () => {
                this.messageService.add({
                    type: 'error',
                    text: 'Что-то пошло не так...'
                })
                this.searchForm.enable()
            }
        )
    }
}