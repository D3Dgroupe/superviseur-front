import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Device } from '../../models/device.model';
import { DataBlock } from '../../models/datablock.model';
import { DataService } from '../../service/data.service';
import { Saisie } from '../../models/saisie.model';

@Component({
    selector: 'app-data-jour',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './data-jour.component.html',
    styleUrl: './data-jour.component.scss',
})

export class DataJourComponent implements OnInit {
    // Reçu par le parent.
    @Input() capteur!: Device;

    // Blocs de données qu'on peut dupliquer ou supprimer (sauf le premier élément).
    blocs: DataBlock[] = [];
    confirm: boolean = false;

    isLoading: boolean = false;
    message: string = "En attente d'instructions...";

    // Constructeur.
    constructor(private service: DataService) {}

    ngOnInit(): void {
        this.blocs.push(new DataBlock());
    }

    /**
     * Duplique la ligne à l'index permettant de saisir ou d'incrémenter la valeur suivante par facilité.
     * @param index
     */
    onAjouter(index: number) {
        const duplicatedBloc = { ...this.blocs[index] };

        // Il faut qu'une date soit spécifiée dans ce bloc avant de pouvoir la dupliquer et l'incrémenter.
        if (duplicatedBloc.date) {
            const parsed = new Date(duplicatedBloc.date);
            parsed.setDate(parsed.getDate() + 1);

            duplicatedBloc.date = parsed.toISOString().slice(0, 10);
        }
        
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

    onSubmit() {
        //this.blocs = [] Enlevé par Benjamin car sinon retournera toujours un tableau vide ?
        this.message = "Suppression des points en cours veuillez patienter..."
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
