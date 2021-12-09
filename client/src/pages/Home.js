import React, { useContext } from "react";
import { youIdContext } from "../components/AppContext";

const Home = () => {

    const uid = useContext(youIdContext);

    return(
        <div className="home">
            {uid ? <h1>Ta page home</h1> : <h1>Hello depuis home</h1>}
        </div>
    );
};

export default Home;