import {Component, OnInit} from '@angular/core'

import {AuthService} from './services/auth.service'
import {fadeAnimation} from './animations'
import '../assets/css/normalize.css'
import '../assets/css/main.css'
import {Router} from '@angular/router'

@Component({
    selector: 'my-app',
    template: `
        <top-menu></top-menu>
        <main [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''">
            <router-outlet #o="outlet"></router-outlet>
        </main>
        <message></message>`,
    animations: [fadeAnimation],
    host: {'(document:keydown)': 'handleKeyboardEvents($event)'}
})

export class AppComponent implements OnInit {
    constructor(private auth: AuthService,
                private route: Router) {
    }

    ngOnInit() {
        const token = localStorage.getItem('auth-token')
        if (token !== null) this.auth.token = token
    }

    private handleKeyboardEvents(event: KeyboardEvent) {
        switch (event.keyCode) {
            case 81:
                this.route.navigate(['/'])
                break
            case 87:
                this.route.navigate(['/register'])
                break
            case 69:
                this.route.navigate(['/recovery/email'])
                break
            case 83:
                this.route.navigate(['/search'])
                break
        }
    }

}