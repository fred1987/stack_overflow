import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import {Subscription} from 'rxjs'

import {AuthService} from '../../../../services/auth.service'
import {MessageService} from '../../../../services/message.service'

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

    passwordForm: FormGroup
    private hash: string = null
    sub: Subscription

    constructor(private auth: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private messageService: MessageService) {
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
            () => this.router.navigate(['/'], {
                queryParams: {
                    password_changed: true
                }
            }),
            () => {
                this.messageService.add({
                    type: 'error',
                    text: 'Что-то пошло не так...'
                })
                this.passwordForm.enable()
            }
        )
    }
}