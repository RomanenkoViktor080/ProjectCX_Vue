import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeBasketAddItem} from "../../store/reducers/basketReducer";

const useBasketAddItem = () => {
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.basketReducer.basketItems);
    const isAuth = useSelector((state) => state.userReducer.isAuth)

    function addItemRequest(id) {
        return axios.post(`/api/basket`, {productId: id}).then(response => {
            return response.data;
        });
    }

    async function addItem(id) {

        const product = await addItemRequest(id);
        dispatch(changeBasketAddItem(product));
    }

    return addItem;

};

export default useBasketAddItem;
