import {Cookies} from "react-cookie";
import {AUTH_EMAIL_STATE, AUTH_STATUS_STATE, AUTHN_POPUP_STATE} from "../constants/userReducerConstants";

const cookie = new Cookies();

const defaultState = {
    popupState: false,
    isAuth: false,
    userEmail: false,
}


export const userReducer = (state = defaultState, action) => {

    switch (action.type) {
        case AUTHN_POPUP_STATE:
            return {...state, popupState: action.payload}
        case AUTH_STATUS_STATE:
            return {...state, isAuth: action.payload}
        case AUTH_EMAIL_STATE:
            return {...state, userEmail: action.payload}
        default:
            return state;
    }
}
export const changeAuthNPopupState = (payload) => ({type: AUTHN_POPUP_STATE, payload: payload});
export const changeAuthStatusState = (payload) => ({type: AUTH_STATUS_STATE, payload: payload});
export const changeAuthEmailState = (payload) => ({type: AUTH_EMAIL_STATE, payload: payload});
//TODO Временный вариант для синхронизации данных при загрузке приложения
export const changeAuthStatusStateThunk = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/user')
        dispatch(changeAuthStatusState(true));
        dispatch(changeAuthEmailState(response.data.email));
    } catch (error) {
        cookie.remove('auth_token')
        return false;
    }
}
