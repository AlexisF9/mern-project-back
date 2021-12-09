import React, { useContext } from "react";
import Log from '../components/Log';
import { youIdContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {

    const youid = useContext(youIdContext);

    return(
        <div className="profil-page">
            {youid ? 
                <UpdateProfil/>
                
            : <Log signin={false} signup={true}/>}
        </div>
        
    );
};

export default Profil;