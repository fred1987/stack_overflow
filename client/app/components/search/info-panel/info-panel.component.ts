import {Component, Input} from '@angular/core'
import {animate, state, style, transition, trigger} from '@angular/animations'

import {StackOverflowQuestion} from '../../../interfaces'

@Component({
    selector: 'info-panel',
    templateUrl: 'info-panel.component.html',
    styleUrls: ['info-panel.component.css'],
    animations: [
        trigger('panel', [
            state('start', style({
                bottom: '-450px'
            })),
            state('end', style({
                bottom: '0'
            })),
            transition('start => end', animate('500ms 0.5s ease-out')),
            transition('end => start', animate('500ms 0.5s ease-out'))
        ])
    ]
})
export class InfoPanelComponent {
    state: string

    @Input() data: StackOverflowQuestion[]

    @Input()
    set show(show: boolean) {
        this.state = (show) ? 'end' : 'start'
    }

    private hidePanel() {
        this.state = 'start'
    }
}