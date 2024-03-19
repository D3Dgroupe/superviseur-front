import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, RouterOutlet],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
})

export class LandingComponent {}
