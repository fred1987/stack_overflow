import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {Subscription} from 'rxjs'

import {AuthService} from '../../../services/auth.service'
import {MessageService} from '../../../services/message.service'

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
                private route: ActivatedRoute,
                private messageService: MessageService) {
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
                this.messageService.add({
                    type: 'success',
                    text: 'Ваш пароль был изменен. Пожалуйста, авторизуйтесь с новым паролем.'
                })
            } else if (params['accessDenied']) {
                this.messageService.add({
                    type: 'warn',
                    text: 'Необходимо авторизоваться!'
                })
            } else if (params['sessionFailed']) {
                this.messageService.add({
                    type: 'warn',
                    text: 'Сессия истекла. Необходимо снова авторизоваться.'
                })
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
            () => {
                this.messageService.add({
                    type: 'error',
                    text: 'Неправильный логин или пароль'
                })
                this.loginForm.enable()
            }
        )
    }
}