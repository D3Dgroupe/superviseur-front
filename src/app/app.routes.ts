import { Routes } from '@angular/router';
import { CapteurListeComponent } from './capteur-liste/capteur-liste.component';
import { ImportListeComponent } from './import-liste/import-liste.component';
import { LandingComponent } from './landing/landing.component';
import { SaisieManuelleComponent } from './saisie-manuelle/saisie-manuelle.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { SuppressionManuelleComponent } from './saisie-manuelle-suppression/saisie-manuelle-suppression.component';
import { CapteurAddComponent } from './capteur-add/capteur-add.component';

export const routes: Routes = [
    { path: '', component: LandingComponent, pathMatch: 'full' },
    { path: 'capteurs', component: CapteurListeComponent, data: { title: 'Capteurs AKSM' } },
    { path: 'add-device', component: CapteurAddComponent, data: { title: 'Ajouter un Capteur' } },
    { path: 'imports', component: ImportListeComponent, data: { title: 'Importer' } },
    { path: 'add-points', component: SaisieManuelleComponent, data: { title: 'Saisie Manuelle' } },
    { path: 'delete-points', component: SuppressionManuelleComponent, data: { title: 'Supression' } },
    { path: '**', component: NotFoundComponent, data: { title: '404' } }
];