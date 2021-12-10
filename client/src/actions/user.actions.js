import axios from "axios";

// action = element qui vas envoyer les infos a la db puis dispatch au reducer pour faire evoluer le store

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

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

export const uploadPicture = (data, id) => {
    return (dispatch) => { 
        return axios 
            .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data) // on créé le nom de fichier et on le stock dans public (back)
            .then ((res) => {
                return axios    
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}`) // on reccup l'id du user
                    .then ((res) => {
                        dispatch({type: UPLOAD_PICTURE, payload: res.data.picture}) // on reccup le chemin de l'image et on l'envoi au store
                    })
                    .catch ((err) => {
                        console.log(err)
                    })
            })
            .catch ((err) => {
                console.log(err)
            })
    }
}

export const updateBio = (userId, bio) => {
    return (dispatch) => { // dispatch = ce qu'on envoi au reducer
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { bio }
        })
        .then ((res) => {
            dispatch({type: UPDATE_BIO, payload: bio}) // on envoi la data des users au reducer
        })
        .catch ((err) => {
            console.log(err)
        })
    }
}