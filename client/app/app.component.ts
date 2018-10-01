import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import {AuthService} from './services/auth.service'
import {fadeAnimation} from './animations'
import '../assets/css/normalize.css'
import '../assets/css/main.css'

@Component({
    selector: 'my-app',
    template: `
        <top-menu></top-menu>
        <main [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''">
            <router-outlet #o="outlet"></router-outlet>
        </main>
        <message></message>`,
    animations: [fadeAnimation],
    host: {
        '(document:keydown)': 'handleKeyboardEvents($event)'
    }
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
        if (event.keyCode === 27) this.route.navigate(['/'])
        if (event.ctrlKey) {
            switch (event.keyCode) {
                case 65:
                    this.route.navigate(['/register']) //a
                    break
                case 82:
                    this.route.navigate(['/recovery/email']) //r
                    break
                case 90:
                    this.route.navigate(['/search']) //z
                    break
            }
        }
    }
}