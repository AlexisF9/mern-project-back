import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {

    }

    return(
        <form action="" onSubmit={handleLogin} id="signInForm">
            <input type="text"/>
            <input type="password"/>
            <input type="submit" value="Se connecter"/>
        </form>
    );
};

export default SignInForm;