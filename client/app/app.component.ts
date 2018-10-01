import {Component, OnInit} from '@angular/core'

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
    animations: [fadeAnimation]
})

export class AppComponent implements OnInit {
    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        const token = localStorage.getItem('auth-token')
        if (token !== null) this.auth.token = token
    }
}