import {Component, OnInit} from '@angular/core'
import {StackPost} from '../../../interfaces'
import {StackoverflowService} from '../../../services/stackoverflow.service'

@Component({
    selector: 'search-list',
    templateUrl: 'list-page.component.html',
    styleUrls: ['list-page.component.css']
})
export class ListPageComponent implements OnInit {

    posts: StackPost[] = []

    constructor(public stackOverflowService: StackoverflowService) {
    }

    ngOnInit() {
        this.posts = this.stackOverflowService.posts

    }


}