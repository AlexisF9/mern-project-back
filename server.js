const express = require('express'); // framework js

const bodyParser = require('body-parser'); // lire les req.body
const cookieParser = require('cookie-parser'); // lire les req.cookies

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

require('dotenv').config({path: './config/.env'}); // variables d'environnement
require('./config/db'); 

const {checkUser, requireAuth} = require('./middleware/auth.middleware');

const cors = require('cors'); // lib autorisation d'utiliser l'api

///////////////////////////////////////

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

// jwt
//check à chaque requette/route
app.get('*', checkUser); // on check le token sur n'importe quelle route
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

// routes 
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})