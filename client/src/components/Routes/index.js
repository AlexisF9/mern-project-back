import React, { useEffect, useState } from "react";
import {
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import LeftNav from "../LeftNav";
import Navbar from "../Navbar";
import { youIdContext } from "../AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../../actions/user.actions";

const Routing = () => {
    
    const location = useLocation();

    const [youid, setYouid] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchToken = async () => {
          console.log("test 1");
        const res = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}jwtid?v=${Date.now()}`, //forcer la relance de la page
          withCredentials: true,
        })
        console.log("test 2");
        setYouid(res.data);
      };
      fetchToken();
      
      if (youid) {
          dispatch(getUser(youid)) // declenche l'action : envoi au reducer
      }
    }, [youid, location]);
    console.log("id", youid);
    return (
        <youIdContext.Provider value={youid}>
            <Navbar/>
            <LeftNav/>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/profil" exact element={<Profil/>}/>
                <Route path="/trending" exact element={<Trending/>}/>
                <Route path="*" element={<Navigate to ="/" />}/>
            </Routes>
        </youIdContext.Provider>
    );
};

export default Routing;