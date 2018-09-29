import {Component} from '@angular/core'

@Component({
    selector: 'not-found',
    template: `
        <div class="not_found">
            <p class="code">404</p>
            <p>Страница не найдена</p>
        </div>`,
    styleUrls: ['./not-found.component.css']
})

export class NotFoundComponent {
}