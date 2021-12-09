import axios from "axios";

export const GET_USER = "GET_USER";

export const getUser = (youid) => {
    return (dispatch) => { // dispatch = ce qu'on envoi au reducer
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/user/${youid}`)
            .then ((res) => {
                dispatch({type: GET_USER, payload: res.data}) // on envoi la data des users au reducer
            })
            .catch ((err) => {
                console.log(err)
            })
    }
}