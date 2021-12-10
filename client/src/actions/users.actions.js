import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
    return (dispatch) => { // dispatch = ce qu'on envoi au reducer
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/user`)
            .then ((res) => {
                dispatch({type: GET_USERS, payload: res.data}) // on envoi la data des users au reducer
            })
            .catch ((err) => {
                console.log(err)
            })
    }
}