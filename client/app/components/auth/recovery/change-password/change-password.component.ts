import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Subscription} from 'rxjs'

import {AuthService} from '../../../../services/auth.service'
import {ActivatedRoute} from '@angular/router'

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

    passwordForm: FormGroup
    private hash: string = null
    sub: Subscription

    constructor(private auth: AuthService, private route: ActivatedRoute) {
        this.hash = this.route.snapshot.queryParams['hash']
    }

    ngOnInit() {
        this.passwordForm = new FormGroup({
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
        this.passwordForm.disable()
        this.sub = this.auth.changePassword({
            password: this.passwordForm.get('password').value,
            hash: this.hash
        }).subscribe(
            () => {
            },
            error => {
                console.error(error)
                this.passwordForm.enable()
            }
        )
    }
}