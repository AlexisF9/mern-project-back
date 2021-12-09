# Social Network project

Projet de mini réseau social. Réalisé en NodeJS, Express et Mongo DB pour le backend et ReactJS pour le frontend.

### Installation du projet :
#### BACK
  - npm i
  - Connexion à MongoDB dans db.js
  - Créer fichier .env à la racine dans config (voir instruction ci-dessous)
  - npm start à la racine (back)
### .env (back) :
  - PORT=5000
  - DB_USER=""
  - DB_PASS=""
  - TOKEN_SECRET=
  - CLIENT_URL=http://localhost:3000

#### FRONT
  - cd client
  - npm i
  - Créer fichier .env dans client (voir instruction ci-dessous)
  - npm start dans client (front)
  - localhost:3000
### .env (front) :
  - REACT_APP_API_URL=http://localhost:5000/
