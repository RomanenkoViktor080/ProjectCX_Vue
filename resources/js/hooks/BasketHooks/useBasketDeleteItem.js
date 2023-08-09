import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeBasketAddItem, changeBasketRemoveItem} from "../../store/reducers/basketReducer";

const UseBasketDeleteItem = () => {
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.basketReducer.basketItems)
    const isAuth = useSelector(state => state.userReducer.isAuth);

    function deleteItemRequest(id) {
        if (isAuth) {
            axios.delete(`/api/basket/${id}`);
        }
    }

    async function deleteItemFunction(product) {
        deleteItemRequest(product.id);
        if (basket.some(basketItem => basketItem?.id === product.id)) {
            dispatch(changeBasketRemoveItem(product));
        }
    }

    return deleteItemFunction;
};

export default UseBasketDeleteItem;
