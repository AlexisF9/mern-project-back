const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken'); 

// check le token de l'user à chaque requette
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt; // accès au cookie qui s'appel jwt
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err) {
                res.local.user = null;
                res.cookie('jwt', '', {maxAge: 1}); // on supprime le cookie
                next(); // on continu le code
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

// Vérifie si un user est deja co à l'arrivé sur l'app
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err) {
                console.log(err);
            } else {
                console.log(decodedToken.id);
                next();
            }
        })
    } else {
        console.log("No token");
    }
}