import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';
import { Import } from '../models/import.model';
import { environment } from '../../environments/environment';
import { Saisie } from '../models/saisie.model';

@Injectable({
    providedIn: 'root',
})

export class DataService {
    
    // Le lien vers notre api (défini dans le constructeur).
    private url!: string;
    
    constructor(private http: HttpClient) { this.url = environment.apiUrl; } 

    /**
     * 
     * @returns Liste de capteurs.
     */
    recupererEquipements(): Observable<Device[]> {
        return this.http.get<any>(`${this.url}/devices`);
    }

    recupererCapteur(id: number): Observable<Device> {
        return this.http.get<Device>(`${this.url}/devices/${id}`);
    }

    /**
     * 
     * @returns Liste d'imports.
     */
    recupererHistorique(): Observable<Import[]> {
        return this.http.get<any>(`${this.url}/history`);
    }

    /**
     * 
     * @param capteur Le capteur (le corps) qu'on souhaite ajouter.
     * @returns Le capteur ajouté.
     */
    ajouterCapteur(capteur: Device): Observable<Device> {
        return this.http.post<Device>(`${this.url}/devices/add`, capteur);
    }

    modifierCapteur(capteur: Device): Observable<Device> {
        return this.http.put<Device>(`${this.url}/devices/${capteur.id}/update`, capteur);
    }

    /**
     * 
     * @param id Identifiant de l'appareil.
     * @param commentaire Le commentaire à appliquer.
     */
    modifierCommentaireImport(id: number, fichier: Import) {
        return this.http.post<Import>(`${this.url}/history/save/${id}`, fichier)
    }

    /**
     * Pour uploader un csv vers le serveur.
     * @param file 
     * @param commentaire 
     * @param separateur 
     * @param pool 
     * @returns 
     */
    uploaderDocument(file: File, commentaire: string, separateur: string, pool: number): Observable<HttpEvent<any>> {
        const formData: any = new FormData();
        
        formData.append('source', file);
        formData.append('comment', commentaire);
        formData.append('separator', separateur);
        formData.append('pool', pool);

        const req = new HttpRequest('POST', `${this.url}/imports/force-reimport`, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }

    rechercheCapteurs(pattern: string) {
        return this.http.get<Device[]>(`${this.url}/devices/${pattern}/find`);
    }

    /**
     * Ajout des données au mois.
     * @param saisie 
     * @returns 
     */
    ajoutDonneesMois(saisie: Saisie) {
        return this.http.post<any>(`${this.url}/inputs/mois`, saisie);
    }

    /**
     * Ajout des données au mois.
     * @param saisie 
     * @returns 
     */
    ajoutDonneesHeure(saisie: Saisie) {
        return this.http.post<any>(`${this.url}/inputs/heure`, saisie);
    }

    /**
     * Ajout des données au mois.
     * @param saisie 
     * @returns 
     */
    ajoutDonneesJour(saisie: Saisie) {
        return this.http.post<any>(`${this.url}/inputs/jour`, saisie);
    }

    /**
     * Purge tous les points du capteur (mesure).
     * @param hash 
     * @returns 
     */
    purger(tag: string) {
        return this.http.delete<any>(`${this.url}/suppression/${tag}/purge`);
    }

    /**
     * Purge les mesures au jour.
     * @param hash 
     * @param saisie 
     * @returns Observable
     */
    purgerJour(saisie: Saisie) {
        return this.http.post<any>(`${this.url}/suppression/jour`, saisie);
    }

    /**
     * Purge les mesures au mois.
     * @param hash 
     * @param saisie 
     * @returns Observable
     */
    purgerMois(saisie: Saisie) {
        return this.http.post<any>(`${this.url}/suppression/mois`, saisie);
    }

    supprimerCapteur(id: number, tag: string) {
        return this.http.delete<any>(`${this.url}/devices/${id}/${tag}/delete`);
    }
}