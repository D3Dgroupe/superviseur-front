import { Component } from '@angular/core';
import { NavigationComponent } from '../../navigation/navigation.component';

@Component({
    selector: 'app-not-found',
    standalone: true,
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss',
    imports: [NavigationComponent],
})

export class NotFoundComponent {}
