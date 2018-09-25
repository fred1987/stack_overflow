import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {NotFoundComponent} from './components/not-found/not-found.component'
import {LoginComponent} from './components/auth/login/login.component'
import {RegisterComponent} from './components/auth/register/register.component'
import {RecoverySendEmailComponent} from './components/auth/recovery/email/email.component'
import {ChangePasswordComponent} from './components/auth/recovery/change-password/change-password.component'

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'recovery',
        children: [
            {path: 'email', component: RecoverySendEmailComponent},
            {path: 'change_password', component: ChangePasswordComponent}
        ]
    },
    {path: '**', component: NotFoundComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {
}