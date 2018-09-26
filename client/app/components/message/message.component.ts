import {Component} from '@angular/core'

import {MessageService} from '../../services/message.service'

@Component({
    selector: 'message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {

    constructor(private messageService: MessageService) {

    }

}