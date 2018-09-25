import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {Subscription} from 'rxjs'

import {AuthService} from '../../../services/auth.service'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {

    regForm: FormGroup
    sub: Subscription

    constructor(private auth: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.regForm = new FormGroup({
            email: new FormControl(
                null,
                [Validators.required, Validators.email]
            ),
            password: new FormControl(
                null,
                [Validators.required, Validators.minLength(6)]
            ),
            passwordConfirm: new FormControl(
                null,
                [Validators.required]
            )
        })
    }

    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe()
    }

    send() {
        this.regForm.disable()
        this.sub = this.auth.register({
            email: this.regForm.get('email').value,
            password: this.regForm.get('password').value
        }).subscribe(
            () => this.router.navigate(['/login'], {
                queryParams: {
                    registered: true
                }
            }),
            error => {
                this.regForm.enable()
            }
        )
    }
}
