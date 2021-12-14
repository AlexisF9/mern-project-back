import { GET_USER, UPDATE_BIO, UPLOAD_PICTURE, FOLLOW_USER, UNFOLLOW_USER } from "../actions/user.actions";

// reducer = Le reducer reçoit des actions pour mettre a jour le store de l'app en direct (visuel de l'app)

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER: // si c'est get user on met toute la data de user dans initialState
            return action.payload

        case UPLOAD_PICTURE:
            return {
                ...state, // on reccup ce qui a deja (autres infos) en plus de l'image
                picture: action.payload // on envoi la nouvelle image de profil
            }
        
        case UPDATE_BIO:
            return {
                ...state, 
                bio: action.payload 
            }

        case FOLLOW_USER:
            return {
                ...state, 
                following: [action.payload.idToFollow, ...state.following] // ...state = on reccup le reste du tableau pour pas l'écraser
            }

        case UNFOLLOW_USER:
            return {
                ...state, 
                following: state.following.filter((id) => id !== action.payload.idToUnFollow) // on filtre les following et on enlève l'id de la personne qu'on unfollow
            }

        default:
            return state;
    }
}