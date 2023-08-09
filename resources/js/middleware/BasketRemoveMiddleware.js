import React from 'react';
import {BASKET_ADD_ITEM, BASKET_REMOVE_ITEM} from "../store/constants/basketReducerConstants";

const BasketRemoveMiddleware = (store) => (next) => (action) => {
    const isAuth = store.getState().userReducer.isAuth;
    if (!isAuth) {
        let basket = JSON.parse(localStorage.getItem('basket')) ?? {basketItems: []}
        if (action.type === BASKET_REMOVE_ITEM) {
            basket.basketItems = basket.basketItems.filter(basketItem => Number(basketItem.id) !== Number(action.payload?.id));
            localStorage.setItem('basket', JSON.stringify(basket));
        }
    }

    return next(action);
};

export default BasketRemoveMiddleware;
