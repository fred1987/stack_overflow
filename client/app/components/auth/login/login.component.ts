import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {Subscription} from 'rxjs'

import {AuthService} from '../../../services/auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup
    sub: Subscription

    constructor(private auth: AuthService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(
                null,
                [Validators.required, Validators.email]),
            password: new FormControl(
                null,
                [Validators.required, Validators.minLength(6)])
        })

        this.route.queryParams.subscribe((params: Params) => {
            if (params['password_changed']) {
                //TODO пароль был изменен, попросить заново авторизоваться
            } else if (params['accessDenied']) {
                //TODO доступ запрещен, попросить авторизоваться или зарегистрироваться
            } else if (params['sessionFailed']) {
                //TODO сессия закончилась, попросить авторизоваться заново
            }
        })
    }

    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe()
    }

    send() {
        this.loginForm.disable()
        this.sub = this.auth.login(this.loginForm.value).subscribe(
            () => this.router.navigate(['/search']),
            error => {
                //TODO показать сообщение об ошибке
                this.loginForm.enable()
            }
        )
    }
}