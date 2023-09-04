import {useStore} from "vuex";
import {computed} from "vue";

export default function useBasketAddItem () {
    const store = useStore();
    // const basketProducts = computed(() => store.state.basket.basketProducts);
    // const isAuth = computed(() => store.state.user.isAuth)

    function addItemRequest(id) {
        return axios.post(`/api/basket`, {productId: id}).then(response => {
            return response.data;
        });
    }

    async function addItem(id) {

        const product = await addItemRequest(id);
        store.dispatch('changeBasketAddProduct', product)
    }

    return addItem;

}
