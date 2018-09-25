import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Subscription} from 'rxjs'

import {AuthService} from '../../../../services/auth.service'

@Component({
    selector: 'app-recovery-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.css']
})
export class RecoverySendEmailComponent implements OnInit, OnDestroy {

    recoveryForm: FormGroup
    sub: Subscription
    emailSent: boolean = false

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        this.recoveryForm = new FormGroup({
            email: new FormControl(
                null,
                [Validators.required, Validators.email]
            )
        })
    }

    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe()
    }

    send() {
        this.recoveryForm.disable()
        this.sub = this.auth.sendEmailRecovery(this.recoveryForm.get('email').value).subscribe(
            () => this.emailSent = true,
            error => {
                console.error(error)
                this.recoveryForm.enable()
            }
        )
    }
}