import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { Import } from '../models/import.model';
import { CommonModule } from '@angular/common';
import { FichierComponent } from "../import-fichier/fichier.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { ImportAddComponent } from "../import-add/import-add.component";
import { TitleBarComponent } from "../generique/title-bar/title-bar.component";

@Component({
    selector: 'app-import-liste',
    standalone: true,
    templateUrl: './import-liste.component.html',
    styleUrl: './import-liste.component.scss',
    imports: [CommonModule, FichierComponent, NavigationComponent, ImportAddComponent, TitleBarComponent]
})

export class ImportListeComponent {
    
    imports: Import[] = [];

    constructor(private service: DataService) { }
    
    ngOnInit(): void { this.recupererHistorique(); }

    recupererHistorique() {
        this.service.recupererHistorique().subscribe(data => { this.imports = data });
    }
}
