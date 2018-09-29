import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import {AppComponent} from './app.component'
import {LoginComponent} from './components/auth/login/login.component'
import {NotFoundComponent} from './components/not-found/not-found.component'
import {RegisterComponent} from './components/auth/register/register.component'
import {RecoverySendEmailComponent} from './components/auth/recovery/email/email.component'
import {ChangePasswordComponent} from './components/auth/recovery/change-password/change-password.component'
import {InputPageComponent} from './components/search/input-page/input-page.component'
import {ListPageComponent} from './components/search/list-page/list-page.component'
import {InfoPanelComponent} from './components/search/info-panel/info-panel.component'

import {RoutingModule} from './routing.module'
import {TokenInterceptor} from './interceptors/token.interceptor'
import {CompareValidatorDirective} from './directives/compare-validator.directive'
import {MessageComponent} from './components/message/message.component'
import {QuestionPageComponent} from './components/search/question-page/question-page.component'
import {PreloaderComponent} from './components/preloader/preloader.component'

@NgModule({
    imports: [
        BrowserModule,
        RoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        CompareValidatorDirective,
        LoginComponent,
        RegisterComponent,
        RecoverySendEmailComponent,
        ChangePasswordComponent,
        ListPageComponent,
        InputPageComponent,
        QuestionPageComponent,
        InfoPanelComponent,
        MessageComponent,
        NotFoundComponent,
        PreloaderComponent
    ],
    providers: [
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     multi: true,
        //     useClass: TokenInterceptor
        // }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}