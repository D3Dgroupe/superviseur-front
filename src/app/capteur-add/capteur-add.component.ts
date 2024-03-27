import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../service/data.service';
import { NavigationComponent } from "../navigation/navigation.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-capteur-add',
    standalone: true,
    templateUrl: './capteur-add.component.html',
    styleUrl: './capteur-add.component.scss',
    imports: [CommonModule, FormsModule, NavigationComponent]
})

export class CapteurAddComponent implements OnInit {
    
    model: any = {};
    
    error: boolean = false;
    isLoading: boolean = false;
    message: string = "En attente d'instructions...";
    
    constructor(private service: DataService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void { this.model.digital = 1; this.model.previsionnel = 0;}

    onAjouter() {
        this.message = "Ajout d'un capteur en cours..."
        
        this.error = false;
        this.isLoading = true;

        this.service.ajouterCapteur(this.model).subscribe({
            next: (data) => {
                this.isLoading = false;
                this.router.navigate(['../capteurs'], { relativeTo: this.route });
            },
            error: (error) => {
                this.message = "Une erreur serveur est survenue pendant l'ajout.";
            },
        });
    }

    /**
     * Pour revenir en arrière.
     * @param route 
     */
    onNavigate(route: string) { this.router.navigate([route], { relativeTo: this.route }); }
}
