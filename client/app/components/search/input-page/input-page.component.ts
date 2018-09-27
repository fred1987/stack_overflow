import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'

import {StackoverflowService} from '../../../services/stackoverflow.service'
import {StackPost} from '../../../interfaces'

@Component({
    selector: 'search-input',
    templateUrl: 'input-page.component.html',
    styleUrls: ['input-page.component.css']
})
export class InputPageComponent implements OnInit {

    searchForm: FormGroup

    posts: StackPost[]

    constructor(private stackoverflow: StackoverflowService,
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
        this.stackoverflow.getPosts(this.searchForm.get('search').value.trim()).subscribe(
            () => {

                this.router.navigate(['/posts'])
            },
            error => {

                //TODO сообщение об ошибке
                this.searchForm.enable()
            }
        )
    }
}