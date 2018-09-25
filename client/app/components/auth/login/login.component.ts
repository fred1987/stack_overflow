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
            if (params['registered']) {


            } else if (params['accessDenied']) {

            } else if (params['sessionFailed']) {

            }
        })
    }

    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe()
    }

    send() {
        this.loginForm.disable()
        this.sub = this.auth.login(this.loginForm.value).subscribe(
            () => this.router.navigate(['/crm']),
            error => {

                this.loginForm.enable()
            }
        )
    }
}