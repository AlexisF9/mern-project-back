import React from "react";
import Log from '../components/Log';

const Profil = () => {
    return(
        <div className="profil-page">
            <div>
                <Log signin={false} signup={true}/>
            </div>
        </div>
    );
};

export default Profil;