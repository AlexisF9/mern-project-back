import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { youIdContext } from "../components/AppContext";
import Thread from "../components/Thread";

const Home = () => {

    const uid = useContext(youIdContext);
    const userData = useSelector((state) => state.userReducer); 

    return(
        <div className="home">
            {uid ? <h1>Bienvenue {userData.pseudo}</h1> : <h1>Connexion</h1>}

            <div className="threadHome">
                <Thread/>
            </div>
        </div>
    );
};

export default Home;