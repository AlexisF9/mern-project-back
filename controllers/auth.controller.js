const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken'); // lib pour créer des token pour l'auth
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET,  {
        expiresIn: maxAge //expire dans 3 jours
    })
};

// Création de compte
module.exports.signUp = async(req, res) => {
    const {pseudo, email, password} = req.body

    try {
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({user: user._id});
    } catch(err) {
        const errors = signUpErrors(err); // on envoi l'erreur à notre fonction 
        res.status(200).send({errors}); // renvoi nos erreurs pré-écrite
    }
}

// Connexion
module.exports.signIn = async(req, res) => {
    const { email, password} = req.body;

    try {
        const user = await UserModel.login(email, password); // req.body.email, req.body.password
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge}); // créer le cookie avec le token
        res.status(200).json({user: user._id});
    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).send({errors});
    }
}

// Déconnexion
module.exports.logout = async(req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}