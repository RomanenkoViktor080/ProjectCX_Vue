import {useStore} from "vuex";
import {debounce} from "lodash";

export default function useBasketChangeQuantity() {
    const store = useStore();
    const isAuth = store.state.user.isAuth;

    function updateProductQuantityRequest(id, quantity) {
        axios.patch(`/api/basket/${id}/quantity`, {quantity: quantity})
            .then(response => {
                store.dispatch('changeBasketProductQuality', response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    const debouncedUpdateProductQuantityRequest = debounce(updateProductQuantityRequest, 400);

    function updateProductQuantity(product, quantity) {
        store.dispatch('changeBasketProductQuality', {...product, quantity: quantity})
        if (isAuth) {
            debouncedUpdateProductQuantityRequest(product.id, quantity);
        }
    }


    return updateProductQuantity;

}
;
