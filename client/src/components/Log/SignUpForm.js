import React, { createRef, useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');
    const [conditions, setConditions] = useState('');

    const pseudoError = createRef();
    const emailError = createRef();
    const passwordError = createRef();
    const passwordConfirmError = createRef();

    const handleRegister = async (event) => {
        event.preventDefault(); // enlève le rechargement de page

        passwordConfirmError.current.innerHTML = "";

        if (password !== controlPassword) {
            passwordConfirmError.current.innerHTML = "Les mots de passe ne correspondent pas";
        } else {
            await axios({ // fetch l'api 
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: { // passe les data au controller du back
                    pseudo,
                    email,
                    password
                }
            }) // renvoi une réponse
            .then((res) => {
                if (res.data.errors) {
                    pseudoError.current.innerHTML = res.data.errors.pseudo;
                    emailError.current.innerHTML = res.data.errors.email;
                    passwordError.current.innerHTML = res.data.errors.password;
                } else {
                    setFormSubmit(true);
                }
            }) // renvoi une erreur
            .catch((err) => {
                console.log(err);
            });
        }

        
    }

    return(
        <>
        {formSubmit 
        ? 
        <>
            <SignInForm/>
            <p className="success">Enregistrement réussi, veuillez vous connecter</p>
        </>
        :        
        <form action="" onSubmit={handleRegister} id="signUpForm">
            <label htmlFor="pseudo">Pseudo</label>
            <input type="text" id="pseudo" required onChange={(e) => setPseudo(e.target.value)} value={pseudo}/>
            <div ref={pseudoError} className="pseudo error"></div>

            <label htmlFor="email">Email</label>
            <input type="text" id="email" required onChange={(e) => setEmail(e.target.value)} value={email}/>
            <div ref={emailError} className="email error"></div>

            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" autoComplete="on" required onChange={(e) => setPassword(e.target.value)} value={password}/>
            <div ref={passwordError} className="password error"></div>

            <label htmlFor="password_verify">Confirmer le mot de passe</label>
            <input type="password" id="password_verify" autoComplete="on" required onChange={(e) => setControlPassword(e.target.value)} value={controlPassword}/>
            <div ref={passwordConfirmError} className="password_verify error"></div>

            <div className="containerCheckbox">
                <input type="checkbox" id="conditions" required onChange={(e) => setConditions(e.target.value)} value={conditions}/>
                <label htmlFor="conditions">J'accepte les conditions générales</label>
            </div>
            <div className="conditions error"></div>

            <input type="submit" value="S'inscrire"/>
        </form>
        }
        
        </>
    );
};

export default SignUpForm;