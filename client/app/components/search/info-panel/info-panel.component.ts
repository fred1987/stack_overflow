import {Component, Input, OnInit} from '@angular/core'
import {StackOverflowQuestion} from '../../../interfaces'

@Component({
    selector: 'info-panel',
    templateUrl: 'info-panel.component.html',
    styleUrls: ['info-panel.component.css']
})
export class InfoPanelComponent implements OnInit {
    hidden: boolean = true
    @Input() data: StackOverflowQuestion[]

    ngOnInit() {
        console.log(this.data)
    }

}