import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, RouterOutlet],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
})

export class LandingComponent {
    grafanaURLvar: string = environment.grafanaUrl;
}

