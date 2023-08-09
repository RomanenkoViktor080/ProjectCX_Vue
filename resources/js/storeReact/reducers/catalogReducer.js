import {CATALOG_POPUP_STATE, MENU_STATE} from "../constants/catalogReducerConstants";


const defaultState = {
    popupState: false,
    menuState: null,
}


export const catalogReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CATALOG_POPUP_STATE:
            return {...state, popupState: action.payload}
        case MENU_STATE:
            return {...state, menuState: action.payload}
        default:
            return state;
    }
}
export const changeCategoryPopupState = (payload) => ({type: CATALOG_POPUP_STATE, payload: payload});
export const changeCategoryMenuState = (payload) => ({type: MENU_STATE, payload: payload});
