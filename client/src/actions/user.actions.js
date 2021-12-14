import axios from "axios";

// action = element qui vas envoyer les infos a la db puis dispatch au reducer pour faire evoluer le store

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const getUser = (youid) => {
    return (dispatch) => { // dispatch = ce qu'on envoi au reducer qui mettra à jour le store en direct (visuel de l'app)
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/user/${youid}`) // on appel l'url qu'on a créé dans le back
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
    return (dispatch) => { 
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { bio }
        })
        .then ((res) => {
            dispatch({type: UPDATE_BIO, payload: bio}) // on envoi la nouvelle bio au reducer
        })
        .catch ((err) => {
            console.log(err)
        })
    }
}

export const followUser = (followerId, idToFollow) => {
    return (dispatch) => { 
        return axios ({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
            data: {idToFollow}
        })
        .then ((res) => {
            dispatch({type: FOLLOW_USER, payload: {idToFollow}}) // envoi le nouvel id au reducer qui met a jour le stor
        })
        .catch ((err) => {
            console.log(err)
        })
        
    }
}

export const unFollowUser = (followerId, idToUnFollow) => {
    return (dispatch) => { 
        return axios ({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
            data: {idToUnFollow}
        })
        .then ((res) => {
            dispatch({type: UNFOLLOW_USER, payload: {idToUnFollow}}) // envoi au reducer l'id de la personne à unfollow
        })
        .catch ((err) => {
            console.log(err)
        })
        
    }
}