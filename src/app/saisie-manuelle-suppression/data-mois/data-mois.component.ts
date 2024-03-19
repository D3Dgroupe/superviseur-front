import { Component, Input, OnInit } from '@angular/core';
import { DataBlock } from '../../models/datablock.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { Device } from '../../models/device.model';
import { Saisie } from '../../models/saisie.model';

@Component({
    selector: 'app-data-mois',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './data-mois.component.html',
    styleUrl: './data-mois.component.scss',
})

export class DataMoisComponent implements OnInit {
    // Reçu par le parent.
    @Input() capteur!: Device;
    
    // Pour l'ajout de mois.
    months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    
    // Blocs de données qu'on peut dupliquer ou supprimer (sauf le premier élément).
    blocs: DataBlock[] = [];
    confirm: boolean = false;

    isLoading: boolean = false;
    message: string = "En attente d'instructions...";

    // Constructeur.
    constructor(private service: DataService) {}

    // Initialise le premier bloc.
    ngOnInit(): void {
        this.blocs.push(new DataBlock);
        this.blocs[0].month = 1;
        this.blocs[0].year = (new Date()).getFullYear();
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
    
    // Ajoute un bloc de données.
    addValue() {
        this.blocs.push(new DataBlock);
        this.blocs[this.blocs.length - 1].month = this.blocs.length > 12 ? 1 : (this.blocs.length);
        this.blocs[this.blocs.length - 1].year = (new Date()).getFullYear();
    }
    
    /**
     * Supprimer le bloc à l'indice donné.
     * @param index 
     */
    removeValue(index: number) { this.blocs.splice(index, 1); }

    // Confirmer.
    onConfirm() { this.confirm = true; }

    onSubmit() {
        this.message = "Suppression des points en cours..."
        this.isLoading = true;
        
        const saisie = new Saisie();
        saisie.datablocs = this.blocs;
        saisie.capteur = this.capteur;

        this.service.purgerJour(saisie).subscribe({
            next: (data) => {
                this.message = "✅ Suppression des points terminé."
                this.isLoading = false;
            },
            error: (error) => {
                this.message = "Erreur lors de la suppression."
                this.isLoading = false;
            },
        });
    }
}
