import { Component, Input, OnInit } from '@angular/core';
import { DataBlock } from '../../models/datablock.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Device } from '../../models/device.model';
import { Saisie } from '../../models/saisie.model';
import { DataService } from '../../service/data.service';

@Component({
    selector: 'app-form-jour',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './form-jour.component.html',
    styleUrl: './form-jour.component.scss',
})

export class FormJourComponent implements OnInit {
    // Reçu par le parent.
    @Input() capteur!: Device;

    // Options disponibles pour la granularité jour.
    options = ['Début Journée', 'Fin Journée'];
    selectedOption!: number;
    inputMode: number = 1;

    // Blocs de données qu'on peut dupliquer ou supprimer (sauf le premier élément).
    blocs: DataBlock[] = [];
    confirm: boolean = false;

    isLoading: boolean = false;
    message: string = "En attente d'instructions...";

    // Constructeur.
    constructor(private service: DataService) {}

    ngOnInit(): void {
        this.blocs.push(new DataBlock());
        this.selectedOption = 0;
    }

    /**
     * Duplique la ligne à l'index permettant de saisir ou d'incrémenter la valeur suivante par facilité.
     * @param index
     */
    onAjouter(index: number) {
        const duplicatedBloc = { ...this.blocs[index] };
        
        const parsed = new Date(duplicatedBloc.date);
        parsed.setDate(parsed.getDate() + 1);
        
        duplicatedBloc.date = parsed.toISOString().slice(0, 10);
        
        const updatedDataBlock: DataBlock = {
            ...duplicatedBloc,
        };

        this.blocs.splice(index + 1, 0, updatedDataBlock);
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
    onConfirm() {
        this.confirm = true;
    }

    /**
     * Soumettre les valeurs.
     */
    onSubmitDay() {
        const saisie = new Saisie();
        
        saisie.mode = this.inputMode;
        saisie.capteur = this.capteur;
        saisie.datablocs = this.blocs;
        saisie.option = this.selectedOption;

        this.service.ajoutDonneesJour(saisie).subscribe({
            next: (data) => {
                this.message = "✅ Ajout des points terminé."
                this.isLoading = false;

                // Rafraichi la page si tout s'est bien passé.
                setTimeout(() => { window.location.reload(); }, 2000);
            },
            error: (error) => {
                this.message = "❌ Erreur du serveur lors de l'ajout."
                this.isLoading = false;
            },
        });
    }
}
