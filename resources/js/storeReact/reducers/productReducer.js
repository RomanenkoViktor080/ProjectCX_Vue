import {PRODUCT_PREVIEW_POPUP_DATA, PRODUCT_PREVIEW_POPUP_STATE} from "../constants/productReducerConstants";

const defaultState = {
    popupState: false,
    productData: {
        id: null,
        title: '',
        price: null,
        images: []
    }
}

export const productReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PRODUCT_PREVIEW_POPUP_STATE:
            return {...state, popupState: action.payload}
        case PRODUCT_PREVIEW_POPUP_DATA:
            return {...state, productData: action.payload, popupState: true}
        default:
            return state;
    }
}
export const changeProductPreviewPopupState = (payload) => ({type: PRODUCT_PREVIEW_POPUP_STATE, payload: payload});
export const changeProductPreviewPopupData = (payload) => ({type: PRODUCT_PREVIEW_POPUP_DATA, payload: payload});
