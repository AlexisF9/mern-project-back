import { GET_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER: // si c'est get user on met toute la data de user dans initialState
            return action.payload

        case UPLOAD_PICTURE:
            return {
                ...state, // on reccup ce qui a deja (autres infos) en plus de l'image
                picture: action.payload
            }
        
        case UPDATE_BIO:
            return {
                ...state, 
                bio: action.payload // on envoi la nouvelle bio
            }

        default:
            return state;
    }
}