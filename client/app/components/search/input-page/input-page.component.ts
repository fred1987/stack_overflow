import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'

import {StackoverflowService} from '../../../services/stackoverflow.service'

@Component({
    selector: 'search-input',
    templateUrl: 'input-page.component.html',
    styleUrls: ['input-page.component.css']
})
export class InputPageComponent implements OnInit {

    searchForm: FormGroup

    constructor(private stackOverflowService: StackoverflowService,
                private router: Router) {
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
        this.searchForm.disable()
        this.stackOverflowService.getQuestions({
            order: 'desc',
            sort: 'activity',
            q: this.searchForm.get('search').value.trim(),
            site: 'stackoverflow'
        }).subscribe(
            () => this.router.navigate(['/search/posts']),
            error => {

                //TODO сообщение об ошибке
                this.searchForm.enable()
            }
        )
    }
}