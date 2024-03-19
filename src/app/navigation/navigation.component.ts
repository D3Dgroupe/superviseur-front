import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [CommonModule, RouterModule, RouterOutlet],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})

export class NavigationComponent implements OnInit {

    active: string = "Liste des Capteurs AKSM";

    constructor(private route: ActivatedRoute) {}
    
    ngOnInit(): void { this.route.data.subscribe((data) => { this.active = data['title'] || "Liste des Capteurs AKSM" }); }
}
