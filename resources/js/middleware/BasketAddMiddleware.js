import React from 'react';
import {BASKET_ADD_ITEM} from "../store/constants/basketReducerConstants";

const BasketAddMiddleware = (store) => (next) => (action) => {
    const isAuth = store.getState().userReducer.isAuth;
    if (!isAuth) {
        let basket = JSON.parse(localStorage.getItem('basket')) ?? {basketItems: []}
        if (action.type === BASKET_ADD_ITEM) {
            basket.basketItems.push(action.payload);
            localStorage.setItem('basket', JSON.stringify(basket));
        }
    }

    return next(action);
};

export default BasketAddMiddleware;
