import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {NotFoundComponent} from './components/not-found/not-found.component'
import {LoginComponent} from './components/auth/login/login.component'
import {RegisterComponent} from './components/auth/register/register.component'
import {RecoverySendEmailComponent} from './components/auth/recovery/email/email.component'
import {ChangePasswordComponent} from './components/auth/recovery/change-password/change-password.component'
import {InputPageComponent} from './components/search/input-page/input-page.component'
import {ListPageComponent} from './components/search/list-page/list-page.component'
import {AuthGuard} from './guards/auth.guard'
import {QuestionPageComponent} from './components/search/question-page/question-page.component'

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
            {
                path: 'email',
                component: RecoverySendEmailComponent
            },
            {
                path: 'change_password',
                component: ChangePasswordComponent
            }
        ]
    },
    {
        path: 'search',
        pathMatch: 'full',
        component: InputPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'search/posts',
        component: ListPageComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'search/posts/:id',
        pathMatch: 'full',
        component: QuestionPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {
}