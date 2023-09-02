import React, {useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeBasketProductQuality} from "../../store/reducers/basket";
import {debounce} from "lodash";

const useBasketChangeQuantity = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.userReducer.isAuth)

    function updateProductQuantityRequest(id, quantity) {
        if (isAuth) {
            axios.patch(`/api/basket/${id}/quantity`, {quantity: quantity})
                .then(response => {
                    dispatch(changeBasketProductQuality(response.data))
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const debouncedUpdateProductQuantityRequest = useMemo(() => debounce(updateProductQuantityRequest, 400), [isAuth]);

    function updateProductQuantity(product, quantity) {
        dispatch(changeBasketProductQuality({...product, quantity: quantity}));
        debouncedUpdateProductQuantityRequest(product.id, quantity);
    }


    return updateProductQuantity;

};
export default useBasketChangeQuantity;
