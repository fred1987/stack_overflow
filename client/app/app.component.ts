import {Component, OnInit} from '@angular/core'

import {AuthService} from './services/auth.service'
import '../assets/css/normalize.css'
import '../assets/css/main.css'

@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet><message></message>'
})

export class AppComponent implements OnInit {
    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        const token = localStorage.getItem('auth-token')
        if (token !== null) this.auth.token = token
    }
}