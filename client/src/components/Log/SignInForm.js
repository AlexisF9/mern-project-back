import React, { createRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailError = createRef();
    const passwordError = createRef();

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault(); // enlève le rechargement de page

        axios({ // fetch l'api 
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`, // url fait le lien avec les routes du back
            withCredentials: true,
            data: { // passe les data au controller du back
                email,
                password
            }
        }) // renvoi une réponse
        .then((res) => {
            if(res.data.errors) {
                emailError.current.innerHTML = res.data.errors.email; // erreur du back
                passwordError.current.innerHTML = res.data.errors.password;
            } else {
                navigate('/');
            }
        }) // renvoi une erreur
        .catch((err) => {
            console.log(err);
        });
    }

    return(
        <>
        <form action="" onSubmit={handleLogin} id="signInForm">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" required onChange={(e) => setEmail(e.target.value)} value={email}/>
            <div ref={emailError} className="email error"></div>

            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" autoComplete="on" required onChange={(e) => setPassword(e.target.value)} value={password}/>
            <div ref={passwordError} className="password error"></div>

            <input type="submit" value="Se connecter"/>
        </form>
        </>
    );
};

export default SignInForm;