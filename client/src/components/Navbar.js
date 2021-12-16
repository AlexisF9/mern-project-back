import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { youIdContext } from "./AppContext";
import Logout from "./Log/Logout";
import {useSelector} from 'react-redux';

const Navbar = () => {

    const youid = useContext(youIdContext);
    const userData = useSelector((state) => state.userReducer); // reccup les données du store grace au reducer

    return(
        <nav>
            <div className="nav-container"> 
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <img src="./img/logo.svg" alt=""/>
                            <h3>Racoont</h3>
                        </div>
                    </NavLink>
                </div>
                { youid ?
                <ul>
                    <li>
                        <NavLink exact to="/profil">
                            <div className="welcome">
                                <h5>{userData.pseudo}<img src={userData.picture}/></h5>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <Logout/>
                    </li>
                </ul>
                : 
                <ul>
                    <li>
                        <NavLink exact to="/profil">
                            <img src="./img/icons/login.svg" alt=""/>
                        </NavLink>
                    </li>
                </ul>
                }
            </div>
        </nav>
        
    );
};

export default Navbar;