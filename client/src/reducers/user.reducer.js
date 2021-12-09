import { GET_USER } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER: // si c'est get user on met toute la data de user dans initialState
            return action.payload

        default:
            return state;
    }
}