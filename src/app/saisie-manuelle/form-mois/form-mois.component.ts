import { Component, Input } from '@angular/core';
import { DataBlock } from '../../models/datablock.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { Device } from '../../models/device.model';
import { Saisie } from '../../models/saisie.model';

@Component({
    selector: 'app-form-mois',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './form-mois.component.html',
    styleUrl: './form-mois.component.scss',
})

export class FormMoisComponent {
    // Reçu par le parent.
    @Input() capteur!: Device;

    // Options disponibles.
    options = [
        'Moyenne',
        'Identique / Jour',
        'Premier du Mois',
        'Dernier du Mois',
    ];
    selectedOption!: number;
    inputMode: number = 1;

    // Pour l'ajout de mois.
    months = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
    ];

    // Blocs de données qu'on peut dupliquer ou supprimer (sauf le premier élément).
    blocs: DataBlock[] = [];
    confirm: boolean = false;
    
    isLoading: boolean = false;
    message: string = "En attente d'instructions...";

    // Constructeur.
    constructor(private service: DataService) {}

    // Initialise le premier bloc.
    ngOnInit(): void {
        this.blocs.push(new DataBlock());
        this.blocs[0].month = 1;
        this.blocs[0].year = new Date().getFullYear();
        this.selectedOption = 0;
    }

    /**
     * Duplique la ligne à l'index permettant de saisir ou d'incrémenter la valeur suivante par facilité.
     * @param index
     */
    dupliquer(index: number) {
        // Duplique les données du bloc et les stock.
        const duplicatedBloc = { ...this.blocs[index] };

        // Insère le bloc dupliqué à l'index spécifié.
        this.blocs.splice(index + 1, 0, duplicatedBloc);
    }

    /**
     * Suppression du bloc à l'index.
     * @param index
     */
    supprimer(index: number) {
        // Supprime le bloc dupliqué à l'index spécifié.
        this.blocs.splice(index, 1);
    }

    // Ajoute un bloc de données.
    addValue() {
        this.blocs.push(new DataBlock());
        this.blocs[this.blocs.length - 1].month =
            this.blocs.length > 12 ? 1 : this.blocs.length;
        this.blocs[this.blocs.length - 1].year = new Date().getFullYear();
    }

    /**
     * Supprimer le bloc à l'indice donné.
     * @param index
     */
    removeValue(index: number) {
        this.blocs.splice(index, 1);
    }

    // Confirmer.
    onConfirm() {
        this.confirm = true;
    }

    // Soumettre les valeurs.
    onSubmitMonth() {
        this.blocs = [];
        this.message = "Ajout des points en cours veuillez patienter..."
        this.isLoading = true;

        const saisie = new Saisie();
        saisie.mode = this.inputMode;
        saisie.capteur = this.capteur;
        saisie.datablocs = this.blocs;
        saisie.option = this.selectedOption;

        this.service.ajoutDonneesMois(saisie).subscribe({
            next: (data) => {
                this.message = "✅ Ajout des points terminé."
                this.isLoading = false;
            },
            error: (err) => {
                this.message = "❌ Erreur du serveur lors de l'ajout."
                this.isLoading = false;
            },
        });
    }
}
