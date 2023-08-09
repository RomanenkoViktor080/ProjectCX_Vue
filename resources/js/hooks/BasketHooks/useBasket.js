import {useSelector} from "react-redux";
import useBasketRemoveItem from "./useBasketDeleteItem";
import useBasketAddItem from "./useBasketAddItem";
import useBasketChangeQuantity from "./useBasketChangeQuantity";

const useBasket = () => {
    const basketData = useSelector((state) => state.basketReducer)
    const removeItemFromBasket = useBasketRemoveItem();
    const addItemToBasket = useBasketAddItem();
    const changeQuantity = useBasketChangeQuantity()
    return [basketData, addItemToBasket, changeQuantity, removeItemFromBasket];

};

export default useBasket;
