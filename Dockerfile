# Utiliser l'image officielle node.
FROM node:latest as build

# Définir le répertoire de travail.
WORKDIR /app

# Ajouter le code source.
COPY . .

# Installer les dépendances.
RUN npm install

# Générer un build de l'application.
RUN npm run build -- --configuration production

# Utilisation de l'image nginx pour la communication http.
FROM nginx:alpine

# Copie du fichier de configuration.
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copie du build vers le chemin public de nginx.
COPY --from=build app/dist/superviseur/browser /usr/share/nginx/html

# Exposer le port 80.
EXPOSE 80

# Pour le remplacement de l'environnement.
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]