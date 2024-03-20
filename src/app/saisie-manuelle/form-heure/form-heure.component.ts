import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataBlock } from '../../models/datablock.model';
import { Saisie } from '../../models/saisie.model';
import { Device } from '../../models/device.model';
import { DataService } from '../../service/data.service';

@Component({
    selector: 'app-form-heure',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './form-heure.component.html',
    styleUrl: './form-heure.component.scss',
})

export class FormHeureComponent implements OnInit {
    // Reçu par le parent.
    @Input() capteur!: Device;

    // Blocs de données qu'on peut dupliquer ou supprimer (sauf le premier élément).
    blocs: DataBlock[] = [];
    confirm: boolean = false;
    inputMode: number = 1;

    isLoading: boolean = false;
    message: string = "En attente d'instructions...";

    // Constructeur.
    constructor(private service: DataService) {}

    ngOnInit(): void { this.blocs.push(new DataBlock); }

    /**
     * Duplique la ligne à l'index permettant de saisir ou d'incrémenter la valeur suivante par facilité.
     * @param index
     */
    onAjouter(index: number) {
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

    // Confirmer.
    onConfirm() { this.confirm = true; }

    /**
     * Soumettre les valeurs.
     */
    onSubmitHour() {
        const saisie = new Saisie()
        
        saisie.mode = this.inputMode;
        saisie.capteur = this.capteur;
        saisie.datablocs = this.blocs;

        this.service.ajoutDonneesHeure(saisie).subscribe({
            next: (data) => {
                this.message = "✅ Ajout des points terminé."
                this.isLoading = false;
            },
            error: (error) => {
                this.message = "❌ Erreur du serveur lors de l'ajout."
                this.isLoading = false;
            }
        });
    }
}
