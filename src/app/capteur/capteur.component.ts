import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from '../models/device.model';
import { DataService } from '../service/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-capteur',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './capteur.component.html',
    styleUrl: './capteur.component.scss',
})

export class CapteurComponent implements OnInit {
    
    @Input() capteur!: Device;
    @Output() removeCapteur = new EventEmitter<number>();
    
    modified: boolean = false;
    deleting: boolean = false;

    constructor(private service: DataService, private changes: ChangeDetectorRef) {}
    
    ngOnInit(): void {}

    save(): boolean {
        // Il faudrait au moins spécifier le tag avant de sauvegarder.
        if (!this.capteur.tag) return false;
        
        // La méthode subscribe est asynchrone on attend que ça se termine avant d'affecter les données au capteur pour le dom (document object model).
        this.service.modifierCapteur(this.capteur).subscribe({
            next: (data) => {
                this.capteur = data;
                this.changes.detectChanges();
                this.modified = false;
            },
            error: (error) => { this.modified = false; }
        });

        return true;
    }

    onRemoveCapteur() {
        this.deleting = true;
        
        this.service.supprimerCapteur(this.capteur.id, this.capteur.tag).subscribe({
            next: (data) => {
                this.removeCapteur.emit(this.capteur.id);
            },
            error: (error) => {}
        });
    }
}
