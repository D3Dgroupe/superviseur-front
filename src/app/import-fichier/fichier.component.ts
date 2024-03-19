import { Component, Input } from '@angular/core';
import { Import } from '../models/import.model';
import { CommonModule } from '@angular/common';
import { DataService } from '../service/data.service';

@Component({
    selector: 'app-fichier',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './fichier.component.html',
    styleUrl: './fichier.component.scss',
})

export class FichierComponent {
    @Input() import!: Import;

    // Ne pas oublier private pour indiquer qu'il appartient bien à FichierComponent.
    constructor(private service: DataService) {}
    
    ngOnInit(): void {}

    commentaire(): void { this.service.modifierCommentaireImport(this.import.id, this.import); }
}
