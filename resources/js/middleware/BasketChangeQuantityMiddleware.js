import React from 'react';
import {BASKET_CHANGE_QUANTITY} from "../store/constants/basketReducerConstants";

const BasketChangeQuantityMiddleware = (store) => (next) => (action) => {
    const isAuth = store.getState().userReducer.isAuth;
    if (!isAuth) {
        let basket = JSON.parse(localStorage.getItem('basket')) ?? {basketItems: []}
        if (action.type === BASKET_CHANGE_QUANTITY) {
            basket.basketItems = basket.basketItems.map((item) => {
                if (Number(item.id) === action.payload?.id) {
                    return action.payload;
                }
                return item;
            });
            localStorage.setItem('basket', JSON.stringify(basket));
        }
    }

    return next(action);
};

export default BasketChangeQuantityMiddleware;
