import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../services/auth.service'
import {NavigationStart, Router} from '@angular/router'

@Component({
    selector: 'top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

    isAuth: boolean

    constructor(private auth: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.router.events.subscribe(
            e => {
                if (e instanceof NavigationStart) this.isAuth = this.auth.isAuthenticated()
            }
        )
    }

    logout() {
        this.auth.logout()
        this.router.navigate(['/'])
    }
}