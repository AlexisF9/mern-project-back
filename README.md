# MERN project : Réseaux social

### Installation du projet :
  - npm i
  - Connexion à MongoDB dans db.js
  - Créer fichier .env à la racine dans config (voir instruction ci-dessous)
  - npm start à la racine (back)
  - Créer fichier .env dans client (voir instruction ci-dessous)
  - npm start dans client (front)
  - localhost:3000
 
### add .env (back) :
  - PORT=5000
  - DB_USER=""
  - DB_PASS=""
  - TOKEN_SECRET=
  - CLIENT_URL=http://localhost:3000

### add .env (front) :
  - REACT_APP_API_URL=http://localhost:5000/
