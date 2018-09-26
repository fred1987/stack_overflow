import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import {AppComponent} from './app.component'
import {LoginComponent} from './components/auth/login/login.component'
import {NotFoundComponent} from './components/not-found/not-found.component'
import {RegisterComponent} from './components/auth/register/register.component'
import {RecoverySendEmailComponent} from './components/auth/recovery/email/email.component'
import {ChangePasswordComponent} from './components/auth/recovery/change-password/change-password.component'
import {SearchInputComponent} from './components/search/search-input/search-input.component'
import {SearchDetailComponent} from './components/search/search-detail/search-detail.component'
import {SearchListComponent} from './components/search/search-list/search-list.component'

import {RoutingModule} from './routing.module'
import {TokenInterceptor} from './interceptors/token.interceptor'
import {CompareValidatorDirective} from './directives/compare-validator.directive'
import {MessageComponent} from './components/message/message.component'

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
        SearchInputComponent,
        SearchDetailComponent,
        SearchListComponent,
        MessageComponent,
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