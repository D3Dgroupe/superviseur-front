import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Device } from '../models/device.model';
import { CapteurComponent } from "../capteur/capteur.component";
import { CommonModule } from '@angular/common';
import { NavigationComponent } from "../navigation/navigation.component";
import { TitleBarComponent } from "../generique/title-bar/title-bar.component";

@Component({
    selector: 'app-capteur-liste',
    standalone: true,
    templateUrl: './capteur-liste.component.html',
    styleUrl: './capteur-liste.component.scss',
    imports: [
        CommonModule,
        CapteurComponent,
        NavigationComponent,
        TitleBarComponent,
    ],
})

export class CapteurListeComponent implements OnInit {
    capteurs: Device[] = [];
    ajout: boolean = false;

    constructor(private service: DataService) {}

    ngOnInit(): void { this.recupererCapteurs(); }

    recupererCapteurs() {
        this.service.recupererEquipements().subscribe((data) => {
            this.capteurs = data;
        });
    }

    onRemoveCapteur(id: number) {
        const indexToRemove = this.capteurs.findIndex(
            (c) => c.id === id
        );

        if (indexToRemove !== -1) {
            this.capteurs.splice(indexToRemove, 1);
        }
    }
}
