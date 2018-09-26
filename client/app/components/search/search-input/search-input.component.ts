import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'

import {StackoverflowService} from '../../../services/stackoverflow.service'
import {StackPost} from '../../../interfaces'

@Component({
    selector: 'search-input',
    templateUrl: 'search-input.component.html',
    styleUrls: ['search-input.component.css']
})
export class SearchInputComponent implements OnInit {

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
        this.stackoverflow.getPosts().subscribe(
            () => {

                //this.router.navigate(['/search/list'])
            },
            error => {
                this.searchForm.enable()
                console.error(error)
            }
        )
    }
}