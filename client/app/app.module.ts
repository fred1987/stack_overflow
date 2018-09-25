import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppComponent} from './app.component'
import {LoginComponent} from './components/auth/login/login.component'
import {NotFoundComponent} from './components/not-found/not-found.component'
import {RoutingModule} from './routing.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {RegisterComponent} from './components/auth/register/register.component'
import {CompareValidatorDirective} from './directives/compare-validator.directive'
import {TokenInterceptor} from './interceptors/token.interceptor'
import {RecoverySendEmailComponent} from './components/auth/recovery/email/email.component'
import {ChangePasswordComponent} from './components/auth/recovery/change-password/change-password.component'

@NgModule({
    imports: [
        BrowserModule,
        RoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        CompareValidatorDirective,
        LoginComponent,
        RegisterComponent,
        RecoverySendEmailComponent,
        ChangePasswordComponent,
        NotFoundComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: TokenInterceptor
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}