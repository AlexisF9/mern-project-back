import React from "react";
import {useSelector} from 'react-redux';

const UpdateProfil = () => {

    const userData = useSelector((state) => state.userReducer);

    return (
        <div className="profil-container">
            <h1>Profil de {userData.pseudo}</h1>
            <img src={userData.picture}/>
        </div>
    )
};

export default UpdateProfil;