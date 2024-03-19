export const environment = { 
    production: true, 
    // En production si on ne récupère pas la variable d'environnement comme on l'attend on utilisera l'url ci-dessous.
    apiUrl: (<any>window).env["apiUrl"] || "http://tiberian-influx:8080",
    // Est à faux par défaut (surtout en prod).
    debug: (<any>window).env["debug"] || false
};
