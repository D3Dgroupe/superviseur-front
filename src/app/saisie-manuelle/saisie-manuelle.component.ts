import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../service/data.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Device } from '../models/device.model';
import { FormHeureComponent } from "./form-heure/form-heure.component";
import { FormJourComponent } from "./form-jour/form-jour.component";
import { FormMoisComponent } from "./form-mois/form-mois.component";
import { TitleBarComponent } from "../generique/title-bar/title-bar.component";

@Component({
    selector: 'app-saisie-manuelle',
    standalone: true,
    templateUrl: './saisie-manuelle.component.html',
    styleUrl: './saisie-manuelle.component.scss',
    imports: [
        NavigationComponent,
        CommonModule,
        FormsModule,
        MatAutocompleteModule,
        FormHeureComponent,
        FormJourComponent,
        FormMoisComponent,
        TitleBarComponent,
    ],
})

export class SaisieManuelleComponent implements AfterViewChecked {
    @ViewChild('wrapper') wrapperElement!: ElementRef;

    // Le nom du capteur et celui du bucket.
    tag: string = '';

    // Liste des capteurs proposées par auto-complétion, sachant que seul l'identifiant et le nom seront déclarés.
    capteurs: Device[] = [];

    // Cet objet sera initializé dès lors qu'un capteur est sélectionné et ne peut pas provoquer d'erreur de type runtime.
    // Il sert à ce qu'on puisse délivrer l'identifiant du capteur récupéré afin de laisser une trace de la saisie manuelle.
    // Autrement dans tous les cas les données sont envoyés vers influx db et doivent se baser sur la « clé » qui sert à retrouver le capteur.
    selectedCapteur!: Device;

    // La granularité proposé et la granularité sélectionnée.
    granularity = ['Mois', 'Jour', 'Heure'];
    selectedGranularity: string = '';

    // La liste des blocs de données valeurs ajoutés pour chaque granularité.
    isInputValid: boolean = true;
    error: boolean = false;
    isLoading: boolean = false;
    response: string = '';

    // Le constructeur qui initalise le data service (qui appelle le backend).
    constructor(private service: DataService) {}

    /**
     * On garantie que le défilement sera exécuté après chaque vérification de cycle.
     */
    ngAfterViewChecked() {
        // Appeler cette méthode dans ngAfterViewInit garantit que le DOM a été rendu et que les éléments sont accessibles.
        this.scrollDown();
    }

    /**
     * Permet de scroll down de manière élégante.
     */
    private scrollDown() {
        if (this.wrapperElement) {
            // Utilisation de smooth scroll pour un défilement plus fluide.
            this.wrapperElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }

    /**
     * Récupère une liste de capteurs selon le pattern saisi (auto-complétion).
     * @param event
     * @returns
     */
    autocomplete(event: any) {
        if (event.target.value.length < 3) return;

        this.service.rechercheCapteurs(event.target.value).subscribe((data) => {
            this.capteurs = data;
        });
    }

    /**
     * Lorsqu'on choisi un capteur depuis l'auto-complétion.
     * @param device
     */
    onDeviceSelect(id: number, tag: string): void {
        this.tag = tag;

        // Appelle la recherche d'un capteur par id.
        this.service.recupererCapteur(id).subscribe((data) => {
            this.selectedCapteur = data;
        });
    }

    /**
     * Lorsqu'on modifie la granularité.
     * @param event
     */
    onGranulariteChange(event: any) {
        this.selectedGranularity = event.target.value;
        this.scrollDown();
    }
}
