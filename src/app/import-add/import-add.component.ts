import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../service/data.service';
import { filter, map } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-import-add',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './import-add.component.html',
    styleUrl: './import-add.component.scss',
})

export class ImportAddComponent {
    constructor(private service: DataService) {}

    // Permet d'accéder au contenu enfant de la balise file.
    @ViewChild('fileInput') inputForm!: ElementRef;

    file: File | null = null; // Peut être de type File ou null.
    isLoading: boolean = false;
    added: boolean = false;
    error: boolean = false;
    response: string = '';

    comment: string = '';
    separator: string = ',';
    pool: number = 10000;

    onFileChange(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        let files: FileList | null = element.files;

        // En cas de fichiers multiples on en extrait le premier.
        if (files) this.file = files.item(0);

        // Si le fichier sélectionné n'est pas un fichier csv on vide le champ file input.
        if (this.file && !this.file.name.toLowerCase().endsWith('.csv')) {
            this.inputForm.nativeElement.value = '';
            this.file = null;
            return;
        }
    }

    onUpload() {
        if (this.file == null || this.isLoading) return;
        this.isLoading = true;
        
        this.service.uploaderDocument(this.file, this.comment, this.separator, this.pool)
            .pipe(
                filter((event) => event.type === HttpEventType.Response),
                // Cast en HttpResponse.
                map((response) => response as HttpResponse<any>)
            )
            .subscribe({
                next: (data) => {
                    // Réinitialisation des données.
                    this.added = true;
                    this.inputForm.nativeElement.value = '';
                    this.comment = '';

                    // On peut désormais accéder aux propriétés depuis le body.
                    const message = data.body.message;
                    const uid = data.body.uid;

                    this.response = "Le fichier a été importé.";

                    setTimeout(() => { window.location.reload(); }, 3000);
                },
                error: (error) => {
                    const message = error.error;

                    this.error = true;
                    this.response = "Quelque chose d'inattendu s'est produit.";
                },
            });
    }
}
