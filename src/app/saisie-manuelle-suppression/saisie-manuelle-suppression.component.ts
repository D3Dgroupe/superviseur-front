import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../service/data.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Device } from '../models/device.model';
import { TitleBarComponent } from "../generique/title-bar/title-bar.component";
import { FormHeureComponent } from '../saisie-manuelle/form-heure/form-heure.component';
import { DataJourComponent } from "./data-jour/data-jour.component";
import { DataMoisComponent } from "./data-mois/data-mois.component";

@Component({
    selector: 'app-suppression-manuelle',
    standalone: true,
    templateUrl: './saisie-manuelle-suppression.component.html',
    styleUrl: './saisie-manuelle-suppression.component.scss',
    imports: [
        NavigationComponent,
        CommonModule,
        FormsModule,
        MatAutocompleteModule,
        FormHeureComponent,
        TitleBarComponent,
        DataJourComponent,
        DataMoisComponent,
    ],
})
export class SuppressionManuelleComponent implements AfterViewChecked {
    @ViewChild('wrapper') wrapperElement!: ElementRef;

    // Le nom du capteur lié à l'input text sur la template.
    tag: string = '';

    // Liste des capteurs proposées par auto-complétion, sachant que seul l'identifiant et le nom seront déclarés.
    capteurs: Device[] = [];
    selectedCapteur!: Device;

    granularity = ['Mois', 'Jour'];
    selectedGranularity: string = '';
    inputMode: number = 1;

    confirm: boolean = false;
    error: boolean = false;

    isLoading: boolean = false;
    done: boolean = false;
    message: string = "En attente d'instructions...";

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
            this.wrapperElement.nativeElement.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
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
    }

    // Confirmer.
    onConfirm() {
        this.confirm = true;
    }

    /**
     * Soumettre la suppression.
     */
    onSubmit() {
        this.message = 'Purge des mesures du capteur en cours...';
        this.isLoading = true;

        this.service.purger(this.tag).subscribe({
            next: (data) => {
                this.done = true;
                this.message = '✅ Tous les points ont été purgés.';
            },
            error: (error) => {
                this.message = 'Erreur serveur lors de la purge.';
            },
        });
    }
}
