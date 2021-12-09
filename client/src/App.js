import React, { useEffect, useState } from "react";
import { youIdContext } from "./components/AppContext";
import axios from "axios";
import Routes from "./components/Routes";
import {useDispatch} from 'react-redux';
import { getUser } from "./actions/user.actions";

function App() {

  const [youid, setYouid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setYouid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (youid) {
        dispatch(getUser(youid)) // declenche l'action : envoi au reducer
    }
  }, [youid]);

  return (
    <youIdContext.Provider value={youid}>
        <Routes/>
    </youIdContext.Provider>
  );
}

export default App;
