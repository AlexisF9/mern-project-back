import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import LeftNav from "../LeftNav";
import Navbar from "../Navbar";

const Routing = () => {
    
    return (
        <Router>
            <Navbar/>
            <LeftNav/>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/profil" exact element={<Profil/>}/>
                <Route path="/trending" exact element={<Trending/>}/>
                <Route path="*" element={<Navigate to ="/" />}/>
            </Routes>
        </Router>
    );
};

export default Routing;