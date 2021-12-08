import React, { useState } from "react";
import SignIn from './SignInForm';
import SignUp from './SignUpForm';

const Log = (props) => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    const handleModals = (event) => {
        if (event.target.id === "register") {

            setSignUpModal(true);
            setSignInModal(false);

        } else if (event.target.id === "login") {

            setSignUpModal(false);
            setSignInModal(true);

        }
    }

    return(
        <div className="logForm">
            <ul>
                <li onClick={handleModals} id="register" className={signUpModal && "active-btn"}>S'inscrire</li>
                <li onClick={handleModals} id="login" className={signInModal && "active-btn"}>Se connecter</li>
            </ul>
            <div className="form">
                {signUpModal && <SignUp/>}
                {signInModal && <SignIn/>}
            </div>
        </div>
    );
};

export default Log;