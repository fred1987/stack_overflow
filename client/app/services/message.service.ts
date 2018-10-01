import {Injectable} from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messages: { type: string, text: string }[] = []

    add(m: { type: string, text: string }) {
        this.messages.push({
            type: m.type,
            text: m.text
        })
        setTimeout(this.clear.bind(this), 5000)
    }

    clear() {
        this.messages = []
    }
}