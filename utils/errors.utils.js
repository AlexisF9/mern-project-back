module.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: ""}// create object

    if(err.message.includes('pseudo')) {
        errors.pseudo = "Pseudo incorrect";
    }
    if (err.message.includes('email')) {
        errors.email = "Email incorrect";
    }
    if (err.message.includes('password')) {
        errors.password = "Le mot de passe doit faire 6 caractères minimum";
    }
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo")) {
        errors.pseudo = "Ce pseudo est déja pris";
    }
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) {
        errors.email = "Cet email est déja pris";
    }

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: "", password: ""}// create object

    if (err.message.includes('email')) {
        errors.email = "Email inconnu";
    }
    if (err.message.includes('password')) {
        errors.password = "Mot de passe inconnu";
    }

    return errors;
};

module.exports.uploadErrors = (err) => {
    let errors = {format: "", maxSize: ""};

    if(err.message.includes('Invalid file')) {
        errors.format = "Format imcompatible";
    }
    if(err.message.includes('Max size')) {
        errors.maxSize = "Le fichier dépasse les 500ko";
    }

    return errors;
}