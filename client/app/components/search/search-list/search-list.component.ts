import {Component, OnInit} from '@angular/core'
import {StackPost} from '../../../interfaces'

@Component({
    selector: 'search-list',
    templateUrl: 'search-list.component.html',
    styleUrls: ['search-list.component.css']
})
export class SearchListComponent implements OnInit {

    posts: StackPost[]

    ngOnInit() {

    }


}